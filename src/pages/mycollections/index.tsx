import { View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import { getPurchaseIntentionDisclosures } from "@/services/puchaseIntentionDisclosure";
import { getPurchaseSocilitationAnnouncements } from "@/services/purchaseSocilitationAnnouncement";
import { wyDeepClone } from "wangyong-utils";
import { CollectionCard } from "@/components/collectionCard";
import { AtActivityIndicator } from "taro-ui";
import { useDidShow } from "@tarojs/taro";
import { fetchLocalAnnouncement } from "@/services/fetchLocalAnnouncement";
import getIntentionCollected from "@/services/getIntentionCollected";
import getSolicitationCollected from "@/services/getSolicitationCollected";
import getLocalCollected from "@/services/getLocalCollected";
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
        const res = await getIntentionCollected()
        const res1 = await getSolicitationCollected()
        const res2 = await getLocalCollected()
        if (!res && !res1 && !res2) return
        const list = wyDeepClone([...res.result, ...res1.result, ...res2.result])
        console.log(list);
        
        setMycollections(list.sort((a: any, b: any) => dayjs(b.time).unix() - dayjs(a.time).unix()))
        setGotData(true)
    }

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
            </View>}
        </Fragment>
    )
}