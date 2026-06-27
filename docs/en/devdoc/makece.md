# Making a CE plugin
:::tip Tip
If you're new to making plugins, you can use the [Cloud-PE Plugin Helper](https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/CE-%E6%8F%92%E4%BB%B6%E5%88%B6%E4%BD%9C%E5%B7%A5%E5%85%B7/CEMake.exe) for a guided build.
To check your PE version, boot into PE and open the Cloud Assistant app.

<img src="https://pic1.imgdb.cn/item/6905c8d63203f7be00bf6252.png" alt="Check PE version" width="500">

:::
This article helps newcomers quickly learn the plugin-packaging workflow and helps the Cloud-PE team grow the CE-plugin ecosystem.

For beginners, we recommend the Cloud-PE Plugin Helper. [Click here](https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/CE-%E6%8F%92%E4%BB%B6%E5%88%B6%E4%BD%9C%E5%B7%A5%E5%85%B7/CEMake.exe) to download it.

If the Plugin Helper doesn't meet your needs, or you'd like to build one by hand, read on.

Taking `DiskGenius` as an example, here is the list of required files:

![DiskGenius file list](https://pic.imgdb.cn/item/66e7b942d9c307b7e9dc932d.png)

1. First, create a new project folder, and inside it create a subfolder named `DiskGenius`, then put the files above into that subfolder.

![Create project folder](https://pic.imgdb.cn/item/66e7b943d9c307b7e9dc9353.png)

2. Place the following files in the project root: `*.cmd`, `*.bat` (CMD scripts), `*.reg` (registry files), `*.exe` (Win32 apps), `*.ini`, `*.wcs` (PECMD scripts). These executables run in the appropriate way when the plugin loads.

![Place executables](https://pic.imgdb.cn/item/66e7b947d9c307b7e9dc99a5.png)

:::tip Tip
Simple actions such as creating shortcuts can be done via the `lnk.cfg` config file.
:::

> The `lnk.cfg` config format is as follows (keywords are in Chinese, as required by the format):

```ini
;以下是所有目前可使用的命令
;⭐每一个命令都可以多次使用，例：在"复制文件"后加任意字符作为配置节后则可以再次使用
;⚠️本配置文件需要以UTF-8格式保存
;⚠️在目标路径中可以使用变量%FN%表示当前目录
[复制目录]
源目录名称=%FN%\example
复制到目录名称=X:\example
[设置壁纸]
壁纸文件名称=%FN%\example.jpg
[运行程序]
程序名称=example.exe
启动参数=/example
是否隐藏=0
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

:::warning Warning
**The file must be saved as UTF-8. In target paths you can use the variable `%FN%` to mean the current directory.**
:::

3. In the project folder, select all folders, right-click and compress. We recommend the 7z format.

:::danger Warning
Do not set any archive password, or the plugin will fail review and may fail to load.
:::

![Compress folder](https://pic.imgdb.cn/item/66e7b947d9c307b7e9dc99eb.png)

4. Rename the archive to `DiskGenius 插件.ce` and delete files you no longer need.

![Rename file](https://pic.imgdb.cn/item/66e7b947d9c307b7e9dc99fd.png)

5. Now you can try out the plugin you made!

![Try the plugin](https://pic.imgdb.cn/item/66e7b947d9c307b7e9dc995e.png)

Following the steps above, you can build a handy CE plugin.
