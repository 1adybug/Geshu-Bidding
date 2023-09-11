import { PropsWithChildren } from "react";
import Taro, { useLaunch } from "@tarojs/taro";
import "./app.less";

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    console.log("App launched.");
    Taro.cloud.init({
      env: "geshu-bidding-5gnhpdzpb49a69a4",
    });

    Taro.cloud.callFunction({
      name: "getOpenId",
      data: {
        // 传递给云函数的参数
      },
      success: (res) => {
        // 处理云函数返回的结果
        console.log(1, res);
      },
      fail: (err) => {
        // 处理调用云函数过程中的错误
        console.log(2, err.errMsg);
      },
    });
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
