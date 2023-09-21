import { View } from "@tarojs/components"
import Clock from "../../assets/clock.png"
import "./index.module.less"

interface DetailFirstSectionProps {
    _id?: string
    currentListItemId?: string
    projectName?: string
    address?: string
    releaseTime?: string
    isCollected?: boolean
    source?: string
    collect: (_id?: string, sourceId?: string, collectedStatus?: boolean) => void
}

export default function DetailFirstSection(props: DetailFirstSectionProps) {

    const { _id, currentListItemId, projectName, releaseTime, isCollected, source, collect } = props

    function handleCollect() {
        collect(_id, currentListItemId, isCollected)
    }

    return (
        <View className='first-section'>
            <View className='title'>{projectName}</View>
            <View className='bottom'>
                <View className='tags'>
                    <img src={Clock} alt='' />
                    <View className='second'>{releaseTime}</View>
                </View>
                {source === "homePage" && <View className='collect'>
                    {currentListItemId === "1" && <View className='export'>导出</View>}
                    <View className={isCollected ? "collected-text" : "uncollected-text"} onClick={handleCollect}>{isCollected ? "已收藏" : "收藏"}</View>
                </View>}
            </View>
        </View>
    )
}