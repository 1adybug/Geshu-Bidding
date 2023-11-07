import { View } from "@tarojs/components";
import AddIcon from "@/assets/adduserIcon.jpg"
import Taro, { useDidShow } from "@tarojs/taro";
import getProjects from "@/services/getProjects";
import { Fragment, useState } from "react";
import ProjectCard from "@/components/projectCard";
import { AtActivityIndicator } from "taro-ui";
import { analyzeExcel } from "@/services/analyzeExcel";
import extractFileSuffix from "@/utils/extractFileSuffix";
import { fetchAvatorUrl } from "@/services/fetchAvatorUrl";
import { exportToExcelFn } from "@/services/exportToExcel";
import { fetchExportedFileDownloadURl } from "@/services/fetchExportedFileDownloadURl";
import "./index.module.less"
import { MakeOutItem } from "../addproject";
import DownloadTemplateIcon from "../../assets/downloadLilIcon.jpg"
import ImportLilIcon from "../../assets/importLilIcon.jpg"
import ExportLilIcon from "../../assets/exportLilIcon.jpg"

export interface Project {
    _id: string
    projectName: string
    projectNo: string
    winningTime: string
    receptionTime: string
    /**
     * 验收文件ID
    */
    acceptancementFileID: string
    /**
     * 合同文件ID
    */
    contractFileID: string
    /**
     * 合同金额
    */
    contractAmount: string
    creator: string
    deadline: string
    /**
     * 开票信息
    */
    makeOuts: MakeOutItem[]
    /**
     * 付款信息
    */
    payments: PaymentItem[]
    shouldPayAmount: string
    unpaidAmount: string
}

export default function List() {

    const [projects, setProjects] = useState<Project[]>([])
    const [gotData, setGotData] = useState(false)

    useDidShow(() => {
        init()
    })

    async function init() {
        const getRes = await getProjects()
        if (!getRes) return
        setProjects(getRes.result.filter(e => !e.is_deleted))
        setGotData(true)
    }

    function onAddClick() {
        Taro.navigateTo({ url: "/pages/addproject/index" })
    }

    async function handleDownloadTemplate() {
        // await analyzeExcel()
        Taro.showLoading({
            title: "正在打开"
        })
        const downloadUrl = "https://6765-geshu-bidding-5gnhpdzpb49a69a4-1309350967.tcb.qcloud.la/projectList/%E9%A1%B9%E7%9B%AE%E5%AF%BC%E5%85%A5%E6%A8%A1%E7%89%88.xlsx?sign=b7b6a57396797651ae3a34cb8bc6204f&t=1699320353"
        Taro.downloadFile({
            url: downloadUrl,
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

    function bulkImport() {
        Taro.chooseMessageFile({
            count: 1,
            success: async (res) => {
                const file = res.tempFiles[0];
                if (extractFileSuffix(file.name) !== "xlsx") {
                    Taro.showToast({
                        title: "文件不合法",
                        icon: "error",
                        duration: 2000
                    })
                    return
                }
                Taro.showLoading({
                    title: "上传中"
                })
                const uploadRes = await Taro.cloud.uploadFile({
                    cloudPath: 'projectList/' + "项目导入文件" + "." + extractFileSuffix(file.name),
                    filePath: file.path
                })
                if (!uploadRes) return
                const resDownloadUrl = await fetchAvatorUrl(uploadRes.fileID)
                if (!resDownloadUrl) return
                const resImportData = await analyzeExcel(resDownloadUrl.result.fileList[0].tempFileURL)
                if (!resImportData) return
                Taro.showToast({
                    title: "导入成功！",
                    icon: "success",
                    duration: 2000
                })
                Taro.hideLoading()
                init()
            },
            fail: (err) => {
                console.log("失败！" + err);
            }
        });
    }

    async function exportList() {
        Taro.showLoading({
            title: "正在导出"
        })
        const getRes = await getProjects()
        if (!getRes) return
        let initArr = getRes.result.filter(e => !e.is_deleted).map((item) => {
            return [
                item.projectName,
                item.projectNo,
                item.winningTime,
                item.receptionTime,
                item.contractAmount,
                item.shouldPayAmount,
                item.unpaidAmount,
                item.deadline,
                item.makeOuts,
                item.payments
            ]
        })
        initArr.splice(0, 0, ["项目编号", "项目名称", "中标时间", "验收时间", "合同金额", "应付金额", "未付金额", "到期时间", "开票信息", "付款信息"])
        const res1 = await exportToExcelFn(initArr)
        if (!res1) return
        const resDownloadURl = await fetchExportedFileDownloadURl(res1.result)
        if (!resDownloadURl) return
        const downloadUrl = resDownloadURl.result.fileList[0].tempFileURL
        Taro.downloadFile({
            url: downloadUrl,
            success: function (downloadRes) {
                if (downloadRes.statusCode === 200) {
                    Taro.openDocument({
                        filePath: downloadRes.tempFilePath,
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

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='加载中...'></AtActivityIndicator>
            </View> : <View className='list'>
                <View className='top-button-group'>
                    <View className='download-template' onClick={handleDownloadTemplate}>
                        <img src={DownloadTemplateIcon} className='btn-left-icon' />
                        <View className='btn-text'>下载模版</View>
                    </View>
                    <View className='right'>
                        <View className='bulk-import' onClick={bulkImport}>
                            <img src={ImportLilIcon} className='btn-left-icon' />
                            <View className='btn-text'>批量导入</View>
                        </View>
                        <View className='export' onClick={exportList} >
                            <img src={ExportLilIcon} className='btn-left-icon' />
                            <View className='btn-text'>导出</View>
                        </View>
                    </View>
                </View>
                <View className='content'>
                    {projects.map((project: Project) => {
                        return <ProjectCard key={project._id} _id={project._id} projectNo={project.projectNo} projectName={project.projectName} winningTime={project.winningTime} receptionTime={project.receptionTime} shouldPayAmount={project.shouldPayAmount} unpaidAmount={project.unpaidAmount} />
                    })}
                </View>
                <img src={AddIcon} className='add' onClick={onAddClick} />
            </View>}
        </Fragment>
    )
}