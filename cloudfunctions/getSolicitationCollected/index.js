// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const res = await db
      .collection("purchase_solicitation_announcement")
      .where({
        is_collected: true,
        is_deleted: false,
      })
      .get();
    if (!res) return;
    return res.data;
  } catch (err) {
    console.log("获取采购（征集）公告出错：" + err);
  }
};
