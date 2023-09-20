import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { getPurchaseIntentionDisclosures } from "@/services/puchaseIntentionDisclosure";
import { getPurchaseSocilitationAnnouncements } from "@/services/purchaseSocilitationAnnouncement";
import { wyDeepClone } from "wangyong-utils";
import RecycleBinCard from "@/components/recycleBinCard";
import "./index.module.less"


export default function RecycleBin() {

    const [deletedItems, setDeletedItems] = useState<PurchaseIntentionDisclosure[]>([])

    useEffect(() => {
        getAllDeleteds()
    }, [])

    async function getAllDeleteds() {
        const intentionDeletedsRes = await getPurchaseIntentionDisclosures()
        const solicitationDeletedRes = await getPurchaseSocilitationAnnouncements()
        setDeletedItems(wyDeepClone([...intentionDeletedsRes.result, ...solicitationDeletedRes.result].filter(e => e.is_deleted)))
    }

    function handleDelete() {

    }

    function handleRestitution() {

    }

    return (
        <View className='recyclebin'>
            {deletedItems.map((item: PurchaseIntentionDisclosure) => {
                return (
                    <RecycleBinCard key={item._id} _id={item._id} title={item.title} time={item.time} completelyDelete={handleDelete} restitution={handleRestitution} />
                )
            })}
        </View>
    )
}