// 云函数入口文件
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { fileIDTail } = event;
  try {
    const publicFileIDPrev = "cloud://geshu-bidding-5gnhpdzpb49a69a4.6765-geshu-bidding-5gnhpdzpb49a69a4-1309350967/purchaseAnnouncementAttachments/"
    const res = await cloud.getTempFileURL({
      fileList: [publicFileIDPrev + fileIDTail],
    });
    if (!res) return;
    return res;
  } catch (error) {
    console.error("Download and upload file failed", error);
    throw new Error("Download and upload file failed");
  }
};
