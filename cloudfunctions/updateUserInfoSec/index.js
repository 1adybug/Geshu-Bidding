// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const dayjs = require("dayjs");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { userId, userName, password, roleId } = event;

  try {
    if (userName && !password && !roleId) {
      const res = await db
        .collection("users")
        .where({
          _id: userId,
        })
        .update({
          data: {
            username: userName,
            updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          },
        });
      if (!res) return;
      return {
        code: 200,
        success: true,
        msg: "更新用户名成功",
      };
    }
    if (!userName && password && !roleId) {
      const res = await db
        .collection("users")
        .where({
          _id: userId,
        })
        .update({
          data: {
            password,
            updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          },
        });
      if (!res) return;
      return {
        code: 200,
        success: true,
        msg: "更新密码成功",
      };
    }
    if (!userName && !password && roleId) {
      const res = await db
        .collection("users")
        .where({
          _id: userId,
        })
        .update({
          data: {
            roleId,
            updateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
          },
        });
      if (!res) return;
      return {
        code: 200,
        success: true,
        msg: "更新角色成功",
      };
    }
  } catch (err) {
    console.log("更新用户信息出错：" + err);
  }
};
