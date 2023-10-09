import { View } from "@tarojs/components"
import { Attachment } from "@/pages/detail"
// import extractFileSuffix from "@/utils/extractFileSuffix"
// import { downloadAttachment } from "@/services/downloadAttachment"
import Taro from "@tarojs/taro"
import { fetchFileDownloadURl } from "@/services/fetchFileDownloadURl"
import "./index.module.less"

interface AttachmentsProps {
    fileIDPrev: string
    attachments: Attachment[]
    modalChange: (title: string, downloadURL: string) => void
}

export default function Attachments(props: AttachmentsProps) {
    const { fileIDPrev, attachments,modalChange } = props

    async function attachmentClick(e: Attachment) {
        const res = await fetchFileDownloadURl(fileIDPrev + "_" + e.content)
        if (!res) return
        modalChange(e.content, res.result.fileList[0].tempFileURL)
        
    }

    return (
        <View className='attachments'>
            <View className='title'>附件</View>
            <View className='data'>
                {attachments.map((attachment: Attachment) => {
                    return (
                        <View onClick={() => attachmentClick(attachment)} className='data-item' key={attachment.href}>{attachment.content}</View>
                    )
                })}
            </View>
        </View>
    )
}