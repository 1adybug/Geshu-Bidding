import { Fragment, useState } from "react"
import { useDidShow } from "@tarojs/taro"
import { fetchRecentlyViewed } from "@/services/fetchRecentlyViewed"
import { View } from "@tarojs/components"
import Card from "@/components/card"
import { AtActivityIndicator } from "taro-ui"
import { wyDeepClone } from "wangyong-utils"
import dayjs from "dayjs"
import "./index.module.less"

export default function RecentlyViewed() {

    const [recentlyCardList, setrecentlyCardList] = useState<RecentlyClickCard[]>([])
    const [gotData, setGotData] = useState(false)

    useDidShow(() => {
        init()
    })

    async function init() {
        const res = await fetchRecentlyViewed()
        if (!res) return
        const dataCopy = wyDeepClone(res.result)
        setrecentlyCardList(dataCopy.sort((a: any, b: any) => dayjs(b.clickedTime).unix() - dayjs(a.clickedTime).unix()))
        setGotData(true)
    }

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='加载中...'></AtActivityIndicator>
            </View> : <View className='main'>
                {recentlyCardList.map((project: RecentlyClickCard) => {
                    return (
                        <Card key={project._id} title={project.title} time={project.releaseTime} _id={project._id} is_collected={project.is_collected} src='recently' lastClickedTime={project.clickedTime} type={project.type} />
                    )
                })}
            </View>}
        </Fragment>

    )
}