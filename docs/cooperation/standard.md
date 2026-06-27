# 项目规范
## 为 CE-插件（*.ce） 文件添加 Cloud-PE 图标
确保所有 CE-插件文件 都带有辨识度高的 Cloud-PE 图标 。

## 加载插件文件
用户可以通过双击 CE-插件（*.ce） 文件来直接加载（设置默认打开方式）。

## 桌面快捷方式建议
建议在桌面创建快捷方式：Cloud-插件市场（Cloud-MGR.exe）。

## 插件市场及插件源选择

:::warning 兼容性提醒
由于 Cloud-PE 插件市场 使用 Rust + egui 开发，因此它依赖 OpenGL 。如果它在您的 PE 上无法正常运行，请尝试[下载此文件](https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/CE-%E6%8F%92%E4%BB%B6%E5%B8%82%E5%9C%BA/opengl32.dll)并将他放在与 `CloudMGR.exe` 同目录下后再次尝试。
:::
推荐使用[官方版插件市场](https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/CE-%E6%8F%92%E4%BB%B6%E5%B8%82%E5%9C%BA/CloudMGR.exe)。

您也可以选择第三方版本或基于[官方版插件市场源代码](https://github.com/Cloud-PE/Cloud-MGR)修改的版本。对于第三方发布的插件市场，其插件源必须源自[官方源](/cooperation/api)或其官方认可的镜像源。