# Chrome 扩展开发记录：网站二维码生成器

## 1. 初始需求提示词

请帮我创建在Chrome浏览器上，打开任意网页时，右下角展示当前网站二维码的插件。展示的这个二维码应该有以下几个特性：
1、二维码大小为256x256；
2、二维码的中间部分获取展示当前网站的logo
3、二维码的下方，分两行分别展示网站名称和网页标题，网页标题要加粗，最多展示15个字。

## 2. 基础框架搭建
需要创建的文件：
- manifest.json (扩展配置文件)
- content.js (主要逻辑)
- styles.css (样式文件)
- qrcode.min.js (二维码生成库)

## 3. 调试与修复
当遇到"在网页上没有看到二维码"的问题时：
并没有成功，在网页上没有看到二维码。

这促使我们检查了 Content Security Policy 问题，并改用本地 QR 码库。

## 4. 功能优化记录

### 4.1 初始优化
添加关闭按钮的需求。

### 4.2 交互优化
需求：默认只显示网站 logo，点击后展开显示二维码。

实现方案：
1. 初始状态：
   - 右下角只显示一个圆形的网站 logo
   - 大小为 48x48 像素
   - 带有悬浮效果

2. 交互流程：
   - 点击 logo 展开显示完整二维码
   - 点击关闭按钮收起二维码
   - 添加展开/收起的过渡动画

3. 核心代码改动：
   ```javascript
   // 状态管理
   let qrContainer = null;
   let isExpanded = false;

   // 主要功能函数
   createFloatingLogo()  // 创建初始 logo
   showQRCode()         // 展开显示二维码
   hideQRCode()         // 隐藏二维码
   toggleQRCode()       // 切换显示状态
   ```

4. 样式优化：
   ```css
   /* 折叠状态 */
   #website-qr-container.collapsed {
     width: 48px;
     height: 48px;
     border-radius: 50%;
   }

   /* 展开状态 */
   #website-qr-container.expanded {
     min-width: 256px;
     border-radius: 12px;
   }
   ```

### 4.3 性能优化
1. 延迟加载：
   - 二维码内容仅在展开时生成
   - 避免初始加载时的资源浪费

2. 状态管理：
   - 使用 isExpanded 标志控制状态
   - 防止重复创建元素

3. 交互优化：
   - 添加过渡动画提升体验
   - 优化点击区域和响应

## 5. 最终文件结构

website-qr-extension/
├── manifest.json
├── content.js
├── styles.css
├── qrcode.min.js
└── images/
    ├── icon16.png (从 Iconfinder 下载)
    ├── icon48.png (从 Iconfinder 下载)
    └── icon128.png (从 Iconfinder 下载)
