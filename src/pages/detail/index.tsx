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
import { CardProps } from "@/components/card";
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
    // const [startX, setStartX] = useState(0);
    // const [endX, setEndX] = useState(0);
    // const [thisId, setThisId] = useState<string | undefined>(_id)

    useEffect(() => {
        if (!_id) return
        getThisDetail(_id)
    }, [])

    async function getThisDetail(id: string) {
        if (currentListItemId === "0") {
            const res = await findSinglePurchaseIntentionDisclosure(id)
            const res1 = await findSinglePurchaseIntentionDisclosureDetailByLinkId(id)
            setThisPurchaseIntentionDisclosureDetail({ releaseTime: res.result.data[0].time, isCollected: res.result.data[0].is_collected, ...res1.result.data[0] })
            setGotData(true)
            return
        }
        if (currentListItemId === "1") {
            const res = await findSinglePurchaseSolicitationAnnouncement(id)
            const res1 = await findSinglePurchaseSolicitationAnnouncementDetail(id)
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
            getThisDetail(id)
            return
        }
        if (sourceId === "1") {
            const res = await collectSinglePurchaseSolicitationAnnouncement(id, !collectedStaus)
            if (!res) return
            getThisDetail(id)
            return
        }
    }

    async function handleFetchNext(currentDeleteItemId: string) {
        const res = await Taro.getStorage({ key: "homePageData" })
        if (!res.data) return
        if (currentListItemId === "0") {
            const thisItem: CardProps = res.data.purchaseIntentionDisclosure.find((item: CardProps) => item._id === currentDeleteItemId)
            const index = res.data.purchaseIntentionDisclosure.indexOf(thisItem);
            if (index !== -1 && index < res.data.purchaseIntentionDisclosure.length - 1) {
                const previousItem = res.data.purchaseIntentionDisclosure[index + 1];
                await getThisDetail(previousItem._id)
                return previousItem._id
            } else {
                Taro.showToast({
                    title: '已经最后一条了',
                    icon: 'error',
                    duration: 2000
                });
            }
        }
        if (currentListItemId === "1") {
            const thisItem: CardProps = res.data.purchaseSocilitationAnnouncements.find((item: CardProps) => item._id === currentDeleteItemId)
            const index = res.data.purchaseSocilitationAnnouncements.indexOf(thisItem);
            if (index !== -1 && index < res.data.purchaseSocilitationAnnouncements.length - 1) {
                const previousItem = res.data.purchaseSocilitationAnnouncements[index + 1];
                await getThisDetail(previousItem._id)
                return previousItem._id
            } else {
                Taro.showToast({
                    title: '已经最后一条了',
                    icon: 'error',
                    duration: 2000
                });
            }
        }
    }

    async function handleFetchPrev(currentId: string) {
        const res = await Taro.getStorage({ key: "homePageData" })
        if (!res.data) return
        if (currentListItemId === "0") {
            const thisItem: any = res.data.purchaseIntentionDisclosure.find((item: CardProps) => item._id === currentId)
            const index = res.data.purchaseIntentionDisclosure.indexOf(thisItem);
            if (index !== -1 && index > 0) {
                const previousItem = res.data.purchaseIntentionDisclosure[index - 1];
                await getThisDetail(previousItem._id)
                return previousItem._id
            } else {
                Taro.showToast({
                    title: '已经是第一条了',
                    icon: 'error',
                    duration: 2000
                });
            }
        }
        if (currentListItemId === "1") {
            const thisItem: any = res.data.purchaseSocilitationAnnouncements.find((item: CardProps) => item._id === currentId)
            const index = res.data.purchaseSocilitationAnnouncements.indexOf(thisItem);
            if (index !== -1 && index > 0) {
                const previousItem = res.data.purchaseSocilitationAnnouncements[index - 1];
                await getThisDetail(previousItem._id)
                return previousItem._id
            } else {
                Taro.showToast({
                    title: '已经是第一条了',
                    icon: 'error',
                    duration: 2000
                });
            }
        }
    }

    // const handleTouchStart = (e) => {
    //     const { clientX } = e.touches[0];
    //     setStartX(clientX);
    // };

    // const handleTouchEnd = (e) => {
    //     const { clientX } = e.changedTouches[0];
    //     setEndX(clientX);
    //     handleSwipe();
    // };

    // const handleSwipe = async () => {
    //     console.log(startX - endX);

    //     if (endX - startX > 50) {
    //         // 右滑逻辑
    //         console.log('右滑');
    //         return
    //     }
    //     if (startX - endX > 300) {
    //         // 左滑逻辑
    //         console.log('左滑');
    //         if (!thisId) return
    //         if (source === "homePage") {
    //             const res = await handleFetchNext(thisId)
    //             setThisId(res)
    //             return
    //         }
    //     }
    // };

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='数据加载中...'></AtActivityIndicator>
            </View> : <Fragment>
                {currentListItemId === "0" ? <View className='detail' >
                    <DetailFirstSection projectName={thisPurchaseIntentionDisclosureDetail?.projectName} releaseTime={thisPurchaseIntentionDisclosureDetail?.releaseTime} isCollected={thisPurchaseIntentionDisclosureDetail?.isCollected} currentListItemId={currentListItemId} source={source} _id={_id} collect={onCollected} />
                    <DetailSecondSection projectSummarize={thisPurchaseIntentionDisclosureDetail?.purchaseRequirementsSummary} purchaseBudget={thisPurchaseIntentionDisclosureDetail?.purchaseBudget} estimatedPurchaseMonth={thisPurchaseIntentionDisclosureDetail?.expectedPurchaseMonth} isForSmallOrMediumEnterprise={thisPurchaseIntentionDisclosureDetail?.whetherForSmallAndMediumEnterprise} toPurchaseEnergysavingOrEnvironmentalLabelingProducts={thisPurchaseIntentionDisclosureDetail?.whetherPurchaseEnergySavingAndEnvironmentalLabelingProducts} remark={thisPurchaseIntentionDisclosureDetail?.remark} />
                    <DeleteAndRestitute _id={_id} currentListItemId={currentListItemId} source={source} completelyDelete={onCompletelyDelete} fetchNext={handleFetchNext} fetchPrev={handleFetchPrev} />
                </View> : <View className='detail' >
                    <DetailFirstSection projectName={thisPurchaseSolicitationAnnouncementDetail?.title} releaseTime={thisPurchaseSolicitationAnnouncementDetail?.releaseTime} isCollected={thisPurchaseSolicitationAnnouncementDetail?.is_collected} currentListItemId={currentListItemId} source={source} _id={_id} collect={onCollected} />
                    <DetailSecondSectionForPurchaseSolicitation project_name={thisPurchaseSolicitationAnnouncementDetail?.project_name} project_no={thisPurchaseSolicitationAnnouncementDetail?.project_no} project_principal={thisPurchaseSolicitationAnnouncementDetail?.project_principal} principal_contact={thisPurchaseSolicitationAnnouncementDetail?.principal_contact} budget={thisPurchaseSolicitationAnnouncementDetail?.budget} principal_unit={thisPurchaseSolicitationAnnouncementDetail?.principal_unit} />
                    <DeleteAndRestitute _id={_id} currentListItemId={currentListItemId} source={source} completelyDelete={onCompletelyDelete} fetchNext={handleFetchNext} fetchPrev={handleFetchPrev} />
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