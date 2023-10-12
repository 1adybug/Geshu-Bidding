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
    fileIDPrev: string,
    attachments: Attachment[],
    remark?: string
    modalChange: (title: string, downloadURL: string) => void
    remarkEditClick: () => void
}

export default function DetailSecondSectionForPurchaseSolicitation(props: DetailSecondSectionForPurchaseSolicitationProps) {
    const { budget, submission_time, principal_unit, project_name, project_no, project_principal, principal_contact, haveAttachments, fileIDPrev, attachments,remark, modalChange, remarkEditClick } = props
    return (
        <View className='detail-second-section-for-purchase-solicitation'>
            <DetailSecondSectionForPurchaseSolicitationFirstChild project_name={project_name} project_no={project_no} budget={budget} submission_time={submission_time} />
            <DetailSecondSectionForPurchaseSolicitationSecondChild project_principal={project_principal} principal_contact={principal_contact} principal_unit={principal_unit} remarkEditClick={remarkEditClick} remark={remark} />
            {haveAttachments && <Attachments attachments={attachments} fileIDPrev={fileIDPrev} modalChange={modalChange} />}
        </View>
    )
}