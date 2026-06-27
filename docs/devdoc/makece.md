# 制作 CE-插件
:::tip 提示
若您是插件制作新手，可以使用 [Cloud-PE插件助手](https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/CE-%E6%8F%92%E4%BB%B6%E5%88%B6%E4%BD%9C%E5%B7%A5%E5%85%B7/CEMake.exe) 进行向导式制作。
若要查看PE版本号，请启动PE并打开 Cloud-小助手 软件，即可看到PE版本号。

<img src="https://pic1.imgdb.cn/item/6905c8d63203f7be00bf6252.png" alt="查看PE版本号" width="500">

:::
本文旨在帮助新手快速掌握插件包的开发流程，并促进 Cloud-PE 开发团队构建 CE-插件 的生态圈。

对于初学者，我们推荐使用 Cloud-PE插件助手 进行制作。[点击此处](https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/CE-%E6%8F%92%E4%BB%B6%E5%88%B6%E4%BD%9C%E5%B7%A5%E5%85%B7/CEMake.exe)下载工具。

如果您发现 Cloud-PE插件助手 无法满足您的需求，或者您希望亲自尝试制作，请继续阅读以下教程。

以 `DiskGenius` 为例，以下是所需文件的列表：

![DiskGenius文件列表](https://pic.imgdb.cn/item/66e7b942d9c307b7e9dc932d.png)

1. 首先，创建一个新工程文件夹，并在其中新建一个名为`DiskGenius`的子文件夹，将上述文件放入该子文件夹中。

![新建工程文件夹](https://pic.imgdb.cn/item/66e7b943d9c307b7e9dc9353.png)

2. 将以下文件放在工程文件夹根目录下：`*.cmd`, `*.bat`（CMD脚本文件）, `*.reg`（注册表文件）, `*.exe`（Win32应用程序）, `*.ini`, `*.wcs`（PECMD脚本文件）。这些执行文件将在加载插件时按相应方式运行。

![放置执行文件](https://pic.imgdb.cn/item/66e7b947d9c307b7e9dc99a5.png)

:::tip 提示
简单的创建快捷方式等功能可以通过 `lnk.cfg` 配置文件实现。
:::

> `lnk.cfg` 配置文件内容规范如下：

```ini
;以下是所有目前可使用的命令
;⭐每一个命令都可以多次使用，例：在"复制文件"后加任意字符作为配置节后则可以再次使用
;⚠️本配置文件需要以UTF-8格式保存
;⚠️在目标路径中可以使用变量%FN%表示当前目录
[复制目录]
源目录名称=%FN%\example
复制到目录名称=X:\example
源目录名称=%FN%\example
复制到目录名称=example
[设置壁纸]
壁纸文件名称=%FN%\example.jpg
[运行程序]
程序名称=example.exe
启动参数=/example
是否隐藏=0
;⚠️重要提示！运行程序是否隐藏参数为0为隐藏窗口，不为0则不隐藏窗口
[快捷方式]
快捷方式名称=example
目标=%FN%\example.exe
参数文本=/example
图标文件=X:\example.ico
备注=example
[创建目录]
目录名称=%FN%\example
[复制文件]
源文件名称=%FN%\example
复制到文件名称=%FN%\example-output
```

:::warning 警告
**文件格式需为UTF-8，在目标路径中可以使用变量 `%FN%` 表示当前目录。**
:::

3. 在工程文件夹中，选中所有文件夹并右键压缩。建议使用7z压缩格式。

:::danger 警告
请不要设置任何的压缩包密码，否则插件将审核不通过且可能将加载失败。
:::

![压缩文件夹](https://pic.imgdb.cn/item/66e7b947d9c307b7e9dc99eb.png)

4. 将压缩文件重命名为 `DiskGenius 插件.ce` ，并删除不再需要的文件。

![重命名文件](https://pic.imgdb.cn/item/66e7b947d9c307b7e9dc99fd.png)

5. 现在，您可以尝试使用您制作的插件了！

![尝试插件](https://pic.imgdb.cn/item/66e7b947d9c307b7e9dc995e.png)

按照以上步骤，您就可以制作出一个好用的 CE-插件 。
