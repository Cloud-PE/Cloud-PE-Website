# Cloud-PE Website

[cloud-pe.cn](https://cloud-pe.cn) 的源码。

关于 Cloud-PE 本身请前往 [官网](https://cloud-pe.cn) 或 [文档](https://docs.cloud-pe.cn)。

## 本地开发

```bash
npm install
npm run dev      # 启动开发服务器
npm run build    # 构建至 source/
npm run preview  # 预览构建产物
npm run lint     # 代码检查
```

需要 Node.js ≥ 18.18。

## 部署

`npm run build` 后将 `source/` 目录的内容上传至任意静态托管服务即可。

由于使用了 `BrowserRouter`，请将所有未匹配路径回退到 `index.html`。

## 协议

[MIT](./LICENSE)
