import { Swiper, SwiperItem, View } from '@tarojs/components'
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
import { deleteSinglePurchaseIntentionDisclosure } from '@/services/deleteSinglePurchaseIntentionDisclosur';
import { deleteSinglePurchaseSolicitationAnnouncement } from '@/services/deleteSinglePurchaseSolicitationAnnouncement';
import ListItem from '@/components/demo';
import extractListData from '../../utils/extractListData';
import './index.module.less'
import { CardProps } from '../../components/card';

export default function Index() {

  const [drawShow, setDrawShow] = useState(false)
  const [filterShow, setFilterShow] = useState(false)
  const [projectList, setProjectList] = useState<CardProps[]>([])
  const [currentListItemId, setCurrentListItemId] = useState<string>("0")

  useEffect(() => {
    onListItemClicked("0", "desc")
    getCrawlData("1").then(res => {
      if (res.result) {
        extractListData(res.result)
      }
    })
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
      res.result && setProjectList(sortListItemData(res.result.filter(e => !e.is_deleted), sortType))
      return
    }
    if (listItemId === "1") {
      const res = await getPurchaseSocilitationAnnouncements()
      res.result && setProjectList(sortListItemData(res.result.filter(e => !e.is_deleted), sortType))
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

  const cardDelete = async (id: string) => {
    if (currentListItemId === "0") {
      const res = await deleteSinglePurchaseIntentionDisclosure(id)
      if (!res) return
      const res1 = await getPurchaseIntentionDisclosures()
      res1.result && setProjectList(sortListItemData(res1.result.filter(e => !e.is_deleted), "desc"))
      return
    }
    if (currentListItemId === "1") {
      const res = await deleteSinglePurchaseSolicitationAnnouncement(id)
      if (!res) return
      const res1 = await getPurchaseSocilitationAnnouncements()
      res1.result && setProjectList(sortListItemData(res1.result.filter(e => !e.is_deleted), "desc"))
      return
    }
  }

  return (
    <View className='index'>
      {/* <Search changeDrawShow={onOpenDrawShow} valueInputed={onValueInputed} changeFilterShow={onOpenFilterShow} />
      <FilterCard changeFilterShow={onOpenFilterShow} visible={filterShow} currentListItemId={currentListItemId} changeFilterCondition={onListItemClicked} />
      <View className='main'>
        {projectList.map((project: CardProps) => {
          return (
            <Card key={project._id} title={project.title} time={project.time} _id={project._id} isCollected={project.isCollected} currentListItemId={currentListItemId} onDelete={cardDelete} />
          )
        })}
      </View>
      <SideBar visible={drawShow} onClose={onCloseDrawShow} itemClicked={onListItemClicked} />
      {(drawShow || filterShow) && <Shadow onClose={onCloseDrawShow} />} */}
      <ListItem />
    </View>
  )
}

