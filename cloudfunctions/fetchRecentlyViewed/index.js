// eslint-disable-next-line import/no-commonjs
const cloud = require("wx-server-sdk");
// eslint-disable-next-line import/no-commonjs
// const { wyDeepClone } = require("wangyong-utils");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });
const db = cloud.database();

// eslint-disable-next-line import/no-commonjs
exports.main = async () => {
  const recentlyIdRes = await db.collection("demo").get();
  if (!recentlyIdRes) return;
  // const recentlyIdResData = wyDeepClone(recentlyIdRes.data);
  // const intentions = recentlyIdResData.filter(
  //   (e) => e.type === "purchase_intention"
  // );
  // const solicitations = recentlyIdResData.filter(
  //   (e) => e.type === "purchase_solicitation"
  // );
  // const locals = recentlyIdResData.filter(
  //   (e) => e.type === "local_announcement"
  // );
  // const result = [...intentions, ...solicitations, ...locals];
  const intentionLookUpRes = await db
    .collection("purchase_intention_disclosure")
    .aggregate()
    .lookup({
      from: "demo",
      localField: "_id",
      foreignField: "projectId",
      as: "detail",
    })
    .match({
      detail: {
        $ne: [],
      },
      is_deleted: false,
    })
    .limit(100)
    .end();
  const solicitationsLookUpRes = await db
    .collection("purchase_intention_disclosure")
    .aggregate()
    .lookup({
      from: "demo",
      localField: "_id",
      foreignField: "projectId",
      as: "detail",
    })
    .match({
      detail: {
        $ne: [],
      },
      is_deleted: false,
    })
    .limit(100)
    .end();
  const localLookUpRes = await db
    .collection("purchase_intention_disclosure")
    .aggregate()
    .lookup({
      from: "demo",
      localField: "_id",
      foreignField: "projectId",
      as: "detail",
    })
    .match({
      detail: {
        $ne: [],
      },
      is_deleted: false,
    })
    .limit(100)
    .end();
  return [
    ...intentionLookUpRes.list,
    ...solicitationsLookUpRes.list,
    ...localLookUpRes.list,
  ];
};
