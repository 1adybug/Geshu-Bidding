import { BaseEventOrig, Input, View } from "@tarojs/components";
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
    const [keyword, setKeyword] = useState("")

    const handleClick = () => {
        changeDrawShow()
    }

    const handleSearch = async () => {
        valueInputed(keyword)
    }

    const filterIconClick = () => {
        changeFilterShow()
    }

    function test(e:BaseEventOrig){
        setKeyword(e.detail.value)
    }

    return (
        <View className='search'>
            <img src={ExpandSidebarIcon} alt='' onClick={handleClick} />
            <View className='wrapper'>
                <View className='icon-box'>
                    <img src={SearchIcon} alt='' onClick={handleSearch} />
                </View>
                <Input placeholderClass='placeholder' placeholder='请输入项目名称' onInput={test} onConfirm={handleSearch} />
            </View>
            <img src={FilterIcon} alt='' onClick={filterIconClick} />
        </View>
    )
}