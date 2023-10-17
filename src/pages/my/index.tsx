import UserInfoCard from "@/components/userInfoCard";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import PersonalInfoIcon from "@/assets/personalInfoIcon.jpg"
import MyCollectionsIcon from "@/assets/myCollectionsIcon.jpg"
import RecycleBinIcon from "@/assets/recycleBinIcon.jpg"
import SettingIcon from "@/assets/settingIcon.jpg"
import UsersManage from "@/assets/usersManage.png"
import "./index.module.less"


import ArrowRight from "../../assets/arrowRight.png"

interface ListItem {
    id: string
    imgSrc: string
    text: string
}

export default function My() {

    const userInfo = {
        userWechatNo: "wy19945372694",
        userWechatName: "白云苍狗",
        userWechatImgURL: "xxxxxxxxxx"
    }

    const listItems: ListItem[] = [
        {
            id: "0",
            imgSrc: PersonalInfoIcon,
            text: "个人信息"
        },
        {
            id: "1",
            imgSrc: MyCollectionsIcon,
            text: "我的收藏"
        },
        {
            id: "2",
            imgSrc: RecycleBinIcon,
            text: "回收站"
        },
        {
            id: "3",
            imgSrc: UsersManage,
            text: "用户管理"
        },
        {
            id: "4",
            imgSrc: SettingIcon,
            text: "设置"
        }
    ]

    function handleClick(itemText: string) {
        if (itemText === "回收站") {
            Taro.navigateTo({ url: "/pages/recyclebin/index" })
            return
        }
        if (itemText === "我的收藏") {
            Taro.navigateTo({ url: "/pages/mycollections/index" })
            return
        }
    }

    return (
        <View className='my'>
            <View className='solid-color-base-floor'></View>
            <UserInfoCard userWechatNo={userInfo.userWechatNo} userWechatName={userInfo.userWechatName} userWechatImgURL={userInfo.userWechatImgURL} />
            <View className='features'>
                {listItems.map((item: ListItem) => {
                    return (
                        <View className='feature' key={item.id} onClick={() => handleClick(item.text)}>
                            <View className='left'>
                                <img src={item.imgSrc} alt='' />
                                <View className='text'>{item.text}</View>
                            </View>
                            <img src={ArrowRight} alt='' />
                        </View>
                    )
                })}
            </View>
        </View>
    )
}