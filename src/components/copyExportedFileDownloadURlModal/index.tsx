import { View } from "@tarojs/components";
import copyToClipboard from "@/utils/copyToClipboard";
import Taro from "@tarojs/taro";
import CloseModalIcon from "../../assets/closeModalIcon.png"
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

    async function preview() {
        Taro.downloadFile({
            url,
            success: function (res1) {
                if (res1.statusCode === 200) {
                    Taro.openDocument({
                        filePath: res1.tempFilePath,
                        showMenu: true,
                        success: function () {
                            console.log('打开文档成功')
                        }
                    })
                }
            }
        })
    }

    return (
        <View className='copy-exported-file-Download-modal'>
            <img src={CloseModalIcon} alt='' className='closeModalIcon' onClick={() => closeModal()} />
            <View className='title'>下载地址</View>
            <View className='content'>
                <View className='url'>&nbsp;&nbsp;{url}</View>
                <View className='tip'>注：下载需复制链接至浏览器中打开</View>
            </View>
            <View className='bottom'>
                <View className='preview' onClick={preview}>预览</View>
                <View className='copy-url-button' onClick={copyURL}>复制链接</View>
            </View>
        </View>
    )
}