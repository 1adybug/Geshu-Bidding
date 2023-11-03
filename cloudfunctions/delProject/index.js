// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { _id } = event;
  try {
    const delRes = await db
      .collection("projects")
      .where({
        _id,
      })
      .update({
        data: {
          is_deleted: true,
        },
      });
    if (!delRes) return;
    return {
      success: true,
      code: 200,
      msg: "删除成功！",
    };
  } catch (err) {
    console.log("删除项目出错：" + err);
  }
};
