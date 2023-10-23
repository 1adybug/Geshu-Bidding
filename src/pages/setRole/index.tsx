import { updateUserInfoSec } from "@/services/updateUserInfoSec"
import { Input, Picker, View } from "@tarojs/components"
import Taro from "@tarojs/taro"
import { useEffect, useState } from "react"
import { Role } from "../usersManage"

interface SetRoleProps {
    userId: string
    roleId: string
}

const SetRole = (props: SetRoleProps) => {

    const { userId, roleId } = props

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const res = await Taro.getStorage({ key: "roleList" })
        if (!res) return
        const roleName = res.data.find((role: Role) => role.roleId === roleId).roleName
        roleName ? setSelectedValue(roleName) : setSelectedValue("")
    }

    const [currentRoleId, setCurrentRoleId] = useState(roleId)
    const options = ["超级管理员", "管理员", "普通用户"]
    const [selectedValue, setSelectedValue] = useState("");

    async function complete() {
        const res = await updateUserInfoSec(userId, roleId)
        if (!res) return
        Taro.navigateBack()
    }

    function handlePickerChange() {

    }

    return (
        <View className='set-username'>
            <Picker className='picker-wrapper' mode='selector' name='rolename' range={options} value={options.indexOf(selectedValue ? selectedValue : "")} onChange={handlePickerChange}>
                <View className='picker'>
                    <View className='label'>角色：</View>
                    <View className='selected-value'>{selectedValue}</View>
                </View>
            </Picker>
            <View className='btn-group'>
                <View className='cancel' onClick={() => Taro.navigateBack()}>取消</View>
                <View className='complete' onClick={complete}>完成</View>
            </View>
        </View>
    )
}

export default SetRole