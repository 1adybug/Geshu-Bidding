import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import "./index.module.less"
import Clock from "../../assets/clock.png"

export interface CardProps {
    currentListItemId?: string
    _id: string
    title: string
    time: string
    isCollected?: boolean
}

export default function Card(props: CardProps) {
    const { currentListItemId, _id, title,  time, isCollected } = props
    const handleClick = () => {
        Taro.navigateTo({ url: `/pages/detail/index?id=${_id}&currentListItemId=${currentListItemId}`, })
    }

    return (
        <View className='card' onClick={handleClick}>
            {false && <View className='collected'>
                <View className='text'>
                    已收藏
                </View>
            </View>}
            <View className='project-name'>{title}</View>
            {/* <View className='project-summarize'>{projectSummarize}</View> */}
            <View className='bottom-info'>
                <View className='release-time'>
                    <img src={Clock} alt='' />
                    <View className='data'>{time}</View>
                </View>
                {/* <View className='city'>
                    淮安
                </View> */}
            </View>
        </View>
    )
}