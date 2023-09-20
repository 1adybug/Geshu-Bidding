// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { _id } = event;
  try {
    const res = await db
      .collection("purchase_intention_disclosure")
      .where({
        _id,
      })
      .update({
        data: {
          is_completely_deleted: true,
        },
      });
    return {
      success: true,
      data: res,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};
