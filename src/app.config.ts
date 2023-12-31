export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/detail/index",
    "pages/list/index",
    "pages/my/index",
    "pages/recyclebin/index",
    "pages/mycollections/index",
    "pages/usersManage/index",
    "pages/home/index",
    "pages/personalInfo/index",
    "pages/setUsername/index",
    "pages/setPassword/index",
    "pages/setRole/index",
    "pages/login/index",
    "pages/remarkedit/index",
    "pages/addproject/index",
    "pages/recentlyviewed/index",
    "pages/projectdetail/index",
    "pages/projectedit/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#169E3B",
    navigationBarTitleText: "black",
    navigationBarTextStyle: "white",
  },
  tabBar: {
    position: "bottom",
    selectedColor: "#000",
    borderStyle: "black",
    list: [
      {
        pagePath: "pages/home/index",
        text: "首页",
        iconPath: "assets/homeDefault.png",
        selectedIconPath: "assets/homeActived.png",
      },
      {
        pagePath: "pages/mycollections/index",
        text: "收藏",
        iconPath: "assets/collectionsDefault.png",
        selectedIconPath: "assets/collectionsActived.png",
      },
      {
        pagePath: "pages/recentlyviewed/index",
        text: "浏览记录",
        iconPath: "assets/recentlyViewedDefault.png",
        selectedIconPath: "assets/recentlyViewedActived.png",
      },
      {
        pagePath: "pages/list/index",
        text: "项目",
        iconPath: "assets/projectsDefault.png",
        selectedIconPath: "assets/projectsActived.png",
      },
      {
        pagePath: "pages/my/index",
        text: "我的",
        iconPath: "assets/myDefault.png",
        selectedIconPath: "assets/myActived.png",
      },
    ],
  },
});
