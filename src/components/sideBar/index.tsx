import { View } from "@tarojs/components";
import { dataList } from "@/constant/sidebarContentListItems";
import { SortType } from "@/utils/sortListItemData";
import "./index.module.less"
import Close from "../../assets/close.png"

interface SideBarProps {
    activedItemId: string
    visible: boolean
    onClose: () => void
    itemClicked: (listItemId: string, sortType: SortType) => void
}

export default function SideBar(props: SideBarProps) {

    const { visible, onClose, itemClicked, activedItemId } = props

    const handleClick = () => {
        onClose()
    }

    const handleListItemClick = (listItemId: string) => {
        setTimeout(() => {
            onClose()
        }, 300)
        itemClicked(listItemId, "desc")
    }

    return (
        <View className={`sidebar ${visible ? 'show' : ''}`}>
            <img src={Close} alt='' onClick={handleClick} />
            <View className='content'>
                {dataList.map(e => {
                    return (
                        <View key={e.listItemId} className={activedItemId === e.listItemId ? "actived-list-item" : "default-list-item"} onClick={() => handleListItemClick(e.listItemId)}>
                            {e.listItemText}
                        </View>
                    )
                })}
            </View>
        </View>
    )
}