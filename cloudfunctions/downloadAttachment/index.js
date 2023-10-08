// 云函数入口文件
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const axios = require("axios");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { fileUrl } = event; // 前端传递的非安全链接
  try {
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    return {
      fileData: response.data,
      contentType: response.headers["content-type"],
      contentDisposition: response.headers["content-disposition"],
    };
  } catch (error) {
    console.error("Download failed", error);
    throw new Error("Download failed");
  }
};
