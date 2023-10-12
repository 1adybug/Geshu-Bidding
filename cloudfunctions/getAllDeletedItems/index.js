// 云函数入口文件
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database();

// 云函数入口函数
// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const intentionRes = await db
      .collection("purchase_intention_disclosure")
      .where({
        is_deleted: true,
      })
      .orderBy("time", "desc")
      .get();
    if (!intentionRes) return;
    const AnnouncementRes = await db
      .collection("purchase_solicitation_announcement")
      .where({
        is_deleted: true,
      })
      .orderBy("time", "desc")
      .get();
    if (!AnnouncementRes) return;
    return [...intentionRes.data, ...AnnouncementRes.data];
  } catch (err) {
    console.log("获取删除项出错：" + err);
  }
};
