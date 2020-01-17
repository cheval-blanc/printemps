import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
const fsPromises = fs.promises;

export async function openDirectory(dirPath) {
  try {
    return await fsPromises.readdir(dirPath);
  } catch (e) {
    fs.mkdirSync(dirPath);
    console.log(`Directory is created: "${dirPath}"`);
    return null;
  }
}

export async function getFileList(dirPath) {
  try {
    const dirs = await openDirectory(dirPath);
    if (dirs === null) {
      return [];
    }

    const files = await Promise.all(
      dirs.map(async file => {
        const filePath = path.join(dirPath, file);
        const stats = await fsPromises.stat(filePath);

        if (stats.isDirectory()) {
          return getFileList(filePath);
        } else if (stats.isFile()) {
          return filePath;
        }
      }),
    );

    return files.reduce((all, f) => all.concat(f), []);
  } catch (e) {
    console.error(e);
  }
}

function stringToHash(str) {
  const md5Sum = crypto.createHash('md5');

  const hash = md5Sum.update(str).digest('hex');
  return hash.slice(0, 10);
}

export async function saveImageFile({ format, data }, key, dirPath) {
  const extension = format.split('/')[1];
  const fileName = `${stringToHash(key)}.${extension}`;

  const filePath = path.join(dirPath, fileName);
  await fsPromises.writeFile(filePath, Buffer.from(data));

  return fileName;
}
