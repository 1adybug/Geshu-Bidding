import { View } from "@tarojs/components";
import DetailSecondSectionForPurchaseSolicitationFirstChild from "../detailSecondSectionForPurchaseSolicitationFirstChild";
import DetailSecondSectionForPurchaseSolicitationSecondChild from "../detailSecondSectionForPurchaseSolicitationSecondChild";

interface DetailSecondSectionForPurchaseSolicitationProps {

}

export function DetailSecondSectionForPurchaseSolicitation(props: DetailSecondSectionForPurchaseSolicitationProps) {
    return (
        <View className='detail-second-section-for-purchase-solicitation'>
            <DetailSecondSectionForPurchaseSolicitationFirstChild />
            <DetailSecondSectionForPurchaseSolicitationSecondChild />
        </View>
    )
}