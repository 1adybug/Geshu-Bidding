import { Button, Form, Input, Picker, View } from "@tarojs/components"
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { Role } from "@/pages/usersManage";
import CloseModalIcon from "../../assets/closeModalIcon.png"
import "./index.module.less"

interface UserEditModalProps {
    // avator: string
    // show: boolean
    userName?: string
    roleName?: string
    password?: string
    // cancel: () => void
    submit: (e: any) => void
    closeUserEditModal: () => void
}

interface OptionType {
    value: string
    label: string
}

interface FormData {
    userName: string,
    password: string,
    roleName: string
}

const UserEditModal = (props: UserEditModalProps) => {

    const { userName, roleName, password, closeUserEditModal } = props

    const [formData, setFormData] = useState<FormData>({
        userName: "",
        password: "",
        roleName: ""
    })

    // useEffect(() => {
    //     init()
    // }, [])

    // async function init() {
    //     console.log(1, userName, roleName, password);

    //     const res = await Taro.getStorage({ key: "roleList" })
    //     if (!res) return
    //     setOptions(res.data.map((role: Role) => {
    //         return {
    //             value: role.roleId,
    //             label: role.roleName
    //         }
    //     }))
    // }

    const [selectedValue, setSelectedValue] = useState(roleName);
    const options = ["超级管理员", "管理员", "普通用户"]

    const handlePickerChange = e => {
        const { value } = e.detail;
        console.log(5, e);
        setSelectedValue(options[value]);
    }

    function cancel() {
        closeUserEditModal()
    }

    function submit(e: any) {
        console.log(e);
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
                        <Input className='input' name='username' placeholder='请输入用户名' value={formData.userName} onInput={(e) => console.log(e)} />
                    </View>
                    <View className='form-item'>
                        <View className='label'>密码：</View>
                        <Input className='input' name='password' placeholder='请输入用户名' value={formData.password} />
                    </View>
                    <View className='form-item'>
                        <Picker mode='selector' name='roleName' range={options} value={options.indexOf(selectedValue ? selectedValue : "")} onChange={handlePickerChange}>
                            <View className='picker'>
                                <View className='label'>角色：</View>
                                <View className='selected-value'>{selectedValue}</View>
                            </View>
                        </Picker>
                    </View>
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