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
const db = cloud.database();

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
      cellData: handleResult(handle3(handle2(handle1(cellData)))),
    };
    fs.unlinkSync(tempFilePath);
    const addRes = await db.collection("projects").add({
      data: result.cellData,
    });
    if (!addRes) return;
    return {
      code: 200,
      msg: "添加成功！",
      success: true,
    };
  } catch (err) {
    console.log("解析Excel出错：" + err);
    return {
      code: 500,
      msg: "添加成功！",
      success: true,
    };
  }
};

function handle1(obj1) {
  const filteredObj = {};
  for (const key in obj1) {
    if (!key.match(/[A-J]1/)) {
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
    if (i % 10 === 0) {
      groups.push(group);
      group = {};
    }
  }
  return groups;
}

function handleResult(arr) {
  return arr.map((e) => {
    return {
      ...e,
      makeOuts: e.makeOuts ? handleArray(e.makeOuts) : [],
      payments: e.payments ? handleArray(e.payments) : [],
      acceptancementFileID: "",
      contractFileID: "",
      creator: "",
      is_deleted: false,
    };
  });
}

function handle3(objArray) {
  const replacedArray = objArray.map((obj) => {
    const replacedObj = {};
    let index = 0;
    for (const key in obj) {
      const keys = [
        "projectName",
        "projectNo",
        "winningTime",
        "receptionTime",
        "contractAmount",
        "shouldPayAmount",
        "unpaidAmount",
        "deadline",
        "makeOuts",
        "payments",
      ];
      replacedObj[keys[index]] = obj[key];
      index++;
    }
    return replacedObj;
  });

  return replacedArray;
}

function handleArray(inputString) {
  // 使用正则表达式提取每个括号内的内容
  const regex = /\[([^[\]]+)\]/g;
  const matches = [...inputString.matchAll(regex)];

  // 构建二维数组
  const result = matches.map((match) => {
    const innerArrayString = match[1];
    const innerArray = innerArrayString.split(",").map((item) => item.trim());
    return innerArray;
  });

  return result.map((e) => {
    return {
      amount: e[0],
      time: e[1],
    };
  });
}
