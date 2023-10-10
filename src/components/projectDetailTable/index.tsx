import { View } from "@tarojs/components";
import "./index.module.less"

interface ProjectDetailTableProps {
    projectName?: string;
    projectSummary?: string;
    budget?: string;
    purchaseMonth?: string;
    sfzmmxzxqycg?: string;
    sfcgjncphjbzcp?: string;
    remark?: string;
}

export default function ProjectDetailTable(props: ProjectDetailTableProps) {

    const { projectName, projectSummary, budget, purchaseMonth, sfzmmxzxqycg, sfcgjncphjbzcp, remark } = props

    return (
        <View className='project-detail-list'>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>项目名称</View>
                    <View className='content'>{projectName}</View>
                </View>
            </View>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>采购需求概况</View>
                    <View className='content'>{projectSummary}</View>
                </View>
            </View>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>采购预算（万元）</View>
                    <View className='content'>{budget}</View>
                </View>
            </View>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>预计采购月份</View>
                    <View className='content'>{purchaseMonth}</View>
                </View>
            </View>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>是否专门面向中小企业采购</View>
                    <View className='content'>{sfzmmxzxqycg}</View></View>
            </View>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>是否采购节能产品、环境标志产品</View>
                    <View className='content'>{sfcgjncphjbzcp}</View>
                </View>
            </View>
            <View className='list-item'>
                <View className='text'>
                    <View className='label'>备注</View>
                    <View className='content'>{remark ? remark : "无"}</View>
                </View>
            </View>
        </View>
    )
}