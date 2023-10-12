import { Textarea, View } from "@tarojs/components"
import { useEffect, useState } from "react"
import { updateSinglePurchaseAnnouncementDetail } from "@/services/updateSinglePurchaseAnnouncementDetail"
import "./index.module.less"

interface RemarkEditModalProps {
    link_id?: string
    remark?: string
    editCancel: () => void
    editSubmit: () => void
}

export default function RemarkEditModal(props: RemarkEditModalProps) {

    const { link_id, remark, editCancel, editSubmit } = props

    const [currentRemark, setCurrentRemark] = useState(remark)

    function cancel() {
        editCancel()
    }

    async function submit() {
        const res = await updateSinglePurchaseAnnouncementDetail(link_id, currentRemark)
        if (!res) return
        editSubmit()
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