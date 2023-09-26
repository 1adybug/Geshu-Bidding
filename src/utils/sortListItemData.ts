import { wyDeepClone } from "wangyong-utils";
import handleGetResult from "@/utils/handleGetResult";
import dayjs from "dayjs";

export type SortType = "asc" | "desc";

export default function sortListItemData(data:any, SortType: SortType) {
  const dataCopy = wyDeepClone(data);
  if (SortType === "asc") {
    return handleGetResult(dataCopy).sort(
      (a, b) => dayjs(a.time).unix() - dayjs(b.time).unix()
    );
  }
  return handleGetResult(dataCopy).sort(
    (a, b) => dayjs(b.time).unix() - dayjs(a.time).unix()
  );
}
