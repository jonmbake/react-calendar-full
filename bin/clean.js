const fs = require('fs');
const path = require('path');

const deleteFolderRecursive = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  fs.readdirSync(dirPath).forEach((file) => {
    const curPath = path.join(dirPath, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      deleteFolderRecursive(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });

  fs.rmdirSync(dirPath);
};

const distPath = path.resolve(__dirname, '..', 'dist');
deleteFolderRecursive(distPath);
fs.mkdirSync(distPath);
