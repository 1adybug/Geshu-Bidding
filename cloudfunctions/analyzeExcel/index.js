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
exports.main = async (event) => {
  
  const { url } = event;

  try {
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

    const translationTable = {
      项目名称: "projectName",
      项目编号: "projectNumber",
      中标时间: "bidTime",
      验收时间: "acceptanceTime",
      应付金额: "payableAmount",
      未付金额: "unpaidAmount",
      到期时间: "dueTime",
      开票信息: "invoiceInfo",
      付款信息: "paymentInfo",
    };

    result.cellData = handle3(
      handle2(
        handle1(
          handle0(
            Object.entries(result.cellData).map(([key, value]) => {
              const translatedKey = translationTable[key] || key;
              return {
                [translatedKey]: value,
              };
            })
          )
        )
      )
    );
    fs.unlinkSync(tempFilePath);

    return result;
  } catch (err) {
    console.log("解析Excel出错：" + err);
  }
};

function handle0(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    const key = Object.keys(arr[i])[0];
    const value = arr[i][key];
    obj[key] = value;
  }

  return obj;
}

function handle1(obj1) {
  const filteredObj = {};
  for (const key in obj1) {
    if (!key.match(/[A-I]1/)) {
      filteredObj[key] = obj1[key];
    }
  }
  return filteredObj;
}

function handle2(obj2) {
  const groups = [];
  let group = {};
  let i = 0;
  for (const key in obj2) {
    group[key] = obj2[key];
    i++;
    if (i % 9 === 0) {
      groups.push(group);
      group = {};
    }
  }
  return groups;
}

function handle3(objArray) {
  const replacedArray = objArray.map((obj) => {
    const replacedObj = {};
    let index = 0;
    for (const key in obj) {
      const keys = [
        "项目名称",
        "项目编号",
        "中标时间",
        "验收时间",
        "应付金额",
        "未付金额",
        "到期时间",
        "开票信息",
        "付款信息",
      ];
      replacedObj[keys[index]] = obj[key];
      index++;
    }
    return replacedObj;
  });

  return replacedArray;
}
