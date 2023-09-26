import { View } from "@tarojs/components"
import CollectedIcon from "../../assets/collectedIcon.jpg"
import UnCollectedIcon from "../../assets/unCollectedIcon.jpg"
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
                    {isCollected ? <img src={CollectedIcon} onClick={handleCollect} /> : <img src={UnCollectedIcon} onClick={handleCollect} />}
                </View>}
            </View>
        </View>
    )
}