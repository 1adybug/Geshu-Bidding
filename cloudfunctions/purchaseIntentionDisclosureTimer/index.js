// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const axios = require("axios");
// eslint-disable-next-line import/no-commonjs
// const dayjs = require("dayjs");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const res = await db
      .collection("purchase_intention_disclosure")
      .where({
        time: "2023-11-09",
      })
      .get();
    for (const item of res.data) {
      await handleArrItem(item);
    }
  } catch (error) {
    console.log("采购（意向）公开定时器更新出错：" + error);
  }
};

async function handleArrItem(item) {
  try {
    console.log(item.time);
    const findIt = await db
      .collection("new_purchase_intention_disclosure_detail")
      .where({ time: item.time })
      .get();
    if (!findIt.data.find((e) => e.link_href === item.href)) {
      const res = await axios.get(item.href);
      await db.collection("new_purchase_intention_disclosure_detail").add({
        data: {
          link_id: item._id,
          link_href: item.href,
          time: item.time,
          ...extractDataFromHTML(res.data),
        },
      });
      return;
    }
  } catch (err) {
    console.log("err", err);
  }
}

function extractDataFromHTML(html) {
  const titleRegex = /<meta\s+name="ArticleTitle"\s+content="([^"]+)"/;
  const projectRegex = /<td[^>]*>(.*?)<\/td>/g;

  // 提取标题
  const titleMatch = html.match(titleRegex);
  const title = titleMatch ? titleMatch[1] : "";

  // 提取项目数据
  const projects = [];
  let match;
  let index = 0;

  while ((match = projectRegex.exec(html)) !== null) {
    const data = match[1].trim();

    if (index % 8 === 1) {
      // 创建新的项目对象
      projects.push({
        projectName: data,
      });
    } else if (index % 8 === 2) {
      // 设置项目概况
      projects[Math.floor(index / 8)].projectSummary = data;
    } else if (index % 8 === 3) {
      // 设置采购预算
      projects[Math.floor(index / 8)].budget = data;
    } else if (index % 8 === 4) {
      // 设置预计采购月份
      projects[Math.floor(index / 8)].purchaseMonth = data;
    } else if (index % 8 === 5) {
      // 设置是否专门面向中小企业采购
      projects[Math.floor(index / 8)].sfzmmxzxqycg = data;
    } else if (index % 8 === 6) {
      // 设置是否采购节能产品、环境标志产品
      projects[Math.floor(index / 8)].sfcgjncphjbzcp = data;
    } else if (index % 8 === 7) {
      // 设置备注
      projects[Math.floor(index / 8)].remark = data ? data : "无";
    }

    index++;
  }

  // 组装数据
  const result = {
    title: title,
    projects: projects,
  };

  return result;
}
