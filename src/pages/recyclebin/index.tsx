import { View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import { getPurchaseIntentionDisclosures } from "@/services/puchaseIntentionDisclosure";
import { getPurchaseSocilitationAnnouncements } from "@/services/purchaseSocilitationAnnouncement";
import { wyDeepClone } from "wangyong-utils";
import RecycleBinCard from "@/components/recycleBinCard";
import { AtActivityIndicator } from "taro-ui"
import { useDidShow } from "@tarojs/taro";
import dayjs from "dayjs";
import "./index.module.less"

export default function RecycleBin() {

    const [deletedItems, setDeletedItems] = useState<PurchaseIntentionDisclosure[]>([])
    const [gotData, setGotData] = useState(false)

    useDidShow(() => {
        getAllDeleteds()
    })

    useEffect(() => {
        getAllDeleteds()
    }, [])

    async function getAllDeleteds() {
        const intentionDeletedsRes = await getPurchaseIntentionDisclosures()
        const solicitationDeletedRes = await getPurchaseSocilitationAnnouncements()
        const list = wyDeepClone([...intentionDeletedsRes.result, ...solicitationDeletedRes.result].filter(e => e.is_deleted).filter(e => !e.is_completely_deleted))
        setDeletedItems(list.sort((a: any, b: any) => dayjs(b.time).unix() - dayjs(a.time).unix()))
        setGotData(true)
    }

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='数据加载中...'></AtActivityIndicator>
            </View> : <View className='recyclebin'>
                {deletedItems.map((item: PurchaseIntentionDisclosure) => {
                    return (
                        <RecycleBinCard key={item._id} _id={item._id} title={item.title} time={item.time} type={item.type} />
                    )
                })}
            </View>}
        </Fragment>
    )
}