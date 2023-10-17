import { View } from "@tarojs/components"
import { useEffect } from "react"
import getAllUsers from "@/services/getAllUsers"
import "./index.module.less"

const UsersManage = () => {


    useEffect(() => {
        init()
    }, [])

    async function init() {
        const res = await getAllUsers()
        if (!res) return
        console.log(res);
    }

    return (
        <View className='users-manage'>

        </View>
    )
}

export default UsersManage