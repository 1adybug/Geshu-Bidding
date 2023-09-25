import { View } from "@tarojs/components";
import "./index.module.less"

interface CopyExportedFileDownloadModaProps {
    url: string
}

export default function CopyExportedFileDownloadModal(props: CopyExportedFileDownloadModaProps) {
    const { url } = props
    return (
        <View className='copy-exported-file-Download-modal'>
            <View className='title'>导出文件下载链接</View>
            <View className='url-container'>{url}</View>
            <View className='copy-url-button'>请复制该链接到浏览器中打开</View>
        </View>
    )
}