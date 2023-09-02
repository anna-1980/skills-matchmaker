import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const fileFromPath = () => {
    return path.join(process.cwd(), "data", "categories.json");
  };

  const dataFromFile = (filePath: string) => {
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData.toString());
    return data;
  };

  const filePath = fileFromPath();
  const data = dataFromFile(filePath);
  res.status(200).json({ categories: data });
}

export default handler;
 