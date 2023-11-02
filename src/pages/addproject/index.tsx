import { useState } from 'react';
import { View, Picker, Input, Form, Button } from '@tarojs/components';
import DropDownArrow from "@/assets/blackDropArrow.png"
import Taro from '@tarojs/taro';
import dayjs from 'dayjs';
import DeleteDot from "@/assets/deleteDot.png"
import "./index.module.less"

interface MakeOutItem {
    id: string
    time: string
    amount: string
}

interface PaymentItem extends MakeOutItem { }

const PagePicker = () => {

    const [winningTime, setWinningTime] = useState(dayjs().format("YYYY-MM-DD"))
    const [receptionTime, setReceptionTime] = useState(dayjs().format("YYYY-MM-DD"))
    const [makeOuts, setMakeOuts] = useState<MakeOutItem[]>([])
    const [payments, setPayments] = useState<PaymentItem[]>([])
    const [deadline, setDeadline] = useState(dayjs().format("YYYY-MM-DD"))
    const [contractAttachmentUploadText, setcontractAttachmentUploadText] = useState("上传附件")
    const [acceptancementUploadText, setacceptancementUploadText] = useState("上传附件")

    function onWinningTimeChange(e) {
        setWinningTime(e.detail.value);
    };

    function onReceptionTimeChange(e) {
        setReceptionTime(e.detail.value)
    }

    async function submit(e: any) {
        console.log(e);
        console.log(makeOuts);
    }

    function uploadContract() {
        Taro.chooseMessageFile({
            count: 1,
            success: (res) => {
                const file = res.tempFiles[0];
                setcontractAttachmentUploadText(file.name)
            },
            fail: (err) => {
                console.log("失败！" + err);
            }
        });
    }

    function uploadAcceptancement() {
        Taro.chooseMessageFile({
            count: 1,
            success: (res) => {
                const file = res.tempFiles[0];
                setacceptancementUploadText(file.name)
            },
            fail: (err) => {
                console.log("失败！" + err);
            }
        });
    }

    function onMakeoutTimeChange(e: any, item: MakeOutItem) {
        setMakeOuts(prevMO => {
            const updatedMO = prevMO.map((mo: MakeOutItem) => {
                if (mo.id === item.id) {
                    return { ...mo, time: e.detail.value };
                }
                return mo;
            });
            return updatedMO;
        });
    }

    function onPaymentChange(e: any, item: PaymentItem) {
        setPayments(prevPm => {
            const updatedPm = prevPm.map((pm: PaymentItem) => {
                if (pm.id === item.id) {
                    return { ...pm, time: e.detail.value };
                }
                return pm;
            });
            return updatedPm;
        });
    }

    function onMakeoutInput(e: any, item: MakeOutItem) {
        setMakeOuts(prevMO => {
            const updatedMO = prevMO.map((mo: MakeOutItem) => {
                if (mo.id === item.id) {
                    return { ...mo, amount: e.detail.value };
                }
                return mo;
            });
            return updatedMO;
        });
    }

    function onPaymentInput(e: any, item: PaymentItem) {
        setMakeOuts(prevPm => {
            const updatedPm = prevPm.map((pm: MakeOutItem) => {
                if (pm.id === item.id) {
                    return { ...pm, amount: e.detail.value };
                }
                return pm;
            });
            return updatedPm;
        });
    }

    function addMakeout() {
        const obj = { id: dayjs().format("YYYYMMDDHHmmss"), time: dayjs().format("YYYY-MM-DD"), amount: "" }
        setMakeOuts(prevState => [...prevState, obj])
    }

    function addPayment() {
        const obj = { id: dayjs().format("YYYYMMDDHHmmss"), time: dayjs().format("YYYY-MM-DD"), amount: "" }
        setPayments(prevState => [...prevState, obj])
    }

    function delMakeout(e: MakeOutItem) {
        setMakeOuts(makeOuts.filter((mk: MakeOutItem) => mk.id !== e.id))
    }

    function delPayments(e: PaymentItem) {
        setPayments(payments.filter((pm: PaymentItem) => pm.id !== e.id))
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
                        <Input name='projectName' className='input' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>项目编号</View>
                            <View>：</View>
                        </View>
                        <Input name='projectNo' className='input' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>中标时间</View>
                            <View>：</View>
                        </View>
                        <Picker value='' mode='date' onChange={onWinningTimeChange}>
                            <View className='picker'>
                                <View className='value'>{winningTime}</View>
                                <img src={DropDownArrow} />
                            </View>
                        </Picker>
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>合同金额</View>
                            <View>：</View>
                        </View>
                        <Input name='contractAmount' className='input' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>合同</View>
                            <View>：</View>
                        </View>
                        <View className={contractAttachmentUploadText === "上传附件" ? 'upload-file' : 'upload-succeed'} onClick={uploadContract}>{contractAttachmentUploadText}</View>
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>验收时间</View>
                            <View>：</View>
                        </View>
                        <Picker value='' mode='date' onChange={onReceptionTimeChange}>
                            <View className='picker'>
                                <View className='value'>{receptionTime}</View>
                                <img src={DropDownArrow} />
                            </View>
                        </Picker>
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>验收文件</View>
                            <View>：</View>
                        </View>
                        <View className={acceptancementUploadText === "上传附件" ? 'upload-file' : 'upload-succeed'} onClick={uploadAcceptancement} >{acceptancementUploadText}</View>
                    </View>
                    <View className='form-item'>
                        <View className='add-makeout' onClick={addMakeout}>添加开票信息</View>
                    </View>
                    {makeOuts.map((item: MakeOutItem) => {
                        return (
                            <View key={item.time} className='makeout-box'>
                                <img src={DeleteDot} alt='' className='delete-dot' onClick={() => delMakeout(item)} />
                                <View className='form-item'>
                                    <View className='label'>
                                        <View className='name'>开票时间</View>
                                        <View>：</View>
                                    </View>
                                    <Picker value='' mode='date' onChange={(e) => onMakeoutTimeChange(e, item)}>
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
                                    <Input className='input' value={item.amount} onInput={(e) => onMakeoutInput(e, item)} />
                                </View>
                            </View>
                        )
                    })}
                    <View className='form-item'>
                        <View className='add-payment' onClick={addPayment}>添加付款信息</View>
                    </View>
                    {payments.map((item: MakeOutItem) => {
                        return (
                            <View key={item.time} className='payment-box'>
                                <img src={DeleteDot} alt='' className='delete-dot' onClick={() => delPayments(item)} />
                                <View className='form-item'>
                                    <View className='label'>
                                        <View className='name'>付款时间</View>
                                        <View>：</View>
                                    </View>
                                    <Picker value='' mode='date' onChange={(e) => onPaymentChange(e, item)}>
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
                                    <Input className='input' value={item.amount} onInput={(e) => onPaymentInput(e, item)} />
                                </View>
                            </View>
                        )
                    })}
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>应付金额</View>
                            <View>：</View>
                        </View>
                        <Input name='shouldPayAmount' className='input should-pay' placeholder='' />
                    </View>
                    <View className='form-item'>
                        <View className='label'>
                            <View className='name'>未付金额</View>
                            <View>：</View>
                        </View>
                        <Input name='unpaidAmount' className='input unpaid' placeholder='' />
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