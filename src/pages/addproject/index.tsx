import { Button, Form, Input, View } from "@tarojs/components";
import "./index.module.less"

export default function AddProject() {

    async function submit() {

    }

    return (
        <View className='add-project'>
            <Form className='form' onSubmit={submit}>
                <View className='form-content'>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>项目名称</View>
                            <View>：</View>
                        </View>
                        <Input className='input' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>项目编号</View>
                            <View>：</View>
                        </View>
                        <Input className='input' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>中标时间</View>
                            <View>：</View>
                        </View>
                        <Input className='input' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>合同金额</View>
                            <View>：</View>
                        </View>
                        <Input className='input' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>合同</View>
                            <View>：</View>
                        </View>
                        <input type='button' value='上传附件' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>验收时间</View>
                            <View>：</View>
                        </View>
                        <Input className='input' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>验收文件</View>
                            <View>：</View>
                        </View>
                        <input type='button' value='上传附件' />
                    </View>
                    <View className='form-item'>

                    </View>
                </View>
                <View className='btn-group'>
                    <Button className='button'>取消</Button>
                    <Button formType='submit' className='button'>确定</Button>
                </View>
            </Form>
        </View>
    )
}