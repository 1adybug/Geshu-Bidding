import { View } from "@tarojs/components";
import AddIcon from "@/assets/adduserIcon.jpg"
import Taro, { useDidShow } from "@tarojs/taro";
import getProjects from "@/services/getProjects";
import { Fragment, useState } from "react";
import ProjectCard from "@/components/projectCard";
import { AtActivityIndicator } from "taro-ui";
import { analyzeExcel } from "@/services/analyzeExcel";
import "./index.module.less"
import { MakeOutItem } from "../addproject";

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
        await analyzeExcel()
    }

    return (
        <Fragment>
            {!gotData ? <View className='data-loading-container'>
                <AtActivityIndicator color='#169E3B' content='加载中...'></AtActivityIndicator>
            </View> : <View className='list'>
                <View className='top-button-group'>
                    <View className='download-template' onClick={handleDownloadTemplate}>下载模版</View>
                    <View className='bulk-import'>批量导入</View>
                    <View className='export'>导出</View>
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