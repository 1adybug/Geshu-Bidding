// eslint-disable-next-line import/no-commonjs
const axios = require("axios");
// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

// eslint-disable-next-line import/no-commonjs
exports.main = async (event) => {
  const { hrefList } = event;
  const promises = hrefList.map(async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return null;
    }
  });

  try {
    const results = await Promise.all(promises);
    return results.filter((result) => result !== null);
  } catch (error) {
    return [];
  }
};
