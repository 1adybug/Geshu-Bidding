import { View } from "@tarojs/components";
import { useState } from "react";
import "./index.module.less"

interface TabbarProps {
    projects?: PurchaseIntentionDisclosureProject[]
    clickWhich: (summary: string) => void
}

export default function Tabbar(props: TabbarProps) {

    const { projects, clickWhich } = props

    const [activedTabItem, setActivedTabItem] = useState(projects ? projects[0].projectSummary : "")

    function tabItemClick(e: PurchaseIntentionDisclosureProject) {
        setActivedTabItem(e.projectSummary)
        clickWhich(e.projectSummary)
    }
    return (
        <View className='tabbar'>
            {projects?.map((item, index) => {
                return <View onClick={() => tabItemClick(item)} key={item.projectSummary} className={activedTabItem === item.projectSummary ? 'tab-item-actived' : 'tab-item'}>
                    项目{index + 1}
                </View>
            })}
        </View>
    )
}