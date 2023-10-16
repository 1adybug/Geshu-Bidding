// 云函数入口文件
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { link_href } = event;
  console.log(1,link_href);
  try {
    const res = await db
      .collection("local_announcement_attachments")
      .where({
        link_href,
      })
      .get();
    if (!res) return;
    return res.data;
  } catch (err) {
    console.log("获取地方公告详情附件出错：" + err);
  }
};
