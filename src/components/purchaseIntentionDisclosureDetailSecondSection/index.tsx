import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import "./index.module.less"
import Tabbar from "../tabbar";
import ProjectDetailTable from "../projectDetailTable";


interface PurchaseIntentionDisclosureDetailSecondSection {
    projects?: PurchaseIntentionDisclosureProject[]
}

export default function PurchaseIntentionDisclosureDetailSecondSection(props: PurchaseIntentionDisclosureDetailSecondSection) {

    const { projects } = props

    const [thisProject, setThisProject] = useState<PurchaseIntentionDisclosureProject | null | undefined>(projects ? projects[0] : null)

    useEffect(() => {
        projects && setThisProject(projects[0])
    }, [projects])

    function handleTabBarClick(e: string) {
        projects && setThisProject(projects.find((item: PurchaseIntentionDisclosureProject) => item.projectSummary === e))
    }

    return (
        <View className='purchase-intention-disclosure-detail-second-Section'>
            {projects && projects.length > 1 && <Tabbar projects={projects} clickWhich={handleTabBarClick} />}
            <ProjectDetailTable projectName={thisProject?.projectName} projectSummary={thisProject?.projectSummary} budget={thisProject?.budget} purchaseMonth={thisProject?.purchaseMonth} sfzmmxzxqycg={thisProject?.sfzmmxzxqycg} sfcgjncphjbzcp={thisProject?.sfcgjncphjbzcp} remark={thisProject?.remark} />
        </View>
    )
}