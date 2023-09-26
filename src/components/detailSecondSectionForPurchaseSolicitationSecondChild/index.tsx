import { View } from "@tarojs/components";
import "./index.module.less"

interface DetailSecondSectionForPurchaseSolicitationSecondChildProps {
    principal_unit?: string
    project_principal?: string
    principal_contact?: string
}

export default function DetailSecondSectionForPurchaseSolicitationSecondChild(props: DetailSecondSectionForPurchaseSolicitationSecondChildProps) {
    const { principal_unit, project_principal, principal_contact } = props
    return (
        <View className='detail-second-section-for-purchase-solicitation-second-child'>
            <View className='title'>采购人/招标人信息</View>
            <View className='content'>
                <View className='principal-unit'>
                    <View className='name'>单位：</View>
                    <View className='data'>{principal_unit ? principal_unit : "无"}</View>
                </View>
                <View className='principal-name'>
                    <View className='name'>姓名：</View>
                    <View className='data'>{project_principal ? project_principal : "无"}</View>
                </View>
                <View className='principal-contact'>
                    <View className='name'>联系方式：</View>
                    <View className='data'>{principal_contact ? principal_contact : "无"}</View>
                </View>
            </View>
        </View>
    )
}