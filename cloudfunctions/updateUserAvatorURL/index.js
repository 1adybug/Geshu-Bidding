// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { userId, avatorUrl } = event;
  try {
    const res = await db
      .collection("users")
      .where({
        _id: userId,
      })
      .update({
        data: {
          avatorUrl,
        },
      });
    if (!res) return;
    return {
      code: 200,
      success: true,
      msg: "更新头像成功！",
    };
  } catch (err) {
    console.log("更新头像出错：" + err);
  }
};
