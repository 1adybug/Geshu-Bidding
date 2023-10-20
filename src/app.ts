import { PropsWithChildren, useEffect } from "react";
import Taro, { useLaunch } from "@tarojs/taro";
import "taro-ui/dist/style/index.scss";
import { CLOUD_SERVICE } from "../config/env";
import "./app.less";

function App({ children }: PropsWithChildren<any>) {
  
  useLaunch(() => {
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init({
        traceUser: true,
        env: CLOUD_SERVICE,
      });
    }
  });

  useEffect(() => {
    const handleHide = () => {
      console.log("小程序被关闭了");
    };

    Taro.onAppHide(handleHide);

    return () => {
      Taro.offAppHide(handleHide);
    };
  }, []);

  // children 是将要会渲染的页面
  return children;
}

export default App;
