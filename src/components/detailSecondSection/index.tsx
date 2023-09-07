import { View } from "@tarojs/components"
import DetailSecondSectionFirstChild, { DetailSecondSectionFirstChildProps } from "../detailSecondSectionFirstChild"
import "./index.module.less"
import DetailSecondSectionSecondChild from "../detailSectionSectionSecondChild"

interface DetailSecondSectionProps extends DetailSecondSectionFirstChildProps {

}

export default function DetailSecondSection(props: DetailSecondSectionProps) {
    const { projectSummarize } = props
    return (
        <View className='main'>
            <DetailSecondSectionFirstChild projectSummarize={projectSummarize} />
            <DetailSecondSectionSecondChild />
        </View>
    )
}