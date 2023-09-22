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
import './index.module.less'
import Card, { CardProps } from '../../components/card';

export interface newCardProps extends CardProps {
  index: number
}

export default function Index() {

  const [drawShow, setDrawShow] = useState(false)
  const [filterShow, setFilterShow] = useState(false)
  const [projectList, setProjectList] = useState<CardProps[]>([])
  const [currentListItemId, setCurrentListItemId] = useState<string>("0")
  const [gotData, setGotData] = useState(false)

  useDidShow(() => {
    onListItemClicked("0", "desc")
  });

  useEffect(() => {
    onListItemClicked("0", "desc")
    // getCrawlData("0").then(res => {
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
      if (!res.result) return
      const resultData: CardProps[] = sortListItemData(res.result.filter(e => !e.is_deleted), sortType)
      setProjectList(resultData)
      setGotData(true)
      const newResultData: newCardProps[] = wyDeepClone(resultData).map((item, index) => {
        return {
          index, ...item
        }
      })
      const res1 = await Taro.setStorage({ key: "homePageData", data: { purchaseIntentionDisclosure: newResultData } })
      if (!res1) return
      return
    }
    if (listItemId === "1") {
      const res = await getPurchaseSocilitationAnnouncements()
      if (!res.result) return
      const resultData: CardProps[] = sortListItemData(res.result.filter(e => !e.is_deleted), sortType)
      setProjectList(resultData)
      setGotData(true)
      const newResultData: newCardProps[] = wyDeepClone(resultData).map((item, index) => {
        return {
          index, ...item
        }
      })
      const res1 = await Taro.setStorage({ key: "homePageData", data: { purchaseSocilitationAnnouncements: newResultData } })
      if (!res1) return
      return
    }
  }

  const onValueInputed = async (keyword: string) => {
    const res = await fuzzySearch(currentListItemId, keyword)
    setProjectList(res.result)
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
          <SideBar visible={drawShow} onClose={onCloseDrawShow} itemClicked={onListItemClicked} />
          {(drawShow || filterShow) && <Shadow onClose={onCloseDrawShow} />}
        </Fragment>}
    </View>
  )
}

