// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const res = await db
      .collection("purchase_intention_disclosure")
      .where({
        is_collected: true,
        is_deleted: false,
      })
      .get();
    if (!res) return;
    return res.data;
  } catch (err) {
    console.log("获取采购（意向）公开出错：" + err);
  }
};
