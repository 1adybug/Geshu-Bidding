import { View } from "@tarojs/components";
import "./index.module.less"
import Close from "../../assets/close.png"

interface SideBarProps {
    visible: boolean
    onClose: () => void
}

interface SideBarContentListData {
    id: string
    data: string
}

export default function SideBar(props: SideBarProps) {

    const { visible, onClose } = props

    const dataList: SideBarContentListData[] = [
        {
            id: "0",
            data: "采购意向公开"
        },
        {
            id: "1",
            data: "采购（征集）公告"
        },
        {
            id: "2",
            data: "更正公告"
        },
        {
            id: "3",
            data: "废标（终止）公告"
        },
        {
            id: "4",
            data: "结果（入围）公告"
        },
        {
            id: "5",
            data: "合同公告"
        },
        {
            id: "6",
            data: "其他公告"
        }
    ]

    const handleClick = () => {
        onClose()
    }

    return (
        <View className={`sidebar ${visible ? 'show' : ''}`}>
            <img src={Close} alt='' onClick={handleClick} />
            <View className='content'>
                {dataList.map(e => {
                    return (
                        <View key={e.id} className='list-item'>
                            {e.data}
                        </View>
                    )
                })}
            </View>
        </View>
    )
}