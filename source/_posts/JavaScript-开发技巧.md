---
title: JavaScript - 开发技巧
date: 2022-01-26 10:50:22
tags: [JavaScript]
categories: [JavaScript]
---
#### 将 `Json` 数据导出为文件
```javascript
import FileSaver from 'file-saver';

/**
 * @param data {string} 需要导出的json数据
 * @param fileName {string} 导出的文件名称
 * */
export function exportJSON(data, fileName) {
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, fileName);
}
```

#### 数据解压缩
- 如果需要传递给后端接口的数据量过大，可能影响带宽及存储时，可考虑对数据进行压缩后传递
- 压缩工具库：[pako](http://www.qiutianaimeili.com/html/page/2019/12/bncs8g07hcg.html)
```javascript
/**
 * @params:
 *  str: 需要压缩的内容
 * */
export function zipJson(str){
    const data = deflate(str, { to: 'string', level: 8 });
    return data && Uint8ArrayToString(data);
}
/**
 * 数据解压缩
 * @parasm：
 *  str：通过zipJson方法压缩后的数据
 * */
export function unZipJson(str) {
    const strArr = stringToUint8Array(str);
    const data = inflate(strArr, {
        to: 'string',
    });
    return data;
}
/**
 * 将字符串转换为Uint8Array
 * */
export function stringToUint8Array(str){
    const arr = [];
    for (let i = 0, j = str.length; i < j; i += 1) {
        arr.push(str.charCodeAt(i));
    };
    const tmpUint8Array = new Uint8Array(arr);
    return tmpUint8Array;
}
/**
 * 将Uint8Array转换为字符串：使用pako压缩后的数据通常为Uint8Array，需要将此类型转换为字符串，传递给后端接口
 * */
export function Uint8ArrayToString(fileData){
    let dataString = "";
    for (let i = 0; i < fileData.length; i += 1) {
        dataString += String.fromCharCode(fileData[i]);
    };
    return dataString;
}
```

#### `Antd` 自定义异步读取文件内容
- 配合 `Upload` 组件异步读取文件内容
```javascript
<Upload
    showUploadList={false}
    maxCount={1}
    accept='.svg,.png,jpg,.PNG,.JPG,.JPEG'
    beforeUpload={(file) => {
        readFileAsDataURL(file).then(res => {
            addBgImg(this.props.getGraph(), res)
        })
    }}
>
    <Button title='导入背景图' role='none' type='link' icon='bg-colors' />
</Upload>

/**
 * file：文件
 * return：promise
 * */
export function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(event) {
            resolve(event.target.result);
        };
        reader.onerror = function() {
            reject(false);
        };
    })
}
```

#### 计算字符串在浏览器中显示的宽度
```javascript
/**
 * @description 计算字符串在浏览器中显示的宽度
 * @param text {string} 需要计算的文本
 * @param fontSize {number} 文本字体大小
 * @param overflowFlag {boolean} 是否超长省略显示
 * @param overflowLength {number} 超长省略的文本长度
 * @return {number}
 */
export const computedTextWidth = (text, fontSize = 12, overflowFlag, overflowLength = 8) => {
    let span = document.getElementById('computedTextWidth');
    if (!span) {
        span = document.createElement('span');
        span.id = 'computedTextWidth';
        span.style.cssText = 'visibility:hidden;position: absolute;left: -999em;top:-999em;';
        document.body.appendChild(span);
    }
    span.style.fontSize = `${fontSize}px`;
    span.innerHTML = overflowFlag && _.isString(text) && text.length > overflowLength ? `${text.slice(0, overflowLength)}...` : text;
    return span.offsetWidth;
};
```

#### 文本过长换行显示
```javascript
/**
 * 格式化legend 文本过长换行显示
 * @params:
 *  params: 文本
 *  provideNumber: 每一行要显示的文本字数
 *  rows: 指定最多显示多少行
 * */
export const formatterLegendText = (params, provideNumber = 17, rows) => {
    let newParamsName = "";// 最终拼接成的字符串
    const paramsNameNumber = params.length;// 实际文本字符的个数
    const maxRows = Math.ceil(paramsNameNumber / provideNumber);// 换行的话，需要显示几行，向上取整;
    let rowNumber = rows || maxRows;

    // 条件等同于rowNumber>1
    if (paramsNameNumber > provideNumber) {
        for (let p = 0; p < rowNumber; p += 1) {
            let tempStr = "";// 表示每一次截取的字符串
            let start = p * provideNumber;// 开始截取的位置
            let end = start + provideNumber;// 结束截取的位置
            // 此处特殊处理最后一行的索引值
            if (p == rowNumber - 1) {
                // 最后一次不换行
                tempStr = params.substring(start, paramsNameNumber);
            } else {
                // 每一次拼接字符串并换行
                tempStr = params.substring(start, end) + "\n";
            }
            newParamsName += tempStr;// 最终拼成的字符串
        }
    } else {
        // 将旧标签的值赋给新标签
        newParamsName = params;
    }
    // 如果指定了最大显示行数，并别比实际计算的最大行数小，则后续文本内容省略显示
    if (rows && rows < maxRows) {
        newParamsName += '...';
    }
    //将最终的字符串返回
    return newParamsName;
}
```

#### 生成 `uuid`
```javascript
/**
 * 生成uuid
 * */
export const generateUUID = () => {
    const temp_url = URL.createObjectURL(new Blob());
    const uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf("/") + 1);
}
```

#### 格式化统计数值
```javascript
/**
 * 格式化统计数值
 * @param {Number} count 统计数值
 * @param {Number} toFixed 小数点保留位数
 * @param {String[]} units 要格式化的单位
 */
export const formatCount = ({
                                count = 0,
                                toFixed = 1,
                                units = ['万', '亿'],
                            }={}) => {
    if (isNaN(Number(count))) {return 0;}
    // 1.　计算单位
    const symbols = ['个', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];
    const len = count.toString().length;
    const unit = symbols
        .slice(0, len)
        .filter(v => units.includes(v))
        .reverse()[0] || '';

    //　２．计算数值
    const index = symbols.indexOf(unit);
    let value = count / Math.pow(10, index !== -1 ? index : 0);

    // ３．格式化
    if (value.toString().length > value.toFixed(toFixed).toString().length) {
        value = value.toFixed(toFixed);
    }
    return {　value , unit,  format: `${value} ${unit}` };
};
```

#### Byte 数值装换
```javascript
/**
 * Byte 数值装换
 * @param {Number} bytes 当前 bytes 大小
 */
export const byteFormat = (bytes) => {
    if (isNaN(bytes)) {return '0 B';}
    const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let exp = Math.floor(Math.log(bytes)/Math.log(2));
    if (exp < 1) {exp = 0;}
    const i = Math.floor(exp / 10);
    bytes = bytes / Math.pow(2, 10 * i);
    if (bytes.toString().length > bytes.toFixed(2).toString().length) {
        bytes = bytes.toFixed(2);
    }
    return {
        symbols,                          // 单位列表
        index: i,                         // 转换后单位所在列表中的索引
        value: bytes,                     // 转换后的值
        unit: symbols[i],                 // 转换后单位
        format: `${bytes} ${symbols[i]}`, // 格式后的字符串
    };
};
```

#### 全屏显示
```javascript
//全屏显示
/**
 * @param：ele {Element} 指定需要全屏的元素
 * */
export function fullScreen(ele) {
    let element = ele || document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

//退出全屏
export function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}
```

#### 手动取消请求
- 在 `SPA` 应用中，当用户切换菜单时，取消前置菜单的所有接口请求
```javascript
/**
 * fetch手动取消请求
 * */
let abortController = window.AbortController && new AbortController();
// 由于控制器取消请求时,将取消相同信号的所有请求,因此为避免取消请求后的后续请求正常发送,需要重新构建控制器,生成新的信号
exports.renewAbortController = () => {
    abortController = window.AbortController && new AbortController();
}
// 获取当前控制器实例
exports.getAbortController = () => {
    return abortController;
}

// 切换菜单时取消前置请求并重新生成控制器
childMenuClick = (e) => {
    getAbortController().abort();
    renewAbortController();
}

// 发送请求时,配置控制器信号
export function request(url, options) {
    return fetch(url, {...options, credentials: 'include', signal: getAbortController() && getAbortController().signal})
}
```