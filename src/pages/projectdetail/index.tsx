import { findProject } from "@/services/findProject";
import { View } from "@tarojs/components";
import Taro, { useDidShow, useRouter } from "@tarojs/taro";
import { Fragment, useEffect, useState } from "react";
import { fetchAvatorUrl } from "@/services/fetchAvatorUrl";
import { delProject } from "@/services/delProject";
import "./index.module.less"

interface MakeoutOrPaymentProps {
    time: string
    amount: string
    type: 0 | 1
}

export function MakeoutOrPayment(props: MakeoutOrPaymentProps) {

    const { time, amount, type } = props

    return (
        <View className='makeout-or-payment'>
            <View className='item'>
                <View className='label'>
                    <View className='text'>{type === 0 ? "开票" : "付款"}时间</View>
                    <View>：</View>
                </View>
                <View className='data'>{time}</View>
            </View>
            <View className='item'>
                <View className='label'>
                    <View className='text'>{type === 0 ? "开票" : "付款"}金额/比例</View>
                    <View>：</View>
                </View>
                <View className='data-short'>{amount}</View>
            </View>
        </View>
    )
}

export default function ProjectDetail() {

    const router = useRouter()
    const { _id } = router.params
    const [detail, setDetail] = useState<any>(null)
    const [contractURL, setContractURL] = useState("")
    const [receptionURL, setReceptionURL] = useState("")

    useDidShow(() => {
        init()
    })

    async function init() {
        if (!_id) return
        const findRes = await findProject(_id)
        setDetail(findRes.result.data[0])
        const contractURLRes = await fetchAvatorUrl(findRes.result.data[0].contractFileID)
        contractURLRes.result && setContractURL(contractURLRes.result.fileList[0].tempFileURL)
        const receptionURLRes = await fetchAvatorUrl(findRes.result.data[0].acceptancementFileID)
        receptionURLRes.result && setReceptionURL(receptionURLRes.result.fileList[0].tempFileURL)
    }

    function previewContractFIle() {
        Taro.showLoading({
            title: "正在打开"
        })
        Taro.downloadFile({
            url: contractURL,
            success: function (res1) {
                if (res1.statusCode === 200) {
                    Taro.openDocument({
                        filePath: res1.tempFilePath,
                        showMenu: true,
                        success: function (openDocRes) {
                            Taro.hideLoading()
                            console.log('打开文档成功', openDocRes)
                        }
                    })
                }
            }
        })
    }

    function previewReceptionFile() {
        Taro.showLoading({
            title: "正在打开"
        })
        Taro.downloadFile({
            url: receptionURL,
            success: function (res1) {
                if (res1.statusCode === 200) {
                    Taro.openDocument({
                        filePath: res1.tempFilePath,
                        showMenu: true,
                        success: function (openDocRes) {
                            Taro.hideLoading()
                            console.log('打开文档成功', openDocRes)
                        }
                    })
                }
            }
        })
    }

    function edit() {
        Taro.navigateTo({ url: `/pages/projectedit/index?_id=${_id}` })
    }

    function del() {
        Taro.showModal({
            title: '提示',
            content: '确定要删除吗？',
            success: async function (res) {
                if (res.confirm) {
                    const delRes = await delProject(_id)
                    if (!delRes) return
                    Taro.navigateBack()
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }

    return (
        <View className='project-detail'>
            {detail && <Fragment>
                <View className='content'>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>项目名称</View>
                            <View className='colon'>：</View>
                        </View>
                        <View className='data'>{detail.projectName}</View>
                    </View>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>项目编号</View>
                            <View className='colon'>：</View>
                        </View>
                        <View className='data'>{detail.projectNo}</View>
                    </View>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>中标时间</View>
                            <View className='colon'>：</View>
                        </View>
                        <View className='data'>{detail.winningTime}</View>
                    </View>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>验收时间</View>
                            <View className='colon'>：</View>
                        </View>
                        <View className='data'>{detail.receptionTime}</View>
                    </View>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>合同金额</View>
                            <View className='colon'>：</View>
                        </View>
                        <View className='data'>{detail.contractAmount}</View>
                    </View>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>合同</View>
                            <View className='colon'>：</View>
                        </View>
                        <View className='file-preview' onClick={previewContractFIle}>{detail.contractFileID === "" ? "暂无文件" : "预览"}</View>
                    </View>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>验收文件</View>
                            <View className='colon'>：</View>
                        </View>
                        <View className='file-preview' onClick={previewReceptionFile}>{detail.acceptancementFileID === "" ? "暂无文件" : "预览"}</View>
                    </View>
                    <View className='item-list'>
                        {detail.makeOuts.map(makeout => {
                            return <MakeoutOrPayment key={makeout.id} time={makeout.time} amount={makeout.amount} type={0} />
                        })}
                    </View>
                    <View className='item-list'>
                        {detail.payments.map(payment => {
                            return <MakeoutOrPayment key={payment.id} time={payment.time} amount={payment.amount} type={1} />
                        })}
                    </View>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>应付金额</View>
                            <View className='colon'>：</View>
                        </View>
                        <View className='data-shouldpay'>{detail.shouldPayAmount}</View>
                    </View>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>未付金额/比例</View>
                            <View className='colon'>：</View>
                        </View>
                        <View className='data-unpaid'>{detail.unpaidAmount}</View>
                    </View>
                    <View className='item'>
                        <View className='label'>
                            <View className='text'>到期时间</View>
                            <View className='colon'>：</View>
                        </View>
                        <View className='data'>{detail.deadline}</View>
                    </View>
                </View>
                <View className='edit-wrapper'>
                    <View className='edit' onClick={edit}>编辑</View>
                    <View className='delete' onClick={del}>删除</View>
                </View>
            </Fragment>}
        </View>
    )
}