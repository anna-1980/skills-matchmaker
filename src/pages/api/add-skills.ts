import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const fileFromPath = () => {
    return path.join(process.cwd(), "data", "skills.json");
  };

  const dataFeomFile = (filePath: string) => {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());
    return data;
  };

  if (req.method === "POST") {
    const category = req.body.category;
    const skill = req.body.skill;
    const skillLevel = req.body.skillLevel;
    const month = req.body.month;
    const year = req.body.year;
    const usedDaily = req.body.usedDaily;
    const comment = req.body.comment;

    // new object to be stored in a database or anything
    const newFormDataSent = {
      skill_id: new Date().toISOString(), //should return id for existing ones or null for new ones
      category: category,
      skill: skill,
      skillLevel: skillLevel,
      month: month,
      year: year,
      usedDaily: usedDaily,
      comment: comment,
    };

    // store in a file
    const filePath = fileFromPath();
    const data = dataFeomFile(filePath);
    data.push(newFormDataSent);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res
      .status(201)
      .json({ message: "successfully sent", newFormData: newFormDataSent });
  } else {
    const filePath = fileFromPath();
    const data = dataFeomFile(filePath);
    res.status(200).json({ newSkills: data });
  }
}

export default handler;