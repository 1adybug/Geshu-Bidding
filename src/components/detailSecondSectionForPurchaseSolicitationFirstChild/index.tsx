import { View } from "@tarojs/components";
import "./index.module.less"

interface DetailSecondSectionForPurchaseSolicitationFirstChildProps {

}

export default function DetailSecondSectionForPurchaseSolicitationFirstChild(props: DetailSecondSectionForPurchaseSolicitationFirstChildProps) {
    return (
        <View className='detail-second-section-for-purchase-solicitation-first-child'>
            <View className='title'>项目基本情况</View>
            <View className='content'>
                <View className='project-name'>
                    <View className='label'>项目名称：</View>
                    <View className='data'></View>
                </View>
                <View className='project-code'>
                    <View className='label'>项目编号：</View>
                    <View className='data'></View>
                </View>
            </View>
        </View>
    )
}