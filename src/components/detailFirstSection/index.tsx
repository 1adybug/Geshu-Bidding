import { View } from "@tarojs/components"
import "./index.module.less"

interface DetailFirstSectionProps {
    projectName?: string
    address?: string
    releaseTime?: string
}

export default function DetailFirstSection(props: DetailFirstSectionProps) {
    const { projectName, address, releaseTime } = props

    return (
        <View className='first-section'>
            <View className='title'>{projectName}</View>
            <View className='tags'>
                <View className='first'>{address}</View>
                <View className='second'>{releaseTime}</View>
            </View>
        </View>
    )
}