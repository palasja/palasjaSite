import fs, {unlink} from "node:fs";
import path from "node:path";
import { loadEnvFile } from 'node:process';
loadEnvFile();

const filesPath = path.join('..', `${process.env.FILES_FOLDER}`, 'uploaded');

export const getFilesFolderPath = () => filesPath;
export const removeFile = (fileName: string) =>{
  const filePath = path.join(filesPath, fileName);
  if (fs.existsSync(filePath)){
    unlink(filePath, err => {
        if (err) throw err
    });
  }
}

export const createFilesFolder = () => {
  console.log(`Crteate ${filesPath}}`);
  if (fs.existsSync(filesPath)) {
    console.log(` ${filesPath} exists`);
  } else {
    try {
      fs.mkdirSync(filesPath, { recursive: true });
      console.log(`${filesPath} created successfully!`);
    } catch (err) {
      console.error(`Error creating ${filesPath}:`, err);
    }
  }
}

export const saveFile = (body: any) => {
      const scan = body.scan;
      const fileName = `${body.orgId}__${body.number}__${(body.signDate)}.pdf`;
      const filePath = path.join(filesPath, fileName);
      let base64File = scan.split(';base64,').pop() as string;
      // const decoded = Buffer.from(scan, "base64");

      // fs.writeFileSync(folder, base64Image);
      fs.writeFile(filePath, base64File, {encoding: 'base64'}, function(err) {
        console.log('File created');
      });
      let contract = body;
      delete contract.scan;
      contract.fileName = fileName;
      return contract;
} 

export const getFullPathByFileName = (fileName: string) => {
  return path.join(__dirname, '..',filesPath, fileName);
}