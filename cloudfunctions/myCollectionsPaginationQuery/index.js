// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { pageIndex } = event;

  try {
    const intentionRes = await db
      .collection("purchase_intention_disclosure")
      .where({
        is_collected: true,
        is_deleted: false,
      })
      .orderBy("time", "desc")
      .skip((pageIndex - 1) * 5)
      .limit(5)
      .get();

    const solicitationRes = await db
      .collection("purchase_solicitation_announcement")
      .where({
        is_collected: true,
        is_deleted: false,
      })
      .orderBy("time", "desc")
      .skip((pageIndex - 1) * 5)
      .limit(5)
      .get();

    const localRes = await db
      .collection("local_announcement")
      .where({
        is_collected: true,
        is_deleted: false,
      })
      .orderBy("time", "desc")
      .skip((pageIndex - 1) * 5)
      .limit(5)
      .get();

    return [...intentionRes.data, ...solicitationRes.data, ...localRes.data];
  } catch (error) {
    console.error("分页查询出错：", error);
    return [];
  }
};
