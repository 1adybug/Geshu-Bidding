// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

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
    console.error("获取导出文件出错:", err);
    throw err;
  }
};
