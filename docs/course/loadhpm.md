# 如何使用 HotPE模块 ？
推荐使用 [CE-插件](https://files.cloud-pe.cn/%E4%B8%8B%E8%BD%BD/CE-%E6%8F%92%E4%BB%B6)

从 Cloud-PE 自发布开始便开始支持 HotPE模块
## 如何加载 HotPE模块 ？
### 自动加载
1.同 [ HotPE 加载 HotPE模块 方法](https://docs.hotpe.top/course/loadhpm.html)

2.把 Cloud-PE.iso 放到 Ventoy启动盘 中，在 Ventoy启动盘 中创建一个 `HotPEModule` 文件夹，将 HotPE模块 都放到这个文件夹中，实现进入PE时自动加载
### 手动加载
1.在 Cloud-PE 中双击打开 HotPE模块文件 进行加载

2.使用命令行加载：（使用CE-小助手）

````cp-help.exe <插件路径(有空格要带引号)>````
## 在 PE 中下载 HotPE模块
Cloud-PE 采用由 Cloud-PE开发团队 开发的 Cloud-插件市场（第三方HotPE模块商店） 进行 HotPE模块 的获取，在 Cloud-PE 的桌面上，找到Cloud-插件市场 并双击打开然后选择 HotPE源 便可以下载。