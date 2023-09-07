import { View } from "@tarojs/components";
import Home from "../../assets/home.png"
import List from "../../assets/list.png"
import My from "../../assets/my.png"
import "./index.module.less"

export default function Tabbar() {
    return (
        <View className='tabbar'>
            <View className='tab'>
                <img src={Home} alt='' />
                <View>首页</View>
            </View>
            <View className='tab'>
                <img src={List} alt='' />
                <View>列表</View>
            </View>
            <View className='tab'>
                <img src={My} alt='' />
                <View>我的</View>
            </View>
        </View>
    )
}