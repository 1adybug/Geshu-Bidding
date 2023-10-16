import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Clock from "../../assets/clock.png"
import "./index.module.less"
import { RecycleBinCardProps } from "../recycleBinCard";
import CollectedIcon from "../../assets/collectedIcon.jpg"

const typeRecord: Record<string, string> = {
    "purchase_intention": "0",
    "purchase_solicitation": "1",
    "local_announcement": "2"
}

const sourceType: Record<string, string> = {
    "purchase_intention": "采购（意向）公开",
    "purchase_solicitation": "采购（征集）公告",
    "local_announcement": "地方公告"
}

export function CollectionCard(props: RecycleBinCardProps) {

    const { _id, title, time, type } = props

    function handleCardClick() {
        const currentListItemId = typeRecord[type]
        Taro.navigateTo({ url: `/pages/detail/index?_id=${_id}&currentListItemId=${currentListItemId}&source=myCollections` })
    }

    return (
        <View className='collection-card' onClick={handleCardClick}>
            <View className='top'>
                <View className='project-title'>{title}</View>
                <View className='release-time'>
                    <img src={Clock} alt='' />
                    <View className='data'>{time}</View>
                </View>
            </View>
            <View className='bottom'>
                <View className='source'>
                    <View className='label'>来源：</View>
                    <View className='data'>{sourceType[type]}</View>
                </View>
                <img src={CollectedIcon} alt='' />
            </View>
        </View>
    )
}