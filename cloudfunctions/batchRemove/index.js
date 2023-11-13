// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { currentListItemId, deletes } = event;
  try {
    if (currentListItemId === "0") {
      for (const id of deletes) {
        await db
          .collection("purchase_intention_disclosure")
          .where({
            _id: id,
          })
          .update({
            data: {
              is_deleted: true,
            },
          });
      }
      return {
        succeed: true,
        code: 200,
        msg: "删除成功！",
      };
    }
    if (currentListItemId === "1") {
      for (const id of deletes) {
        await db
          .collection("purchase_solicitation_announcement")
          .where({
            _id: id,
          })
          .update({
            data: {
              is_deleted: true,
            },
          });
      }
      return {
        succeed: true,
        code: 200,
        msg: "删除成功！",
      };
    }
    if (currentListItemId === "2") {
      for (const id of deletes) {
        await db
          .collection("local_announcement")
          .where({
            _id: id,
          })
          .update({
            data: {
              is_deleted: true,
            },
          });
      }
      return {
        succeed: true,
        code: 200,
        msg: "删除成功！",
      };
    }
  } catch (err) {
    console.log("批量删除出错：" + err);
  }
};
