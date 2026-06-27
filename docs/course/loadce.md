# 如何加载 CE-插件 ？
## 自动加载
把 Cloud-PE.iso 放到 Ventoy启动盘 中，在 Ventoy启动盘 中创建一个 `ce-apps` 文件夹，将 CE-插件 都放到这个文件夹中，实现进入PE时自动加载。

![](https://pic.imgdb.cn/item/66e7b942d9c307b7e9dc92c4.png)
## 手动加载
1.在 Cloud-PE 中双击打开插件文件进行加载

2.使用命令行加载：（使用 Cloud-小助手）

````cp-help.exe <插件路径(有空格要带引号)>````