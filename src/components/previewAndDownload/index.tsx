import { View } from "@tarojs/components";
import copyToClipboard from "@/utils/copyToClipboard";
import Taro from "@tarojs/taro";
import "./index.module.less"

interface PreviewAndDownloadProps {
    attachmentTitle: string
    url: string
    closeModal: () => void
    onActivityIndicatorContentChange: (content: string) => void
}

export default function PreviewAndDownload(props: PreviewAndDownloadProps) {

    const { attachmentTitle, url, closeModal, onActivityIndicatorContentChange } = props

    async function copyURL() {
        await copyToClipboard(url)
        closeModal()
    }

    function handlePreview() {
        onActivityIndicatorContentChange("正在跳转，请稍后...")
        Taro.downloadFile({
            url,
            success: function (res1) {
                if (res1.statusCode === 200) {
                    Taro.openDocument({
                        filePath: res1.tempFilePath,
                        success: function () {
                            console.log('打开文档成功')
                        }
                    })
                    onActivityIndicatorContentChange("已完成跳转")
                }
            }
        })
        closeModal()
    }

    return (
        <View className='preview-and-download'>
            <View className='top-container'>
                <View className='title'>{attachmentTitle}</View>
                <View className='tip'>提示：下载需复制该链接至浏览器中打开</View>
            </View>
            <View className='btn-group'>
                <View className='preview' onClick={handlePreview}>预览</View>
                <View className='download' onClick={copyURL}>复制链接</View>
            </View>
        </View>
    )
}