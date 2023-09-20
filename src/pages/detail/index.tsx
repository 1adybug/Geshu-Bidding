import { View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "@tarojs/taro";
import { findSinglePurchaseIntentionDisclosure } from "@/services/findSinglePurchaseIntentionDisclosureDetail";
import { findSinglePurchaseSolicitationAnnouncement } from "@/services/findSinglePurchaseSolicitationAnnouncement";
import DetailFirstSection from "@/components/detailFirstSection";
import DetailSecondSection from "@/components/detailSecondSection";
import { findSinglePurchaseIntentionDisclosureDetailByLinkId } from "@/services/findSinglePurchaseIntentionDisclosureDetailByLinkId";
import { findSinglePurchaseSolicitationAnnouncementDetail } from "@/services/findSinglePurchaseSolicitationAnnouncementDetail";
import DetailSecondSectionForPurchaseSolicitation from "@/components/detailSecondSectionForPurchaseSolicitation";
import { AtActivityIndicator } from "taro-ui";
import "./index.module.less"

interface ThisPurchaseIntentionDisclosureDetail extends PurchaseIntentionDisclosureDetail {
    releaseTime: string
    isCollected: boolean
}

interface DetailSecondSectionForPurchaseSolicitation extends PurchaseSolicitationAnnouncementDetail {
    title: string
    releaseTime: string
}

export default function Detail() {
    const router = useRouter()
    const { id, currentListItemId, source } = router.params
    const [thisPurchaseIntentionDisclosureDetail, setThisPurchaseIntentionDisclosureDetail] = useState<ThisPurchaseIntentionDisclosureDetail | null>(null)
    const [thisPurchaseSolicitationAnnouncementDetail, setThisPurchaseSolicitationAnnouncementDetail] = useState<DetailSecondSectionForPurchaseSolicitation | null>(null)
    const [gotData, setGotData] = useState(false)

    useEffect(() => {
        getSinglePurchaseIntentionDisclosure()
    }, [])

    async function getSinglePurchaseIntentionDisclosure() {
        if (!id) return
        if (currentListItemId === "0") {
            const res = await findSinglePurchaseIntentionDisclosure(id)
            const res1 = await findSinglePurchaseIntentionDisclosureDetailByLinkId(id)
            setThisPurchaseIntentionDisclosureDetail({ releaseTime: res.result.data[0].time, isCollected: false, ...res1.result.data[0] })
            setGotData(true)
            return
        }
        if (currentListItemId === "1") {
            const res = await findSinglePurchaseSolicitationAnnouncement(id)
            const res1 = await findSinglePurchaseSolicitationAnnouncementDetail(id)
            if (!(res && res1)) return
            const obj = {
                title: res.result.data[0].title,
                releaseTime: res.result.data[0].time
            }
            setThisPurchaseSolicitationAnnouncementDetail({ ...obj, ...res1.result.data[0] })
            setGotData(true)
            return
        }
    }

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='数据加载中...'></AtActivityIndicator>
            </View> : <Fragment>
                {currentListItemId === "0" ? <View className='detail'>
                    <DetailFirstSection projectName={thisPurchaseIntentionDisclosureDetail?.projectName} address='淮安' releaseTime={thisPurchaseIntentionDisclosureDetail?.releaseTime} isCollected={thisPurchaseIntentionDisclosureDetail?.isCollected} currentListItemId={currentListItemId} source={source} />
                    <DetailSecondSection projectSummarize={thisPurchaseIntentionDisclosureDetail?.purchaseRequirementsSummary} purchaseBudget={thisPurchaseIntentionDisclosureDetail?.purchaseBudget} estimatedPurchaseMonth={thisPurchaseIntentionDisclosureDetail?.expectedPurchaseMonth} isForSmallOrMediumEnterprise={thisPurchaseIntentionDisclosureDetail?.whetherForSmallAndMediumEnterprise} toPurchaseEnergysavingOrEnvironmentalLabelingProducts={thisPurchaseIntentionDisclosureDetail?.whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts} remark={thisPurchaseIntentionDisclosureDetail?.remark} />
                </View> : <View className='detail'>
                    <DetailFirstSection projectName={thisPurchaseSolicitationAnnouncementDetail?.title} address='淮安' releaseTime={thisPurchaseSolicitationAnnouncementDetail?.releaseTime} isCollected={thisPurchaseIntentionDisclosureDetail?.isCollected} currentListItemId={currentListItemId} source={source} />
                    <DetailSecondSectionForPurchaseSolicitation project_name={thisPurchaseSolicitationAnnouncementDetail?.project_name} project_no={thisPurchaseSolicitationAnnouncementDetail?.project_no} project_principal={thisPurchaseSolicitationAnnouncementDetail?.project_principal} principal_contact={thisPurchaseSolicitationAnnouncementDetail?.principal_contact} />
                </View>}
            </Fragment>}
        </Fragment>
    )
}