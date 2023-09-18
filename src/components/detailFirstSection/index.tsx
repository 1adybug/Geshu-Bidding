import { View } from "@tarojs/components"
import { write, utils } from 'xlsx';
import { saveAs } from 'file-saver';
import Clock from "../../assets/clock.png"
import "./index.module.less"

interface DetailFirstSectionProps {
    currentListItemId?: string
    projectName?: string
    address?: string
    releaseTime?: string
    isCollected?: boolean
}

export default function DetailFirstSection(props: DetailFirstSectionProps) {

    const { currentListItemId, projectName, releaseTime, isCollected } = props

    // function convertJsonToExcel(jsonData) {
    //     const worksheet = utils.json_to_sheet(jsonData);
    //     const workbook = utils.book_new();
    //     utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    //     const excelData = write(workbook, { type: 'array', bookType: 'xlsx' });
    //     return new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // }

    // function handleDownloadExcel() {
    //     const jsonData = [
    //         {
    //             name: 'Alice',
    //             age: 25,
    //         }
    //     ];
    //     const excelBlob = convertJsonToExcel(jsonData);
    //     saveAs(excelBlob, 'data.xlsx');
    // }

    return (
        <View className='first-section'>
            <View className='title'>{projectName}</View>
            <View className='bottom'>
                <View className='tags'>
                    <img src={Clock} alt='' />
                    <View className='second'>{releaseTime}</View>
                </View>
                <View className='collect'>
                    {currentListItemId === "1" && <View className='export'>导出</View>}
                    <View className='text'>{isCollected ? "已收藏" : "收藏"}</View>
                </View>
            </View>
        </View>
    )
}