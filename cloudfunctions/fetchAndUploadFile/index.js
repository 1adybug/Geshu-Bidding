// 云函数入口文件
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const axios = require("axios");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { fileUrl, fileExtension } = event;
  try {
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const result = await cloud.uploadFile({
      cloudPath:
        "purchaseAnnouncementAttachments/" + Date.now() + fileExtension,
      fileContent: response.data,
    });
    const res = await cloud.getTempFileURL({
      fileList: [result.fileID],
    });
    if (!res) return;
    return res;
  } catch (error) {
    console.error("Download and upload file failed", error);
    throw new Error("Download and upload file failed");
  }
};
