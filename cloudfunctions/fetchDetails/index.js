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
  try {
    const resHTML = await axios.get(hrefList[0]);
    return resHTML.data;
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
