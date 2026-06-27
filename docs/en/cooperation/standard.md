# Project guidelines
## Add the Cloud-PE icon to CE plugin (*.ce) files
Make sure all CE plugin files carry the recognizable Cloud-PE icon.

## Loading plugin files
Users can load a CE plugin (*.ce) file by double-clicking it (set it as the default open action).

## Desktop shortcut suggestion
We suggest creating a desktop shortcut to the Cloud Plugin Market (Cloud-MGR.exe).

## Plugin market and source selection

:::warning Compatibility note
The Cloud-PE plugin market is built with Rust + egui and therefore depends on OpenGL. If it doesn't run properly on your PE, try [downloading this file](https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/CE-%E6%8F%92%E4%BB%B6%E5%B8%82%E5%9C%BA/opengl32.dll) and placing it in the same directory as `CloudMGR.exe`, then try again.
:::
We recommend the [official plugin market](https://p0.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/CE-%E6%8F%92%E4%BB%B6%E5%B8%82%E5%9C%BA/CloudMGR.exe).

You may also use a third-party build, or one modified from the [official plugin market source](https://github.com/Cloud-PE/Cloud-MGR). For third-party markets, the plugin source must come from the [official source](/en/cooperation/api) or an officially recognized mirror.
