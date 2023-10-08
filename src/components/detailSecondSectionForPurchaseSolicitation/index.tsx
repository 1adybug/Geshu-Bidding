import { View } from "@tarojs/components";
import { Attachment } from "@/pages/detail";
import DetailSecondSectionForPurchaseSolicitationFirstChild from "../detailSecondSectionForPurchaseSolicitationFirstChild";
import DetailSecondSectionForPurchaseSolicitationSecondChild from "../detailSecondSectionForPurchaseSolicitationSecondChild";
import "./index.module.less"
import Attachments from "../attachments";

interface DetailSecondSectionForPurchaseSolicitationProps {
    project_name?: string
    project_no?: string
    budget?: string
    submission_time?: string
    principal_unit?: string
    project_principal?: string
    principal_contact?: string
    haveAttachments: boolean,
    attachments: Attachment[]
}

export default function DetailSecondSectionForPurchaseSolicitation(props: DetailSecondSectionForPurchaseSolicitationProps) {
    const { budget, submission_time, principal_unit, project_name, project_no, project_principal, principal_contact, haveAttachments, attachments } = props
    return (
        <View className='detail-second-section-for-purchase-solicitation'>
            <DetailSecondSectionForPurchaseSolicitationFirstChild project_name={project_name} project_no={project_no} budget={budget} submission_time={submission_time} />
            <DetailSecondSectionForPurchaseSolicitationSecondChild project_principal={project_principal} principal_contact={principal_contact} principal_unit={principal_unit} />
            {haveAttachments && <Attachments attachments={attachments} />}
        </View>
    )
}