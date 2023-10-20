import { Button, Form, Input, Picker, View } from "@tarojs/components"
import { useState } from "react";
import login from "@/services/login";
import { updateUser } from "@/services/updateUser";
import Taro from "@tarojs/taro";
import CloseModalIcon from "../../assets/closeModalIcon.png"
import "./index.module.less"

interface UserEditModalProps {
    source: "login" | "edit"
    // avator: string
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

const UserEditModal = (props: UserEditModalProps) => {

    const { source, userId, userName, roleName, password, closeUserEditModal, updateSucceed } = props

    const [formData, setFormData] = useState<FormData>({
        userName,
        password,
        roleName
    })

    const [selectedValue, setSelectedValue] = useState(roleName);
    const options = ["超级管理员", "管理员", "普通用户"]

    const handlePickerChange = e => {
        const { value } = e.detail;
        setSelectedValue(options[value]);
    }

    function cancel() {
        closeUserEditModal()
    }

    async function submit(e: any) {
        if (source === "edit") {
            const submitObj = {
                userId,
                userName: e.detail.value.username,
                roleName: options[e.detail.value.rolename],
                password: e.detail.value.password
            }
            const updateRes = await updateUser(submitObj)
            if (!updateRes) return
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
                const data = {
                    username: loginUsername,
                    password: loginPassword
                }
                await Taro.setStorage({ key: "userInfo", data })
                console.log("123", loginRes);
                return
            }
            return
        }
    }

    function closeModalIconClick() {
        closeUserEditModal()
    }

    return (
        <View className='user-edit-modal'>
            <img src={CloseModalIcon} className='close-modal-icon' onClick={closeModalIconClick} />
            <View className='title'>用户信息修改</View>
            <Form onSubmit={submit}>
                <View className='form-item-container'>
                    <View className='form-item'>
                        <View className='label'>用户名：</View>
                        <Input className='input' name='username' placeholder='请输入用户名' value={formData.userName} onInput={(e) => setFormData({ ...formData, userName: e.detail.value })} />
                    </View>
                    <View className='form-item'>
                        <View className='label'>密码：</View>
                        <Input className='input' name='password' placeholder='请输入密码' value={formData.password} onInput={(e) => setFormData({ ...formData, password: e.detail.value })} />
                    </View>
                    {source === "edit" && <View className='form-item'>
                        <Picker mode='selector' name='rolename' range={options} value={options.indexOf(selectedValue ? selectedValue : "")} onChange={handlePickerChange}>
                            <View className='picker'>
                                <View className='label'>角色：</View>
                                <View className='selected-value'>{selectedValue}</View>
                            </View>
                        </Picker>
                    </View>}
                </View>
                <View className='btn-group'>
                    <Button className='cancel' onClick={cancel}>取消</Button>
                    <Button formType='submit' className='submit'>提交</Button>
                </View>
            </Form>
        </View>
    )
}

export default UserEditModal