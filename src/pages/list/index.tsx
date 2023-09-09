import Card from "@/components/card";
import { View } from "@tarojs/components";
import "./index.module.less"
import Add from "../../assets/add.png"

export default function List() {
    return (
        <View className='list'>
            <Card id='' projectName='' projectSummarize='' releaseTime='' isCollected={false} />
            <img src={Add} />
        </View>
    )
}