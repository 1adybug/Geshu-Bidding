import { BaseEventOrig, Input, View } from "@tarojs/components";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import ClearInputIcon from "@/assets/clearInput.png"
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
    const [historyShow, setHistoryShow] = useState(false)
    const [searchHistoryList, setSearchHistoryList] = useState([])
    const [bottomShow, setBottomShow] = useState(false)

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const res = await fetchHistoryCache()
        if (!res) return
        res.length && setBottomShow(true)
        setSearchHistoryList(res)
    }

    const handleClick = () => {
        changeDrawShow()
    }

    const handleSearch = async () => {
        valueInputed(keyword)
        setHistoryShow(false)
    }

    const filterIconClick = () => {
        changeFilterShow()
    }

    function handleInput(e: BaseEventOrig) {
        const { value } = e.detail
        setKeyword(value)
        fetchHistoryCache().then(res => {
            const result = res.filter((item: string) => item.includes(e.detail.value))
            setSearchHistoryList(result)
            result.length ? setBottomShow(true) : setBottomShow(false)
        })
    }

    async function handleOnFocus() {
        const res = await fetchHistoryCache()
        if (!res) return
        res.length && setBottomShow(true)
        setSearchHistoryList(res)
        setHistoryShow(true)
    }

    async function fetchHistoryCache() {
        try {
            const res = await Taro.getStorage({ key: "searchHistory" })
            if (!res) return
            return res.data
        } catch (err) {
            return []
        }
    }

    function historyItemClick(e: string) {
        valueInputed(e)
        setKeyword(e)
        setHistoryShow(false)
    }

    function handleClearInput() {
        setKeyword("")
        valueInputed("")
    }

    async function clearhistory() {
        const res = await Taro.removeStorage({ key: "searchHistory" })
        if (!res) return
        init()
    }

    return (
        <View className='search'>
            <View className='top'>
                <img src={ExpandSidebarIcon} alt='' onClick={handleClick} />
                <View className={`wrapper ${(historyShow && searchHistoryList.length) ? 'wrapper-sec' : ''}`}>
                    {/* <View className='icon-box'>
                        <img src={SearchIcon} alt='' onClick={handleSearch} />
                    </View> */}
                    <Input placeholderClass='placeholder' placeholder='请输入项目名称' value={keyword} onInput={handleInput} onConfirm={handleSearch} onFocus={handleOnFocus} onBlur={() => setHistoryShow(false)} />
                    <View className='clear-input'>
                        {keyword.length ? <img src={ClearInputIcon} onClick={handleClearInput} /> : <img />}
                    </View>
                </View>
                <img src={FilterIcon} alt='' onClick={filterIconClick} />
            </View>
            {bottomShow && <View className='second'>
                <View className={`search-history ${historyShow ? 'search-history-show' : ''}`}>
                    <View className='list' onClick={() => console.log(1)}>
                        {
                            searchHistoryList.map((e: string) => {
                                return (
                                    <View key={e} className='list-item' onClick={() => historyItemClick(e)}>{e}</View>
                                )
                            })
                        }
                    </View>
                    <View className='bottom'>
                        <View className='desc' onClick={() => setHistoryShow(false)}>取消</View>
                        <View className='clear' onClick={clearhistory}>清空</View>
                    </View>
                </View>
            </View>
            }
        </View>
    )
}