// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

// eslint-disable-next-line import/no-commonjs
// const dayjs = require("dayjs");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  const { data } = await db
    .collection("purchase_intention_disclosure")
    .orderBy("time", "desc") // 按 time 字段降序排序
    .limit(50)
    .get();
  return data;
};
