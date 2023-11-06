// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

// eslint-disable-next-line import/no-commonjs
const XLSX = require("xlsx");

// eslint-disable-next-line import/no-commonjs
const axios = require("axios");

// eslint-disable-next-line import/no-commonjs
const fs = require("fs");

// eslint-disable-next-line import/no-commonjs
const path = require("path");

// eslint-disable-next-line import/no-commonjs
const os = require("os");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const url =
      "https://6765-geshu-bidding-5gnhpdzpb49a69a4-1309350967.tcb.qcloud.la/projectList/%E6%97%A0%E6%A0%87%E9%A2%98%E7%94%B5%E5%AD%90%E8%A1%A8%E6%A0%BC.xlsx?sign=f3195f5f1b64a63dffa141ddc274b8f8&t=1699235834";
    const response = await axios.get(url, { responseType: "arraybuffer" });
    if (!response) return;
    const data = new Uint8Array(response.data);
    const tempFilePath = path.join(os.tmpdir(), "temp.xlsx");
    fs.writeFileSync(tempFilePath, data);
    const workbook = XLSX.readFile(tempFilePath);
    const sheetNames = workbook.Props.SheetNames;
    const sheetData = workbook.Sheets["工作表1"];
    const cellData = {};
    for (const cell in sheetData) {
      if (cell !== "!ref") {
        cellData[cell] = sheetData[cell].v;
      }
    }
    const result = {
      sheetNames: sheetNames,
      cellData: cellData,
    };
    fs.unlinkSync(tempFilePath);
    return result;
  } catch (err) {
    console.log("解析Excel出错：" + err);
  }
};
