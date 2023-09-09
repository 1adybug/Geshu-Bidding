import { View } from '@tarojs/components'
import { useEffect, useState } from 'react';
import Taro from '@tarojs/taro';
import Search from '@/components/search';
import SideBar from '@/components/sideBar';
import './index.module.less'
import Card, { CardProps } from '../../components/card';
import ProjectList from "../../data/projects.json"

export default function Index() {

  const [drawShow, setDrawShow] = useState(false)

  useEffect(() => {
    Taro.setNavigationBarTitle({
      title: "xxx"
    })
  }, [])

  const onOpenDrawShow = () => {
    setDrawShow(true)
  }

  const onCloseDrawShow = () => {
    setDrawShow(false)
  }

  return (
    <View className='index'>
      <Search changeDrawShow={onOpenDrawShow} />
      <View className='main'>
        {ProjectList.map((project: CardProps) => {
          return (
            <Card key={project.id} projectName={project.projectName} projectSummarize={project.projectSummarize} releaseTime={project.releaseTime} id={project.id} isCollected={project.isCollected} />
          )
        })}
      </View>
      <SideBar visible={drawShow} onClose={onCloseDrawShow} />
    </View>
  )
}
