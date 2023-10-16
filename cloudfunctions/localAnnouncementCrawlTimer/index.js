// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const axios = require("axios");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }); // 使用当前云环境

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const res = await axios.get(
      "http://search.ccgp.gov.cn/bxsearch?searchtype=2&page_index=1&bidSort=0&buyerName=&projectId=&pinMu=0&bidType=0&dbselect=bidx&kw=%E6%B7%AE%E5%AE%89&start_time=2023%3A10%3A13&end_time=2023%3A10%3A13&timeType=0&displayZone=&zoneId=&pppStatus=0&agentName="
    );
    if (!res) return;
    return extractDataFromHTML(res.data);
  } catch (err) {
    console.log("爬取地方公告出错：" + err);
  }
};

function extractDataFromHTML(html) {
  const regex = /<ul class="vT-srch-result-list-bid">([\s\S]*?)<\/ul>/g;
  const ulMatch = regex.exec(html);
  if (!ulMatch) {
    return [];
  }

  const liRegex = /<li>([\s\S]*?)<\/li>/g;
  const liMatches = ulMatch[1].matchAll(liRegex);

  const data = [];
  for (const liMatch of liMatches) {
    const liContent = liMatch[1];

    const hrefRegex = /<a[^>]*href="([^"]*)"/;
    const hrefMatch = hrefRegex.exec(liContent);
    const href = hrefMatch ? hrefMatch[1] : "";

    const titleRegex = /<a[^>]*>([\s\S]*?)<\/a>/;
    const titleMatch = titleRegex.exec(liContent);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "") : "";

    const mergedTitle = title
      .replace(/\n/g, " ")
      .replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\s/g, "");

    const releaseTimeRegex = /<span>([\s\S]*?)<\/span>/;
    const releaseTimeMatch = releaseTimeRegex.exec(liContent);
    const releaseTime = releaseTimeMatch
      ? releaseTimeMatch[1].split("\n")[0]
      : "";

    data.push({
      href: href,
      title: mergedTitle,
      releaseTime: releaseTime,
    });
  }

  return data;
}
