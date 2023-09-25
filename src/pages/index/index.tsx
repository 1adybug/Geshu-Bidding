import { View } from '@tarojs/components'
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

  useDidShow(() => {
    init()
  });

  useEffect(() => {
    onListItemClicked("0", "desc")
    init()
    // getCrawlData("1").then(res => {
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
  }

  const onListItemClicked = async (listItemId: string, sortType: SortType) => {
    setCurrentListItemId(listItemId)
    if (listItemId === "0") {
      const res = await getPurchaseIntentionDisclosures()
      if (!res.result) return
      const resultData: CardProps[] = sortListItemData(res.result.filter(e => !e.is_deleted), sortType)
      setProjectList(resultData)
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
      setProjectList(resultData)
      setGotData(true)
      const newResultData: CardProps[] = wyDeepClone(resultData).map((item, index) => {
        return {
          index, ...item
        }
      })
      const res1 = await Taro.setStorage({ key: "homePageData", data: { purchaseSocilitationAnnouncements: newResultData } })
      if (!res1) return
      rememberCurrentListItemId("1")
      setShouldActivedListItemId("1")
      return
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
    setProjectList(sortListItemData(res.result.filter(e => !e.is_deleted), "desc"))
  }

  async function exportData() {
    const data = [
      ["Name", "Age", "Country"],
      ["AK-103", "25", "USA"],
      ["Jane Smith", "30", "Canada"],
      ["Bob Johnson", "33", "Australia"],
    ]
    // const data = await 
    const res = await exportToExcelFn(data)
    if (!res) return
    const resDownloadURl = await fetchExportedFileDownloadURl(res.result)
    if (!resDownloadURl) return
    console.log(resDownloadURl.result.fileList[0].tempFileURL);
    setExportedFileDownloadURl(resDownloadURl.result.fileList[0].tempFileURL)
    copyExportedFileURlModalVisible ? setCopyExportedFileURlModalVisible(false) : setCopyExportedFileURlModalVisible(true)
  }

  return (
    <View className='index'>
      {!gotData ?
        <View className='data-loading-container'>
          <AtActivityIndicator color='#169E3B' content='数据加载中...'></AtActivityIndicator>
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
          {copyExportedFileURlModalVisible && <CopyExportedFileDownloadModal url={exportedFileDownloadURl} />}
          <img className='export-file-icon' src={ExportFileIcon} alt='' onClick={exportData} />
          {(drawShow || filterShow || copyExportedFileURlModalVisible) && <Shadow onClose={onCloseDrawShow} />}
        </Fragment>}
    </View>
  )
}

