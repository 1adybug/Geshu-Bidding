// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  
  const { userId } = event;

  try {
    const res = await db
      .collection("users")
      .where({
        _id: userId,
      })
      .get();
    if (!res) return;
    return res.data;
  } catch (err) {
    console.log("通过userId查找用户出错：" + err);
  }
};
