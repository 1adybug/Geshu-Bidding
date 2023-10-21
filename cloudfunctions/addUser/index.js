// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const dayjs = require("dayjs");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { addUsername, addRoleId, addAvatorUrl } = event;

  try {
    const checkRes = await db
      .collection("users")
      .where({
        username: addUsername,
      })
      .get();
    if (!checkRes) return;
    if (checkRes.data.length) return "该用户名已被使用！";
    const res = await db.collection("users").add({
      data: {
        username: addUsername,
        password: 123456,
        avatorUrl: addAvatorUrl,
        roleId: addRoleId,
        id_deleted: false,
        createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updateTIme: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
    });
    if (!res) return;
    return res.data;
  } catch (err) {
    console.log("添加用户出错：" + err);
  }
};
