import { View } from "@tarojs/components";
import Clock from "../../assets/clock.png"
import "./index.module.less"

interface RecycleBinCardProps {
    _id: string
    title: string
    time: string
    completelyDelete: (_id: string) => void
    restitution: (_id: string) => void
}

export default function RecycleBinCard(props: RecycleBinCardProps) {

    const { _id, title, time, completelyDelete, restitution } = props

    return (
        <View className='recycle-bin-card'>
            <View className='top'>
                <View className='project-title'>{title}</View>
                <View className='release-time'>
                    <img src={Clock} alt='' />
                    <View className='data'>{time}</View>
                </View>
            </View>
            <View className='bottom'>
                <View className='completely-delete-button'>彻底删除</View>
                <View className='restitution-button'>还原</View>
            </View>
        </View>
    )
}