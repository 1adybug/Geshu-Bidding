import { Button, View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { findSinglePurchaseIntentionDisclosure } from "@/services/findSinglePurchaseIntentionDisclosureDetail";
import { findSinglePurchaseSolicitationAnnouncement } from "@/services/findSinglePurchaseSolicitationAnnouncement";
import DetailFirstSection from "@/components/detailFirstSection";
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
import { fetchThisSolicitationAnnouncementAttachments } from "@/services/fetchThisSolicitationAnnouncementAttachments";
import PreviewAndDownload from "@/components/previewAndDownload";
import Shadow from "@/components/shadow";
import PurchaseIntentionDisclosureDetailSecondSection from "@/components/purchaseIntentionDisclosureDetailSecondSection";
import RemarkEditModal from "@/components/remarkEditModal";
import { fetchLocalAnnouncementDetail } from "@/services/fetchLocalAnnouncementDetail";
import { fetchLocalAnnouncementAttachments } from "@/services/fetchLocalAnnouncementAttachments";
import { findSIngleLocalAnnouncement } from "@/services/findSIngleLocalAnnouncement";
import { collectSingleLocalAnnouncement } from "@/services/collectSingleLocalAnnouncement";
import { completeltyDeleteSingleLocalAnnouncement } from "@/services/completeltyDeleteSingleLocalAnnouncement";
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

export interface Attachment {
    href: string
    content: string
}

export default function Detail() {
    const router = useRouter()
    const { _id, currentListItemId, source } = router.params
    const [thisPurchaseIntentionDisclosureDetail, setThisPurchaseIntentionDisclosureDetail] = useState<ThisPurchaseIntentionDisclosureDetail | null>(null)
    const [thisPurchaseSolicitationAnnouncementDetail, setThisPurchaseSolicitationAnnouncementDetail] = useState<ThisPurchaseSolicitationAnnouncementDetail | null>(null)
    const [gotData, setGotData] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [willDeleteItemId, setWillDeleteItemId] = useState("")
    const [freshId, setfreshId] = useState(_id)
    const [attachments, setAttachments] = useState<Attachment[]>([])
    const [activityIndicatorContent, setActivityIndicatorContent] = useState("数据正在加载中...")
    const [fileIDPrev, setFileIDPrev] = useState("")
    const [drawShow, setDrawShow] = useState(false)
    const [attachmentTitle, setAttachmentTitle] = useState("")
    const [attachmentDownloadURL, setAttachmentDownloadURL] = useState("")
    const [remarkEditShow, setRemarkEditShow] = useState(false)

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
            const res2 = await fetchThisSolicitationAnnouncementAttachments(res.result.data[0].href)
            if (res2.result.data[0]) {
                setAttachments(res2.result.data[0].attachments)
                setFileIDPrev(res2.result.data[0].title)
            } else {
                setAttachments([])
                setFileIDPrev("")
            }
            setGotData(true)
            return
        }
        if (currentListItemId === "2") {
            const res1 = await findSIngleLocalAnnouncement(id)
            if (!res1) return
            const res = await fetchLocalAnnouncementDetail(id)
            if (!res) return
            const obj = {
                releaseTime: res1.result[0].time,
                is_collected: res1.result[0].is_collected
            }
            setThisPurchaseSolicitationAnnouncementDetail({ ...obj, ...res.result[0] })
            const res2 = await fetchLocalAnnouncementAttachments(res1.result[0].href)
            if (!res2) return
            if (res2.result) {
                setAttachments(res2.result[0].attachments)
                setFileIDPrev(res2.result[0].title)
            } else {
                setAttachments([])
                setFileIDPrev("")
            }
            setGotData(true)
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
        if (currentListItemId === "2") {
            const res = await completeltyDeleteSingleLocalAnnouncement(willDeleteItemId)
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
            await getThisDetail(id)
            return
        }
        if (sourceId === "1") {
            const res = await collectSinglePurchaseSolicitationAnnouncement(id, !collectedStaus)
            if (!res) return
            await getThisDetail(id)
            return
        }
        if (sourceId === "2") {
            const res = await collectSingleLocalAnnouncement(id, !collectedStaus)
            if (!res) return
            await getThisDetail(id)
            return
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
                    title: '已是第一条',
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
                    title: '已是第一条',
                    icon: 'error',
                    duration: 2000
                });
            }
        }
        if (currentListItemId === "2") {
            const thisItem: any = res.data.localAnnouncement.find((item: CardProps) => item._id === currentId)
            const index = res.data.localAnnouncement.indexOf(thisItem);
            if (index !== -1 && index > 0) {
                const previousItem = res.data.localAnnouncement[index - 1];
                await getThisDetail(previousItem._id)
                return previousItem._id
            } else {
                Taro.showToast({
                    title: '已是第一条',
                    icon: 'error',
                    duration: 2000
                });
            }
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
                    title: '已是最后一条',
                    icon: 'error',
                    duration: 1000
                });
                setTimeout(() => {
                    Taro.navigateBack()
                }, 1500)
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
                    title: '已是最后一条',
                    icon: 'error',
                    duration: 1000
                });
                setTimeout(() => {
                    Taro.navigateBack()
                }, 1500)
            }
        }
        if (currentListItemId === "2") {
            const thisItem: CardProps = res.data.localAnnouncement.find((item: CardProps) => item._id === currentDeleteItemId)
            const index = res.data.localAnnouncement.indexOf(thisItem);
            if (index !== -1 && index < res.data.localAnnouncement.length - 1) {
                const previousItem = res.data.localAnnouncement[index + 1];
                await getThisDetail(previousItem._id)
                return previousItem._id
            } else {
                Taro.showToast({
                    title: '已是最后一条',
                    icon: 'error',
                    duration: 1000
                });
                setTimeout(() => {
                    Taro.navigateBack()
                }, 1500)
            }
        }
    }

    function handleUpdateId(id: string) {
        setfreshId(id)
    }

    function handleGrandChildEvent(e: string) {
        if (e === "正在跳转，请稍后...") {
            setGotData(false)
            setActivityIndicatorContent(e)
            return
        }
        if (e === "已完成跳转") {
            setGotData(true)
            setActivityIndicatorContent("数据正在加载中...")
            return
        }
    }

    function onCloseDrawShow() {
        setDrawShow(false)
    }

    function handleAttachModal(title: string, downloadURL: string) {
        setAttachmentTitle(title)
        setAttachmentDownloadURL(downloadURL)
        setDrawShow(true)
    }

    function handleRemarkEditClick() {
        setRemarkEditShow(true)
    }

    function handleRemarkEditCancel() {
        setRemarkEditShow(false)
    }

    function handleRemarkEditSubmit() {
        _id && getThisDetail(_id)
        setRemarkEditShow(false)
    }

    function handleAttachmentClicked(e: boolean) {
        setActivityIndicatorContent("请稍候...")
        setGotData(e)
    }

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content={activityIndicatorContent}></AtActivityIndicator>
            </View> : <Fragment>
                {currentListItemId === "0" && <View className='detail' >
                    <DetailFirstSection projectName={thisPurchaseIntentionDisclosureDetail?.title} releaseTime={thisPurchaseIntentionDisclosureDetail?.releaseTime} isCollected={thisPurchaseIntentionDisclosureDetail?.isCollected} currentListItemId={currentListItemId} source={source} _id={freshId} collect={onCollected} />
                    <PurchaseIntentionDisclosureDetailSecondSection projects={thisPurchaseIntentionDisclosureDetail?.projects} />
                    <DeleteAndRestitute _id={freshId} currentListItemId={currentListItemId} source={source} completelyDelete={onCompletelyDelete} fetchNext={handleFetchNext} fetchPrev={handleFetchPrev} updateId={handleUpdateId} />
                </View>}
                {(currentListItemId === "1" || currentListItemId === "2") && <View className='detail' >
                    <DetailFirstSection projectName={thisPurchaseSolicitationAnnouncementDetail?.title} releaseTime={thisPurchaseSolicitationAnnouncementDetail?.releaseTime} isCollected={thisPurchaseSolicitationAnnouncementDetail?.is_collected} currentListItemId={currentListItemId} source={source} _id={freshId} collect={onCollected} />
                    <DetailSecondSectionForPurchaseSolicitation project_name={thisPurchaseSolicitationAnnouncementDetail?.project_name} project_no={thisPurchaseSolicitationAnnouncementDetail?.project_no} project_principal={thisPurchaseSolicitationAnnouncementDetail?.project_principal} principal_contact={thisPurchaseSolicitationAnnouncementDetail?.principal_contact} budget={thisPurchaseSolicitationAnnouncementDetail?.budget} principal_unit={thisPurchaseSolicitationAnnouncementDetail?.principal_unit} submission_time={thisPurchaseSolicitationAnnouncementDetail?.submission_time} haveAttachments={attachments.length > 0} attachments={attachments} fileIDPrev={fileIDPrev} modalChange={handleAttachModal} remarkEditClick={handleRemarkEditClick} remark={thisPurchaseSolicitationAnnouncementDetail?.remark} attachmentClicked={handleAttachmentClicked} />
                    <DeleteAndRestitute _id={freshId} currentListItemId={currentListItemId} source={source} completelyDelete={onCompletelyDelete} fetchNext={handleFetchNext} fetchPrev={handleFetchPrev} updateId={handleUpdateId} />
                </View>}
            </Fragment>}
            {drawShow && <PreviewAndDownload attachmentTitle={attachmentTitle} url={attachmentDownloadURL} closeModal={onCloseDrawShow} onActivityIndicatorContentChange={handleGrandChildEvent} />}
            {(drawShow || remarkEditShow) && <Shadow onClose={onCloseDrawShow} />}
            {remarkEditShow && <RemarkEditModal remark={thisPurchaseSolicitationAnnouncementDetail?.remark} editCancel={handleRemarkEditCancel} editSubmit={handleRemarkEditSubmit} link_id={_id} currentListItemId={currentListItemId} />}
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