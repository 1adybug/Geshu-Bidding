// eslint-disable-next-line import/no-commonjs
const dayjs = require("dayjs");
// eslint-disable-next-line import/no-commonjs
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { type, id } = event;
  try {
    const clickedTime = dayjs().utcOffset(8).format("YYYY-MM-DD HH:mm:ss");
    const addRes = await db.collection("demo").add({
      data: {
        type,
        projectId: id,
        clickedTime,
      },
    });
    if (!addRes) return;
    return {
      success: true,
      code: 200,
      msg: "点击记录成功！",
    };
  } catch (err) {
    console.log("点击记录出错：" + err);
  }
};
