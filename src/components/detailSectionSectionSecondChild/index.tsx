import { View } from "@tarojs/components"
import "./index.module.less"
import ProjectDetailTable, { ProjectDetailTableProps } from "../projectDetailTable"

export default function DetailSecondSectionSecondChild(props: ProjectDetailTableProps) {
    const { purchaseBudget, estimatedPurchaseMonth, isForSmallOrMediumEnterprise, toPurchaseEnergysavingOrEnvironmentalLabelingProducts, remark } = props
    return (
        <View className='detail-second-section-second-child-main'>
            <View className='title'>项目详情</View>
            <ProjectDetailTable purchaseBudget={purchaseBudget} estimatedPurchaseMonth={estimatedPurchaseMonth} isForSmallOrMediumEnterprise={isForSmallOrMediumEnterprise} toPurchaseEnergysavingOrEnvironmentalLabelingProducts={toPurchaseEnergysavingOrEnvironmentalLabelingProducts} remark={remark} />
        </View>
    )
}