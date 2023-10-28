import { Textarea, View } from "@tarojs/components"
import { useState } from "react"
import { updateSinglePurchaseAnnouncementDetail } from "@/services/updateSinglePurchaseAnnouncementDetail"
import { updateSingleLocalAnnouncementDetail } from "@/services/updateSIngleLocalAnnouncementDetail"
import Taro, { useDidShow, useRouter } from "@tarojs/taro"
import { findSinglePurchaseSolicitationAnnouncementDetail } from "@/services/findSinglePurchaseSolicitationAnnouncementDetail"
import { fetchLocalAnnouncementDetail } from "@/services/fetchLocalAnnouncementDetail"
import "./index.module.less"

const RemarkEdit = () => {

    const router = useRouter()
    const { link_id, currentListItemId } = router.params

    const [currentRemark, setCurrentRemark] = useState("")

    useDidShow(() => {
        init()
    })

    async function init() {
        if (link_id && currentListItemId === "1") {
            const res = await findSinglePurchaseSolicitationAnnouncementDetail(link_id)
            if (!res) return
            setCurrentRemark(res.result[0].remark)
            return
        }
        if (link_id && currentListItemId === "2") {
            const res = await fetchLocalAnnouncementDetail(link_id)
            if (!res) return
            setCurrentRemark(res.result[0].remark)
            return
        }
    }

    async function submit() {
        if (currentListItemId === "1") {
            const res = await updateSinglePurchaseAnnouncementDetail(link_id, currentRemark)
            if (!res) return
            Taro.navigateBack()
        }
        if (currentListItemId === "2") {
            const res = await updateSingleLocalAnnouncementDetail(link_id, currentRemark)
            if (!res) return
            Taro.navigateBack()
        }
    }

    function remarkInputed(e: any) {
        setCurrentRemark(e.target.value)
    }

    return (
        <View className='remark-edit'>
            <Textarea className='textarea' placeholder='请输入备注' value={currentRemark} onInput={remarkInputed}>
                {currentRemark}
            </Textarea>
            <View className='btn-group'>
                <View className='cancel' onClick={() => Taro.navigateBack()}>取消</View>
                <View className='submit' onClick={submit}>提交</View>
            </View>
        </View>
    )
}

export default RemarkEdit