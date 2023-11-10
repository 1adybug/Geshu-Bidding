import { View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import "./index.module.less"

interface ProjectCardProps {
    _id: string
    projectNo: string
    projectName: string
    winningTime: string
    receptionTime: string
    shouldPayAmount: string
    unpaidAmount: string
}

export default function ProjectCard(props: ProjectCardProps) {

    const { _id, projectNo, projectName, winningTime, receptionTime, shouldPayAmount, unpaidAmount } = props

    function handleCardCLick() {
        Taro.navigateTo({ url: `/pages/projectdetail/index?_id=${_id}` })
    }

    return (
        <View className='project-card' onClick={handleCardCLick}>
            <View className='item'>
                <View className='label'>
                    <View className='text'>项目名称</View>
                    <View className='colon'>：</View>
                </View>
                <View className='data'>{projectName}</View>
            </View>
            <View className='item'>
                <View className='label'>
                    <View className='text'>项目编号</View>
                    <View className='colon'>：</View>
                </View>
                <View className='data'>{projectNo}</View>
            </View>
            <View className='item'>
                <View className='label'>
                    <View className='text'>中标时间</View>
                    <View className='colon'>：</View>
                </View>
                <View className='data'>{winningTime}</View>
            </View>
            <View className='item'>
                <View className='label'>
                    <View className='text'>验收时间</View>
                    <View className='colon'>：</View>
                </View>
                <View className='data'>{receptionTime}</View>
            </View>
            <View className='item'>
                <View className='label'>
                    <View className='text'>应付金额</View>
                    <View className='colon'>：</View>
                </View>
                <View className='data-shouldpay'>{shouldPayAmount}</View>
            </View>
            <View className='item'>
                <View className='label'>
                    <View className='text'>未付金额</View>
                    <View className='colon'>：</View>
                </View>
                <View className='data-unpaid'>{unpaidAmount}</View>
            </View>
            {/* <View className='see-more'>点击查看详情&gt;&gt;</View> */}
        </View>
    )
}