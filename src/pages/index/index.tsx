import { View } from '@tarojs/components'
import Search from '@/components/search';
// import { useLoad } from '@tarojs/taro';
import './index.less'
import Card, { CardProps } from '../../components/card';
import ProjectList from "../../data/projects.json"

export default function Index() {

  // useLoad(() => {
  //   console.log(ProjectList)
  // })

  return (
    <View className='index'>
      <Search />
      <View className='main'>
        {ProjectList.map((project: CardProps) => {
          return (
            <Card key={project.id} projectName={project.projectName} projectSummarize={project.projectSummarize} releaseTime={project.releaseTime} id={project.id} isCollected={project.isCollected} />
          )
        })}
      </View>
    </View>
  )
}
