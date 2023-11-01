import {  useState } from "react"
import { useDidShow } from "@tarojs/taro"
import { fetchRecentlyViewed } from "@/services/fetchRecentlyViewed"
import { wyDeepClone } from "wangyong-utils"
import recentlySort from "@/utils/recentlySort"
import { View } from "@tarojs/components"
import Card from "@/components/card"
import "./index.module.less"

export default function RecentlyViewed() {

    const [recentlyCardList, setrecentlyCardList] = useState<RecentlyClickCard[]>([])

    useDidShow(() => {
        init()
    })

    async function init() {
        const res = await fetchRecentlyViewed()
        if (!res) return
        const copyData = wyDeepClone(recentlySort(res.result.map((e: any) => {
            return {
                _id: e._id,
                title: e.title,
                href: e.href,
                releaseTime: e.time,
                is_collected: e.is_collected,
                is_completely_deleted: e.is_completely_deleted,
                is_deleted: e.is_deleted,
                clickedTime: e.detail[0].clickedTime,
                type: e.type
            }
        })))
        setrecentlyCardList(copyData)
    }

    return (
        <View className='main'>
            {recentlyCardList.map((project: RecentlyClickCard) => {
                return (
                    <Card key={project._id} title={project.title} time={project.releaseTime} _id={project._id} is_collected={project.is_collected} src='recently' lastClickedTime={project.clickedTime} type={project.type} />
                )
            })}
        </View>
    )
}