import { View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import { getPurchaseIntentionDisclosures } from "@/services/puchaseIntentionDisclosure";
import { getPurchaseSocilitationAnnouncements } from "@/services/purchaseSocilitationAnnouncement";
import { wyDeepClone } from "wangyong-utils";
import { CollectionCard } from "@/components/collectionCard";
import { AtActivityIndicator } from "taro-ui";
import { useDidShow } from "@tarojs/taro";
import dayjs from "dayjs";
import "./index.module.less"

export default function MyCollections() {

    const [mycollections, setMycollections] = useState<PurchaseIntentionDisclosure[]>([])
    const [gotData, setGotData] = useState(false)

    useDidShow(() => {
        getAllCollections()
    })

    useEffect(() => {
        getAllCollections()
    }, [])

    async function getAllCollections() {
        const res = await getPurchaseIntentionDisclosures()
        const res1 = await getPurchaseSocilitationAnnouncements()
        const list = wyDeepClone([...res.result, ...res1.result]).filter(e => e.is_collected)
        setMycollections(list.sort((a: any, b: any) => dayjs(b.time).unix() - dayjs(a.time).unix()))
        setGotData(true)
    }

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='数据加载中...'></AtActivityIndicator>
            </View> : <View className='my-collections'>
                {mycollections.map((item: PurchaseIntentionDisclosure) => {
                    return (
                        <CollectionCard key={item._id} _id={item._id} title={item.title} time={item.time} type={item.type} />
                    )
                })}
            </View>}
        </Fragment>
    )
}