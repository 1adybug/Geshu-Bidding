import { CardProps } from "@/components/card";
import { createPersistentStore } from "easy-zustand";

interface LocalState {
  purchaseIntentionList: CardProps[];
  purchaseSolicitationList: CardProps[];
}

const useHomePageList = createPersistentStore<LocalState>(
  {
    purchaseIntentionList: [],
    purchaseSolicitationList: [],
  },
  "homePageDataList"
);

export default useHomePageList;
