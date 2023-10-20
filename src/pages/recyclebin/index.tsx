import { View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import { wyDeepClone } from "wangyong-utils";
import RecycleBinCard from "@/components/recycleBinCard";
import { AtActivityIndicator } from "taro-ui"
import { useDidShow } from "@tarojs/taro";
import dayjs from "dayjs";
import RecycleBinTopSection from "@/components/recyclebinTopSection";
import Shadow from "@/components/shadow";
import SecondaryConfirmModal from "@/components/secondaryConfirmModal";
import { getAllDeletedItems } from "@/services/getAllDeletedItems";
import "./index.module.less"

export default function RecycleBin() {

    const [deletedItems, setDeletedItems] = useState<PurchaseIntentionDisclosure[]>([])
    const [gotData, setGotData] = useState(false)
    const [drawShow, setDrawShow] = useState(false)

    useDidShow(() => {
        getAllDeleteds()
    })

    useEffect(() => {
        getAllDeleteds()
    }, [])

    async function getAllDeleteds() {
        const res = await getAllDeletedItems()
        const list = wyDeepClone(res.result.filter(e => e.is_deleted).filter(e => !e.is_completely_deleted))
        setDeletedItems(list.sort((a: any, b: any) => dayjs(b.time).unix() - dayjs(a.time).unix()))
        if (!res) return
        setGotData(true)
    }

    function handleClearClicked() {
        setDrawShow(true)
    }

    function handleShadowClose() {
        setDrawShow(false)
    }

    function handleCloseModal() {
        setDrawShow(false)
    }

    function handleClearSucceed() {
        getAllDeleteds()
    }

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='数据加载中...'></AtActivityIndicator>
            </View> : <View className='recyclebin'>
                <RecycleBinTopSection itemsTotalNum={deletedItems.length} clearClicked={handleClearClicked} />
                {deletedItems.map((item: PurchaseIntentionDisclosure) => {
                    return (
                        <RecycleBinCard key={item._id} _id={item._id} title={item.title} time={item.time} type={item.type} />
                    )
                })}
                {drawShow && <Fragment>
                    <SecondaryConfirmModal tipContent='确认要永久删除这些数据吗？' closeModal={handleCloseModal} clearSucceed={handleClearSucceed} />
                    <Shadow onClose={handleShadowClose} />
                </Fragment>}
            </View>}
        </Fragment>
    )
}