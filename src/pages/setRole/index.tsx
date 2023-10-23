import { updateUserInfoSec } from "@/services/updateUserInfoSec"
import { Picker, View } from "@tarojs/components"
import Taro, { useRouter } from "@tarojs/taro"
import { useEffect, useState } from "react"
import DropDownArrowIcon from "@/assets/dropDownArrow.png"
import { Role } from "../usersManage"
import "./index.module.less"


const SetRole = () => {

    const router = useRouter()
    const { userId, roleName } = router.params
    const [currentRoleId, setCurrentRoleId] = useState<string | undefined>("")
    const options = ["超级管理员", "管理员", "普通用户"]
    const [selectedValue, setSelectedValue] = useState(roleName);
    const [currentRoleList, setCurrentRoleList] = useState<Role[]>([])

    useEffect(() => {
        init()
    }, [])

    async function init() {
        const res = await Taro.getStorage({ key: "roleList" })
        if (!res) return
        setCurrentRoleId(res.data.find((role: Role) => role.roleName === roleName).roleId)
        roleName ? setSelectedValue(roleName) : setSelectedValue("")
        setCurrentRoleList(res.data)
    }

    async function complete() {
        const res = await updateUserInfoSec(userId, undefined, undefined, currentRoleId)
        if (!res) return
        Taro.navigateBack()
    }

    function handlePickerChange(e: any) {
        const { value } = e.detail;
        setSelectedValue(options[value]);
        setCurrentRoleId(currentRoleList.find((role: Role) => role.roleName === options[value])?.roleId)
    }

    return (
        <View className='set-role'>
            <Picker className='picker-wrapper' mode='selector' name='rolename' range={options} value={options.indexOf(selectedValue ? selectedValue : "")} onChange={handlePickerChange}>
                <View className='picker'>
                    <View className='selected-value'>{selectedValue}</View>
                    <img src={DropDownArrowIcon} className='drop-down-arrow' />
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