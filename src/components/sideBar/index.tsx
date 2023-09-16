import { View } from "@tarojs/components";
import { dataList } from "@/constant/sidebarContentListItems";
import "./index.module.less"
import Close from "../../assets/close.png"

interface SideBarProps {
    visible: boolean
    onClose: () => void
    itemClicked: (listItemId: string) => void
}

export default function SideBar(props: SideBarProps) {

    const { visible, onClose, itemClicked } = props

    const handleClick = () => {
        onClose()
    }

    const handleListItemClick = (listItemId: string) => {
        setTimeout(() => {
            onClose()
        }, 1000)
        itemClicked(listItemId)
    }

    return (
        <View className={`sidebar ${visible ? 'show' : ''}`}>
            <img src={Close} alt='' onClick={handleClick} />
            <View className='content'>
                {dataList.map(e => {
                    return (
                        <View key={e.listItemId} className='list-item' onClick={() => handleListItemClick(e.listItemId)}>
                            {e.listItemText}
                        </View>
                    )
                })}
            </View>
        </View>
    )
}