import axios from "axios";
import prisma from "../config/db.js";

export const refreshProfiles = async () => {
  const leetcodeEntries = await prisma.leetcode.findMany();
  const githubEntries = await prisma.gitHub.findMany();

  await Promise.all(
    leetcodeEntries.map(async (entry) => {
      try {
        const leetcode = await axios.get(
          `https://leetcode.com/graphql?query=query%20{%20matchedUser(username:%22${entry.username}%22)%20{%20submissionCalendar%20submitStats%20{%20acSubmissionNum%20{%20count%20}%20}%20}%20}`
        );

        const matchedUser = leetcode.data.data.matchedUser;
        if (!matchedUser) return;

        const past5Days = getPastFiveDays();
        const record = await check(past5Days, matchedUser.submissionCalendar);

        await Promise.all([
          prisma.leetcode.update({
            where: { id: entry.id },
            data: {
              solvedProblems: matchedUser.submitStats.acSubmissionNum[0].count,
              easy: matchedUser.submitStats.acSubmissionNum[1].count,
              medium: matchedUser.submitStats.acSubmissionNum[2].count,
              hard: matchedUser.submitStats.acSubmissionNum[3].count,
              calendar: matchedUser.submissionCalendar,
            },
          }),
          prisma.trackerDashboard.update({
            where: { id: entry.trackerId },
            data: { past5: record },
          }),
        ]);
      } catch (err) {
        console.error(`Failed for user: ${entry.username}`, err);
      }
    })
  );

  await Promise.all(
    githubEntries.map(async (entry) => {
      try {
        const response = await axios.post(
          "https://api.github.com/graphql",
          {
            query: `query {user(login: "${entry.username}") {contributionsCollection {contributionCalendar {totalContributions}}pullRequests {totalCount}repositories(privacy: PUBLIC) {totalCount}}}`,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
          }
        );

        const data = response.data.data.user;
        if (!data) return;

        await prisma.gitHub.update({
          where: { id: entry.id },
          data: {
            contributions:
              data.contributionsCollection.contributionCalendar
                .totalContributions,
            prs: data.pullRequests.totalCount,
            repos: data.repositories.totalCount,
          },
        });
      } catch (err) {
        console.error(`GitHub fetch failed for user: ${entry.username}`, err);
      }
    })
  );
};

const check = async (matchDate, dbHistory) => {
  const dbObject = JSON.parse(dbHistory);
  const set = new Set(Object.keys(dbObject).map(Number));
  const finalDate = [0, 0, 0, 0, 0];
  for (let i = 4; i >= 0; i--) {
    if (set.has(matchDate[i])) {
      finalDate[i] = 1;
    }
  }
  return finalDate;
}; // This function checks if the last 5 days are present in the database history and returns an array of 1s and 0s

const getPastFiveDays = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const pastFiveDays = [];

  for (let i = 4; i >= 0; i--) {
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - i);
    const utcTimestamp = Date.UTC(
      pastDate.getFullYear(),
      pastDate.getMonth(),
      pastDate.getDate()
    );
    pastFiveDays.push(utcTimestamp / 1000);
  }
  return pastFiveDays;
}; // This function returns an array of the last 5 days in UTC timestamp format
