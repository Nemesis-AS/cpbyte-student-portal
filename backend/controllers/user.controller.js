import asyncHandler from "express-async-handler";
import prisma from "../config/db.js";
import ResponseError from "../types/ResponseError.js";

export const userAttendance = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.userId },
        include: { attendances: true },
    });

    if (!user) throw new ResponseError("User does not exist", 401);

    res.json({ success: true,message: "Attendance Fetched successfully", data: user.attendances });
});

export const getProfile = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include:{
        attendances: true,
      },
      omit: {
        password: true
      }
    });
    if (!user) throw new ResponseError("User not found", 404);
  
    res.status(200).json({ success: true, message: "User profile fetched", data: user });
  });

export const getProjects = asyncHandler(async (req, res)=>{
  const projects = await prisma.trackerDashboard.findUnique({
    where:{  userId:req.userId  },
    select:{
      projects:true
    }
  })

  res.status(200).json({success: true, message: "User projects fetched Successfully", data: projects})
})