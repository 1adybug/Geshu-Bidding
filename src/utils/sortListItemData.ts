import { wyDeepClone } from "wangyong-utils";
import handleGetResult from "@/utils/handleGetResult";
import dayjs from "dayjs";

export default function sortListItemData(data) {
  const dataCopy = wyDeepClone(data);
  return handleGetResult(dataCopy).sort(
    (a, b) => dayjs(b.time).unix() - dayjs(a.time).unix()
  );
}
