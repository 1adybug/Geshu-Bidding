import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import "./index.module.less"
import Clock from "../../assets/clock.png"

export interface CardProps {
    currentListItemId?: string
    _id: string
    title: string
    time: string
    is_collected?: boolean
    is_deleted?: boolean
}

export default function Card(props: CardProps) {

    const { currentListItemId, _id, title, time, is_collected } = props

    const handleClick = () => {
        Taro.navigateTo({ url: `/pages/detail/index?_id=${_id}&currentListItemId=${currentListItemId}&source=homePage`})
    }

    return (
        <View className='card' onClick={handleClick}>
            {is_collected && <View className='collected'>
                <View className='text'>
                    已收藏
                </View>
            </View>}
            <View className='project-name'>{title}</View>
            <View className='release-time'>
                <img src={Clock} alt='' />
                <View className='data'>{time}</View>
            </View>
        </View>
    )
}