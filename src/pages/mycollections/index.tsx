import { View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import { wyDeepClone } from "wangyong-utils";
import { CollectionCard } from "@/components/collectionCard";
import { AtActivityIndicator } from "taro-ui";
import Taro, { useDidShow } from "@tarojs/taro";
import myCollectionsPaginationQuery from "@/services/myCollectionsPaginationQuery";
import dayjs from "dayjs";
import "./index.module.less"

export default function MyCollections() {

    const [mycollections, setMycollections] = useState<PurchaseIntentionDisclosure[]>([])
    const [gotData, setGotData] = useState(false)
    const [pageIndex, setPageIndex] = useState(1)
    const [haveMore, setHaveMore] = useState(true)

    useDidShow(() => {
        getAllCollections()
    })

    useEffect(() => {
        getAllCollections()
    }, [pageIndex])

    async function getAllCollections() {
        const res = await myCollectionsPaginationQuery(pageIndex)
        if (!res) return
        const list = wyDeepClone(res.result)
        if (pageIndex > 1) {
            setMycollections([...mycollections, ...list.sort((a: any, b: any) => dayjs(b.time).unix() - dayjs(a.time).unix())])
            list.length < 15 && setHaveMore(false)
        } else {
            setMycollections(list.sort((a: any, b: any) => dayjs(b.time).unix() - dayjs(a.time).unix()))
            list.length < 15 && setHaveMore(false)
        }
        setGotData(true)
    }

    Taro.useReachBottom(() => {
        setPageIndex(pageIndex + 1)
    })

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='加载中...'></AtActivityIndicator>
            </View> : <View className='my-collections'>
                {mycollections.map((item: PurchaseIntentionDisclosure) => {
                    return (
                        <CollectionCard key={item._id} _id={item._id} title={item.title} time={item.time} type={item.type} />
                    )
                })}
                {mycollections.length > 0 && <View className='next-page'>加载更多</View>}
            </View>}
        </Fragment>
    )
}