import { View } from "@tarojs/components"
import DetailSecondSectionFirstChild, { DetailSecondSectionFirstChildProps } from "../detailSecondSectionFirstChild"
import "./index.module.less"
import DetailSecondSectionSecondChild from "../detailSectionSectionSecondChild"
import { ProjectDetailTableProps } from "../projectDetailTable"

type DetailSecondSectionProps = DetailSecondSectionFirstChildProps & ProjectDetailTableProps

export default function DetailSecondSection(props: DetailSecondSectionProps) {
    const { projectSummarize, purchaseBudget, estimatedPurchaseMonth, isForSmallOrMediumEnterprise, toPurchaseEnergysavingOrEnvironmentalLabelingProducts, remark } = props
    return (
        <View className='main'>
            <DetailSecondSectionFirstChild projectSummarize={projectSummarize} />
            <DetailSecondSectionSecondChild purchaseBudget={purchaseBudget} estimatedPurchaseMonth={estimatedPurchaseMonth} isForSmallOrMediumEnterprise={isForSmallOrMediumEnterprise} toPurchaseEnergysavingOrEnvironmentalLabelingProducts={toPurchaseEnergysavingOrEnvironmentalLabelingProducts} remark={remark} />
        </View>
    )
}