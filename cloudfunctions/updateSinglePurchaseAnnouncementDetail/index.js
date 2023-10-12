// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { link_id, remark } = event;

  console.log(link_id, remark);

  try {
    const updateRes = await db
      .collection("purchase_solicitation_announcement_detail")
      .where({
        link_id,
      })
      .update({
        data:{
          remark,
        }
      });
    if (!updateRes) return;
    return {
      sucess: true,
      msg: "更新成功！",
    };
  } catch (err) {
    console.log("更新出错：" + err);
  }
};
