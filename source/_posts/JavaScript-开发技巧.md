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

#### 可拖动元素
- 页面结构
```html
<div
    ref={this.containerRef}
    className={classnames({
        'sql-wrapper': true,
        'show': this.state.visible,
        'hide': !this.state.visible,
        'position-modal': this.state.modal === 'absolute'
        })}
        style={{left: this.state.position.left, top: this.state.position.top}}
        draggable={this.state.modal === 'absolute'}
        onDragEnd={this.dragEnd}
        onMouseDown={this.mouseDown}
>
<p>
    SQL预览
    <div className='icon-container'>
        <Icon title={this.state.modal === 'default' ? '展开' : '收缩'} type={this.state.modal === 'default' ? 'fullscreen' : 'fullscreen-exit'} onClick={this.changeModal} />
        <Icon className='private-clipboard-icon' title='复制' type='copy' />
        {this.state.visible ? <Icon title='收起' type='arrow-down' onClick={this.changeView} /> : <Icon type='arrow-up' title='展开' onClick={this.changeView} />}
    </div>
</p>
<div className='highLight-sql'>
    <Highlight languageName="sql" style={{ whiteSpace: 'pre-wrap' }}>
    {sqlFormatter.format(_.get(this.props.alarm, 'sql', ''))}
    </Highlight>
</div>
</div>
```
- 思路: 通过元素的 `left` 及 `top` 样式属性,对元素进行绝对定位,拖动过程中改变元素这两个属性,达到拖动元素的目的.
  - 关键属性,更多鼠标事件属性参考 [Link](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
    - clientX: 鼠标触发事件当前的x坐标
    - clientY: 鼠标触发事件当前的y坐标
    - element.offsetLeft: 当前拖动元素距离浏览器视口左侧边缘的距离
    - element.offsetTop: 当前拖动元素距离浏览器视口上方边缘的距离
  - 监听 `onmousedown` 事件,获取按下鼠标时,鼠标初始的坐标,并减去拖动元素的相对偏移距离,得到鼠标在元素内的相对位置
  ```javascript
  mouseDown = ({clientX, clientY}) => {
        const element = document.getElementsByClassName('sql-wrapper')[0];
        const offsetX = clientX - element.offsetLeft;
        const offsetY = clientY - element.offsetTop;
        this.setState({
            offsetX,
            offsetY
        })
    }
  ```
  - 监听 `ondragend` 事件,获取拖动结束时,当前鼠标的坐标.并减去鼠标在拖动元素内的相对位置,得到拖动元素左上角的坐标,及拖动元素样式的 `left` 和 `top` 值
  ```html
  dragEnd = ({clientX, clientY}) => {
        const {offsetX, offsetY} = this.state;
        this.setState({
            position: {
                left: clientX - offsetX,
                top: clientY - offsetY
            }
        })
    }
  ```
  - 预览
  ![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/JavaScript%20-%20%E5%BC%80%E5%8F%91%E6%8A%80%E5%B7%A7/drag-dom.gif)
    
#### 大屏拖动排序
- 代码文件说明
  - `MainContentContainer.js`: 大屏页面容器主文件
  - `DragItem.js`: 拖动元素容器,拖动排序逻辑处理
- `MainContentContainer.js`
  - 页面结构
  ```html
  <div >
      <DragItem allData={_.cloneDeep(this.chartsDataInit)} itemData={_.cloneDeep(this.chartsData)} ColItem={ColItem} confirmSort={this.confirmSort}  />
  </div>
  ```
  - `ColItem`: 拖动元素基础结构
    ```javascript
    class ColItem extends React.Component {
        constructor(props) {
            super(props);
        }
    
        render() {
            const {V} = this.props;
            return (
                <div className='content-charts'>
                    <div className="chart-header">
                        <span>{V.title}</span>
                    </div>
                    <div className='chart-item'>
                        <V.component />
                    </div>
                </div>
            )
        }
    }
    ```
  - 初始化数据说明
  ```javascript
  /**
   * 页面初始化数据
   * title: 拖动元素图表标题
   * key: 拖动元素图表key,需要唯一,后续元素遍历时作为元素的key
   * component: React 组件,业务代码
   * */
  chartsDataInit = [
      {
          title: '本月活跃用户',
          key: 'monthUser',
          component: MonthUser,
      },
      ...
  ];
  /**
   * key: 与 chartsDataInit 中的 key 对应,后续用于获取 chartsDataInit 中的 component 信息
   * span: 与 Antd 的 Col 结合使用,用于百分比布局
   * index: 表明当前元素的排序序号
   * */
  chartsData = [
      {
          title: '本月活跃用户',
          key: 'monthUser',
          span: 6,
          index: 0
      },
      ...
  ];
  ```
  - `confirmSort`
  ```javascript
  /**
   * 在 DragItem 组件中,拖动排序确认事件将调用此方法,用于更新排序布局
   * */
  confirmSort = data => {
      const editData = _.cloneDeep(data);
      if (!_.isArray(editData)) {
          message.warning('数据未更改！');
          return false;
      }
      this.setState({
          chartsData: editData.map((item, index) => ({
              ...item,
              index
          })),
      });
  }
  ```
- `DragItem.js`
  - 添加监听事件: 监听页面快捷键,使用 CTRL + I 键切换成编辑/查看模式; 监听元素的拖动事件
  ```javascript
  bindEvents = () => {
      const elements = document.getElementsByClassName('drag-item');
      for (let i = 0; i< elements.length; i += 1) {
          this.onDragListener(elements[i]);
      }

      // 使用 CTRL + I 键切换成编辑/查看模式
      document.addEventListener('keydown', this.onKeyDownListener.bind(this));
  }
  
  // 按键事件监听
  onKeyDownListener = (event) => {
      const keyCode = event.keyCode || event.which || event.charCode;
      const keyCombination = event.ctrlKey ;
      if (keyCombination && keyCode == 73) {
          if (this.state.mode === 'edit') {
              this.confirmChange();
          } else {
              this.setState({
                  mode: 'edit'
              });
          }
      }
  }
  
  // 拖拽事件监听
  onDragListener = (element) => {
      element.addEventListener('dragstart', event => {
          this.eventSource = event.target;
          this.draggingPosition = this.eventSource.getBoundingClientRect();
          this.sourceKey = this.eventSource.getAttribute('data-key');
      })
      element.addEventListener('dragenter', event => {
          this.eventTarget = event.target;
          this.draggingOrder = this.changeOrder(this.eventSource);
          const order = this.changeOrder(this.eventTarget);
          if (this.state.mode === 'edit') {
              if (this.draggingOrder > order) {
                  this.eventTarget.parentElement.insertBefore(this.eventSource, this.eventTarget);
              } else {
                  if (this.eventTarget.nextElementSibling) {
                      this.eventTarget.parentElement.insertBefore(this.eventSource, this.eventTarget.nextElementSibling);
                  } else {
                      this.eventTarget.parentElement.appendChild(this.eventSource);
                  }
              }
              this.setEditData(this.sourceKey, this.eventTarget.getAttribute('data-key'), this.draggingOrder - order);
          }
      });
  }
  
  // 返回排序
  changeOrder = node => {
      const order = Array.from(node.parentElement.children).indexOf(node);
      return order;
  }
  
  /**
   * @params:
   *  sourceKey: 拖拽源节点的key
   *  targetKey：拖拽目标节点的key
   *  orderType：boolean。是否前置. 前置表示将源节点放置在目标节点前面.
   * */
  setEditData = (sourceKey, targetKey, orderType) => {
      let sourceIndex, targetIndex;
      const editData = _.cloneDeep(this.state.editData);
      editData.map((item, i) => {
          if (item.key === targetKey) targetIndex = i;
          if (item.key === sourceKey) sourceIndex = i;
      });
      const dragItem = editData.find(item => item.key === sourceKey);
      if (orderType > 0) {
          editData.splice(sourceIndex, 1);
          editData.splice(targetIndex, 0, dragItem);

      } else if (orderType < 0) {
          editData.splice(targetIndex + 1, 0, dragItem);
          editData.splice(sourceIndex, 1);
      }
      this.props.openModalAction({
          code: MODAL_CODE_DRAG_LIST,
          data: _.cloneDeep(editData),
      });
      this.setState({
          editData: editData.map((item, index) => ({
              ...item,
              index,
          }))
      });
  }
  ```
- 预览
![预览图](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/JavaScript%20-%20%E5%BC%80%E5%8F%91%E6%8A%80%E5%B7%A7/drag-sort.gif)
  
#### 导出数据到 `json` 文件
```javascript
/**
 * @param {string} data 需要导出的json数据
 * @param {string} fileName 导出的文件名称
 * */
export function exportJSON(data, fileName) {
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, fileName);
}
```

#### 读取文件内容
```javascript
/**
 * @desc 读取文件
 * @param file {File} 文件
 * @return promise
 * */
export function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (event) {
            resolve(event.target.result);
        };
        reader.onerror = function () {
            reject(false);
        };
    })
}
```

#### 字符串与 `Uint8Array` 互转
##### 将字符串转换为 `Uint8Array`
```javascript
export function stringToUint8Array(str) {
    const arr = [];
    for (let i = 0, j = str.length; i < j; i += 1) {
        arr.push(str.charCodeAt(i));
    }

    return new Uint8Array(arr);
}
```

##### 将Uint8Array转换为字符串
```javascript
export function Uint8ArrayToString(fileData) {
    let dataString = "";
    for (let i = 0; i < fileData.length; i += 1) {
        dataString += String.fromCharCode(fileData[i]);
    }

    return dataString
}
```

#### `url` 编码与解码
```javascript
/**
 * desc 将字符串内容先进行url编码，再进行base64编码
 * */
export function base64Encode(str) {
    return str && btoa(encodeURIComponent(str));
}

/**
 * desc 将进行url编码，再进行base64编码的内容，进行解码
 * */
export function base64Decode(str) {
    return str && decodeURIComponent(atob(str));
}
```

#### 将三位的十六进制颜色值转换为六位
```javascript
/**
 * desc 将三位的十六进制颜色值转换为六位
 * @param hex - 需要转换的颜色值，如 #fff
 * */
export function hexToHex(hex = '') {
    let rrggbb = "#";
    for (let i = 1; i < hex.length; i++) {
        rrggbb += (hex.charAt(i) + "" + hex.charAt(i));
    }
    return rrggbb;
}
```

#### 多层级的对象下钻降维成一层结构的对象
```javascript
/**
 * desc 多层级的对象下钻降维成一层结构的对象，多层级对象的级联key使用指定的连接字符进行拼接成新的key
 * @param source - 需要降维的源对象
 * @param target - 需要与降维后的对象合并的目标对象
 * @param {String} suffix - 降维时，如果当前key的值为对象，需要下钻进行降维，此时将当前key与linkStr拼接成新的key，作为目标对象的key
 * @param {String} linkStr - 下钻降维时，拼接层级对象key的字符，默认为 '.'
 * @return {Object} obj 返回一层结构的对象
 * @example {key1: key2: {key3: value1}, key4: {key5: value2}} => {key1.key2.key3: value1, key1.key4.key5: value2}
 * */
export function flatObj(source = {}, target = {}, suffix = '', linkStr = '.') {
    let obj = target || {};
    if (typeof source === 'object') {
        Object.keys(source).map(item => {
            if (typeof source[item] === 'object' && !_.isArray(source[item])) {
                flatObj(source[item], obj, `${suffix}${item}${linkStr}`);
            } else {
                obj[`${suffix}${item}`] = _.isArray(source[item]) ? JSON.stringify(source[item]) : source[item];
            }
        })
    }

    return obj;
}
```

#### 将使用特定字符拼接的字符串，构造成多层级的对象
```javascript
/**
 * desc 将使用特定字符拼接的字符串，构造成多层级的对象
 * @param {String} keys 使用指定字符拼接key后的keys字符串
 * @param value 当前keys对应的值
 * @param {String} linkStr 拼接字符串的字符
 * @return {Object} outerObj 输出构造后的多层级对象
 * @example '{key1.key2: value}' => {key1: {key2: value}}
 * */
export function increaseObj(keys, value, suffix = '', linkStr = '.') {
    let outerObj = {};
    keys.split(linkStr).reverse().map((key, index) => {
        let innerObj = index === 0 ? {} : _.cloneDeep(outerObj);
        if (index === 0) {
            let parseValue;
            try {
                parseValue = JSON.parse(value);
            } catch (e) {
                console.log('parse error');
            }
            innerObj[key] = _.isArray(parseValue) ? parseValue : value;
            outerObj = _.cloneDeep(innerObj);
        } else {
            outerObj[key] = _.cloneDeep(innerObj);
            delete outerObj[keys.split(linkStr).reverse()[index - 1]]
        }
    });

    return outerObj;
}
```

#### 根据中心点、起始点、终点判断旋转角
```javascript
/**
 * @desc 根据中心点、起始点、终点判断旋转方向。Math.atan2返回反正切的方位角的弧度值
 * @param center {Object} {x: 0, y: 0} 中心点坐标
 * @param start {Object} {x: 0, y: 0} 起始点坐标
 * @param end {Object} {x: 0, y: 0} 终点坐标
 * @return {number} 旋转角的 Math.atan2 值，即旋转角的弧度值
 * */
export function rotateAngle(center, start, end) {
    let rotateA = 0; // 鼠标旋转角弧度值
    const sAngle = Math.atan2((start.y - center.y), (start.x - center.x));
    const pAngle = Math.atan2((end.y - center.y), (end.x - center.x));
    rotateA = (pAngle - sAngle);

    return rotateA;
}
```