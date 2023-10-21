// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { username, password } = event;
  try {
    const res = await db
      .collection("users")
      .where({
        username,
        password,
      })
      .get();
    if (!res) return;
    return res.data;
  } catch (err) {
    console.log("查找用户头像地址出错：" + err);
  }
};
