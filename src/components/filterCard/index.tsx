import { View } from "@tarojs/components";
import { SortType } from "@/utils/sortListItemData";
import { useState } from "react";
import "./index.module.less"

interface FilterCardProps {
    visible: boolean
    currentListItemId: string
    changeFilterShow: () => void
    changeFilterCondition: (listItemId: string, sortType: SortType) => void
}

interface FilterCondition {
    id: string
    value: string
}

export default function FilterCard(props: FilterCardProps) {

    const filterConditions: FilterCondition[] = [
        {
            id: "0",
            value: "不限"
        },
        {
            id: "1",
            value: "降序"
        },
        {
            id: "2",
            value: "升序"
        }
    ]

    const [activedCondition, setActivedCondition] = useState("-1")

    const { visible, currentListItemId, changeFilterShow, changeFilterCondition } = props

    const handleReset = () => {
        setActivedCondition("-1")
    }

    const conditionClick = (condition: FilterCondition) => {
        setActivedCondition(condition.id)
    }

    const handleConfirm = () => {
        changeFilterShow()
        if (activedCondition === "1") {
            changeFilterCondition(currentListItemId, "desc")
            return
        }
        if (activedCondition === "2") {
            changeFilterCondition(currentListItemId, "asc")
            return
        }
    }

    return (
        <View className={`filter ${visible ? 'show' : ''}`}>
            <View className='top'>
                <View className='type'>按发布时间：</View>
                <View className='tags'>
                    {filterConditions.map((condition: FilterCondition) => {
                        return (
                            <View className={activedCondition === condition.id ? 'actived-condition' : "default-condition"} key={condition.id} onClick={() => conditionClick(condition)}>{condition.value}</View>
                        )
                    })}
                </View>
            </View>
            <View className='bottom'>
                <View className='child' onClick={handleReset}>重置</View>
                <View className='child' onClick={handleConfirm}>确定</View>
            </View>
        </View>
    )
}