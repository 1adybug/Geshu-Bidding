import { CardProps } from "@/components/card";

export default function handleGetResult(
  data: PurchaseIntentionDisclosure[]
): CardProps[] {
  const result = data.map((e: PurchaseIntentionDisclosure) => {
    return {
      id: e._id,
      projectName: e.title,
      projectSummarize: "",
      releaseTime: e.time,
      isCollected: true,
    };
  });
  return result;
}
