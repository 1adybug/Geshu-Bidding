import { Button, View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import { getPurchaseIntentionDisclosures } from "@/services/puchaseIntentionDisclosure";
import { getPurchaseSocilitationAnnouncements } from "@/services/purchaseSocilitationAnnouncement";
import { wyDeepClone } from "wangyong-utils";
import RecycleBinCard from "@/components/recycleBinCard";
import { restituteSinglePurchaseIntentionDisclosure } from "@/services/restituteSinglePurchaseIntentionDisclosure";
import { restituteSinglePurchaseSolicitationAnnouncement } from "@/services/restituteSinglePurchaseSolicitationAnnouncement";
import { completelyDeleteSinglePurchaseIntention } from "@/services/completelyDeleteSinglePurchaseIntention";
import { AtModal, AtModalHeader, AtModalContent, AtModalAction, AtActivityIndicator } from "taro-ui"
import "./index.module.less"

export default function RecycleBin() {

    const [deletedItems, setDeletedItems] = useState<PurchaseIntentionDisclosure[]>([])
    const [modalOpen, setModalOpen] = useState(false)
    const [willDeleteItemId, setWillDeleteItemId] = useState("")
    const [willDeleteItemType, setWillDeleteItemType] = useState<CardType | "">("")
    const [gotData, setGotData] = useState(false)

    useEffect(() => {
        getAllDeleteds()
    }, [])

    async function getAllDeleteds() {
        const intentionDeletedsRes = await getPurchaseIntentionDisclosures()
        const solicitationDeletedRes = await getPurchaseSocilitationAnnouncements()
        setDeletedItems(wyDeepClone([...intentionDeletedsRes.result, ...solicitationDeletedRes.result].filter(e => e.is_deleted).filter(e => !e.is_completely_deleted)))
        setGotData(true)
    }

    function handleCompletelyDelete(_id: string, type: CardType) {
        setModalOpen(true)
        setWillDeleteItemId(_id)
        setWillDeleteItemType(type)
    }

    async function handleRestitution(_id: string, type: CardType) {
        if (type === "purchase_intention") {
            const res = await restituteSinglePurchaseIntentionDisclosure(_id)
            if (!res) return
            getAllDeleteds()
            return
        }
        if (type === "purchase_solicitation") {
            const res = await restituteSinglePurchaseSolicitationAnnouncement(_id)
            if (!res) return
            getAllDeleteds()
            return
        }
    }

    async function confirmCompletelyDelete() {
        if (willDeleteItemType === "purchase_intention") {
            const res = await completelyDeleteSinglePurchaseIntention(willDeleteItemId)
            if (!res) return
            getAllDeleteds()
            setModalOpen(false)
            return
        }
        if (willDeleteItemType === "purchase_solicitation") {
            const res = await completelyDeleteSinglePurchaseIntention(willDeleteItemId)
            if (!res) return
            getAllDeleteds()
            setModalOpen(false)
            return
        }
    }

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='数据加载中...'></AtActivityIndicator>
            </View> : <View className='recyclebin'>
                {deletedItems.map((item: PurchaseIntentionDisclosure) => {
                    return (
                        <RecycleBinCard key={item._id} _id={item._id} title={item.title} time={item.time} completelyDelete={handleCompletelyDelete} restitution={handleRestitution} type={item.type} />
                    )
                })}
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
                {/* <AtToast isOpened text={} icon={}></AtToast> */}
            </View>}
        </Fragment>

    )
}