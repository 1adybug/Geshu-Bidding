// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {

  const { userId } = event;

  try {
    const deleteRes = await db
      .collection("users")
      .where({
        _id: userId,
      })
      .update({
        data: {
          is_deleted: true,
        },
      });
    if (!deleteRes) return;
    return {
      success: true,
      statusCode: 200,
      msg: "删除成功！",
    };
  } catch (err) {
    console.log("删除用户信息出错：" + err);
  }
};
