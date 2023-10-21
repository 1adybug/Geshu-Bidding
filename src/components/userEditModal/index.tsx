import { Button, Form, Input, Picker, View } from "@tarojs/components"
import { useEffect, useState } from "react";
import login from "@/services/login";
import { updateUser } from "@/services/updateUser";
import Taro from "@tarojs/taro";
import { findUserAvatorUrl } from "@/services/findUserAvatorUrl";
import { updateAvator } from "@/services/updateUserAvator";
import { editAvator } from "@/services/updateAvator";
import { fetchAvatorUrl } from "@/services/fetchAvatorUrl";
import { addUser } from "@/services/addUser";
import dayjs from "dayjs";
import CloseModalIcon from "../../assets/closeModalIcon.png"
import "./index.module.less"

export type Source = "login" | "edit" | "add"

interface UserEditModalProps {
    source: Source
    avatorUrl?: string
    userId?: string
    userName?: string
    roleName?: string
    password?: string
    closeUserEditModal: () => void
    updateSucceed: () => void
}

interface FormData {
    userName?: string,
    password?: string,
    roleName?: string
}

interface OriginRole {
    _id: string
    roleName: string
    roleId: string
    updateTime: string
    createTime: string
}

const UserEditModal = (props: UserEditModalProps) => {

    const { source, avatorUrl, userId, userName, roleName, password, closeUserEditModal, updateSucceed } = props

    const [formData, setFormData] = useState<FormData>({
        userName,
        password,
        roleName
    })

    const [selectedValue, setSelectedValue] = useState(roleName);
    const options = ["超级管理员", "管理员", "普通用户"]
    const [editAvatorUrl, setEditAvatorUrl] = useState(avatorUrl)
    const [fileID, setFileID] = useState("")

    useEffect(() => {
        init()
    }, [])

    function init() {
        if (source === "add") {
            setEditAvatorUrl("")
            setFormData({})
            setSelectedValue("普通用户")
            return
        }
    }

    const handlePickerChange = e => {
        const { value } = e.detail;
        setSelectedValue(options[value]);
    }

    function cancel() {
        closeUserEditModal()
    }

    async function submit(e: any) {
        if (source === "edit") {
            if (fileID !== "") {
                const fetchAvatorUrlRes = await fetchAvatorUrl(fileID)
                const updateAvatorRes = await updateAvator(userId, fetchAvatorUrlRes.result.fileList[0].tempFileURL)
                if (!updateAvatorRes) return
            } else {
                const submitObj = {
                    userId,
                    userName: e.detail.value.username,
                    roleName: options[e.detail.value.rolename],
                    password: e.detail.value.password
                }
                const updateRes = await updateUser(submitObj)
                if (!updateRes) return
            }
            updateSucceed()
            closeUserEditModal()
            return
        }
        if (source === "login") {
            const loginUsername = e.detail.value.username
            const loginPassword = e.detail.value.password
            const loginRes = await login(loginUsername, loginPassword)
            if (!loginRes.result.length) {
                Taro.showToast({
                    title: "登录失败!",
                    icon: "error",
                    duration: 2000
                })
                return
            }
            if (loginRes.result.length) {
                updateSucceed()
                closeUserEditModal()
                const avatorUrlRes = await findUserAvatorUrl(loginUsername, loginPassword)
                const data = {
                    userId: avatorUrlRes.result[0]._id,
                    username: loginUsername,
                    password: loginPassword
                }
                await Taro.setStorage({ key: "userInfo", data })
                return
            }
            return
        }
        if (source === "add") {
            const addUsername = e.detail.value.username
            if (addUsername === "") {
                Taro.showToast({
                    title: "用户名为空",
                    icon: "error",
                    duration: 2000
                })
                return
            }
            const roleRes = await Taro.getStorage({ key: "roleList" })
            if (!roleRes) return
            let addRoleId = ""
            if (e.detail.value.rolename === -1) {
                addRoleId = "002"
            } else {
                addRoleId = roleRes.data.find((role: OriginRole) => role.roleName === options[e.detail.value.rolename]).roleId
            }
            let addAvatorUrl = ""
            if (fileID !== "") {
                const fetchAvatorUrlRes = await fetchAvatorUrl(fileID)
                if (!fetchAvatorUrl) return
                addAvatorUrl = fetchAvatorUrlRes.result.fileList[0].tempFileURL
            } else {
                addAvatorUrl = "https://6765-geshu-bidding-5gnhpdzpb49a69a4-1309350967.tcb.qcloud.la/avators/defaultAvator.png?sign=457e74e0130f99760997d15e47cfbbe6&t=1697829140"
            }
            const addRes = await addUser(addUsername, addRoleId, addAvatorUrl)
            if (!addRes) return
            if (addRes.result === "该用户名已被使用！") {
                Taro.showToast({
                    title: "用户名已被使用",
                    icon: "error",
                    duration: 2000
                })
                return
            }
            updateSucceed()
            closeUserEditModal()
        }
    }

    function closeModalIconClick() {
        closeUserEditModal()
    }

    async function handleAvatorClick() {
        try {
            const res = await Taro.chooseImage({
                count: 1,
                sizeType: ['original'],
                sourceType: ['album']
            });
            Taro.showLoading({
                title:"头像上传中..."
            })
            const uploadRes = await Taro.cloud.uploadFile({
                cloudPath: 'avators/' + Date.now() + "." + res.tempFilePaths[0].split(".")[1], // 云存储中的文件路径
                filePath: res.tempFilePaths[0]
            })
            if (!uploadRes) return
            setFileID(uploadRes.fileID)
            setEditAvatorUrl(res.tempFilePaths[0])
            Taro.hideLoading()
        } catch (error) {
            console.log('上传失败', error);
        }
    }

    return (
        <View className='user-edit-modal'>
            <img src={CloseModalIcon} className='close-modal-icon' onClick={closeModalIconClick} />
            <View className='title'>{source === "edit" ? "信息修改" : (source === "add" ? "新增用户" : "登录")}</View>
            <Form onSubmit={submit}>
                <View className='form-item-container'>
                    <View className='avator-wrapper'>
                        {source !== "login" && <img src={editAvatorUrl} alt='' onClick={handleAvatorClick} />}
                    </View>
                    <View className='form-item'>
                        <View className='label'>用户名：</View>
                        <Input className='input' name='username' value={formData.userName} onInput={(e) => setFormData({ ...formData, userName: e.detail.value })} />
                    </View>
                    {(source === "edit" || source === "login") && <View className='form-item'>
                        <View className='label'>密码：</View>
                        <Input className='input' name='password' value={formData.password} onInput={(e) => setFormData({ ...formData, password: e.detail.value })} />
                    </View>}
                    {(source === "edit" || source === "add") && <View className='form-item'>
                        <Picker className='picker-wrapper' mode='selector' name='rolename' range={options} value={options.indexOf(selectedValue ? selectedValue : "")} onChange={handlePickerChange}>
                            <View className='picker'>
                                <View className='label'>角色：</View>
                                <View className='selected-value'>{selectedValue}</View>
                            </View>
                        </Picker>
                    </View>}
                </View>
                <View className='btn-group'>
                    <Button className='cancel' onClick={cancel}>取消</Button>
                    <Button formType='submit' className='submit'>{(source === "edit" || source === "add") ? "提交" : "登录"}</Button>
                </View>
            </Form>
        </View>
    )
}

export default UserEditModal