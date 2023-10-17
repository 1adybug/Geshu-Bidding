// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const res = await db.collection("users").get();
    if (!res) return;
    return res.data;
  } catch (err) {
    console.log("获取用户列表出错：" + err);
  }
};
