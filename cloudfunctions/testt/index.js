// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const axios = require("axios");
// eslint-disable-next-line import/no-commonjs
const dayjs = require("dayjs");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  const publicURL = "http://czj.huaian.gov.cn/zbcg/";
  try {
    const res = await axios.get(publicURL + "/index3.html");
    const linkArr = extractListData(res.data).filter(
      (item) => item.time === dayjs().format("YYYY-MM-DD")
    );
    const resultList = [];
    for (const item of linkArr) {
      const resItem = await processArrayItem(item);
      resultList.push(resItem);
    }
    console.log(resultList);
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

const db = cloud.database();
const collection = db.collection("test");

async function processArrayItem(item) {
  try {
    const queryResult = await collection.where({ href: item.href }).get();
    const existingItems = queryResult.data;
    if (existingItems.length === 0) {
      await collection.add({
        data: item,
      });
      console.log(`Inserted value: ${item}`);
    } else {
      // console.log(`Item already exists: ${item}`);
      const res = await axios.get(item.href);
      const link_item = await collection.where({ href: item.href }).get();
      return {
        link_id: link_item.data[0]._id,
        attachments: extractAllFile(res.data),
      };
    }
  } catch (error) {
    console.error(`Failed to process value: ${item}`, error);
  }
}

function extractListData(html) {
  var pattern = /<ul\b[^>]*>([\s\S]*?)<\/ul>/g;
  var match;
  var ul_contents = [];

  while ((match = pattern.exec(html)) !== null) {
    var ul_content = match[1];
    ul_contents.push(ul_content);
  }

  if (ul_contents.length > 0) {
    return secondaryHandle(ul_contents);
  } else {
    return "No content found within any <ul> tags.";
  }
}

function secondaryHandle(html) {
  const regex =
    /<span class="lb-time">(.*?)<\/span>\s*<a href="(.*?)" target="_blank" title="(.*?)">/g;
  const results = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const spanContent = match[1];
    const href = match[2];
    const title = match[3];
    const obj = {
      time: spanContent,
      href: href,
      title: title,
      is_collected: false,
      is_deleted: false,
      is_completely_deleted: false,
      type: "purchase_solicitation",
    };
    results.push(obj);
  }
  return results;
}

function extractAllFile(html) {
  const regex =
    /<a\s+[^>]*href=['"](.*?)['"][^>]*>(.*?\.(?:html|pdf|docx?|xlsx?))<\/a>/g;

  const results = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    const href = match[1];
    const content = match[2];
    results.push({ href, content });
  }

  return results;
}
