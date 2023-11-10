// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
const { wyDeepClone } = require("wangyong-utils");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  try {
    const localRes = await db
      .collection("localRecently")
      .orderBy("clickedTime", "desc")
      .limit(50)
      .get();
    if (!localRes) return;
    const localCopy = wyDeepClone(deduplicate(localRes.data));
    const localIdList = localCopy.map((item) => item.projectId);
    const localRes2 = await db
      .collection("local_announcement")
      .where({
        _id: db.command.in(localIdList),
      })
      .get();
    if (!localRes2) return;
    const localData = wyDeepClone(
      localRes2.data.map((item) => {
        return {
          ...item,
          clickedTime: localCopy.find(
            (subItem) => subItem.projectId === item._id
          ).clickedTime,
        };
      })
    );
    const intentionRes = await db
      .collection("intentionRecently")
      .orderBy("clickedTime", "desc")
      .limit(50)
      .get();
    if (!intentionRes) return;
    const intentionCopy = wyDeepClone(deduplicate(intentionRes.data));
    const intentionIdList = intentionCopy.map((item) => item.projectId);
    const intentionRes2 = await db
      .collection("purchase_intention_disclosure")
      .where({
        _id: db.command.in(intentionIdList),
      })
      .get();
    if (!intentionRes2) return;
    const intentionData = wyDeepClone(
      intentionRes2.data.map((item) => {
        return {
          ...item,
          clickedTime: intentionCopy.find(
            (subItem) => subItem.projectId === item._id
          ).clickedTime,
        };
      })
    );
    const solicitationRes = await db
      .collection("solicitationRecently")
      .orderBy("clickedTime", "desc")
      .limit(50)
      .get();
    if (!solicitationRes) return;
    const solicitationCopy = wyDeepClone(deduplicate(solicitationRes.data));
    const isolicitationIdList = solicitationCopy.map((item) => item.projectId);
    const solicitationRes2 = await db
      .collection("purchase_intention_disclosure")
      .where({
        _id: db.command.in(isolicitationIdList),
      })
      .get();
    if (!solicitationRes2) return;
    const solicitationData = wyDeepClone(
      solicitationRes2.data.map((item) => {
        return {
          ...item,
          clickedTime: solicitationCopy.find(
            (subItem) => subItem.projectId === item._id
          ).clickedTime,
        };
      })
    );
    return [...localData, ...intentionData, ...solicitationData];
  } catch (err) {
    console.log("获取浏览记录出错：" + err);
  }
};

function deduplicate(list) {
  const uniqueData = {};

  for (const item of list) {
    const projectId = item.projectId;
    const clickedTime = item.clickedTime;

    if (
      !uniqueData[projectId] ||
      clickedTime > uniqueData[projectId].clickedTime
    ) {
      uniqueData[projectId] = { ...item };
    }
  }

  const result = Object.values(uniqueData);

  return result;
}
