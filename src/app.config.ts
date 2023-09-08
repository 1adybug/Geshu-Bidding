export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/detail/index",
    "pages/list/index",
    "pages/my/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#ff7700",
    navigationBarTitleText: "black",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    position: "bottom",
    selectedColor: "#000",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "assets/home.png",
        selectedIconPath: "assets/homeActived.png",
      },
      {
        pagePath: "pages/list/index",
        text: "列表",
        iconPath: "assets/list.png",
        selectedIconPath: "assets/listActived.png",
      },
      {
        pagePath: "pages/my/index",
        text: "我的",
        iconPath: "assets/my.png",
        selectedIconPath: "assets/myActived.png",
      },
    ],
  },
});
