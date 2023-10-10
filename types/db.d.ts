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
  link_href: string;
  title: string;
  time: string;
  projects: PurchaseIntentionDisclosureProject[];
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
  submission_time: string;
  principal_unit: string;
  project_principal: string;
  principal_contact: string;
}

declare interface PurchaseIntentionDisclosureProject {
  projectName: string;
  projectSummary: string;
  budget: string;
  purchaseMonth: string;
  /**
   * 是否专门面向中小企业采购
   * */
  sfzmmxzxqycg: string;
  /**
   * 是否采购节能产品、环境标志产品
   */
  sfcgjncphjbzcp: string;
  remark: string;
}
