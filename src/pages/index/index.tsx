import { View } from '@tarojs/components'
import { useEffect, useState } from 'react';
import Search from '@/components/search';
import SideBar from '@/components/sideBar';
import Shadow from '@/components/shadow';
import { getbidRejectionOrTerminationAnnouncements } from '@/services/bidRejectionOrTerminationAnnouncement';
import { getPurchaseIntentionDisclosures } from '@/services/puchaseIntentionDisclosure';
import { getPurchaseSocilitationAnnouncements } from '@/services/purchaseSocilitationAnnouncement';
import { getCorrectAnnouncement } from '@/services/correctAnnouncement';
import { getresultsOrShortlistedAnnouncement } from '@/services/resultsOrShortlistedAnnouncement';
import { getcontractAnnouncements } from '@/services/contractAnnouncement';
import { getOtherAnnouncement } from '@/services/otherAnnouncement';
import { getCrawlData } from '@/services/crawlData';
import sortListItemData, { SortType } from '@/utils/sortListItemData';
// import Test from '@/components/exportData';
import { fuzzySearch } from '@/services/fuzzySearch';
import FilterCard from '@/components/filterCard';
import extractListData from '../../utils/extractListData';
import './index.module.less'
import Card, { CardProps } from '../../components/card';

export default function Index() {

  const [drawShow, setDrawShow] = useState(false)
  const [filterShow, setFilterShow] = useState(false)
  const [projectList, setProjectList] = useState<CardProps[]>([])
  const [currentListItemId, setCurrentListItemId] = useState<string>("0")

  useEffect(() => {
    onListItemClicked("0", "desc")
    // getCrawlData("1").then(res => {
    //   if (res.result) {
    //     extractListData(res.result)
    //   }
    // })
    // queryDataDetails()
  }, [])

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
      res.result && setProjectList(sortListItemData(res.result, sortType))
      return
    }
    if (listItemId === "1") {
      const res = await getPurchaseSocilitationAnnouncements()
      res.result && setProjectList(sortListItemData(res.result, sortType))
      return
    }
    // if (listItemId === "2") {
    //   const res = await getCorrectAnnouncement()
    //   res.result && setProjectList(sortListItemData(res.result, sortType))
    //   return
    // }
    // if (listItemId === "3") {
    //   const res = await getbidRejectionOrTerminationAnnouncements()
    //   res.result && setProjectList(sortListItemData(res.result, sortType))
    //   return
    // }
    // if (listItemId === "4") {
    //   const res = await getresultsOrShortlistedAnnouncement()
    //   res.result && setProjectList(sortListItemData(res.result, sortType))
    //   return
    // }
    // if (listItemId === "5") {
    //   const res = await getcontractAnnouncements()
    //   res.result && setProjectList(sortListItemData(res.result, sortType))
    //   return
    // }
    // if (listItemId === "6") {
    //   const res = await getOtherAnnouncement()
    //   res.result && setProjectList(sortListItemData(res.result, sortType))
    //   return
    // }
  }

  // async function queryDataDetails() {
  //   // const res = await getPurchaseIntentionDisclosures()
  //   // if (res.result) {
  //   //   const res2 = await fetchSinglePurchaseIntentionDisclosureDetail(res.result[0].href)
  //   //   console.log(res.result[0].title);
  //   //   const res3 = extractTableData(res2.result)
  //   //   console.log(JSON.stringify(res3));
  //   // }

  //   // const res = await getPurchaseSocilitationAnnouncements()
  //   // if (res.result) {
  //   //   const res2 = await fetchSingleDetail(res.result[2].href)
  //   //   console.log(extractAnnouncementKeyInfo(JSON.stringify(res2.result)));
  //   // }
  // }

  const onValueInputed = async (keyword: string) => {
    const res = await fuzzySearch(currentListItemId, keyword)
    setProjectList(res.result)
  }

  return (
    <View className='index'>
      <Search changeDrawShow={onOpenDrawShow} valueInputed={onValueInputed} changeFilterShow={onOpenFilterShow} />
      <FilterCard changeFilterShow={onOpenFilterShow} visible={filterShow} currentListItemId={currentListItemId} changeFilterCondition={onListItemClicked} />
      <View className='main'>
        {projectList.map((project: CardProps) => {
          return (
            <Card key={project._id} title={project.title} time={project.time} _id={project._id} isCollected={project.isCollected} currentListItemId={currentListItemId} />
          )
        })}
      </View>
      <SideBar visible={drawShow} onClose={onCloseDrawShow} itemClicked={onListItemClicked} />
      {(drawShow || filterShow) && <Shadow onClose={onCloseDrawShow} />}
    </View>
  )
}

