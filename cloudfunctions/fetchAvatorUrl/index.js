// 云函数入口文件
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// 云函数入口函数
// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { fileID } = event;
  try {
    const res = await cloud.getTempFileURL({
      fileList: [fileID],
    });
    if (!res) return;
    return res;
  } catch (err) {
    console.log("获取头像下载地址出错：" + err);
  }
};
