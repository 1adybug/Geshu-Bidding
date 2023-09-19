import { View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "@tarojs/taro";
import { findSinglePurchaseIntentionDisclosure } from "@/services/findSinglePurchaseIntentionDisclosureDetail";
import extractTableData from "@/utils/extractPurchaseIntentionDisclosureData";
import { findSinglePurchaseSolicitationAnnouncement } from "@/services/findSinglePurchaseSolicitationAnnouncement";
import extractAnnouncementKeyInfo from "@/utils/extractAnnouncementKeyInfo";
import DetailFirstSection from "@/components/detailFirstSection";
import DetailSecondSection from "@/components/detailSecondSection";
import PurchaseSolicitationAnnouncementDetailCard from "@/components/puchaseSolicitationAnnouncement";
import { findSinglePurchaseIntentionDisclosureDetailByLinkId } from "@/services/findSinglePurchaseIntentionDisclosureDetailByLinkId";
import { findSinglePurchaseSolicitationAnnouncementDetail } from "@/services/findSinglePurchaseSolicitationAnnouncementDetail";
import "./index.module.less"

interface ThisPurchaseIntentionDisclosureDetail extends PurchaseIntentionDisclosureDetail {
    releaseTime: string
    isCollected: boolean
}

export default function Detail() {
    const router = useRouter()
    const { id, currentListItemId } = router.params
    const [thisPurchaseIntentionDisclosureDetail, setThisPurchaseIntentionDisclosureDetail] = useState<ThisPurchaseIntentionDisclosureDetail | null>(null)

    useEffect(() => {
        getSinglePurchaseIntentionDisclosure()
    }, [])

    async function getSinglePurchaseIntentionDisclosure() {
        if (!id) return
        if (currentListItemId === "0") {
            const res = await findSinglePurchaseIntentionDisclosure(id)
            const res1 = await findSinglePurchaseIntentionDisclosureDetailByLinkId(id)
            setThisPurchaseIntentionDisclosureDetail({ releaseTime: res.result.data[0].time, isCollected: true, ...res1.result.data[0] })
            return
        }
        if (currentListItemId === "1") {
            const res = await findSinglePurchaseSolicitationAnnouncement(id)
            const res1 = await findSinglePurchaseSolicitationAnnouncementDetail(id)
            console.log(res.result.data[0]);
            console.log(res1.result.data[0]);
            
            return
        }
    }

    return (
        <Fragment>
            <View className='detail'>
                <DetailFirstSection projectName={thisPurchaseIntentionDisclosureDetail?.projectName} address='淮安' releaseTime={thisPurchaseIntentionDisclosureDetail?.releaseTime} isCollected={thisPurchaseIntentionDisclosureDetail?.isCollected} currentListItemId={currentListItemId} />
                <DetailSecondSection projectSummarize={thisPurchaseIntentionDisclosureDetail?.purchaseRequirementsSummary} purchaseBudget={thisPurchaseIntentionDisclosureDetail?.purchaseBudget} estimatedPurchaseMonth={thisPurchaseIntentionDisclosureDetail?.expectedPurchaseMonth} isForSmallOrMediumEnterprise={thisPurchaseIntentionDisclosureDetail?.whetherForSmallAndMediumEnterprise} toPurchaseEnergysavingOrEnvironmentalLabelingProducts={thisPurchaseIntentionDisclosureDetail?.whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts} remark={thisPurchaseIntentionDisclosureDetail?.remark} />
            </View>
        </Fragment>
    )
}