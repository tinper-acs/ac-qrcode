# ac-qrcode

二维码组件

![image](https://user-images.githubusercontent.com/3817644/53559495-293c0800-3b85-11e9-9094-f6455cbe9ec5.png)

[![npm version](https://img.shields.io/npm/v/ac-qrcode.svg)](https://www.npmjs.com/package/ac-qrcode)
[![NPM downloads](http://img.shields.io/npm/dt/ac-qrcode.svg?style=flat)](https://npmjs.org/package/ac-qrcode)

在线演示：https://tinper-acs.github.io/ac-qrcode/

### 1. 简介

React二维码组件，使用底层核心算法[qr.js](https://github.com/defunctzombie/qr.js)进行组件封装，提供标准的功能展示，具有Level、前景、背景颜色设置、大小设置、边框间距设置、SVG和Canvas格式等

### 2. 安装

1. 通过`npm`安装
    ```bash
    npm install ac-qrcode --save
    ```
2. 国内镜像通过`cnpm`安装
    ```bash
    cnpm install ac-qrcode --save
    ```
3. 用友内网通过`ynpm`安装
    ```bash
    ynpm install ac-qrcode --save
    ```


### 3. 使用

```js
import AcQrcode from "ac-qrcode";

render(){
    return (<AcQcode value="9787123" />)
}
```

### 4. API

 参数      | 类型                 | 默认值
----------|----------------------|--------------
value   | string             |
renderAs| string ('canvas' 'svg') | 'canvas'
size    | number             | 128
bgColor | string (CSS color) | "#FFFFFF"
fgColor | string (CSS color) | "#000000"
level   | string ('L' 'M' 'Q' 'H')            | 'L'
includeMargin | boolean      | false



### 5. 支持标准




### 6. CHANGLOG

* [1.0.0-完善文档发布正式版](https://github.com/tinper-acs/ac-barcode/releases/tag/1.0.0)
* [0.0.2-修改脚手架工程](https://github.com/tinper-acs/ac-barcode/releases/tag/0.0.2)
* [0.0.1-初次版本实现、增加示例](https://github.com/tinper-acs/ac-barcode/releases/tag/0.0.1)
