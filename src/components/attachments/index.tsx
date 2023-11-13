import { View } from "@tarojs/components"
import { Attachment } from "@/pages/detail"
// import extractFileSuffix from "@/utils/extractFileSuffix"
// import { downloadAttachment } from "@/services/downloadAttachment"
import { fetchFileDownloadURl } from "@/services/fetchFileDownloadURl"
import Taro from "@tarojs/taro"
import "./index.module.less"

interface AttachmentsProps {
    fileIDPrev: string
    attachments: Attachment[]
    // attachmentClicked: (gotDataStatus: boolean) => void
    // modalChange: (title: string, downloadURL: string) => void
}

export default function Attachments(props: AttachmentsProps) {

    const { fileIDPrev, attachments } = props

    async function attachmentClick(e: Attachment) {
        Taro.showLoading({
            title: "请稍等"
        })
        const res = await fetchFileDownloadURl(fileIDPrev + "_" + e.content)
        console.log(1,fileIDPrev + "_" + e.content);
        
        if (!res) return
        const downloadUrl = res.result.fileList[0].tempFileURL
        console.log(2,downloadUrl);
        
        Taro.downloadFile({
            url: downloadUrl,
            success: function (res1) {
                if (res1.statusCode === 200) {
                    Taro.hideLoading()
                    Taro.showActionSheet({
                        itemList: ["分享", "预览"],
                        success: (sheetRes) => {
                            if (sheetRes.tapIndex === 0) {
                                Taro.shareFileMessage({
                                    filePath: res1.tempFilePath,
                                    fileName: e.content,
                                    success: () => {
                                        console.log("分享文档成功！")
                                    },
                                    fail: (err) => {
                                        console.log("分享文件出错：" + JSON.stringify(err));
                                    },
                                })
                                return
                            }
                            if (sheetRes.tapIndex === 1) {
                                Taro.openDocument({
                                    filePath: res1.tempFilePath,
                                    showMenu: true,
                                    success: function (openDocRes) {
                                        Taro.hideLoading()
                                        console.log('打开文档成功', openDocRes)
                                    }
                                })
                                return
                            }
                            return 
                        },
                        fail: () => {
                            console.log("打开操作页失败！");
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