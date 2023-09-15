/**
 * 采购（意向）公开表字段 
*/
declare interface PurchaseIntentionDisclosure {
  _id: string;
  title: string;
  href: string;
  time: string;
}

/**
 * 采购（意向）公开表详情字段
*/
declare interface PurchaseIntentionDisclosureDetail {
  no: string;
  projectName: string;
  purchaseRequirementsSummary: string;
  purchaseBudget: string;
  expectedPurchaseMonth: string;
  whetherForSmallAndMediumEnterprise: string;
  whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts: string;
  remark: string;
}
