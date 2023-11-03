// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { _id } = event;
  try {
    const findRes = db
      .collection("projects")
      .where({
        _id,
      })
      .get();
    if (!findRes) return;
    return findRes;
  } catch (err) {
    console.log("查找项目出错：" + err);
  }
};
