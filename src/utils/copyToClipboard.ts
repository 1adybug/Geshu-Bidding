import Taro from "@tarojs/taro";

export default function copyToClipboard(text:string) {
  Taro.setClipboardData({
    data: text,
  })
    .then(() => {
      Taro.showToast({
        title: "已复制到剪贴板",
        icon: "success",
        duration: 2000,
      });
    })
    .catch((err) => {
      console.error("复制链接出错：", err);
    });
}
