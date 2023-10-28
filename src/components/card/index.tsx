import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { recentlyViewed } from "@/services/recentlyViewed"
import "./index.module.less"
import Clock from "../../assets/clock.png"
import CollectedIcon from "../../assets/collectedIcon.jpg"

export interface CardProps {
    currentListItemId?: string
    _id: string
    title: string
    time: string
    is_collected?: boolean
    is_deleted?: boolean
}

const typeRecord: Record<string, string> = {
    "0": "purchase_intention",
    "1": "purchase_solicitation",
    "2": "local_announcement"
}

export default function Card(props: CardProps) {

    const { currentListItemId, _id, title, time, is_collected } = props

    const handleClick = async () => {
        if (!currentListItemId) return
        Taro.navigateTo({ url: `/pages/detail/index?_id=${_id}&currentListItemId=${currentListItemId}&source=homePage` })
        const res = await recentlyViewed(_id, typeRecord[currentListItemId])
        if (!res) return
    }

    return (
        <View className='card' onClick={handleClick}>
            <View className='project-name'>{title}</View>
            <View className='bottom'>
                <View className='release-time'>
                    <img src={Clock} alt='' />
                    <View className='data'>{time}</View>
                </View>
                {is_collected && <img src={CollectedIcon} alt='' />}
            </View>
        </View>
    )
}