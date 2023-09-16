import { View } from "@tarojs/components";
import SearchIcon from "../../assets/search.png"
import ExpandSidebarIcon from "../../assets/expandSidebarIcon.png"
import FilterIcon from "../../assets/filterIcon.png"
import "./index.module.less"

export default function Search({ changeDrawShow }: { changeDrawShow: () => void }) {

    const handleClick = () => {
        changeDrawShow()
    }

    const filterIconClick = () => {

    }

    return (
        <View className='search'>
            <img src={ExpandSidebarIcon} alt='' onClick={handleClick} />
            <View className='wrapper'>
                <View className='icon-box'>
                    <img src={SearchIcon} alt='' />
                </View>
                <input type='search' placeholder='请输入项目名称' />
            </View>
            <img src={FilterIcon} alt='' onClick={filterIconClick} />
        </View>
    )
}