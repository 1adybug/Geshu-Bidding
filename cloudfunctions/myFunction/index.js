const axios = require("axios");
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

exports.main = async () => {
  try {
    const response = await axios.get(
      "http://czj.huaian.gov.cn/zbcg/index1.html"
    );
    const result = response.data;
    return result;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
