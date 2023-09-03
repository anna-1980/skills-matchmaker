import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export interface Skill {
  skill_id: string;
  category: string;
  category_id: string;
  skillName: string;
  skillLevel: string;
  month: string;
  year: string;
  usedDaily: string;
  comment: string;
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  const fileFromPath = () => {
    return path.join(process.cwd(), "data", "skills.json");
  };

  const dataFromFile = (filePath: string) => {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());
    return data;
  };

  if (req.method === "POST") {
    const category = req.body.category;
    const category_id = req.body.category_id;
    const skillName = req.body.skillName;
    const level = req.body.skillLevel;
    const month = req.body.month;
    const year = req.body.year;
    const usedDaily = req.body.usedDaily;
    const comment = req.body.comment;

    // new object to be stored in a database or anything
    const newFormDataSent = {
      skill_id: new Date().toISOString(), //should return id for existing ones or null for new ones
      category: category,
      category_id: category_id,
      skillName: skillName,
      skillLevel: level,
      month: month,
      year: year,
      usedDaily: usedDaily,
      comment: comment,
    };

    // store in a file
    const filePath = fileFromPath();
    const data = dataFromFile(filePath);
    data.push(newFormDataSent);
    fs.writeFileSync(filePath, JSON.stringify(data));
    res
      .status(201)
      .json({ message: "successfully sent", newFormData: newFormDataSent });
  } else if (req.method === "PATCH") {
    const skillIdToDelete = req.body as string; 
    console.log("ID of skill to del", req.body);
    // Load the existing data from the file
    const filePath = fileFromPath();
    const data = dataFromFile(filePath);
    const skillIndexToDelete = data.findIndex(
      (skill: Skill) => skill.skill_id === skillIdToDelete
    );
    if (skillIndexToDelete === -1) {
      // Skill not found
      return res.status(404).json({ message: "Skill not found" });
    }
    data.splice(skillIndexToDelete, 1);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(200).json({ message: "Skill deleted" });
  } else {
    const filePath = fileFromPath();
    const data = dataFromFile(filePath);
    res.status(200).json({ skills: data });
  }
}

export default handler;
