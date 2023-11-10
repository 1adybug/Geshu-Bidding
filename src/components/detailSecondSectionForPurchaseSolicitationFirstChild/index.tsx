import { View } from "@tarojs/components";
import "./index.module.less"

interface DetailSecondSectionForPurchaseSolicitationFirstChildProps {
    project_name?: string
    project_no?: string
    budget?: string
    submission_time?: string
}

export default function DetailSecondSectionForPurchaseSolicitationFirstChild(props: DetailSecondSectionForPurchaseSolicitationFirstChildProps) {
    const { project_name, project_no, budget, submission_time } = props
    return (
        <View className='detail-second-section-for-purchase-solicitation-first-child'>
            <View className='title'>项目基本情况</View>
            <View className='content'>
                <View className='project-name'>
                    <View className='label'>项目名称</View>
                    <View className='data'>{project_name ? project_name : "无"}</View>
                </View>
                <View className='project-code'>
                    <View className='label'>项目编号</View>
                    <View className='data'>{project_no ? project_no : "无"}</View>
                </View>
                <View className='budget'>
                    <View className='label'>预算金额</View>
                    <View className='data'>{budget ? budget : "无"}&nbsp;万</View>
                </View>
                <View className='submission-time'>
                    <View className='label'>投标截止时间</View>
                    <View className='data'>{submission_time ? submission_time : "无"}</View>
                </View>
            </View>
        </View>
    )
}