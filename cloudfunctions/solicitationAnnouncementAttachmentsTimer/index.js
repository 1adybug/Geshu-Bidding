// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const axios = require("axios");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});

const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const res = await db.collection("test").get();
    for (const item of res.data) {
      await processArrItem(item);
    }
  } catch (err) {
    console.log("err", err);
    return { error: err.message };
  }
};

async function processArrItem(item) {
  try {
    const findIt = await db
      .collection("purchase_solicitation_announcement-attachments")
      .where({ link_href: item.href })
      .get();
    if (findIt.data.length === 0) {
      const res = await axios.get(item.href);
      await db
        .collection("purchase_solicitation_announcement-attachments")
        .add({
          data: {
            title: item.title,
            link_href: item.href,
            attachments: extractAllFile(res.data),
          },
        });
      return;
    }
  } catch (err) {
    console.log("err", err);
  }
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
