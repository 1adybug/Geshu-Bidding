// 云函数入口文件
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database();
// 云函数入口函数
// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { _id, collectValue } = event;
  try {
    const res = await db
      .collection("local_announcement")
      .where({
        _id,
      })
      .update({
        data: {
          is_collected: collectValue,
        },
      });
    if (!res) return;
    return {
      msg: "收藏成功！",
    };
  } catch (err) {
    console.log("收藏单个地方公告出错：" + err);
  }
};
