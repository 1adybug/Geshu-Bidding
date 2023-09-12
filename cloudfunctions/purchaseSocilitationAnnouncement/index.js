// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  const { data } = await db
    .collection("purchase_solicitation_announcement")
    .where({})
    .get();
  return data;
};
