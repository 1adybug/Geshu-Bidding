import { View } from '@tarojs/components'
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
      <View className='main'>
        {ProjectList.map((project: CardProps) => {
          return (
            <Card key={project.id} projectName={project.projectName} projectSummarize={project.projectSummarize} releaseTime={project.releaseTime} id={project.id} />
          )
        })}
      </View>
    </View>
  )
}
