import { View } from "@tarojs/components"
import "./index.module.less"

export default function ProjectSource(props: { projectSource: string }) {
    const { projectSource } = props
    return (
        <View className='project-source'>
            <View className='title'>项目来源</View>
            <View className='data'>{projectSource}</View>
        </View>
    )
}