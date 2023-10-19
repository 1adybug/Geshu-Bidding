import { OpenData, View } from '@tarojs/components'
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
import { AtActivityIndicator, AtButton } from 'taro-ui';
import { wyDeepClone } from 'wangyong-utils';
import { exportToExcelFn } from '@/services/exportToExcel';
import CopyExportedFileDownloadModal from '@/components/copyExportedFileDownloadURlModal';
import { fetchExportedFileDownloadURl } from '@/services/fetchExportedFileDownloadURl';
import { fetchPurchaseSolicitationAnnouncementDataWillBeExported } from '@/services/fetchPurchaseSolicitationAnnouncementDataWillBeExported';
// import { downloadAttachment } from '@/services/downloadAttachment';
import { fetchLocalAnnouncement } from '@/services/fetchLocalAnnouncement';
import { fetchLocalAnnouncementDataWillBeExported } from '@/services/fetchLocalAnnouncementDataWillBeExported';
import sortExportData from '@/utils/sortExportData';
import ExportFileIcon from "../../assets/exportFileIcon.jpg"
import Card, { CardProps } from '../../components/card';
import "./index.module.less"

export default function Index() {

  const [drawShow, setDrawShow] = useState(false)
  const [filterShow, setFilterShow] = useState(false)
  const [projectList, setProjectList] = useState<CardProps[]>([])
  const [currentListItemId, setCurrentListItemId] = useState<string>("0")
  const [gotData, setGotData] = useState(false)
  const [shouldActivedListItemId, setShouldActivedListItemId] = useState("0")
  const [exportedFileDownloadURl, setExportedFileDownloadURl] = useState("")
  const [copyExportedFileURlModalVisible, setCopyExportedFileURlModalVisible] = useState(false)
  const [atActivityIndicatorContent, setAtActivityIndicatorContent] = useState("数据正在加载中...")

  useDidShow(() => {
    init()
  });

  useEffect(() => {
    // onListItemClicked("0", "desc")
    init()
    // getCrawlData("0").then(res => {
    //   if (res.result) {
    //     extractListData(res.result)
    //   }
    // })
    // queryDataDetails()
  }, [])

  function init() {
    getCurrentListItemId().then(res => {
      if (!res) return
      onListItemClicked(res.data.currentListItemId, "desc")
      setShouldActivedListItemId(res.data.currentListItemId)
      setCurrentListItemId(res.data.currentListItemId)
    })
    return
  }

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

  const onListItemClicked = async (listItemId: string, sortType: SortType) => {
    setCurrentListItemId(listItemId)
    if (listItemId === "0") {
      const res = await getPurchaseIntentionDisclosures()
      if (!res.result) return
      const resultData: CardProps[] = sortListItemData(res.result.filter(e => !e.is_deleted), sortType)
      setProjectList(resultData.filter(e => e.time !== "2023-10-19"))
      setGotData(true)
      const newResultData: CardProps[] = wyDeepClone(resultData)
      const res1 = await Taro.setStorage({ key: "homePageData", data: { purchaseIntentionDisclosure: newResultData } })
      if (!res1) return
      rememberCurrentListItemId("0")
      setShouldActivedListItemId("0")
      return
    }
    if (listItemId === "1") {
      const res = await getPurchaseSocilitationAnnouncements()
      if (!res.result) return
      const resultData: CardProps[] = sortListItemData(res.result.filter(e => !e.is_deleted), sortType)
      setProjectList(resultData.filter(e => e.time !== "2023-10-19"))
      setGotData(true)
      const newResultData: CardProps[] = wyDeepClone(resultData)
      const res1 = await Taro.setStorage({ key: "homePageData", data: { purchaseSocilitationAnnouncements: newResultData } })
      if (!res1) return
      rememberCurrentListItemId("1")
      setShouldActivedListItemId("1")
      return
    }
    if (listItemId === "2") {
      const res = await fetchLocalAnnouncement()
      if (!res.result) return
      const resultData: CardProps[] = sortListItemData(res.result.filter(e => !e.is_deleted), sortType)
      setProjectList(resultData.filter(e => e.time !== "2023-10-19"))
      setGotData(true)
      const newResultData: CardProps[] = wyDeepClone(resultData)
      const res1 = await Taro.setStorage({ key: "homePageData", data: { localAnnouncement: newResultData } })
      if (!res1) return
      rememberCurrentListItemId("2")
      setShouldActivedListItemId("2")
    }
  }

  async function rememberCurrentListItemId(id: string) {
    const res = await Taro.setStorage({ key: "currentListItemId", data: { currentListItemId: id } })
    if (!res) return
    return
  }

  async function getCurrentListItemId() {
    const res = await Taro.getStorage({ key: "currentListItemId" })
    if (!res) return
    return res
  }

  const onValueInputed = async (keyword: string) => {
    const res = await fuzzySearch(currentListItemId, keyword)
    setProjectList(sortListItemData(res.result.filter(e => !e.is_deleted).filter(e => e.time !== "2023-10-19"), "desc"))
  }

  async function exportData() {
    setAtActivityIndicatorContent("数据正在处理中...")
    setGotData(false)
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
    setGotData(true)
    setExportedFileDownloadURl(resDownloadURl.result.fileList[0].tempFileURL)
    copyExportedFileURlModalVisible ? setCopyExportedFileURlModalVisible(false) : setCopyExportedFileURlModalVisible(true)
  }

  function onCloseDownloadURLModal() {
    setCopyExportedFileURlModalVisible(false)
  }

  return (
    <View className='index'>
      {!gotData ?
        <View className='data-loading-container'>
          <AtActivityIndicator color='#169E3B' content={atActivityIndicatorContent}></AtActivityIndicator>
        </View> : <Fragment>
          <Search changeDrawShow={onOpenDrawShow} valueInputed={onValueInputed} changeFilterShow={onOpenFilterShow} />
          <FilterCard changeFilterShow={onOpenFilterShow} visible={filterShow} currentListItemId={currentListItemId} changeFilterCondition={onListItemClicked} />
          <View className='main'>
            {projectList.map((project: CardProps) => {
              return (
                <Card key={project._id} title={project.title} time={project.time} _id={project._id} is_collected={project.is_collected} currentListItemId={currentListItemId} />
              )
            })}
          </View>
          <SideBar visible={drawShow} onClose={onCloseDrawShow} itemClicked={onListItemClicked} activedItemId={shouldActivedListItemId} />
          {copyExportedFileURlModalVisible && <CopyExportedFileDownloadModal url={exportedFileDownloadURl} closeModal={onCloseDownloadURLModal} />}
          {(currentListItemId === "1" || currentListItemId === "2") && <img className='export-file-icon' src={ExportFileIcon} alt='' onClick={exportData} />}
          {(drawShow || filterShow || copyExportedFileURlModalVisible) && <Shadow onClose={onCloseDrawShow} />}
        </Fragment>}
    </View>
  )
}

