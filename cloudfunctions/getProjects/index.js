// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const getRes = await db.collection("projects").get();
    if (!getRes) return;
    return getRes.data;
  } catch (err) {
    console.log("获取项目出错：" + err);
  }
};
