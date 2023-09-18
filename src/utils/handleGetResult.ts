import { CardProps } from "@/components/card";

export default function handleGetResult(
  data: PurchaseIntentionDisclosure[]
): CardProps[] {
  const result = data.map((e: PurchaseIntentionDisclosure) => {
    return {
      _id: e._id,
      title: e.title,
      time: e.time,
      isCollected: true,
    };
  });
  return result;
}
