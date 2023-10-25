import { View } from "@tarojs/components";
import { Fragment, useEffect, useState } from "react";
import { wyDeepClone } from "wangyong-utils";
import RecycleBinCard from "@/components/recycleBinCard";
import { AtActivityIndicator } from "taro-ui"
import Taro, { useDidShow } from "@tarojs/taro";
import dayjs from "dayjs";
import { getAllDeletedItems } from "@/services/getAllDeletedItems";
import EmptyRecycleBinIcon from "@/assets/emptyRecycleBinIcon.jpg"
import { clearRecycleBin } from "@/services/clearRecycleBin";
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
        const res = await getAllDeletedItems()
        const list = wyDeepClone(res.result.filter(e => e.is_deleted).filter(e => !e.is_completely_deleted))
        setDeletedItems(list.sort((a: any, b: any) => dayjs(b.time).unix() - dayjs(a.time).unix()))
        if (!res) return
        setGotData(true)
    }

    function handleClearClicked() {
        Taro.showModal({
            title: '提示',
            content: '确定要清空这些数据吗？',
            success: async function (res) {
                if (res.confirm) {
                    const res1 = await clearRecycleBin()
                    if (!res1) return
                    getAllDeleteds()
                    Taro.showToast({    
                        title: "清空成功！",
                        icon: "success",
                        duration: 2000
                    })
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='加载中...'></AtActivityIndicator>
            </View> : <View className='recyclebin'>
                {deletedItems.map((item: PurchaseIntentionDisclosure) => {
                    return (
                        <RecycleBinCard key={item._id} _id={item._id} title={item.title} time={item.time} type={item.type} />
                    )
                })}
                <img src={EmptyRecycleBinIcon} className='empty-icon' onClick={handleClearClicked} />
            </View>}
        </Fragment>
    )
}