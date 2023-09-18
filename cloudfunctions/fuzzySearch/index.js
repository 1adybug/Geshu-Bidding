// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// 获取数据库引用
const db = cloud.database();

// 云函数的入口函数
// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { currentListItemId, keyword } = event;

  let collectionName = "purchase_intention_disclosure";

  if (currentListItemId === "1") {
    collectionName = "purchase_solicitation_announcement";
  }

  if (currentListItemId === "2") {
    collectionName = "correct_announcement";
  }

  if (currentListItemId === "3") {
    collectionName = "bid_rejection_or_termination_announcement";
  }

  if (currentListItemId === "4") {
    collectionName = "results_or_shortlisted_announcement";
  }

  if (currentListItemId === "5") {
    collectionName = "contract_announcement";
  }

  if (currentListItemId === "6") {
    collectionName = "other_announcement";
  }

  try {
    const result = await db
      .collection(collectionName)
      .where({
        title: db.RegExp({
          regexp: ".*" + keyword,
          options: "i",
        }),
      })
      .get();

    return result.data;
  } catch (error) {
    console.error("查询失败", error);
    return [];
  }
};
