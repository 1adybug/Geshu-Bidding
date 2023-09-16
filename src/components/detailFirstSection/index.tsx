import { View } from "@tarojs/components"
import Collect from "../../assets/collect.png"
import Collected from "../../assets/collected.png"
import Clock from "../../assets/clock.png"
import "./index.module.less"

interface DetailFirstSectionProps {
    projectName?: string
    address?: string
    releaseTime?: string
    isCollected?: boolean
}

export default function DetailFirstSection(props: DetailFirstSectionProps) {
    const { projectName, releaseTime, isCollected } = props

    return (
        <View className='first-section'>
            <View className='title'>{projectName}</View>
            <View className='bottom'>
                <View className='tags'>
                    <img src={Clock} alt='' />
                    <View className='second'>{releaseTime}</View>
                </View>
                <View className='collect'>
                    <View className='export'>导出</View>
                    <View className='text'>{isCollected ? "已收藏" : "收藏"}</View>
                </View>
            </View>
        </View>
    )
}