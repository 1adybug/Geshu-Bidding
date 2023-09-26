/**
 * 卡片数据类型
 */
type CardType = "purchase_intention" | "purchase_solicitation";

/**
 * 采购（意向）公开 || 采购（征集）公告
 */
declare interface PurchaseIntentionDisclosure {
  _id: string;
  title: string;
  href: string;
  time: string;
  is_deleted: boolean;
  type: CardType;
  is_completely_deleted: boolean;
  is_collected: boolean;
}

/**
 * 采购（意向）公开详情表字段
 */
declare interface PurchaseIntentionDisclosureDetail {
  _id: string;
  link_id: string;
  no: string;
  projectName: string;
  purchaseRequirementsSummary: string;
  purchaseBudget: string;
  expectedPurchaseMonth: string;
  whetherForSmallAndMediumEnterprise: string;
  whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts: string;
  remark: string;
}

/**
 * 单个采购（征集）公告详情
 */
declare interface PurchaseSolicitationAnnouncementDetail {
  _id: string;
  link_id: string;
  title: string;
  project_name: string;
  project_no: string;
  budget: string;
  principal_unit: string;
  project_principal: string;
  principal_contact: string;
}
