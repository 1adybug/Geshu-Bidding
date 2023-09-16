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
        <View className='project-detail-table'>
            <View className='table-header'>
                <View className='child'>采购预算（万元）</View>
                <View className='child'>预计采购月份</View>
                <View className='child'>是否面向中小企业采购</View>
                <View className='child'>是否采购节能产品、环境标志产品</View>
                <View className='child'>备注</View>
            </View>
            <View className='table-body'>
                <View className='child'>{purchaseBudget}</View>
                <View className='child'>{estimatedPurchaseMonth}</View>
                <View className='child'>{isForSmallOrMediumEnterprise ? "是" : "否"}</View>
                <View className='child'>{toPurchaseEnergysavingOrEnvironmentalLabelingProducts ? "是" : "否"}</View>
                <View className='child'>{remark}</View>
            </View>
        </View>
    )
}