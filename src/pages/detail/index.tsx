import { View } from "@tarojs/components";
import { useEffect } from "react";
import { useRouter } from "@tarojs/taro";
import { findSinglePurchaseIntentionDisclosureById } from "@/services/findSinglePurchaseIntentionDisclosureById";
import "./index.module.less"


export default function Detail() {
    const router = useRouter()
    const { id } = router.params

    useEffect(() => {
        getSinglePurchaseIntentionDisclosure()
    }, [])

    async function getSinglePurchaseIntentionDisclosure() {
        if (!id) return
        const res = findSinglePurchaseIntentionDisclosureById(id)
        console.log(res);
    }

    return (
        <View className='detail'>

            {/* <DetailFirstSection projectName={obj?.projectName} address={obj?.address} releaseTime={obj?.releaseTime} isCollected={obj?.isCollected} />
            <DetailSecondSection projectSummarize={obj?.projectSummarize} purchaseBudget={obj?.purchaseBudget} estimatedPurchaseMonth={obj?.estimatedPurchaseMonth} isForSmallOrMediumEnterprise={obj?.isForSmallOrMediumEnterprise} toPurchaseEnergysavingOrEnvironmentalLabelingProducts={obj?.toPurchaseEnergysavingOrEnvironmentalLabelingProducts} remark={obj?.remark} /> */}
        </View>
    )
}