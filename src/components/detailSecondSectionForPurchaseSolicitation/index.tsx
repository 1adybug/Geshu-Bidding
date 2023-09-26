import { View } from "@tarojs/components";
import DetailSecondSectionForPurchaseSolicitationFirstChild from "../detailSecondSectionForPurchaseSolicitationFirstChild";
import DetailSecondSectionForPurchaseSolicitationSecondChild from "../detailSecondSectionForPurchaseSolicitationSecondChild";
import "./index.module.less"

interface DetailSecondSectionForPurchaseSolicitationProps {
    project_name?: string
    project_no?: string
    budget?: string
    principal_unit?: string
    project_principal?: string
    principal_contact?: string
}

export default function DetailSecondSectionForPurchaseSolicitation(props: DetailSecondSectionForPurchaseSolicitationProps) {
    const { budget, principal_unit, project_name, project_no, project_principal, principal_contact } = props
    return (
        <View className='detail-second-section-for-purchase-solicitation'>
            <DetailSecondSectionForPurchaseSolicitationFirstChild project_name={project_name} project_no={project_no} budget={budget} />
            <DetailSecondSectionForPurchaseSolicitationSecondChild project_principal={project_principal} principal_contact={principal_contact} principal_unit={principal_unit} />
        </View>
    )
}