// eslint-disable-next-line import/no-commonjs
const axios = require("axios");
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// eslint-disable-next-line import/no-commonjs
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
