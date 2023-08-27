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

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   //Find the absolute path of the json directory
//   const jsonDirectory = path.join(process.cwd(), 'data');
//   //Read the json data file data.json
//   const fileContents = await fs.readFile(jsonDirectory + '/categories.json', 'utf8');
//   //Return the content of the data file in json format
//   res.status(200).json(fileContents);
// }
