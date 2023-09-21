import { Button, View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { findSinglePurchaseIntentionDisclosure } from "@/services/findSinglePurchaseIntentionDisclosureDetail";
import { findSinglePurchaseSolicitationAnnouncement } from "@/services/findSinglePurchaseSolicitationAnnouncement";
import DetailFirstSection from "@/components/detailFirstSection";
import DetailSecondSection from "@/components/detailSecondSection";
import { findSinglePurchaseIntentionDisclosureDetailByLinkId } from "@/services/findSinglePurchaseIntentionDisclosureDetailByLinkId";
import { findSinglePurchaseSolicitationAnnouncementDetail } from "@/services/findSinglePurchaseSolicitationAnnouncementDetail";
import DetailSecondSectionForPurchaseSolicitation from "@/components/detailSecondSectionForPurchaseSolicitation";
import { AtActivityIndicator, AtModal, AtModalAction, AtModalContent, AtModalHeader } from "taro-ui";
import DeleteAndRestitute from "@/components/deleteAndRestitute";
import { completelyDeleteSinglePurchaseIntention } from "@/services/completelyDeleteSinglePurchaseIntention";
import { completetlyDeleteSinglePurchaseSolicitation } from "@/services/completetlyDeleteSinglePurchaseSolicitation";
import { collectSinglePurchaseIntentionDisclosure } from "@/services/collectSinglePurchaseIntentionDisclosure";
import { collectSinglePurchaseSolicitationAnnouncement } from "@/services/collectSinglePurchaseSolicitationAnnouncement";
import "./index.module.less"

interface ThisPurchaseIntentionDisclosureDetail extends PurchaseIntentionDisclosureDetail {
    releaseTime: string
    isCollected: boolean
}

interface ThisPurchaseSolicitationAnnouncementDetail extends PurchaseSolicitationAnnouncementDetail {
    title: string
    releaseTime: string
    is_collected: boolean
}

export default function Detail() {
    const router = useRouter()
    const { _id, currentListItemId, source } = router.params
    const [thisPurchaseIntentionDisclosureDetail, setThisPurchaseIntentionDisclosureDetail] = useState<ThisPurchaseIntentionDisclosureDetail | null>(null)
    const [thisPurchaseSolicitationAnnouncementDetail, setThisPurchaseSolicitationAnnouncementDetail] = useState<ThisPurchaseSolicitationAnnouncementDetail | null>(null)
    const [gotData, setGotData] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [willDeleteItemId, setWillDeleteItemId] = useState("")

    useEffect(() => {
        getThisDetail()
    }, [])

    async function getThisDetail() {
        if (!_id) return
        if (currentListItemId === "0") {
            const res = await findSinglePurchaseIntentionDisclosure(_id)
            const res1 = await findSinglePurchaseIntentionDisclosureDetailByLinkId(_id)
            setThisPurchaseIntentionDisclosureDetail({ releaseTime: res.result.data[0].time, isCollected: res.result.data[0].is_collected, ...res1.result.data[0] })
            setGotData(true)
            return
        }
        if (currentListItemId === "1") {
            const res = await findSinglePurchaseSolicitationAnnouncement(_id)
            const res1 = await findSinglePurchaseSolicitationAnnouncementDetail(_id)
            if (!(res && res1)) return
            const obj = {
                title: res.result.data[0].title,
                releaseTime: res.result.data[0].time,
                is_collected: res.result.data[0].is_collected
            }
            setThisPurchaseSolicitationAnnouncementDetail({ ...obj, ...res1.result.data[0] })
            setGotData(true)
            return
        }
    }

    async function confirmCompletelyDelete() {
        if (currentListItemId === "0") {
            const res = await completelyDeleteSinglePurchaseIntention(willDeleteItemId)
            if (!res) return
            setModalOpen(false)
            Taro.navigateBack()
            return
        }
        if (currentListItemId === "1") {
            const res = await completetlyDeleteSinglePurchaseSolicitation(willDeleteItemId)
            if (!res) return
            setModalOpen(false)
            Taro.navigateBack()
            return
        }
    }

    function onCompletelyDelete(id: string) {
        setWillDeleteItemId(id)
        setModalOpen(true)
    }

    async function onCollected(id: string, sourceId: string, collectedStaus: boolean) {
        if (sourceId === "0") {
            const res = await collectSinglePurchaseIntentionDisclosure(id, !collectedStaus)
            if (!res) return
            getThisDetail()
            return
        }
        if (sourceId === "1") {
            const res = await collectSinglePurchaseSolicitationAnnouncement(id, !collectedStaus)
            if (!res) return
            getThisDetail()
            return
        }
    }

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='数据加载中...'></AtActivityIndicator>
            </View> : <Fragment>
                {currentListItemId === "0" ? <View className='detail'>
                    <DetailFirstSection projectName={thisPurchaseIntentionDisclosureDetail?.projectName} releaseTime={thisPurchaseIntentionDisclosureDetail?.releaseTime} isCollected={thisPurchaseIntentionDisclosureDetail?.isCollected} currentListItemId={currentListItemId} source={source} _id={_id} collect={onCollected} />
                    <DetailSecondSection projectSummarize={thisPurchaseIntentionDisclosureDetail?.purchaseRequirementsSummary} purchaseBudget={thisPurchaseIntentionDisclosureDetail?.purchaseBudget} estimatedPurchaseMonth={thisPurchaseIntentionDisclosureDetail?.expectedPurchaseMonth} isForSmallOrMediumEnterprise={thisPurchaseIntentionDisclosureDetail?.whetherForSmallAndMediumEnterprise} toPurchaseEnergysavingOrEnvironmentalLabelingProducts={thisPurchaseIntentionDisclosureDetail?.whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts} remark={thisPurchaseIntentionDisclosureDetail?.remark} />
                    <DeleteAndRestitute _id={_id} currentListItemId={currentListItemId} source={source} completelyDelete={onCompletelyDelete} />
                </View> : <View className='detail'>
                    <DetailFirstSection projectName={thisPurchaseSolicitationAnnouncementDetail?.title} releaseTime={thisPurchaseSolicitationAnnouncementDetail?.releaseTime} isCollected={thisPurchaseSolicitationAnnouncementDetail?.is_collected} currentListItemId={currentListItemId} source={source} _id={_id} collect={onCollected} />
                    <DetailSecondSectionForPurchaseSolicitation project_name={thisPurchaseSolicitationAnnouncementDetail?.project_name} project_no={thisPurchaseSolicitationAnnouncementDetail?.project_no} project_principal={thisPurchaseSolicitationAnnouncementDetail?.project_principal} principal_contact={thisPurchaseSolicitationAnnouncementDetail?.principal_contact} />
                    <DeleteAndRestitute _id={_id} currentListItemId={currentListItemId} source={source} completelyDelete={onCompletelyDelete} />
                </View>}
            </Fragment>}
            <AtModal isOpened={modalOpen}>
                <AtModalHeader>提示</AtModalHeader>
                <AtModalContent>
                    确定要彻底删除吗？
                </AtModalContent>
                <AtModalAction>
                    <Button onClick={() => setModalOpen(false)}>取消</Button>
                    <Button onClick={confirmCompletelyDelete}>确定</Button>
                </AtModalAction>
            </AtModal>
        </Fragment>
    )
}