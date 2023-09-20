import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import "./index.module.less"
import Clock from "../../assets/clock.png"
import DeleteIcon from "../../assets/deleteIconSec.png"

export interface CardProps {
    currentListItemId?: string
    _id: string
    title: string
    time: string
    isCollected?: boolean
    is_deleted?: boolean
    onDelete: (_id: string) => void
}

export default function Card(props: CardProps) {
    const { currentListItemId, _id, title, time, onDelete } = props

    const handleClick = (event: any) => {
        event.stopPropagation()
        Taro.navigateTo({ url: `/pages/detail/index?id=${_id}&currentListItemId=${currentListItemId}&source=homePage`, })
    }

    const handleDelete = (event) => {
        event.stopPropagation()
        onDelete(_id)
    }

    return (
        <View className='card' onClick={handleClick}>
            {false && <View className='collected'>
                <View className='text'>
                    已收藏
                </View>
            </View>}
            <View className='project-name'>{title}</View>
            <View className='bottom'>
                <View className='release-time'>
                    <img src={Clock} alt='' />
                    <View className='data'>{time}</View>
                </View>
                <View className='delete-button' onClick={handleDelete}>删除</View>
            </View>
        </View>
    )
}