import dayjs from "dayjs";
import { wyDeepClone } from "wangyong-utils";

export default function recentlySort(data: RecentlyClickCard[]) {
  const dataCopy = wyDeepClone(data);
  return dataCopy.sort(
    (a: RecentlyClickCard, b: RecentlyClickCard) =>
      Number(dayjs(b.clickedTime).format("YYYYMMDDHHmmss")) -
      Number(dayjs(a.clickedTime).format("YYYYMMDDHHmmss"))
  );
}
