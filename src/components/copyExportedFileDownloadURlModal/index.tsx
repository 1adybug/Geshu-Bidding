import { View } from "@tarojs/components";
import copyToClipboard from "@/utils/copyToClipboard";
import "./index.module.less"

interface CopyExportedFileDownloadModaProps {
    url: string
    closeModal: () => void
}

export default function CopyExportedFileDownloadModal(props: CopyExportedFileDownloadModaProps) {
    const { url, closeModal } = props

    async function copyURL() {
        await copyToClipboard(url)
        closeModal()
    }

    return (
        <View className='copy-exported-file-Download-modal'>
            <View className='title'>下载地址</View>
            <View className='content'>
                <View className='url'>&nbsp;&nbsp;{url}</View>
                <View className='tip'>注：请复制该链接至浏览器中打开</View>
            </View>
            <View className='copy-url-button' onClick={copyURL}>点击复制</View>
        </View>
    )
}