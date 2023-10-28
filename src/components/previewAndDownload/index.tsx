import { View } from "@tarojs/components";
import copyToClipboard from "@/utils/copyToClipboard";
import Taro from "@tarojs/taro";
import CloseModalIcon from "../../assets/closeModalIcon.png"
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
        
        closeModal()
    }

    return (
        <View className='preview-and-download'>
            <img src={CloseModalIcon} alt='' className='close-modal-icon' onClick={() => closeModal()} />
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