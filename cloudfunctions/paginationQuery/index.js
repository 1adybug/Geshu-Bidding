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

  const { pageIndex, pageSize, listItemId } = event; // 当前页码

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
      .orderBy("releaseTime", "desc") // 根据某个字段进行排序，这里以 createTime 字段为例
      .skip((pageIndex - 1) * pageSize) // 计算需要跳过的记录数
      .limit(pageSize) // 限制返回的记录数
      .get();

    return result.data;
  } catch (error) {
    console.error("查询失败", error);
    return [];
  }
};
