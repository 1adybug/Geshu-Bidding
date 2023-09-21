import { deleteSinglePurchaseIntentionDisclosure } from "@/services/deleteSinglePurchaseIntentionDisclosur";
import { deleteSinglePurchaseSolicitationAnnouncement } from "@/services/deleteSinglePurchaseSolicitationAnnouncement";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { restituteSinglePurchaseIntentionDisclosure } from "@/services/restituteSinglePurchaseIntentionDisclosure";
import { restituteSinglePurchaseSolicitationAnnouncement } from "@/services/restituteSinglePurchaseSolicitationAnnouncement";
import "./index.module.less"

interface DeleteAndRestituteProps {
    _id?: string
    currentListItemId?: string
    source?: string
    completelyDelete: (_id?: string) => void
}

export default function DeleteAndRestitute(props: DeleteAndRestituteProps) {

    const { _id, currentListItemId, source, completelyDelete } = props

    async function handleDelete() {
        if (currentListItemId === "0") {
            const res = await deleteSinglePurchaseIntentionDisclosure(_id)
            if (!res) return
            Taro.navigateBack()
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

    return (
        <View className='wrapper'>
            <View className={source === "homePage" ? "vertical-sub-wrapper" : "horizontal-sub-wrapper"}>
                <View className='delete-button' onClick={source === "homePage" ? handleDelete : handleCompletelyDelete}>
                    {source === "homePage" ? "删除" : "彻底删除"}
                </View>
                {source === "recycleBin" && <View className='restitute' onClick={handleRestitute}>还原</View>}
            </View>
        </View>
    )
}