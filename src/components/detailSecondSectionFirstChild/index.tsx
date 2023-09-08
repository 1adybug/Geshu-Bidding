import { View } from "@tarojs/components"
import "./index.module.less"

export interface DetailSecondSectionFirstChildProps {
    projectSummarize?: string
}

export default function DetailSecondSectionFirstChild(props: DetailSecondSectionFirstChildProps) {
    const { projectSummarize } = props
    return (
        <View className='detail-second-section-first-child-main'>
            <View className='title'>项目概括</View>
            <View className='data'>&nbsp;&nbsp;&nbsp;&nbsp;{projectSummarize}</View>
        </View>
    )
}