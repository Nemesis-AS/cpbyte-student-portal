import asyncHandler from "express-async-handler";
import ResponseError from "../types/ResponseError.js";
import prisma from "../config/db.js";

export const allAttendance = asyncHandler(async (req, res) => {

const allUsers = await prisma.user.findMany({
  where: { role: "USER" },
  include: { attendances: true },
});

if (allUsers.length === 0) {
    throw new ResponseError("No attendance records found", 404);
}

const record = await Promise.all(
   allUsers.map(async(user) => ({
    name: user.name,
    library_id: user.library_id,
    attendances: user.attendances ?
      user.attendances.map( (attendance) => ({
        date: attendance.date,
        status: attendance.status,
      })) : [],
})))

  res.json({
    success: true,
    data: record,
    message: "All attendance records fetched successfully",
  })
});

export const markAttendance = asyncHandler(async (req, res) => {
  const { responses, subject, date } = req.body;

  if (responses.length === 0) {
    throw new ResponseError("No responses provided", 400);
  }
  await Promise.all(
  responses.map(async (response) => {
    const { library_id, status } = response;

    const user = await prisma.user.findUnique({ where: { library_id },
      include:{
        attendances: true,
      }
    },
    );

    var Tdsa=0,Tdev=0,TdsaP=0,TdevP=0;
    user.attendances.forEach((item)=>{
      if(item.subject=="DSA"){
        Tdsa++;
        if(item.status=="PRESENT"){
          TdsaP++;
        }
      }else if(item.subject=="DEV"){
        Tdev++;
        if(item.status=="PRESENT"){
          TdevP++;
        }
      }
    })
    if(subject=="DSA"){
      if(status=="PRESENT"){
        TdsaP++;
      }
      Tdsa++;
    }
    else{
      if (status=="PRESENT") {
        TdevP++;
      }
      Tdev++;
    }

    const dsaPercentage = Tdsa ? (TdsaP / Tdsa) * 100 : 0;
    const devPercentage = Tdev ? (TdevP / Tdev) * 100 : 0;    

    if (!user) throw new ResponseError(`User with Library_ID:${library_id} does not exist`, 404);

  await prisma.attendance.create({
    data: {
      user: { connect: { id: user.id } },
      status: status==="PRESENT" ? "PRESENT" : status==="ABSENT WITH REASON" ? "ABSENT_WITH_REASON" : "ABSENT_WITHOUT_REASON",
      subject:subject,
      date: date,
    },
  });
  await prisma.user.update({where:{library_id},
    data:{
      dsaAttendance:dsaPercentage,
      devAttendance:devPercentage
    }
  })
  })
  );

  res.json({
    success: true,
    message: "Attendance marked successfully",
  });
});

export const memberOfDomain = asyncHandler(async (req, res) => {
  const {domain} = req.query;

  if (!domain) {
    throw new ResponseError("Domain is required", 400);
  }

  const validDevDomains = {
    ANDROID: "ANDROID",
    ARVR: "ARVR",
    ML: "ML",
    WEBDEV: "WEBDEV",
    UIUX: "UIUX",
  };

  const validDsaDomains = {
    JAVA: "JAVA",
    CPP: "CPP"
  };

  if (!validDevDomains[domain] && !validDsaDomains[domain]) {
    throw new ResponseError("Invalid domain", 400);
  }

  const users = await prisma.user.findMany({
    where: { role: "USER",
      OR:[
        { domain_dev: validDevDomains[domain] },
        { domain_dsa: validDsaDomains[domain] },
      ]
     },
  });

  const usersWithStatus = users.map(user => ({
    ...user,
    status: "PENDING",
  }));

  res.json({
    success: true,
    data: usersWithStatus,
    message: `Users in domain ${domain} fetched successfully`,
  });
})

export const checkStatus = asyncHandler(async (req, res)=>{
    const {domain, date} = req.body;

    if (!domain) {
      throw new ResponseError("Domain is required", 400);
    }

    const status = await prisma.attendanceLog.findMany(
      {
        where: {
            domain: domain,
            date: date
        }
      }
    )

    if(status.length>0)
      res.json({
          marked:true
      })
    else
      res.json({
          marked:false
      })
})

export const updateStatus = asyncHandler(async (req, res)=>{
  const {domain, date} = req.body;

  if(!domain)
    throw new ResponseError("Domain is required", 400)

  await prisma.attendanceLog.create(
    {
      data:{
        domain:domain,
        date:date
      }
    }
  )
  res.json({
    success:true,
    message:"Status updated successfully"
  })
})