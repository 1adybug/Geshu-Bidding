import { View } from "@tarojs/components";
import removeNbsp from "@/utils/removeWhitespaceInString";
import isNumberBullet from "@/utils/isNumberBullet";
import { PurchaseSolicitationAnnouncementDetail } from "../../pages/detail"
import "./index.module.less"

interface PurchaseSolicitationAnnouncementDetailProps extends Partial<PurchaseSolicitationAnnouncementDetail> { }

export default function PurchaseSolicitationAnnouncementDetailCard(props: PurchaseSolicitationAnnouncementDetailProps) {

    const { projectBasicInfo, purchasePersonInfo } = props

    return (
        <View className='purchase-solicitation-announcement-detail'>
            <View className='title'>关键信息</View>
            <View className='data'>
                {projectBasicInfo?.filter(e => !isNumberBullet(e)).filter(e => e.length > 2).map(e => {
                    return <View key={e}>{removeNbsp(e)}</View>
                })}
                {purchasePersonInfo?.filter(e => !isNumberBullet(e)).map(e => {
                    return <View key={e}>{removeNbsp(e)}</View>
                })}
            </View>
        </View>
    )
}