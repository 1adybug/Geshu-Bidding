import { Fragment, useState } from 'react';
import { View, Picker, Input, Form, Button } from '@tarojs/components';
import DropDownArrow from "@/assets/blackDropArrow.png"
import dayjs from 'dayjs';
import "./index.module.less"

interface MakeOutItem {
    time: string
    amount: string
}

interface PaymentItem extends MakeOutItem { }

const PagePicker = () => {

    const [dateSel, setDateSel] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss"));
    const [makeOuts, setMakeOuts] = useState<MakeOutItem[]>([{ time: dayjs().format("YYYY-MM-DD HH:mm:ss"), amount: "" }])
    const [payments, setPayments] = useState<PaymentItem[]>([{ time: dayjs().format("YYYY-MM-DD HH:mm:ss"), amount: "" }])
    const [deadline, setDeadline] = useState(dayjs().format("YYYY-MM-DD HH:mm:ss"))

    const onDateChange = (e) => {
        setDateSel(e.detail.value);
    };

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
                        <Picker value='' mode='date' onChange={onDateChange}>
                            <View className='picker'>
                                <View className='value'>{dateSel}</View>
                                <img src={DropDownArrow} />
                            </View>
                        </Picker>
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
                        <input type='button' className='upload-file' value='上传附件' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>验收时间</View>
                            <View>：</View>
                        </View>
                        <Picker value='' mode='date' onChange={onDateChange}>
                            <View className='picker'>
                                <View className='value'>{dateSel}</View>
                                <img src={DropDownArrow} />
                            </View>
                        </Picker>
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>验收文件</View>
                            <View>：</View>
                        </View>
                        <input type='button' className='upload-file' value='上传附件' />
                    </View>
                    <View className='form-item'>
                        <View className='add-makeout'>添加开票</View>
                    </View>
                    {makeOuts.map((item: MakeOutItem) => {
                        return (
                            <View key={item.time} className='makeout-box'>
                                <View className='form-item'>
                                    <View className='label'>
                                        <View className='name'>开票时间</View>
                                        <View>：</View>
                                    </View>
                                    <Picker value='' mode='date' onChange={onDateChange}>
                                        <View className='picker'>
                                            <View className='value'>{item.time}</View>
                                            <img src={DropDownArrow} />
                                        </View>
                                    </Picker>
                                </View>
                                <View className='form-item'>
                                    <View className='label'>
                                        <View className='name'>开票金额</View>
                                        <View>：</View>
                                    </View>
                                    <Input className='input' placeholder='' value={item.amount} />
                                </View>
                            </View>
                        )
                    })}
                    <View className='form-item'>
                        <View className='add-payment'>添加付款</View>
                    </View>
                    {payments.map((item: MakeOutItem) => {
                        return (
                            <View key={item.time} className='payment-box'>
                                <View className='form-item'>
                                    <View className='label'>
                                        <View className='name'>付款时间</View>
                                        <View>：</View>
                                    </View>
                                    <Picker value='' mode='date' onChange={onDateChange}>
                                        <View className='picker'>
                                            <View className='value'>{item.time}</View>
                                            <img src={DropDownArrow} />
                                        </View>
                                    </Picker>
                                </View>
                                <View className='form-item'>
                                    <View className='label'>
                                        <View className='name'>付款金额</View>
                                        <View>：</View>
                                    </View>
                                    <Input className='input' placeholder='' value={item.amount} />
                                </View>
                            </View>
                        )
                    })}
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>应付金额</View>
                            <View>：</View>
                        </View>
                        <Input className='input' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>未付金额</View>
                            <View>：</View>
                        </View>
                        <Input className='input' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>到期时间</View>
                            <View>：</View>
                        </View>
                        <Picker value='' mode='date' onChange={(e) => setDeadline(e.detail.value)}>
                            <View className='picker'>
                                <View className='value'>{deadline}</View>
                                <img src={DropDownArrow} />
                            </View>
                        </Picker>
                    </View>
                </View>
                <View className='btn-wrapper'>
                    <Button formType='submit' className='submit'>提交</Button>
                </View>
            </Form>
        </View>
    );
};

export default PagePicker