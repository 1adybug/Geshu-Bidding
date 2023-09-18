import { View } from "@tarojs/components";
import { fuzzySearch } from "@/services/fuzzySearch";
import { useState } from "react";
import SearchIcon from "../../assets/search.png"
import ExpandSidebarIcon from "../../assets/expandSidebarIcon.png"
import FilterIcon from "../../assets/filterIcon.png"
import "./index.module.less"

interface SearchProps {
    currentListItemId: string
    changeDrawShow: () => void
}

export default function Search(props: SearchProps) {

    const { currentListItemId, changeDrawShow } = props
    const [keyword, setKeyword] = useState("")

    const handleClick = () => {
        changeDrawShow()
    }

    const handleSearch = async () => {
        console.log(currentListItemId);
        const res = await fuzzySearch(currentListItemId, keyword)
        console.log(5, res);
    }

    const filterIconClick = () => {

    }

    return (
        <View className='search'>
            <img src={ExpandSidebarIcon} alt='' onClick={handleClick} />
            <View className='wrapper'>
                <View className='icon-box'>
                    <img src={SearchIcon} alt='' onClick={handleSearch} />
                </View>
                <input type='search' placeholder='请输入项目名称' />
            </View>
            <img src={FilterIcon} alt='' onClick={filterIconClick} />
        </View>
    )
}