// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const axios = require("axios");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    // const instance = axios.create({
    //   baseURL:
    //     "https://search.ccgp.gov.cn/bxsearch?searchtype=2&page_index=1&bidSort=0&buyerName=&projectId=&pinMu=0&bidType=1&dbselect=bidx&kw=%E6%B7%AE%E5%AE%89&start_time=2023%3A11%3A09&end_time=2023%3A11%3A12&timeType=1&displayZone=&zoneId=&pppStatus=0&agentName=",
    //   headers: {
    //     "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    //     "Accept-Encoding": "gzip, deflate",
    //     "Accept-Languag": "zh-CN,zh;q=0.9",
    //     "Cache-Control": "max-age=0",
    //     "Connection": "keep-alive",
    //     "Host": "www.ccgp.gov.cn",
    //     "Referer": "http://search.ccgp.gov.cn/",
    //     "Upgrade-Insecure-Requests": "1",
    //     "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    //   },
    // });
    const res = await axios.get("https://search.ccgp.gov.cn/bxsearch?searchtype=2&page_index=1&bidSort=0&buyerName=&projectId=&pinMu=0&bidType=1&dbselect=bidx&kw=%E6%B7%AE%E5%AE%89&start_time=2023%3A11%3A09&end_time=2023%3A11%3A12&timeType=1&displayZone=&zoneId=&pppStatus=0&agentName=",{
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate",
        "Accept-Languag": "zh-CN,zh;q=0.9",
        "Cache-Control": "max-age=0",
        "Connection": "keep-alive",
        "Host": "www.ccgp.gov.cn",
        "Referer": "http://search.ccgp.gov.cn/",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
      }
    });
    if (!res) return;
    return res.data;
  } catch (err) {
    console.log("爬取地方公告（公开招标）出错：" + err);
  }
};
