# 采用 Hexo 搭建博客

## 安装 Hexo

[文档 | Hexo](https://hexo.io/zh-cn/docs/)

### 修改 npm 镜像

npm 使用国内镜像的方法
换成阿里源

```npm
npm config set registry https://registry.npm.taobao.org
```

验证命令

```npm
npm config get registry
```

返回 https://registry.npm.taobao.org ，说明镜像配置成功。

### 安装 Hexo

所有必备的应用程序安装完成后，即可使用 npm 安装 Hexo。

```npm
npm install -g hexo-cli
```

### 进阶安装和使用

对于熟悉 npm 的进阶用户，可以仅局部安装 `hexo` 包。

```npm
npm install hexo
```

安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。

```npm
hexo init <folder>
cd <folder>
npm install
```

初始化后，您的项目文件夹将如下所示：

```
.
├── _config.yml
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```

## 主题

### Butterfly

#### 最新版本

```bash
git clone https://github.com/jerryc127/hexo-theme-butterfly.git
```

#### 历史版本

butterfly 地址：[hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly)

![image-20241031193021306](https://y.creammint.cn/articles/images/image-20241031193021306.png)

![image-20241031193052857](https://y.creammint.cn/articles/images/image-20241031193052857.png)

找到你需要的版本，点进去；

![image-20241031193121881](https://y.creammint.cn/articles/images/image-20241031193121881.png)

![image-20241031193157927](https://y.creammint.cn/articles/images/image-20241031193157927.png)

最后选择 Download ZIP 下载，放到你本地文件上；

![image-20241031193257830](https://y.creammint.cn/articles/images/image-20241031193257830.png)

### anzhiyu

[安知鱼主题官方文档](https://docs.anheyu.com/)

#### Vercel 部署 Twikoo

[Vercel 部署 Twikoo 评论系统](https://blog.kevinchu.top/2023/09/19/vercel-deploy-twikoo/)

#### 字数统计

要为 AnZhiYu 配上字数统计特性, 你需要如下几个步骤:

打开 hexo 工作目录

bash

```bash
npm install hexo-wordcount --save
或者
yarn add hexo-wordcount
```

修改 主题配置文件:

yml

```yml
wordcount:
  enable: true
  post_wordcount: true
  min2read: true
  total_wordcount: true
```
