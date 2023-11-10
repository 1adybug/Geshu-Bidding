// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { listItemId, pageIndex } = event;

  let collectionName = "purchase_intention_disclosure";

  if (listItemId === "1") {
    collectionName = "purchase_solicitation_announcement";
  }

  if (listItemId === "2") {
    collectionName = "local_announcement";
  }

  try {
    const result = await db
      .collection(collectionName)
      .where({
        time: db.command.neq("2023-11-10"),
      })
      .orderBy("time", "desc")
      .skip((pageIndex - 1) * 10)
      .limit(10)
      .get();

    return result.data;
  } catch (error) {
    console.error("分页查询出错：", error);
    return [];
  }
};
