// eslint-disable-next-line import/no-commonjs
const axios = require("axios");
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { listItemId } = event;
  try {
    const publicURL = "http://czj.huaian.gov.cn/zbcg/";
    if (listItemId === "0") {
      const response = await axios.get(publicURL + "/index1.html");
      return response.data;
    }
    if (listItemId === "1") {
      const response = await axios.get(publicURL + "/index3.html");
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
