import { View } from "@tarojs/components"
import { Fragment, useEffect, useState } from 'react';
import Search from '@/components/search';
import SideBar from '@/components/sideBar';
import Shadow from '@/components/shadow';
import { getPurchaseIntentionDisclosures } from '@/services/puchaseIntentionDisclosure';
import { getPurchaseSocilitationAnnouncements } from '@/services/purchaseSocilitationAnnouncement';
import sortListItemData, { SortType } from '@/utils/sortListItemData';
import { fuzzySearch } from '@/services/fuzzySearch';
import FilterCard from '@/components/filterCard';
import Taro, { useDidShow } from '@tarojs/taro';
import { getCrawlData } from '@/services/crawlData';
import extractListData from '@/utils/extractListData';
import { AtActivityIndicator } from 'taro-ui';
import { wyDeepClone } from 'wangyong-utils';
import { exportToExcelFn } from '@/services/exportToExcel';
import CopyExportedFileDownloadModal from '@/components/copyExportedFileDownloadURlModal';
import { fetchExportedFileDownloadURl } from '@/services/fetchExportedFileDownloadURl';
import { fetchPurchaseSolicitationAnnouncementDataWillBeExported } from '@/services/fetchPurchaseSolicitationAnnouncementDataWillBeExported';
// import { downloadAttachment } from '@/services/downloadAttachment';
import { fetchLocalAnnouncement } from '@/services/fetchLocalAnnouncement';
import { fetchLocalAnnouncementDataWillBeExported } from '@/services/fetchLocalAnnouncementDataWillBeExported';
import sortExportData from '@/utils/sortExportData';
import { fetchRecentlyViewed } from "@/services/fetchRecentlyViewed";
import recentlySort from "@/utils/recentlySort";
import { paginationQuery } from "@/services/paginationQuery";
import FloatingBall from "@/components/floatingBall";
import EmptyRecycleBinIcon from "@/assets/emptyRecycleBinIcon.jpg"
import { batchRemove } from "@/services/batchRemove";
import ExportFileIcon from "../../assets/exportFileIcon.jpg"
import Card, { CardProps } from '../../components/card';
import "./index.module.less"

const Home = () => {
    const [drawShow, setDrawShow] = useState(false)
    const [filterShow, setFilterShow] = useState(false)
    const [projectList, setProjectList] = useState<CardProps[]>([])
    const [currentListItemId, setCurrentListItemId] = useState<string>("0")
    const [gotData, setGotData] = useState(false)
    const [shouldActivedListItemId, setShouldActivedListItemId] = useState("0")
    const [exportedFileDownloadURl, setExportedFileDownloadURl] = useState("")
    const [copyExportedFileURlModalVisible, setCopyExportedFileURlModalVisible] = useState(false)
    const [atActivityIndicatorContent, setAtActivityIndicatorContent] = useState("加载中...")
    // const [recentlyCardList, setrecentlyCardList] = useState<RecentlyClickCard[]>([])
    const [pageIndex, setPageIndex] = useState(1)
    const [clickedListItemId, setClickedListItemId] = useState("")
    const [clickedSortType, setclickedSortType] = useState<SortType>("desc")
    const [deletes, setDeletes] = useState<string[]>([])

    useDidShow(() => {
        judgeInit()
    });

    useEffect(() => {
        // onListItemClicked("0", "desc")
        // init()
        // getCrawlData("1").then(res => {
        //     if (res.result) {
        //         extractListData(res.result)
        //     }
        // })
        // queryDataDetails()
        init()
    }, [])

    function judgeInit() {
        const listItemId = currentListItemId
        const sortType = "desc"
        if (pageIndex === 1) {
            handleListItemClicked()
        } else (
            onListItemClicked(listItemId, sortType)
        )
    }

    function init() {
        getCurrentListItemId().then(res => {
            if (!res) return
            onListItemClicked(res.data.currentListItemId, "desc")
            setShouldActivedListItemId(res.data.currentListItemId)
            setCurrentListItemId(res.data.currentListItemId)
        })
        return
    }

    useEffect(() => {
        handleListItemClicked()
    }, [clickedListItemId, clickedSortType, pageIndex])

    const onOpenDrawShow = () => {
        setDrawShow(true)
    }

    const onOpenFilterShow = () => {
        setFilterShow(!filterShow)
    }

    const onCloseDrawShow = () => {
        setDrawShow(false)
        setFilterShow(false)
        setCopyExportedFileURlModalVisible(false)
    }

    const onListItemClicked = (listItemId: string, sortType: SortType) => {
        setCurrentListItemId(listItemId)
        setClickedListItemId(listItemId)
        setclickedSortType(sortType)
        setPageIndex(1)
    }

    async function handleListItemClicked() {
        if (clickedListItemId === "0") {
            const res = await getPurchaseIntentionDisclosures()
            if (!res.result) return
            const resultData: CardProps[] = sortListItemData(res.result.filter(e => !e.is_deleted), clickedSortType)
            const newResultData: CardProps[] = wyDeepClone(resultData)
            const res1 = await Taro.setStorage({ key: "homePageData", data: { purchaseIntentionDisclosure: newResultData } })
            if (!res1) return
            const paginationQueryRes = await paginationQuery(clickedListItemId, pageIndex)
            if (!paginationQueryRes) return
            if (pageIndex > 1) {
                const newProjectList = wyDeepClone([...projectList, ...paginationQueryRes.result])
                setProjectList(newProjectList)
            } else {
                setProjectList(paginationQueryRes.result)
            }
            setGotData(true)
            rememberCurrentListItemId(clickedListItemId)
            setShouldActivedListItemId(clickedListItemId)
        }
        if (clickedListItemId === "1") {
            const res = await getPurchaseSocilitationAnnouncements()
            if (!res.result) return
            const resultData: CardProps[] = sortListItemData(res.result.filter(e => !e.is_deleted), clickedSortType)
            const newResultData: CardProps[] = wyDeepClone(resultData)
            const res1 = await Taro.setStorage({ key: "homePageData", data: { purchaseSocilitationAnnouncements: newResultData } })
            if (!res1) return
            const paginationQueryRes = await paginationQuery(clickedListItemId, pageIndex)
            if (!paginationQueryRes) return
            if (pageIndex > 1) {
                const newProjectList = wyDeepClone([...projectList, ...paginationQueryRes.result])
                setProjectList(newProjectList)
            } else {
                setProjectList(paginationQueryRes.result)
            }
            setGotData(true)
            rememberCurrentListItemId(clickedListItemId)
            setShouldActivedListItemId(clickedListItemId)
        }
        if (clickedListItemId === "2") {
            const res = await fetchLocalAnnouncement()
            if (!res.result) return
            const resultData: CardProps[] = sortListItemData(res.result.filter(e => !e.is_deleted), clickedSortType)
            const newResultData: CardProps[] = wyDeepClone(resultData)
            const res1 = await Taro.setStorage({ key: "homePageData", data: { localAnnouncement: newResultData } })
            if (!res1) return
            const paginationQueryRes = await paginationQuery(clickedListItemId, pageIndex)
            if (!paginationQueryRes) return
            if (pageIndex > 1) {
                const newProjectList = wyDeepClone([...projectList, ...paginationQueryRes.result])
                setProjectList(newProjectList)
            } else {
                setProjectList(paginationQueryRes.result)
            }
            setGotData(true)
            rememberCurrentListItemId(clickedListItemId)
            setShouldActivedListItemId(clickedListItemId)
        }
    }

    async function rememberCurrentListItemId(id: string) {
        const res = await Taro.setStorage({ key: "currentListItemId", data: { currentListItemId: id } })
        if (!res) return
        return
    }

    async function getCurrentListItemId() {
        try {
            const res = await Taro.getStorage({ key: "currentListItemId" })
            return res
        } catch (err) {
            return {
                data: {
                    currentListItemId: "0"
                }
            }
        }
    }

    const onValueInputed = async (keyword: string) => {
        if (keyword !== "") {
            try {
                const searchHistoryCache = await Taro.getStorage({ key: "searchHistory" })
                if (!searchHistoryCache) return
                let searchHistory: string[] = searchHistoryCache.data
                searchHistory.push(keyword)
                searchHistory = Array.from(new Set(searchHistory))
                await Taro.setStorage({ key: "searchHistory", data: searchHistory })
            } catch (err) {
                let searchHistory: string[] = []
                searchHistory.push(keyword)
                searchHistory = Array.from(new Set(searchHistory))
                await Taro.setStorage({ key: "searchHistory", data: searchHistory })
            }
            const res = await fuzzySearch(currentListItemId, keyword)
            setProjectList(sortListItemData(res.result.filter(e => !e.is_deleted), "desc"))
            return
        }
        if (keyword === "") {
            handleListItemClicked()
            return
        }
    }

    async function exportData() {
        Taro.showLoading({
            title: "正在导出"
        })
        let res: FetchPurchaseSolicitationAnnouncementDetailsWillBeExported | null = null
        if (currentListItemId === "1") {
            res = await fetchPurchaseSolicitationAnnouncementDataWillBeExported()
        }
        if (currentListItemId === "2") {
            res = await fetchLocalAnnouncementDataWillBeExported()
        }
        if (!res) return
        const resDataCopy = sortExportData(wyDeepClone(res.result.data), "desc")
        let initArr = resDataCopy.map((item: PurchaseSolicitationAnnouncementDetailWrapper) => {
            return [
                item.detail[0].project_no,
                item.detail[0].project_name,
                item.time,
                item.detail[0].budget,
                item.detail[0].submission_time,
                item.detail[0].principal_unit,
                item.detail[0].project_principal,
                item.detail[0].principal_contact,
                item.detail[0].remark
            ]
        })
        initArr.splice(0, 0, ["项目编号", "项目名称", "发布时间", "预算金额（万元）", "投标截止时间", "采购人单位", "采购人姓名", "采购人联系方式", "备注"])
        const res1 = await exportToExcelFn(initArr)
        if (!res1) return
        const resDownloadURl = await fetchExportedFileDownloadURl(res1.result)
        if (!resDownloadURl) return
        Taro.downloadFile({
            url: resDownloadURl.result.fileList[0].tempFileURL,
            success: function (downloadFileRes) {
                if (downloadFileRes.statusCode === 200) {
                    Taro.openDocument({
                        filePath: downloadFileRes.tempFilePath,
                        showMenu: true,
                        success: function () {
                            Taro.hideLoading()
                            console.log('打开文档成功')
                        }
                    })
                }
            }
        })
    }

    function onCloseDownloadURLModal() {
        setCopyExportedFileURlModalVisible(false)
    }

    Taro.useReachBottom(() => {
        setPageIndex(pageIndex + 1)
    })

    function itemClick(listItemId: string, sortType: SortType) {
        setGotData(false)
        onListItemClicked(listItemId, sortType)
    }

    function onDeleteItem(x: string, y: boolean) {
        setDeletes([...deletes, x])
        if (y) {
            deletes.push(x)
            return
        }
        if (!y) {
            setDeletes(deletes.filter(e => e !== x))
            return
        }
    }

    function handleClearClicked() {
        Taro.showModal({
            title: '提示',
            content: '确定要删除这些数据吗？',
            success: async function (res) {
                if (res.confirm) {
                    const res1 = await batchRemove(currentListItemId, deletes)
                    if (!res1) return
                    judgeInit()
                    Taro.showToast({
                        title: "删除成功！",
                        icon: "success",
                        duration: 2000
                    })
                    setDeletes([])
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    }

    return (
        <View className='home'>
            {!gotData ?
                <View className='data-loading-container'>
                    <AtActivityIndicator color='#169E3B' content={atActivityIndicatorContent}></AtActivityIndicator>
                </View> : <Fragment>
                    <Search changeDrawShow={onOpenDrawShow} valueInputed={onValueInputed} changeFilterShow={onOpenFilterShow} />
                    <FilterCard changeFilterShow={onOpenFilterShow} visible={filterShow} currentListItemId={currentListItemId} changeFilterCondition={onListItemClicked} />
                    <View className='main'>
                        {projectList.map((project: CardProps) => {
                            return (
                                <Card key={project._id} title={project.title} time={project.time} _id={project._id} is_collected={project.is_collected} currentListItemId={currentListItemId} deleteSelect={onDeleteItem} src='homePage' />
                            )
                        })}
                        {projectList.length > 0 && <View className='next-page'>加载更多</View>}
                    </View>
                    <SideBar visible={drawShow} onClose={onCloseDrawShow} itemClicked={itemClick} activedItemId={shouldActivedListItemId} />
                    {copyExportedFileURlModalVisible && <CopyExportedFileDownloadModal url={exportedFileDownloadURl} closeModal={onCloseDownloadURLModal} />}
                    {(currentListItemId === "1" || currentListItemId === "2") && deletes.length <= 0 && <img className='export-file-icon' src={ExportFileIcon} alt='' onClick={exportData} />}
                    {(drawShow || copyExportedFileURlModalVisible) && <Shadow onClose={onCloseDrawShow} />}
                    {/* <FloatingBall /> */}
                    {deletes.length > 0 && <img src={EmptyRecycleBinIcon} className='empty-icon' onClick={handleClearClicked} />}
                </Fragment>}
        </View>
    )
}

export default Home