import { View } from "@tarojs/components";
import { useRouter } from "@tarojs/taro";
import DetailFirstSection from "@/components/detailFirstSection";
import DetailSecondSection from "@/components/detailSecondSection";
import { useEffect } from "react";
import ProjectList from "../../data/projects.json"
import "./index.module.less"

export default function Detail() {
    const router = useRouter()
    const { id } = router.params
    const obj = ProjectList.find(project => project.id === id)

    useEffect(() => {
        console.log(obj);
    }, [])

    return (
        <View className='detail'>
            <DetailFirstSection projectName={obj?.projectName} address={obj?.address} releaseTime={obj?.releaseTime} />
            <DetailSecondSection projectSummarize={obj?.projectSummarize} />
        </View>
    )
}