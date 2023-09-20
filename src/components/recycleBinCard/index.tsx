import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import Clock from "../../assets/clock.png"
import "./index.module.less"

interface RecycleBinCardProps {
    _id: string
    title: string
    time: string
    type: CardType
    completelyDelete: (_id: string, type: CardType) => void
    restitution: (_id: string, type: CardType) => void
}

export default function RecycleBinCard(props: RecycleBinCardProps) {

    const { _id, title, time, type, completelyDelete, restitution } = props

    const handleCardClick = (event: any) => {
        event.stopPropagation()
        const currentListItemId = type === "purchase_intention" ? "0" : "1"
        Taro.navigateTo({ url: `/pages/detail/index?id=${_id}&currentListItemId=${currentListItemId}&source=recycleBin`, })
    }

    function onCompletelyDelete(event) {
        event.stopPropagation()
        completelyDelete(_id, type)
    }

    function onRestitutionButton(event) {
        event.stopPropagation()
        restitution(_id, type)
    }

    return (
        <View className='recycle-bin-card' onClick={handleCardClick}>
            <View className='top'>
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
            <View className='bottom'>
                <View className='completely-delete-button' onClick={onCompletelyDelete}>彻底删除</View>
                <View className='restitution-button' onClick={onRestitutionButton}>还原</View>
            </View>
        </View>
    )
}