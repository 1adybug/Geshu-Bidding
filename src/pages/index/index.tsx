import { View } from '@tarojs/components'
import { useEffect, useState } from 'react';
import Search from '@/components/search';
import SideBar from '@/components/sideBar';
import Shadow from '@/components/shadow';
import { getbidRejectionOrTerminationAnnouncements } from '@/services/bidRejectionOrTerminationAnnouncement';
// import { getPurchaseIntentionDisclosures } from '@/services/puchaseIntentionDisclosure';
import './index.module.less'
import Card, { CardProps } from '../../components/card';
// import ProjectList from "../../data/projects.json"

export default function Index() {

  const [drawShow, setDrawShow] = useState(false)
  const [projectList, setProjectList] = useState<CardProps[]>([])

  useEffect(() => {
    getbidRejectionOrTerminationAnnouncements().then((res) => {
      if (res.result) {
        const result: CardProps[] = res.result.map((e: PurchaseIntentionDisclosure) => {
          return {
            id: e._id,
            projectName: e.title,
            projectSummarize: "",
            releaseTime: e.time,
            isCollected: true
          }
        })
        setProjectList(result)
      }
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
        {projectList.map((project: CardProps) => {
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
