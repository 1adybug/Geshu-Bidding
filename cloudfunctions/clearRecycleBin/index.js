// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境
const db = cloud.database();

const successResponse = {
  success: true,
  code: 200,
  msg: "清空成功！",
};

const failResponse = {
  success: false,
  code: 400,
  msg: "清空成功！",
};

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const purchaseIntentionDisclosureClearRes = await db
      .collection("purchase_intention_disclosure")
      .where({
        is_deleted: true,
        is_completely_deleted: false,
      })
      .update({
        data: {
          is_completely_deleted: true,
        },
      });
    if (!purchaseIntentionDisclosureClearRes) return failResponse;
    const purchaseSolicitationAnnouncementClearRes = await db
      .collection("purchase_solicitation_announcement")
      .where({ is_deleted: true, is_completely_deleted: false })
      .update({
        data: {
          is_completely_deleted: true,
        },
      });
    if (!purchaseSolicitationAnnouncementClearRes) return failResponse;
    return successResponse;
  } catch (err) {
    console.log("清空回收站失败：" + err);
  }
};
