import { View } from "@tarojs/components";
import { Attachment } from "@/pages/detail";
import Taro from "@tarojs/taro";
import DetailSecondSectionForPurchaseSolicitationFirstChild from "../detailSecondSectionForPurchaseSolicitationFirstChild";
import DetailSecondSectionForPurchaseSolicitationSecondChild from "../detailSecondSectionForPurchaseSolicitationSecondChild";
import "./index.module.less"
import Attachments from "../attachments";
import EditIcon from "../../assets/edit.png"


interface DetailSecondSectionForPurchaseSolicitationProps {
    link_id?: string,
    currentListItemId?: string
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
    attachmentClicked: (gotDataStatus: boolean) => void
}

export default function DetailSecondSectionForPurchaseSolicitation(props: DetailSecondSectionForPurchaseSolicitationProps) {

    const { link_id, currentListItemId, budget, submission_time, principal_unit, project_name, project_no, project_principal, principal_contact, haveAttachments, fileIDPrev, attachments, remark, modalChange, remarkEditClick, attachmentClicked } = props


    // function remarkIconClick() {
    //     Taro.navigateTo({ url: `/pages/remarkedit/index?link_id=${link_id}&currentListItemId=${currentListItemId}` })
    // }

    return (
        <View className='detail-second-section-for-purchase-solicitation'>
            <DetailSecondSectionForPurchaseSolicitationFirstChild project_name={project_name} project_no={project_no} budget={budget} submission_time={submission_time} />
            <DetailSecondSectionForPurchaseSolicitationSecondChild project_principal={project_principal} principal_contact={principal_contact} principal_unit={principal_unit} remarkEditClick={remarkEditClick} />
            <View className='remark'>
                <View className='title'>
                    <View className='name'>备注：</View>
                    {/* <img src={EditIcon} onClick={() => remarkEditClick()} /> */}
                    <img src={EditIcon} onClick={() => remarkEditClick()} />
                </View>
                <View className='data'>{remark ? remark : "无"}</View>
            </View>
            {haveAttachments && <Attachments attachments={attachments} fileIDPrev={fileIDPrev} />}
        </View>
    )
}