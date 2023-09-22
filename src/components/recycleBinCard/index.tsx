import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Clock from "../../assets/clock.png"
import "./index.module.less"
 
export interface RecycleBinCardProps {
    _id: string
    title: string
    time: string
    type: CardType
}

export default function RecycleBinCard(props: RecycleBinCardProps) {

    const { _id, title, time, type } = props

    const handleCardClick = () => {
        const currentListItemId = type === "purchase_intention" ? "0" : "1"
        Taro.navigateTo({ url: `/pages/detail/index?_id=${_id}&currentListItemId=${currentListItemId}&source=recycleBin`, })
    }

    return (
        <View className='recycle-bin-card' onClick={handleCardClick}>
            <View className='project-title'>{title}</View>
            <View className='middle'>
                <View className='source'>
                    <View className='label'>来源：</View>
                    <View className='data'>{type === "purchase_intention" ? "采购（意向）公开" : "采购（征集）公告"}</View>
                </View>
                <View className='release-time'>
                    <img src={Clock} alt='' />
                    <View className='data'>{time}</View>
                </View>
            </View>
        </View>
    )
}