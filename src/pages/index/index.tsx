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
// import { getCrawlData } from '@/services/crawlData';
import sortListItemData from '@/utils/sortListItemData';
// import extractListData from '../../utils/extractListData';
import './index.module.less'
import Card, { CardProps } from '../../components/card';

export default function Index() {

  const [drawShow, setDrawShow] = useState(false)
  const [projectList, setProjectList] = useState<CardProps[]>([])

  useEffect(() => {
    onListItemClicked("0")
    // getCrawlData("5").then(res => {
    //   if (res.result) {
    //     extractListData(res.result)
    //   }
    // })
  }, [])

  const onOpenDrawShow = () => {
    setDrawShow(true)
  }

  const onCloseDrawShow = () => {
    setDrawShow(false)
  }

  const onListItemClicked = async (listItemId: string) => {
    if (listItemId === "0") {
      const res = await getPurchaseIntentionDisclosures()
      res.result && setProjectList(res.result && sortListItemData(res.result))
      return
    }
    if (listItemId === "1") {
      const res = await getPurchaseSocilitationAnnouncements()
      res.result && setProjectList(sortListItemData(res.result))
      return
    }
    if (listItemId === "2") {
      const res = await getCorrectAnnouncement()
      res.result && setProjectList(sortListItemData(res.result))
      return
    }
    if (listItemId === "3") {
      const res = await getbidRejectionOrTerminationAnnouncements()
      res.result && setProjectList(sortListItemData(res.result))
      return
    }
    if (listItemId === "4") {
      const res = await getresultsOrShortlistedAnnouncement()
      res.result && setProjectList(sortListItemData(res.result))
      return
    }
    if (listItemId === "5") {
      const res = await getcontractAnnouncements()
      res.result && setProjectList(sortListItemData(res.result))
      return
    }
    if (listItemId === "6") {
      const res = await getOtherAnnouncement()
      res.result && setProjectList(sortListItemData(res.result))
      return
    }
  }

  return (
    <View className='index'>
      <Search changeDrawShow={onOpenDrawShow} />
      <View className='main'>
        {projectList.map((project: CardProps) => {
          return (
            <Card key={project.id} projectName={project.projectName} projectSummarize={project.projectSummarize} releaseTime={project.releaseTime} id={project.id} isCollected={project.isCollected} />
          )
        })}
      </View>
      <SideBar visible={drawShow} onClose={onCloseDrawShow} itemClicked={onListItemClicked} />
      {drawShow && <Shadow />}
    </View>
  )
}

