import { View } from "@tarojs/components";
import "./index.module.less"

export interface ProjectDetailTableProps {
    /** 采购预算*/
    purchaseBudget?: string
    /** 预计采购月份*/
    estimatedPurchaseMonth?: string
    /** 是否面向中小企业采购*/
    isForSmallOrMediumEnterprise?: string
    /** 是否采购节能产品、环境标志产品*/
    toPurchaseEnergysavingOrEnvironmentalLabelingProducts?: string
    /** 备注*/
    remark?: string
}

export default function ProjectDetailTable(props: ProjectDetailTableProps) {

    const { purchaseBudget, estimatedPurchaseMonth, isForSmallOrMediumEnterprise, toPurchaseEnergysavingOrEnvironmentalLabelingProducts, remark } = props

    return (
        <View className='project-detail-list'>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>采购预算（万元）</View>
                    <View className='content'>{purchaseBudget}</View>
                </View>
            </View>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>预计采购月份</View>
                    <View className='content'>{estimatedPurchaseMonth}</View>
                </View>
            </View>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>是否专门面向中小企业采购</View>
                    <View className='content'>{isForSmallOrMediumEnterprise}</View></View>
            </View>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>是否采购节能产品、环境标志产品</View>
                    <View className='content'>{toPurchaseEnergysavingOrEnvironmentalLabelingProducts}</View>
                </View>
            </View>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>备注</View>
                    <View className='content'>{remark ? remark : "无"}</View>
                </View>
            </View>
        </View>
    )
}