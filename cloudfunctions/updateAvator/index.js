// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const fs = require("fs");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { file, userId, exten } = event;

  console.log(file, userId, exten);

  try {
    const res = await cloud.uploadFile({
      cloudPath: `avators/${userId + exten}`,
      fileContent: fs.readFileSync(file),
    });
    if (!res) return;
    const urlRes = await cloud.getTempFileURL({
      fileList: [res.fileID],
    });
    if (!urlRes) return;
    return urlRes;
  } catch (error) {
    console.log("上传失败", error);
    return {
      error: error,
    };
  }
};
