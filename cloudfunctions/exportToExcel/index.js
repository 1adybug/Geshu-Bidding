// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
// const fs = require("fs");
// eslint-disable-next-line import/no-commonjs
// const path = require("path");
// eslint-disable-next-line import/no-commonjs
const xlsx = require('node-xlsx');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const jsonData = [
      ["Name", "Age", "Country"],
      ["", 25, "USA"],
      ["Jane Smith", 30, "Canada"],
      ["Bob Johnson", 35, "Australia"],
    ];
    // 将 JSON 数据转换为 Excel 文件
    const buffer = xlsx.build([{ name: "Sheet 1", data: jsonData }]);
    const res = await cloud.uploadFile({
      cloudPath: 'folder/test.xlsx',
      fileContent: Buffer.from(buffer),
    });
    if(!res) return
    return res.fileID;
  } catch (err) {
    console.error("导出 Excel 出错:", err);
    throw err;
  }
};
