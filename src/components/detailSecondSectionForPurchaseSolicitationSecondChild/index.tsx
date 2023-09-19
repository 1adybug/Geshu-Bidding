import { View } from "@tarojs/components";
import "./index.module.less"

interface DetailSecondSectionForPurchaseSolicitationSecondChildProps {

}

export default function DetailSecondSectionForPurchaseSolicitationSecondChild(props: DetailSecondSectionForPurchaseSolicitationSecondChildProps) {
    return (
        <View className='detail-second-section-for-purchase-solicitation-second-child'>
            <View className='title'>采购人/招标人信息</View>
            <View className='content'>
                <View className='name'>姓名：</View>
                <View className='data'></View>
            </View>
            <View className='content'>
                <View className='name'>联系方式：</View>
                <View className='data'></View>
            </View>
        </View>
    )
}