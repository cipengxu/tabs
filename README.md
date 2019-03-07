# tabs
高度抽象的选项卡组件，分SELECT、TOGGLE、HOVER三种行为，组合Tabs、Tab可以满足基本简单需求，
再配合Tab.Nav(TabNav)、Tab.Pane(TabPane)可以实现高度定制化的选项卡
1.提供了选项卡选中的回调方法
2.支持缓存选项卡内容：
  a.flush: true表示启用缓存，选项卡内容在DidMount之后不再走React组件渲染，仅做样式的显示和隐藏操作
  b.flush: false表示关闭缓存，每次都走React组件渲染机制

快速接入步骤
```sh
git clone https://github.com/cipengxu/tabs.git
cd tabs
npm install
npm start
```
接下来访问 [localhost:8080](http://localhost:8080/) 就可以看到效果了。
