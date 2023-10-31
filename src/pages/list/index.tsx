import { View } from "@tarojs/components";
import AddIcon from "@/assets/adduserIcon.jpg"
import Taro from "@tarojs/taro";
import "./index.module.less"

export default function List() {

    function onAddClick() {
        Taro.navigateTo({ url: "/pages/addproject/index" })
    }

    return (
        <View className='list'>
            <img src={AddIcon} className='add' onClick={onAddClick} />
        </View>
    )
}