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
  const { listItemId, keyword } = event.keyword; // 获取查询关键字

  let collectionName = "purchase_intention_disclosure";

  if (listItemId === "1") {
    collectionName = "purchase_solicitation_announcement";
    return;
  }

  if (listItemId === "2") {
    collectionName = "correct_announcement";
    return;
  }

  if (listItemId === "3") {
    collectionName = "bid_rejection_or_termination_announcement";
    return;
  }

  if (listItemId === "5") {
    collectionName = "results_or_shortlisted_announcement";
    return;
  }

  if (listItemId === "5") {
    collectionName = "contract_announcement";
    return;
  }

  if (listItemId === "6") {
    collectionName = "other_announcement";
    return;
  }

  try {
    const result = await db
      .collection(collectionName)
      .where({
        name: db.RegExp({
          regexp: keyword, // 使用关键字构建正则表达式
          options: "i", // 选项 'i' 表示大小写不敏感
        }),
      })
      .get();

    return result.data;
  } catch (error) {
    console.error("查询失败", error);
    return [];
  }
};
