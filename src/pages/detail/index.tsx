import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { useRouter } from "@tarojs/taro";
import { findSinglePurchaseIntentionDisclosureById } from "@/services/findSinglePurchaseIntentionDisclosureById";
import { fetchSinglePurchaseIntentionDisclosureDetail } from "@/services/fetchSinglePurchaseIntentionDisclosureDetail";
import extractTableData from "@/utils/extractPurchaseIntentionDisclosureData";
import { findSinglePurchaseSolicitationAnnouncement } from "@/services/findSinglePurchaseSolicitationAnnouncement";
import extractAnnouncementKeyInfo from "@/utils/extractAnnouncementKeyInfo";
import { fetchSingleDetail } from "@/services/fetchSingleDetail";
import { isValidPhone } from "wangyong-regex"
import "./index.module.less"

interface PurchaseIntentionDisclosureDetail {
    /**
     * 大标题
    */
    headline: string
    /**
     * 发布时间
    */
    releaseTime: string
    /**
     * 项目编号
    */
    projectNo: string
    /**
     * 项目名称
    */
    projectName: string
    /**
     * 采购需求概况
    */
    purchaseRequirementsSummary: string
    /**
     * 采购预算（万元）
    */
    purchaseBudget: string
    /**
     * 预计采购月份
    */
    expectedPurchaseMonth: string
    /**
     * 是否专门面向中小企业采购
    */
    whetherForSmallAndMediumEnterprise: string
    /**
     * 是否采购节能产品、环境标志产品
    */
    whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts: string
    /**
     * 备注
    */
    remark: string
}

interface PurchaseSolicitationAnnouncementDetail {
    headline: string
    releaseTime: string
    projectNo: string
    projectName: string
    purchasePerson: string
    purchaseAgentPhoneNo?: string
}

export default function Detail() {
    const router = useRouter()
    const { id, currentListItemId } = router.params
    const [purchaseIntentionDisclosureDetail, setPurchaseIntentionDisclosureDetail] = useState<PurchaseIntentionDisclosureDetail | null>(null)
    const [purchaseSolicitationAnnouncementDetail, setPurchaseSolicitationAnnouncementDetail] = useState<PurchaseSolicitationAnnouncementDetail | null>(null)

    useEffect(() => {
        getSinglePurchaseIntentionDisclosure()
    }, [])

    async function getSinglePurchaseIntentionDisclosure() {
        if (!id) return
        if (currentListItemId === "0") {
            const res = await findSinglePurchaseIntentionDisclosureById(id)
            if (!res.result) return
            const res2 = await fetchSinglePurchaseIntentionDisclosureDetail(res.result.data[0].href)
            if (!res2.result) return
            const res3 = extractTableData(res2.result)
            if (!res3) return
            setPurchaseIntentionDisclosureDetail({
                headline: res.result.data[0].title,
                releaseTime: res.result.data[0].time,
                projectNo: res3.no,
                projectName: res3.projectName,
                purchaseRequirementsSummary: res3.purchaseRequirementsSummary,
                purchaseBudget: res3.purchaseBudget,
                expectedPurchaseMonth: res3.expectedPurchaseMonth,
                whetherForSmallAndMediumEnterprise: res3.whetherForSmallAndMediumEnterprise,
                whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts: res3.whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts,
                remark: res3.remark
            })
            return
        }
        if (currentListItemId === "1") {
            const res = await findSinglePurchaseSolicitationAnnouncement(id)
            if (!res.result) return
            const res2 = await fetchSingleDetail(res.result.data[0].href)
            if (!res2.result) return
            const res3 = extractAnnouncementKeyInfo(JSON.stringify(res2.result))
            if (!res3) return
            console.log(res3);
            setPurchaseSolicitationAnnouncementDetail({
                headline: res.result.data[0].title,
                releaseTime: res.result.data[0].time,
                projectNo: res3.projectBasicInfo[1],
                projectName: res3.projectBasicInfo[4],
                purchasePerson: res3.purchasePersonInfo[1],
                purchaseAgentPhoneNo: res3.purchasePersonInfo.find(e => isValidPhone(e))
            })
        }
    }

    return (
        <View className='detail'>
            {currentListItemId === "0" ? <View>
                <View>{purchaseIntentionDisclosureDetail?.headline}</View>
                <View>{purchaseIntentionDisclosureDetail?.releaseTime}</View>
                <View>{purchaseIntentionDisclosureDetail?.projectNo}</View>
                <View>{purchaseIntentionDisclosureDetail?.projectName}</View>
                <View>{purchaseIntentionDisclosureDetail?.purchaseRequirementsSummary}</View>
                <View>{purchaseIntentionDisclosureDetail?.purchaseBudget}</View>
                <View>{purchaseIntentionDisclosureDetail?.expectedPurchaseMonth}</View>
                <View>{purchaseIntentionDisclosureDetail?.whetherForSmallAndMediumEnterprise}</View>
                <View>{purchaseIntentionDisclosureDetail?.whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts}</View>
                <View>{purchaseIntentionDisclosureDetail?.whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts}</View>
            </View> : <View>
                <View>{purchaseSolicitationAnnouncementDetail?.headline}</View>
                <View>{purchaseSolicitationAnnouncementDetail?.releaseTime}</View>
                <View>{purchaseSolicitationAnnouncementDetail?.projectNo}</View>
                <View>{purchaseSolicitationAnnouncementDetail?.projectName}</View>
                <View>{purchaseSolicitationAnnouncementDetail?.purchasePerson}</View>
                <View>{purchaseSolicitationAnnouncementDetail?.purchaseAgentPhoneNo}</View>
            </View>}
            {/* <DetailFirstSection projectName={obj?.projectName} address={obj?.address} releaseTime={obj?.releaseTime} isCollected={obj?.isCollected} />
            <DetailSecondSection projectSummarize={obj?.projectSummarize} purchaseBudget={obj?.purchaseBudget} estimatedPurchaseMonth={obj?.estimatedPurchaseMonth} isForSmallOrMediumEnterprise={obj?.isForSmallOrMediumEnterprise} toPurchaseEnergysavingOrEnvironmentalLabelingProducts={obj?.toPurchaseEnergysavingOrEnvironmentalLabelingProducts} remark={obj?.remark} /> */}
        </View>
    )
}