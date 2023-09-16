import { View } from "@tarojs/components";
import { PurchaseSolicitationAnnouncementDetail } from "../../pages/detail"
import "./index.module.less"

interface PurchaseSolicitationAnnouncementDetailProps extends Partial<PurchaseSolicitationAnnouncementDetail> { }

export default function PurchaseSolicitationAnnouncementDetailCard(props: PurchaseSolicitationAnnouncementDetailProps) {

    const { projectBasicInfo, purchasePersonInfo } = props

    return (
        <View className='purchase-solicitation-announcement-detail'>
            <View className='title'>关键信息</View>
            <View className='data'>
                {projectBasicInfo?.map(e => {
                    return <View key={e}>{e}</View>
                })}
                {purchasePersonInfo?.map(e => {
                    return <View key={e}>{e}</View>
                })}
            </View>
        </View>
    )
}