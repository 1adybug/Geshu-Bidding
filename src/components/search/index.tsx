import { View } from "@tarojs/components";
import SearchIcon from "../../assets/search.png"
import "./index.module.less"

export default function Search() {
    return (
      <View className='search'>
        <input type='search' placeholder='请输入...' />
        <img src={SearchIcon} alt='' />
      </View>
    )
}