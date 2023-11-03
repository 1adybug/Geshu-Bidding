// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  
  const { submitObj } = event;

  try {
    const addRes = await db.collection("projects").add({
      data: submitObj,
    });
    if (!addRes) return;
    return {
      success: true,
      code: 200,
      msg: "项目创建成功！",
    };
  } catch (err) {
    console.log("增加项目出错" + err);
  }
};
