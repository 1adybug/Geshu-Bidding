import { View } from "@tarojs/components"
import "./index.module.less"

interface RecycleBinTopSectionProps {
    itemsTotalNum: number
    clearClicked: () => void
}

export default function RecycleBinTopSection(props: RecycleBinTopSectionProps) {

    const { itemsTotalNum, clearClicked } = props

    function clearBin() {
        clearClicked()
    }

    return (
        <View className='recycle-bin-top-section'>
            <View className='total-num'>共&nbsp;{itemsTotalNum}&nbsp;条</View>
            <View onClick={clearBin} className='clear-button'>一键清空</View>
        </View>
    )
}

