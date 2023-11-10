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
    lastClickedTime?: string
    src?: string
    type?: "purchase_intention" | "purchase_solicitation" | "local_announcement"
}

const typeRecord: Record<string, string> = {
    "0": "purchase_intention",
    "1": "purchase_solicitation",
    "2": "local_announcement"
}

const recentlyCardType: Record<string, string> = {
    "purchase_intention": "采购（意向）公开",
    "purchase_solicitation": "采购（征集）公告",
    "local_announcement": "地方公告"
}

const recentlySrcCurrentListItemId: Record<string, string> = {
    "purchase_intention": "0",
    "purchase_solicitation": "1",
    "local_announcement": "2"
}

export default function Card(props: CardProps) {

    const { src, lastClickedTime, currentListItemId, _id, title, time, is_collected, type } = props

    const handleClick = async () => {
        if (src === "recently" && type) {
            Taro.navigateTo({ url: `/pages/detail/index?_id=${_id}&currentListItemId=${recentlySrcCurrentListItemId[type]}&source=homePage&type=recently` })
            return
        }
        if (!currentListItemId) return
        Taro.navigateTo({ url: `/pages/detail/index?_id=${_id}&currentListItemId=${currentListItemId}&source=homePage` })
        const res = await recentlyViewed(_id, typeRecord[currentListItemId])
        if (!res) return
    }

    return (
        <View className='card' onClick={handleClick}>
            <View className={src === "recently" ? 'section-one-for-recent' : 'section-one'}>
                <View className='title'>{title}</View>
                {src === "recently" && type && <View className='last-click-time'>上次浏览时间：{lastClickedTime}</View>}
            </View>
            <View className='bottom'>
                {src === "recently" && type && <View className='src'>来源：{recentlyCardType[type]}</View>}
                {src !== "recently" && <View className='release-time'>
                    <img src={Clock} alt='' />
                    <View className='data'>{time}</View>
                </View>}
                {is_collected && <img src={CollectedIcon} alt='' />}
            </View>
        </View>
    )
}