# 集成 CE-插件 至PE系统
> 本节将指导您如何将 CE-插件 集成到您的 PE 系统中，以实现 CE-插件 的加载功能。
## Cloud-PE 插件加载器

- 开源仓库：https://github.com/Cloud-PE/winpe-plugin-loader

- 下载 `Cloud-PE 插件加载器`：[winpe_plugin_loader.exe](https://p2.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/CE-%E6%8F%92%E4%BB%B6%E5%8A%A0%E8%BD%BD%E5%99%A8/winpe_plugin_loader.exe)

Cloud-PE 插件加载器是一款 `Rust` 语言编写的命令行工具。

>以下为命令行参数的说明，以帮助您实现 CE-插件 的相关功能
>
>（请注意，不同版本的 Cloud-PE 插件加载器 功能可能有所变化，以下展示的功能为通用功能）
>
>:::tip 提示
>您可以在命令提示符中直接运行 Cloud-PE 插件加载器 来获取它的所有可用的命令行参数
>:::
>```
>WinPE插件加载器
>用法:
>  winpe_plugin_loader.exe main                       - 搜索并加载所有插件
>  winpe_plugin_loader.exe <plugin.ce>           - 加载指定CE插件
>  winpe_plugin_loader.exe <module.hpm>      - 加载指定HPM模块
>```