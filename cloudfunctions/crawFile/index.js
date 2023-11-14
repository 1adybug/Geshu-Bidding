// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const axios = require("axios");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  const fileName = "testFIle";
  const fileExtension = ".docx";
  const fileUrl =
    "http://www.ccgp-jiangsu.gov.cn/fileApi/320800/e321056cbc1c43628e4f9b8cf83af85a.doc";
  try {
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    const fileData = response.data;
    const result = await cloud.uploadFile({
      cloudPath: `crawFile/${fileName + fileExtension}`,
      fileContent: fileData,
    });
    return {
      success: true,
      fileId: result.fileID,
    };
  } catch (err) {
    console.log("" + err);
  }
};
