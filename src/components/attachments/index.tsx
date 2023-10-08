import { View } from "@tarojs/components"
import { Attachment } from "@/pages/detail"
import extractFileSuffix from "@/utils/extractFileSuffix"
import { downloadAttachment } from "@/services/downloadAttachment"
import Taro from "@tarojs/taro"
import "./index.module.less"

interface AttachmentsProps {
    attachments: Attachment[]
}

export default function Attachments(props: AttachmentsProps) {
    const { attachments } = props

    async function attachmentClick(e: Attachment) {
        const res = await downloadAttachment(e.href, "." + extractFileSuffix(e.content))
        Taro.downloadFile({
            url: res.result.fileList[0].tempFileURL, //仅为示例，并非真实的资源
            success: function (res1) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res1.statusCode === 200) {
                    Taro.openDocument({
                        filePath: res1.tempFilePath,
                        success: function () {
                            console.log('打开文档成功')
                        }
                    })
                }
            }
        })
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