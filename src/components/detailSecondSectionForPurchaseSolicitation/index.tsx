import { View } from "@tarojs/components";
import DetailSecondSectionForPurchaseSolicitationFirstChild from "../detailSecondSectionForPurchaseSolicitationFirstChild";
import DetailSecondSectionForPurchaseSolicitationSecondChild from "../detailSecondSectionForPurchaseSolicitationSecondChild";
import  "./index.module.less"

interface DetailSecondSectionForPurchaseSolicitationProps {
    project_name?: string
    project_no?: string
    project_principal?: string
    principal_contact?: string
}

export default function DetailSecondSectionForPurchaseSolicitation(props: DetailSecondSectionForPurchaseSolicitationProps) {
    const { project_name, project_no, project_principal, principal_contact } = props
    return (
        <View className='detail-second-section-for-purchase-solicitation'>
            <DetailSecondSectionForPurchaseSolicitationFirstChild project_name={project_name} project_no={project_no} />
            <DetailSecondSectionForPurchaseSolicitationSecondChild project_principal={project_principal} principal_contact={principal_contact} />
        </View>
    )
}