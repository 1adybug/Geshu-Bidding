// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const dayjs = require("dayjs");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {

  const { userId, userName, roleName, password } = event;

  try {
    const roleIdRes = await db
      .collection("roles")
      .where({
        roleName,
      })
      .get();
    if (!roleIdRes) return;
    const roleId = roleIdRes.data[0].roleId;
    const updateRes = await db
      .collection("users")
      .where({
        _id:userId,
      })
      .update({
        data: {
          username: userName,
          password,
          roleId,
          updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        },
      });
    if (!updateRes) return;
    return {
      sucess: true,
      statusCode: 200,
      msg: "更新成功",
    };
  } catch (err) {
    console.log("更新用户信息出错：" + err);
  }
};
