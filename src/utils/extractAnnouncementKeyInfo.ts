function extractAnnouncementData(html) {
  const regex = /<[^>]+>([^<]+)<\/[^>]+>/g;
  const matches = html.match(regex);

  const result: string[] = [];

  if (matches) {
    let count = 0;
    for (const match of matches) {
      let content = match.replace(regex, "$1");
      const trimmedContent: string = content.trim();

      if (count >= 11 && count < matches.length - 5) {
        result.push(trimmedContent);
      }

      count++;
    }
  }
  return result;
}

interface Obj {
  projectBasicInfo: string[];
  purchasePersonInfo: string[];
}

export default function extractAnnouncementKeyInfo(data) {
  const obj: Obj = {
    projectBasicInfo: [],
    purchasePersonInfo: [],
  };

  extractAnnouncementData(data).forEach((e, index) => {
    if (e === "一、项目基本情况") {
      const arr = [
        extractAnnouncementData(data)[index + 1],
        extractAnnouncementData(data)[index + 2],
        extractAnnouncementData(data)[index + 3],
        extractAnnouncementData(data)[index + 4],
        extractAnnouncementData(data)[index + 5],
        extractAnnouncementData(data)[index + 6],
        extractAnnouncementData(data)[index + 7],
        extractAnnouncementData(data)[index + 8],
      ];
      obj.projectBasicInfo = arr.filter((item) => item !== "");
    }
    if (e === "1.采购人信息") {
      console.log("A");
      let arr: string[] = [
        extractAnnouncementData(data)[index + 1],
        extractAnnouncementData(data)[index + 2],
        extractAnnouncementData(data)[index + 3],
        extractAnnouncementData(data)[index + 4],
        extractAnnouncementData(data)[index + 5],
        extractAnnouncementData(data)[index + 6],
        extractAnnouncementData(data)[index + 7],
        extractAnnouncementData(data)[index + 8],
        extractAnnouncementData(data)[index + 9],
        extractAnnouncementData(data)[index + 10],
        extractAnnouncementData(data)[index + 11],
        extractAnnouncementData(data)[index + 12],
        extractAnnouncementData(data)[index + 13],
        extractAnnouncementData(data)[index + 14],
        extractAnnouncementData(data)[index + 15],
        extractAnnouncementData(data)[index + 16],
        extractAnnouncementData(data)[index + 17],
        extractAnnouncementData(data)[index + 18],
      ];
      arr = arr.filter((item) => item.length > 2);
      obj.purchasePersonInfo = arr;
    }
    if (e === "1、采购人信息") {
      console.log("A");
      let arr: string[] = [
        extractAnnouncementData(data)[index + 1],
        extractAnnouncementData(data)[index + 2],
        extractAnnouncementData(data)[index + 3],
        extractAnnouncementData(data)[index + 4],
        extractAnnouncementData(data)[index + 5],
        extractAnnouncementData(data)[index + 6],
        extractAnnouncementData(data)[index + 7],
        extractAnnouncementData(data)[index + 8],
        extractAnnouncementData(data)[index + 9],
        extractAnnouncementData(data)[index + 10],
        extractAnnouncementData(data)[index + 11],
        extractAnnouncementData(data)[index + 12],
        extractAnnouncementData(data)[index + 13],
        extractAnnouncementData(data)[index + 14],
        extractAnnouncementData(data)[index + 15],
        extractAnnouncementData(data)[index + 16],
        extractAnnouncementData(data)[index + 17],
        extractAnnouncementData(data)[index + 18],
      ];
      arr = arr.filter((item) => item.length > 2);
      obj.purchasePersonInfo = arr;
    }
    if (e === "1.招标人联系方式") {
      console.log("B");
      let arr: string[] = [
        extractAnnouncementData(data)[index + 1],
        extractAnnouncementData(data)[index + 2],
        extractAnnouncementData(data)[index + 3],
        extractAnnouncementData(data)[index + 4],
        extractAnnouncementData(data)[index + 5],
        extractAnnouncementData(data)[index + 6],
        extractAnnouncementData(data)[index + 7],
        extractAnnouncementData(data)[index + 8],
        extractAnnouncementData(data)[index + 9],
        extractAnnouncementData(data)[index + 10],
        extractAnnouncementData(data)[index + 11],
        extractAnnouncementData(data)[index + 12],
        extractAnnouncementData(data)[index + 13],
        extractAnnouncementData(data)[index + 14],
        extractAnnouncementData(data)[index + 15],
        extractAnnouncementData(data)[index + 16],
        extractAnnouncementData(data)[index + 17],
        extractAnnouncementData(data)[index + 18],
      ];
      arr = arr.filter((item) => item.length > 2);
      obj.purchasePersonInfo = arr;
    }
    if (e === "1.采购人联系方式") {
      console.log("C");
      let arr: string[] = [
        extractAnnouncementData(data)[index + 1],
        extractAnnouncementData(data)[index + 2],
        extractAnnouncementData(data)[index + 3],
        extractAnnouncementData(data)[index + 4],
        extractAnnouncementData(data)[index + 5],
        extractAnnouncementData(data)[index + 6],
        extractAnnouncementData(data)[index + 7],
        extractAnnouncementData(data)[index + 8],
        extractAnnouncementData(data)[index + 9],
        extractAnnouncementData(data)[index + 10],
        extractAnnouncementData(data)[index + 11],
        extractAnnouncementData(data)[index + 12],
        extractAnnouncementData(data)[index + 13],
        extractAnnouncementData(data)[index + 14],
        extractAnnouncementData(data)[index + 15],
        extractAnnouncementData(data)[index + 16],
        extractAnnouncementData(data)[index + 17],
        extractAnnouncementData(data)[index + 18],
      ];
      arr = arr.filter((item) => item.length > 2);
      obj.purchasePersonInfo = arr;
    }
    if (e === "1、采购人联系方式") {
      console.log("D");
      let arr: string[] = [
        extractAnnouncementData(data)[index + 1],
        extractAnnouncementData(data)[index + 2],
        extractAnnouncementData(data)[index + 3],
        extractAnnouncementData(data)[index + 4],
        extractAnnouncementData(data)[index + 5],
        extractAnnouncementData(data)[index + 6],
        extractAnnouncementData(data)[index + 7],
        extractAnnouncementData(data)[index + 8],
        extractAnnouncementData(data)[index + 9],
        extractAnnouncementData(data)[index + 10],
        extractAnnouncementData(data)[index + 11],
        extractAnnouncementData(data)[index + 12],
        extractAnnouncementData(data)[index + 13],
        extractAnnouncementData(data)[index + 14],
        extractAnnouncementData(data)[index + 15],
        extractAnnouncementData(data)[index + 16],
        extractAnnouncementData(data)[index + 17],
        extractAnnouncementData(data)[index + 18],
      ];
      arr = arr.filter((item) => item.length > 2);
      obj.purchasePersonInfo = arr;
    }
  });

  return obj;
}
