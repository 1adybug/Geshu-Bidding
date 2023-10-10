import { clearRecycleBin } from "@/services/clearRecycleBin"
import { View } from "@tarojs/components"

interface SecondaryConfirmModalProps {
    tipContent: string
}

export default function SecondaryConfirmModal(props: SecondaryConfirmModalProps) {

    const { tipContent } = props

    function cancel() {

    }

    async function confirm() {
        const res = await clearRecycleBin()
        if (!res) return
        console.log(res);
    }

    return (
        <View className='secondary-confir-modal'>
            <View className='title'>提示</View>
            <View className='first-section'>
                <View className='tip-content'>{tipContent}</View>
            </View>
            <View className='second-section'>
                <View className='cancel' onClick={cancel}>否</View>
                <View className='confirm' onClick={confirm}>是</View>
            </View>
        </View>
    )
}