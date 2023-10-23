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
        iconPath: "assets/home.jpg",
        selectedIconPath: "assets/homeActived.jpg",
      },
      {
        pagePath: "pages/list/index",
        text: "项目",
        iconPath: "assets/own.jpg",
        selectedIconPath: "assets/ownActived.jpg",
      },
      {
        pagePath: "pages/my/index",
        text: "我的",
        iconPath: "assets/my.jpg",
        selectedIconPath: "assets/myActived.jpg",
      },
    ],
  },
});
