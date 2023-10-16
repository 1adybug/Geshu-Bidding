import { Textarea, View } from "@tarojs/components"
import { useState } from "react"
import { updateSinglePurchaseAnnouncementDetail } from "@/services/updateSinglePurchaseAnnouncementDetail"
import { updateSingleLocalAnnouncementDetail } from "@/services/updateSIngleLocalAnnouncementDetail"
import "./index.module.less"

interface RemarkEditModalProps {
    link_id?: string
    remark?: string
    currentListItemId?: string
    editCancel: () => void
    editSubmit: () => void
}

export default function RemarkEditModal(props: RemarkEditModalProps) {

    const { link_id, remark, currentListItemId, editCancel, editSubmit } = props

    const [currentRemark, setCurrentRemark] = useState(remark)

    function cancel() {
        editCancel()
    }

    async function submit() {
        if (currentListItemId === "1") {
            const res = await updateSinglePurchaseAnnouncementDetail(link_id, currentRemark)
            if (!res) return
            editSubmit()
        }
        if (currentListItemId === "2") {
            const res = await updateSingleLocalAnnouncementDetail(link_id, currentRemark)
            if (!res) return
            editSubmit()
        }
    }

    function remarkInputed(e: any) {
        setCurrentRemark(e.target.value)
    }

    return (
        <View className='remark-edit-modal'>
            <View className='title'>修改备注</View>
            <Textarea className='textarea' placeholder='请输入备注' value={currentRemark} onInput={remarkInputed}>
                {currentRemark}
            </Textarea>
            <View className='button-group'>
                <View className='cancel' onClick={cancel}>取消</View>
                <View className='submit' onClick={submit}>提交</View>
            </View>
        </View>
    )
}