import { deleteSinglePurchaseIntentionDisclosure } from "@/services/deleteSinglePurchaseIntentionDisclosur";
import { deleteSinglePurchaseSolicitationAnnouncement } from "@/services/deleteSinglePurchaseSolicitationAnnouncement";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { restituteSinglePurchaseIntentionDisclosure } from "@/services/restituteSinglePurchaseIntentionDisclosure";
import { restituteSinglePurchaseSolicitationAnnouncement } from "@/services/restituteSinglePurchaseSolicitationAnnouncement";
import { collectSinglePurchaseIntentionDisclosure } from "@/services/collectSinglePurchaseIntentionDisclosure";
import { collectSinglePurchaseSolicitationAnnouncement } from "@/services/collectSinglePurchaseSolicitationAnnouncement";
import { Fragment, useState } from "react";
import { wyDeepClone } from "wangyong-utils";
import { getPurchaseIntentionDisclosures } from "@/services/puchaseIntentionDisclosure";
import { getPurchaseSocilitationAnnouncements } from "@/services/purchaseSocilitationAnnouncement";
import sortListItemData from "@/utils/sortListItemData";
import "./index.module.less"
import { CardProps } from "../card";

interface DeleteAndRestituteProps {
    _id?: string
    currentListItemId?: string
    source?: string
    completelyDelete: (_id?: string) => void
    fetchPrev: (currentId?: string) => Promise<string>
    fetchNext: (currentDeleteItemId?: string) => Promise<string>
    updateId: (id: string) => void
}

export default function DeleteAndRestitute(props: DeleteAndRestituteProps) {

    const { _id, currentListItemId, source, completelyDelete, fetchPrev, fetchNext, updateId } = props

    const [currentId, setCurrentId] = useState(_id)

    async function handleDelete() {
        if (currentListItemId === "0") {
            const res = await deleteSinglePurchaseIntentionDisclosure(currentId)
            if (!res) return
            Taro.showToast({
                title: "删除成功",
                icon: "success",
                duration: 1000
            })
            const res1 = await fetchNext(currentId)
            if (!res1) return
            setCurrentId(res1)
            const res2 = await getPurchaseIntentionDisclosures()
            if (!res2.result) return
            const resultData: CardProps[] = sortListItemData(res2.result.filter(e => !e.is_deleted), "desc")
            const newResultData: CardProps[] = wyDeepClone(resultData)
            const res3 = await Taro.setStorage({ key: "homePageData", data: { purchaseIntentionDisclosure: newResultData } })
            if (!res3) return
            return
        }
        if (currentListItemId === "1") {
            const res = await deleteSinglePurchaseSolicitationAnnouncement(currentId)
            if (!res) return
            Taro.showToast({
                title: "删除成功",
                icon: "success",
                duration: 1000
            })
            const res1 = await fetchNext(currentId)
            if (!res1) return
            setCurrentId(res1)
            const res2 = await getPurchaseSocilitationAnnouncements()
            if (!res2.result) return
            const resultData: CardProps[] = sortListItemData(res2.result.filter(e => !e.is_deleted), "desc")
            const newResultData: CardProps[] = wyDeepClone(resultData)
            const res3 = await Taro.setStorage({ key: "homePageData", data: { purchaseSocilitationAnnouncements: newResultData } })
            if (!res3) return
            return
        }
    }

    function handleCompletelyDelete() {
        completelyDelete(_id)
    }

    async function handleRestitute() {
        if (currentListItemId === "0") {
            const res = await restituteSinglePurchaseIntentionDisclosure(_id)
            if (!res) return
            Taro.navigateBack()
            return
        }
        if (currentListItemId === "1") {
            const res = await restituteSinglePurchaseSolicitationAnnouncement(_id)
            if (!res) return
            Taro.navigateBack()
            return
        }
    }

    async function handleCancelCollect() {
        if (!_id) return
        const id = _id
        if (currentListItemId === "0") {
            const res = await collectSinglePurchaseIntentionDisclosure(id, false)
            Taro.navigateBack()
            if (!res) return
            return
        }
        if (currentListItemId === "1") {
            const res = await collectSinglePurchaseSolicitationAnnouncement(id, false)
            if (!res) return
            Taro.navigateBack()
            return
        }
    }

    async function handlePrevClick() {
        const res1 = await fetchPrev(currentId)
        if (!res1) return
        setCurrentId(res1)
        updateId(res1)
    }

    async function handleNextClick() {
        const res1 = await fetchNext(currentId)
        if (!res1) return
        setCurrentId(res1)
        updateId(res1)
    }

    return (
        <Fragment>
            <View className='wrapper'>
                {source === "myCollections" ? <View className='cancel-collect-button' onClick={handleCancelCollect}>取消收藏</View> : <View className='horizontal-sub-wrapper'>
                    {source === "homePage" && <View className='prev' onClick={handlePrevClick}>上一条</View>}
                    <View className='delete-button' onClick={source === "homePage" ? handleDelete : handleCompletelyDelete}>
                        {source === "homePage" ? "删除" : "彻底删除"}
                    </View>
                    {source === "homePage" && <View className='next' onClick={handleNextClick}>下一条</View>}
                    {source === "recycleBin" && <View className='restitute' onClick={handleRestitute}>还原</View>}
                </View>}
            </View>
        </Fragment>
    )
}