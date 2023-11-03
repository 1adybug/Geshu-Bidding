// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { submitObj } = event;
  try {
    const updateRes = await db
      .collection("projects")
      .where({
        _id: submitObj._id,
      })
      .update({
        data: {
          projectName: submitObj.projectName,
          projectNo: submitObj.projectNo,
          winningTime: submitObj.winningTime,
          receptionTime: submitObj.receptionTime,
          acceptancementFileID: submitObj.acceptancementFileID,
          contractFileID: submitObj.contractFileID,
          contractAmount: submitObj.contractAmount,
          deadline: submitObj.deadline,
          makeOuts: submitObj.makeOuts,
          payments: submitObj.payments,
          shouldPayAmount: submitObj.shouldPayAmount,
          unpaidAmount: submitObj.unpaidAmount,
        },
      });
    if (!updateRes) return;
    return {
      success: true,
      code: 200,
      msg: "更新项目成功！",
    };
  } catch (err) {
    console.log("更新项目出错：" + err);
  }
};
