// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const res = await db
      .collection("local_announcement")
      .aggregate()
      .lookup({
        from: "local_announcement_detail",
        localField: "_id",
        foreignField: "link_id",
        as: "detail",
      })
      .match({
        detail: {
          $ne: [],
        },
        is_deleted: false,
      })
      .limit(100)
      .end();

    return {
      success: 200,
      data: res.list,
    };
  } catch (err) {
    console.log("地方政府将要导出的信息出错：" + err);
  }
};
