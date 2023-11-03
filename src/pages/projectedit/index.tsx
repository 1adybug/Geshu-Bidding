import { Fragment, useEffect, useState } from 'react';
import { View, Picker, Input, Form, Button } from '@tarojs/components';
import DropDownArrow from "@/assets/blackDropArrow.png"
import Taro, { useRouter } from '@tarojs/taro';
import dayjs from 'dayjs';
import DeleteDot from "@/assets/deleteDot.png"
import extractFileSuffix from '@/utils/extractFileSuffix';
import { findProject } from '@/services/findProject';
import { updateProject } from '@/services/updateProject';
import { wyDeepClone } from 'wangyong-utils';
import "./index.module.less"

export interface MakeOutItem {
    id: string
    time: string
    amount: string
}

export interface PaymentItem extends MakeOutItem { }

const PagePicker = () => {

    const router = useRouter()
    const { _id } = router.params
    const [detail, setDetail] = useState<any>(null)
    const [makeOuts, setMakeOuts] = useState<MakeOutItem[]>([])
    const [payments, setPayments] = useState<PaymentItem[]>([])
    const [contractAttachmentUploadText, setcontractAttachmentUploadText] = useState("更新附件")
    const [acceptancementUploadText, setAcceptancementUploadText] = useState("更新附件")
    const [contractFileID, setContractFileID] = useState("")
    const [acceptancementFileID, setAcceptancementFileID] = useState("")

    useEffect(() => {
        init()
    }, [])

    async function init() {
        if (!_id) return
        const findRes = await findProject(_id)
        if (!findRes) return
        setDetail(findRes.result.data[0])
    }

    async function submit() {
        if (detail.projectNo === "") {
            Taro.showToast({
                title: "项目编号为空",
                icon: "error",
                duration: 2000
            })
            return
        }
        const submitObj = wyDeepClone(detail)
        const updateRes = await updateProject(submitObj)
        if (!updateRes) return
        Taro.navigateBack()
    }

    function uploadContract() {
        Taro.chooseMessageFile({
            count: 1,
            success: async (res) => {
                const file = res.tempFiles[0];
                Taro.showLoading({
                    title: "上传中"
                })
                const uploadRes = await Taro.cloud.uploadFile({
                    cloudPath: 'projects/contract/' + dayjs().format("YYYYMMDDHHmmss") + "." + extractFileSuffix(file.name),
                    filePath: file.path
                })
                if (!uploadRes) return
                setContractFileID(uploadRes.fileID)
                setcontractAttachmentUploadText(file.name)
                setDetail({ ...detail, contractFileID: uploadRes.fileID })
                Taro.hideLoading()
            },
            fail: (err) => {
                console.log("失败！" + err);
            }
        });
    }

    function uploadAcceptancement() {
        Taro.chooseMessageFile({
            count: 1,
            success: async (res) => {
                const file = res.tempFiles[0];
                Taro.showLoading({
                    title: "上传中"
                })
                const uploadRes = await Taro.cloud.uploadFile({
                    cloudPath: 'projects/acceptancement/' + dayjs().format("YYYYMMDDHHmmss") + "." + extractFileSuffix(file.name),
                    filePath: file.path
                })
                if (!uploadRes) return
                setAcceptancementFileID(uploadRes.fileID)
                setAcceptancementUploadText(file.name)
                setDetail({ ...detail, acceptancementFileID: uploadRes.fileID })
                Taro.hideLoading()
            },
            fail: (err) => {
                console.log("失败！" + err);
            }
        });
    }

    function onMakeoutTimeChange(e: any, item: MakeOutItem) {
        const arr = wyDeepClone(detail.makeOuts)
        if (arr.find(a => a.id === item.id)) {
            arr.forEach(b => {
                if (b.id === item.id) {
                    b.time = e.detail.value
                    return
                }
            })
            setDetail({ ...detail, makeOuts: arr })
        } else {
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
    }

    function onPaymentChange(e: any, item: PaymentItem) {
        const arr = wyDeepClone(detail.payments)
        if (arr.find(a => a.id === item.id)) {
            arr.forEach(b => {
                if (b.id === item.id) {
                    b.time = e.detail.value
                    return
                }
            })
            setDetail({ ...detail, payments: arr })
        } else {
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
    }

    function onMakeoutInput(e: any, item: MakeOutItem) {
        const arr = wyDeepClone(detail.makeOuts)
        if (arr.find(a => a.id === item.id)) {
            arr.forEach(b => {
                if (b.id === item.id) {
                    b.amount = e.detail.value
                    return
                }
            })
            setDetail({ ...detail, makeOuts: arr })
        } else {
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
    }

    function onPaymentInput(e: any, item: PaymentItem) {
        const arr = wyDeepClone(detail.payments)
        if (arr.find(a => a.id === item.id)) {
            arr.forEach(b => {
                if (b.id === item.id) {
                    b.amount = e.detail.value
                    return
                }
            })
            setDetail({ ...detail, payments: arr })
        } else {
            setPayments(prevPm => {
                const updatedPm = prevPm.map((pm: MakeOutItem) => {
                    if (pm.id === item.id) {
                        return { ...pm, amount: e.detail.value };
                    }
                    return pm;
                });
                return updatedPm;
            });
        }
    }

    function addMakeout() {
        const obj = { id: dayjs().format("YYYYMMDDHHmmss"), time: dayjs().format("YYYY-MM-DD"), amount: "" }
        setMakeOuts(prevState => [...prevState, obj])
        const arrCopy = wyDeepClone(detail.makeOuts)
        arrCopy.push(obj)
        setDetail({ ...detail, makeOuts: arrCopy })
    }

    function addPayment() {
        const obj = { id: dayjs().format("YYYYMMDDHHmmss"), time: dayjs().format("YYYY-MM-DD"), amount: "" }
        setPayments(prevState => [...prevState, obj])
        const arrCopy = wyDeepClone(detail.payments)
        arrCopy.push(obj)
        setDetail({ ...detail, payments: arrCopy })
    }

    function delMakeout(e: MakeOutItem) {
        if (makeOuts.length) {
            setMakeOuts(makeOuts.filter((mk: MakeOutItem) => mk.id !== e.id))
        }
        setDetail({ ...detail, makeOuts: detail.makeOuts.filter((mk: MakeOutItem) => mk.id !== e.id) })
    }

    function delPayments(e: PaymentItem) {
        if (payments.length) {
            setPayments(payments.filter((pm: PaymentItem) => pm.id !== e.id))
        }
        const detailCopy = wyDeepClone(detail)
        setDetail({ ...detail, payments: detailCopy.payments.filter((mk: PaymentItem) => mk.id !== e.id) })
    }

    return (
        <Fragment>
            {detail && <View className='add-project'>
                <Form className='form' onSubmit={submit}>
                    <View className='form-content'>
                        <View className='form-item'>
                            <View className='label'>
                                <View className='name'>项目名称</View>
                                <View>：</View>
                            </View>
                            <Input name='projectName' value={detail.projectName} onInput={(e) => setDetail({ ...detail, projectName: e.detail.value })} className='input' />
                        </View>
                        <View className='form-item'>
                            <View className='label'>
                                <View className='name'>项目编号</View>
                                <View>：</View>
                            </View>
                            <Input name='projectNo' value={detail.projectNo} onInput={(e) => setDetail({ ...detail, projectNo: e.detail.value })} className='input' />
                        </View>
                        <View className='form-item'>
                            <View className='label'>
                                <View className='name'>中标时间</View>
                                <View>：</View>
                            </View>
                            <Picker value='' mode='date' onChange={(e) => setDetail({ ...detail, winningTime: e.detail.value })}>
                                <View className='picker'>
                                    <View className='value'>{detail.winningTime}</View>
                                    <img src={DropDownArrow} />
                                </View>
                            </Picker>
                        </View>
                        <View className='form-item'>
                            <View className='label'>
                                <View className='name'>合同金额</View>
                                <View>：</View>
                            </View>
                            <Input name='contractAmount' value={detail.contractAmount} onInput={(e) => setDetail({ ...detail, contractAmount: e.detail.value })} className='input' />
                        </View>
                        <View className='form-item'>
                            <View className='label'>
                                <View className='name'>合同</View>
                                <View>：</View>
                            </View>
                            <View className={contractAttachmentUploadText === "更新附件" ? 'upload-file' : 'upload-succeed'} onClick={uploadContract}>{contractAttachmentUploadText}</View>
                        </View>
                        <View className='form-item'>
                            <View className='label'>
                                <View className='name'>验收时间</View>
                                <View>：</View>
                            </View>
                            <Picker value='' mode='date' onChange={(e) => setDetail({ ...detail, receptionTime: e.detail.value })}>
                                <View className='picker'>
                                    <View className='value'>{detail.receptionTime}</View>
                                    <img src={DropDownArrow} />
                                </View>
                            </Picker>
                        </View>
                        <View className='form-item'>
                            <View className='label'>
                                <View className='name'>验收文件</View>
                                <View>：</View>
                            </View>
                            <View className={acceptancementUploadText === "更新附件" ? 'upload-file' : 'upload-succeed'} onClick={uploadAcceptancement} >{acceptancementUploadText}</View>
                        </View>
                        <View className='form-item'>
                            <View className='add-makeout' onClick={addMakeout}>添加开票信息</View>
                        </View>
                        {[...detail.makeOuts, ...makeOuts].map((item: MakeOutItem) => {
                            return (
                                <View key={item.id} className='makeout-box'>
                                    <img src={DeleteDot} alt='' className='delete-dot' onClick={() => delMakeout(item)} />
                                    <View className='form-item'>
                                        <View className='label'>
                                            <View className='name'>开票时间</View>
                                            <View>：</View>
                                        </View>
                                        <Picker value='' mode='date' onChange={(e) => onMakeoutTimeChange(e, item)}>
                                            <View className='picker-short'>
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
                                        <Input className='input-short' value={item.amount} onInput={(e) => onMakeoutInput(e, item)} />
                                    </View>
                                </View>
                            )
                        })}
                        <View className='form-item'>
                            <View className='add-payment' onClick={addPayment}>添加付款信息</View>
                        </View>
                        {[...detail.payments, ...payments].map((item: MakeOutItem) => {
                            return (
                                <View key={item.id} className='payment-box'>
                                    <img src={DeleteDot} alt='' className='delete-dot' onClick={() => delPayments(item)} />
                                    <View className='form-item'>
                                        <View className='label'>
                                            <View className='name'>付款时间</View>
                                            <View>：</View>
                                        </View>
                                        <Picker value='' mode='date' onChange={(e) => onPaymentChange(e, item)}>
                                            <View className='picker-short'>
                                                <View className='value'>{item.time}</View>
                                                <img src={DropDownArrow} />
                                            </View>
                                        </Picker>
                                    </View>
                                    <View className='form-item'>
                                        <View className='label'>
                                            <View className='name'>付款金额/比例</View>
                                            <View>：</View>
                                        </View>
                                        <Input className='input-short' value={item.amount} onInput={(e) => onPaymentInput(e, item)} />
                                    </View>
                                </View>
                            )
                        })}
                        <View className='form-item'>
                            <View className='label'>
                                <View className='name'>应付金额</View>
                                <View>：</View>
                            </View>
                            <Input name='shouldPayAmount' value={detail.shouldPayAmount} onInput={(e) => setDetail({ ...detail, shouldPayAmount: e.detail.value })} className='input should-pay' />
                        </View>
                        <View className='form-item'>
                            <View className='label'>
                                <View className='name'>未付金额/比例</View>
                                <View>：</View>
                            </View>
                            <Input name='unpaidAmount' value={detail.unpaidAmount} onInput={(e) => setDetail({ ...detail, unpaidAmount: e.detail.value })} className='input unpaid' />
                        </View>
                        <View className='form-item'>
                            <View className='label'>
                                <View className='name'>到期时间</View>
                                <View>：</View>
                            </View>
                            <Picker value='' mode='date' onChange={(e) => setDetail({ ...detail, deadline: e.detail.value })}>
                                <View className='picker'>
                                    <View className='value'>{detail.deadline}</View>
                                    <img src={DropDownArrow} />
                                </View>
                            </Picker>
                        </View>
                    </View>
                    <View className='btn-wrapper'>
                        <Button formType='submit' className='submit'>提交</Button>
                    </View>
                </Form>
            </View>}
        </Fragment>
    );
};

export default PagePicker