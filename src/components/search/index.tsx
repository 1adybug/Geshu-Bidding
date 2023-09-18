import { View } from "@tarojs/components";
import { fuzzySearch } from "@/services/fuzzySearch";
import { useState } from "react";
import SearchIcon from "../../assets/search.png"
import ExpandSidebarIcon from "../../assets/expandSidebarIcon.png"
import FilterIcon from "../../assets/filterIcon.png"
import "./index.module.less"

interface SearchProps {
    changeDrawShow: () => void
    changeFilterShow: () => void
    valueInputed: (valueInputed: string) => void
}

export default function Search(props: SearchProps) {

    const { changeDrawShow, changeFilterShow, valueInputed } = props
    const [keyword, setKeyword] = useState("盱眙县")

    const handleClick = () => {
        changeDrawShow()
    }

    const handleSearch = async () => {
        valueInputed(keyword)
    }

    const filterIconClick = () => {
        changeFilterShow()
    }

    return (
        <View className='search'>
            <img src={ExpandSidebarIcon} alt='' onClick={handleClick} />
            <View className='wrapper'>
                <View className='icon-box'>
                    <img src={SearchIcon} alt='' onClick={handleSearch} />
                </View>
                <input type='search' placeholder='请输入项目名称' onChange={e => setKeyword(e.target.value)} />
            </View>
            <img src={FilterIcon} alt='' onClick={filterIconClick} />
        </View>
    )
}