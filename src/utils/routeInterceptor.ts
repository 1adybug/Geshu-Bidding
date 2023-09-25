import Taro from '@tarojs/taro';

export default function setupRouteInterceptor(): void {
    const originalNavigateBack = Taro.navigateBack;
  
    Taro.navigateBack = function (options?: any): Promise<any> {
      const { delta = 1 } = options || {};
  
      // 在这里可以添加条件判断逻辑，决定是否执行路由跳转
  
      return originalNavigateBack.call(Taro, options);
    };
  }