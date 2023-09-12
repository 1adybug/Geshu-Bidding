import { View } from '@tarojs/components'
import { useEffect, useState } from 'react';
import Search from '@/components/search';
import SideBar from '@/components/sideBar';
import Shadow from '@/components/shadow';
import { fetchTest } from '@/services/puchaseIntention';
import './index.module.less'
import Card, { CardProps } from '../../components/card';
import ProjectList from "../../data/projects.json"

export default function Index() {

  const [drawShow, setDrawShow] = useState(false)

  useEffect(() => {
    fetchTest().then((res) => {
      console.log(1, res.result);
    }).catch(err => {
      console.log(2, err);
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
      {drawShow && <Shadow />}
    </View>
  )
}
