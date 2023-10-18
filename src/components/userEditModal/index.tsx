import { Form, Input, View } from "@tarojs/components"

interface UserEditModalProps {
    avator: string
    userName: string
    role: string
    password: string
    cancel: () => void
    submit: () => void
}

const UserEditModal = (props: UserEditModalProps) => {

    // const { avator, userName, role, password } = props

    function submit(e: any) {
        console.log(e);

    }

    return (
        <View className='user-edit-modal'>
            <View className='title'>用户信息修改</View>
            <Form onSubmit={submit}>
                <View>
                    <View>用户名：</View>
                    <Input name='username' placeholder='请输入用户名' />
                </View>
                <View>
                    <View>密码：</View>
                    <Input name='password' placeholder='请输入用户名' />
                </View>
                <View className='btn-group'>
                    <button>取消</button>
                    <button type='submit'>提交</button>
                </View>
            </Form>
        </View>
    )
}

export default UserEditModal