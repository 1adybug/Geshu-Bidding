import { clearRecycleBin } from "@/services/clearRecycleBin"
import { View } from "@tarojs/components"
import Alarm from "../../assets/alarm.jpg"
import "./index.module.less"

interface SecondaryConfirmModalProps {
    tipContent: string
    closeModal: () => void
    clearSucceed: () => void
}

export default function SecondaryConfirmModal(props: SecondaryConfirmModalProps) {

    const { tipContent, closeModal, clearSucceed } = props

    function cancel() {
        closeModal()
    }

    async function confirm() {
        const res = await clearRecycleBin()
        if (!res) return
        console.log(res);
        clearSucceed()
        closeModal()
    }

    return (
        <View className='secondary-confir-modal'>
            <View className='title'>提示</View>
            <View className='bottom-container'>
                <View className='first-section'>
                    <img src={Alarm} alt='' />
                    <View className='tip-content'>{tipContent}</View>
                </View>
                <View className='second-section'>
                    <View className='cancel' onClick={cancel}>否</View>
                    <View className='confirm' onClick={confirm}>是</View>
                </View>
            </View>
        </View>
    )
}