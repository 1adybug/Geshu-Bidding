import { clearRecycleBin } from "@/services/clearRecycleBin"
// import { deleteUser } from "@/services/deleteUser"
import { View } from "@tarojs/components"
import CloseModalIcon from "../../assets/closeModalIcon.png"
import Alarm from "../../assets/alarm.jpg"
import "./index.module.less"

interface SecondaryConfirmModalProps {
    userId?: string
    tipContent: string
    closeModal: () => void
    clearSucceed: () => void
}

export default function SecondaryConfirmModal(props: SecondaryConfirmModalProps) {

    const { userId, tipContent, closeModal, clearSucceed } = props

    async function confirm() {
        if (tipContent === "确认要永久删除这些数据吗？") {
            const res = await clearRecycleBin()
            if (!res) return
            clearSucceed()
            closeModal()
            return
        }
        // if (tipContent === "确定要删除这位用户吗?") {
        //     const res = await deleteUser(userId)
        //     if (!res) return
        //     clearSucceed()
        //     closeModal()
        //     return
        // }
    }

    return (
        <View className='secondary-confir-modal'>
            <img src={CloseModalIcon} alt='' className='close-modal-icon' onClick={() => closeModal()} />
            <View className='title'>提示</View>
            <View className='bottom-container'>
                <View className='first-section'>
                    <img src={Alarm} alt='' />
                    <View className='tip-content'>{tipContent}</View>
                </View>
                <View className='second-section'>
                    <View className='cancel' onClick={() => closeModal()}>否</View>
                    <View className='confirm' onClick={confirm}>是</View>
                </View>
            </View>
        </View>
    )
}