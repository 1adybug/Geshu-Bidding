import { Input, Picker, View } from "@tarojs/components"
import ArrowRight from "@/assets/arrowRight.png"
import Taro, { useDidShow, useRouter } from "@tarojs/taro"
import { Fragment, useState } from "react"
import { findUserById } from "@/services/findUserById"
import { updateUserAvatorURL } from "@/services/updateUserAvatorURL"
import { addUser } from "@/services/addUser"
import { fetchAvatorUrl } from "@/services/fetchAvatorUrl"
import "./index.module.less"
import { Role } from "../usersManage"

interface PersonalInfoProps {
    userId?: string
    avatorUrl?: string
    username?: string
    roleId?: string
    roleName?: string
    password?: string
}

const PersonalInfo = () => {

    const router = useRouter()
    const { userId, source } = router.params
    const [userinfo, setUserinfo] = useState<PersonalInfoProps | null>(null)
    const [currentUserRoleId, setCurrentUserRoleId] = useState("")
    const [fileID, setFileID] = useState("")
    const [username, setUsername] = useState("")
    const [selectedValue, setSelectedValue] = useState("普通用户");
    const options = currentUserRoleId === "000" ? ["超级管理员", "管理员", "普通用户"] : ["管理员", "普通用户"]
    const [addAvatorUrl, setAddAvatorUrl] = useState("")

    useDidShow(() => {
        init()
    })

    async function init() {
        if (userId) {
            const res = await findUserById(userId)
            if (!res) return
            const roleListRes = await Taro.getStorage({ key: "roleList" })
            if (!roleListRes) return
            setUserinfo({
                userId,
                avatorUrl: res.result[0].avatorUrl,
                username: res.result[0].username,
                roleId: res.result[0].roleId,
                roleName: roleListRes.data.find((role: Role) => role.roleId === res.result[0].roleId).roleName,
                password: res.result[0].password
            })
        }
        const currentUserDetailRes = await Taro.getStorage({ key: "userDetail" })
        if (!currentUserDetailRes) return
        setCurrentUserRoleId(currentUserDetailRes.data.roleId)
        if (source === "personInfo") {
            Taro.setNavigationBarTitle({
                title: "个人信息"
            })
            return true
        }
        if (source === "editUser") {
            Taro.setNavigationBarTitle({
                title: "修改用户信息"
            })
            return true
        }
        if (source === "addUser") {
            Taro.setNavigationBarTitle({
                title: "添加用户"
            })
            return true
        }
    }

    async function changeAvator() {
        const res = await Taro.showActionSheet({
            itemList: ['从手机相册选择']
        })
        if (!res) return
        try {
            if (res.tapIndex === 0) {
                const chooseImgRes = await Taro.chooseImage({
                    count: 1,
                    sizeType: ["original"],
                    sourceType: ["album"],
                })
                let loadingTitle = ""
                if (source === "personInfo" || source === "editUser") {
                    loadingTitle = "头像更新中"
                }
                if (source === "addUser") {
                    loadingTitle = "头像上传中"
                }
                Taro.showLoading({
                    title: loadingTitle
                })
                if (!chooseImgRes) return
                const uploadFileRes = await Taro.cloud.uploadFile({
                    cloudPath: 'avators/' + Date.now() + "." + chooseImgRes.tempFilePaths[0].split(".")[1],
                    filePath: chooseImgRes.tempFilePaths[0]
                })
                if (!uploadFileRes) return
                setFileID(uploadFileRes.fileID)
                if (source === "personInfo" || source === "editUser") {
                    const tempFileURLRes = await Taro.cloud.getTempFileURL({
                        fileList: [uploadFileRes.fileID]
                    })
                    if (!tempFileURLRes) return
                    const updateAvatorURLRes = await updateUserAvatorURL(userId, tempFileURLRes.fileList[0].tempFileURL)
                    if (!updateAvatorURLRes) return
                    const initRes = await init()
                    if (!initRes) return
                    Taro.hideLoading()
                    return
                }
                if (source === "addUser") {
                    setAddAvatorUrl(chooseImgRes.tempFilePaths[0])
                    Taro.hideLoading()
                }
            }
            return
        } catch (err) {
            console.log("上传失败！" + err);

        }
    }

    function tabClick(index: number) {
        if (index === 0) {
            Taro.navigateTo({ url: `/pages/setUsername/index?userId=${userId}&userName=${userinfo?.username}` })
            return
        }
        if (index === 1) {
            Taro.navigateTo({ url: `/pages/setPassword/index?userId=${userId}&password=${userinfo?.password}` })
            return
        }
        if (index === 2) {
            Taro.navigateTo({ url: `/pages/setRole/index?userId=${userId}&roleName=${userinfo?.roleName}` })
            return
        }
    }

    const handlePickerChange = e => {
        const { value } = e.detail;
        setSelectedValue(options[value]);
    }

    async function submit() {
        if (username === "") {
            Taro.showToast({
                title: "用户名为空",
                icon: "error",
                duration: 2000
            })
            return
        }
        Taro.showLoading({
            title: "正在添加..."
        })
        const roleList = await Taro.getStorage({ key: "roleList" })
        if (!roleList) return
        const addRoleId = roleList.data.find((role: Role) => role.roleName === selectedValue).roleId
        let addAvatorURL = ""
        if (fileID !== "") {
            const fetchAvatorUrlRes = await fetchAvatorUrl(fileID)
            if (!fetchAvatorUrlRes) return
            addAvatorURL = fetchAvatorUrlRes.result.fileList[0].tempFileURL
        } else {
            addAvatorURL = "https://6765-geshu-bidding-5gnhpdzpb49a69a4-1309350967.tcb.qcloud.la/avators/defaultAvator.png?sign=457e74e0130f99760997d15e47cfbbe6&t=1697829140"
        }
        const addRes = await addUser(username, addRoleId, addAvatorURL)
        if (!addRes) return
        Taro.hideLoading()
        Taro.navigateBack()
    }

    return (
        <View className='personal-info'>
            <View className='top-container'>
                <View className='item'>
                    <View className='label'>头像</View>
                    <View className='right' onClick={changeAvator}>
                        <img className='avator' src={userinfo ? userinfo.avatorUrl : addAvatorUrl} />
                    </View>
                </View>
                <View className='item' onClick={source === "addUser" ? undefined : () => tabClick(0)}>
                    <View className='label'>用户名</View>
                    <View className='right'>
                        {source === "addUser" ? <View>
                            <Input className='input' placeholder='请输入用户名' onInput={(e) => setUsername(e.detail.value)} />
                        </View> : <Fragment>
                            <View className='value'>{userinfo ? userinfo.username : ""}</View>
                            <img className='arrow-right' src={ArrowRight} />
                        </Fragment>}
                    </View>
                </View>
                {source !== "addUser" && <View className='item' onClick={source === "addUser" ? undefined : () => tabClick(1)}>
                    <View className='label'>密码</View>
                    <View className='right'>
                        <View className='value'>{userinfo ? userinfo.password : ""}</View>
                        <img className='arrow-right' src={ArrowRight} />
                    </View>
                </View>}
                {(userinfo?.roleId === "000" || currentUserRoleId === "000") && <View className='item' onClick={source === "addUser" ? undefined : () => tabClick(2)}>
                    <View className='label'>角色</View>
                    <View className='right'>
                        {source === "addUser" ? <View>
                            <Picker className='picker-wrapper' mode='selector' name='rolename' range={options} value={options.indexOf(selectedValue ? selectedValue : "")} onChange={handlePickerChange}>
                                {selectedValue}
                            </Picker>
                        </View> : <Fragment>
                            <View className='value'>{userinfo ? userinfo.roleName : ""}</View>
                            <img className='arrow-right' src={ArrowRight} />
                        </Fragment>}
                    </View>
                </View>}
            </View>
            {source === "addUser" && <View className='btn-group'>
                <View className='cancel' onClick={() => Taro.navigateBack()} >取消</View>
                <View className='submit' onClick={submit} >提交</View>
            </View>}
        </View>
    )
}

export default PersonalInfo