// 云函数入口文件
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

// 云函数入口函数
// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  
  const { link_href } = event;

  const res = await db
    .collection("purchase_solicitation_announcement-attachments")
    .where({
      link_href,
    })
    .get();

  return res;
};
