import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import { useEffect } from "react";

export default function Detail() {
    const router = useRouter()

    const { id } = router.params

    useEffect(() => {
        console.log(id);
    }, [])
    return (
        <View>
            我是详情页
        </View>
    )
}