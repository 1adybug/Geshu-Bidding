// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { loginUsername, loginPassword } = event;

  try {
    const res = await db
      .collection("users")
      .where({
        username: loginUsername,
        password: loginPassword,
      })
      .get();

    if (!res) return;
    return res.data;
  } catch (err) {
    console.log("用户登录出错：" + err);
  }
};
