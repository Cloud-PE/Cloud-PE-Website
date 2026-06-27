# Integrating CE plugins into a PE system
> This section shows how to integrate CE plugins into your PE system to enable plugin loading.
## Cloud-PE plugin loader

- Open-source repo: https://github.com/Cloud-PE/winpe-plugin-loader

- Download the `Cloud-PE plugin loader`: [winpe_plugin_loader.exe](https://p2.cloud-pe.cn/Cloud-PE%E6%96%87%E4%BB%B6/CE-%E6%8F%92%E4%BB%B6%E5%8A%A0%E8%BD%BD%E5%99%A8/winpe_plugin_loader.exe)

The Cloud-PE plugin loader is a command-line tool written in `Rust`.

> The following describes its command-line arguments, to help you load CE plugins.
>
> (Features may vary between loader versions; the ones shown here are common features.)
>
> :::tip Tip
> You can run the Cloud-PE plugin loader directly in a command prompt to see all available arguments.
> :::
>```
>WinPE plugin loader
>Usage:
>  winpe_plugin_loader.exe main                  - search and load all plugins
>  winpe_plugin_loader.exe <plugin.ce>           - load a specific CE plugin
>  winpe_plugin_loader.exe <module.hpm>          - load a specific HPM module
>```
