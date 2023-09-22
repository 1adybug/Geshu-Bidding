import { deleteSinglePurchaseIntentionDisclosure } from "@/services/deleteSinglePurchaseIntentionDisclosur";
import { deleteSinglePurchaseSolicitationAnnouncement } from "@/services/deleteSinglePurchaseSolicitationAnnouncement";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { restituteSinglePurchaseIntentionDisclosure } from "@/services/restituteSinglePurchaseIntentionDisclosure";
import { restituteSinglePurchaseSolicitationAnnouncement } from "@/services/restituteSinglePurchaseSolicitationAnnouncement";
import { collectSinglePurchaseIntentionDisclosure } from "@/services/collectSinglePurchaseIntentionDisclosure";
import { collectSinglePurchaseSolicitationAnnouncement } from "@/services/collectSinglePurchaseSolicitationAnnouncement";
import "./index.module.less"

interface DeleteAndRestituteProps {
    _id?: string
    currentListItemId?: string
    source?: string
    completelyDelete: (_id?: string) => void
    fetchNext: (currentDeleteItemId?: string) => void
}

export default function DeleteAndRestitute(props: DeleteAndRestituteProps) {

    const { _id, currentListItemId, source, completelyDelete, fetchNext } = props

    async function handleDelete() {
        if (currentListItemId === "0") {
            const res = await deleteSinglePurchaseIntentionDisclosure(_id)
            if (!res) return
            fetchNext(_id)
            return
        }
        if (currentListItemId === "1") {
            const res = await deleteSinglePurchaseSolicitationAnnouncement(_id)
            if (!res) return
            Taro.navigateBack()
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

    return (
        <View className='wrapper'>
            {source === "myCollections" ? <View className='cancel-collect-button' onClick={handleCancelCollect}>取消收藏</View> : <View className={source === "homePage" ? "vertical-sub-wrapper" : "horizontal-sub-wrapper"}>
                <View className='delete-button' onClick={source === "homePage" ? handleDelete : handleCompletelyDelete}>
                    {source === "homePage" ? "删除" : "彻底删除"}
                </View>
                {source === "recycleBin" && <View className='restitute' onClick={handleRestitute}>还原</View>}
            </View>}
        </View>
    )
}