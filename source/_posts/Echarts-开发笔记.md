---
title: Echarts - 开发笔记
date: 2022-01-18 14:49:12
tags: [Echarts, 开发笔记]
categories: [Echarts]
---
#### 更新渲染会残留之前的数据
- 在 `setOption` 时添加一个额外的参数 `true`
```javascript
this.chart.setOption(this.option, true);
```
  - `setOption` 参数说明请参考 [文档](https://echarts.apache.org/zh/api.html#echartsInstance.setOption)

#### 全屏显示图表
- 全屏、退出全屏
```javascript
//全屏显示
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
- 触发
```javascript
handle = () => {
    if (this.chart) {
        fullScreen(this.chart._dom.parentElement);
    }
}
```
- 全屏状态下，背景色设置
```less
//各个浏览器下 全屏状态下背景色设置
:-webkit-full-screen {
  background-color: $content-bg !important;
}
:-moz-full-screen {
  background-color: $content-bg !important;
}

:-ms-fullscreen {
  background-color: $content-bg !important;
}
:fullscreen {
  background-color: $content-bg !important;
}
```

#### 折线图需求：同一天内可能存在一条、两条或者三条数据
- 构造X轴数据、配置axisLabel及axisTick及formatter
```yaml
		option = {
		    ...
		    xAxis: [
		        {
		            ...
		            axisTick: {
		              interval: (index, indexName) => indexName.length < 11
		            },
		            axisLabel: {
		                interval: (index, indexName) => indexName.length < 11
		            },
		            data: [
		                '2009/6/12', '2009/6/12 12', '2009/6/12 12', 
		                '2009/6/13', '2009/6/13 12', '2009/6/14'],
		        }
		    ],
		    series: [
		        {
                  ...
                  data: [
                    3.75,3.75,5.66,6.95,0.95,0.94,0.94,0.94,0.94,0.94,
                    0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,
                    0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,
                    0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94,0.94]
		        },
		    ]
		};
```

#### 自定义触发行为
- 手动缩放 `dataZoom`
  - 单个缩放
    ```javascript
    myChart.dispatchAction({
        type: 'dataZoom',
        start: 20,
        end: 30
    });
    ```
  - 批量缩放
    ```javascript
    myChart.dispatchAction({
        type: 'dataZoom',
        batch: [{
            // 第一个 dataZoom 组件
            start: 20,
            end: 30
        }, {
            // 第二个 dataZoom 组件
            dataZoomIndex: 1,
            start: 10,
            end: 20
        }]
    });
    ```
- 轮播高亮显示
```javascript
getEchart = (chart) => {
    if (chart && _.isFunction(chart) && !this.timer) {
        const instance = chart();
        // 记录当前轮播的数据索引
        let index = 0;
        this.timer = setInterval(() => {
            // 用户鼠标 hover 时，停止轮播
            !this.state.hovered && instance &&instance.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: index
            });
            // 用户鼠标 hover 时，停止轮播数据项计数，hover交互移除后，继续当前索引进行轮播
            !this.state.hovered && index++;
            if (index > this.state.list.length - 1) {
                index = 0;
            }
        }, 2000);
    }
}
```
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Echarts%20-%20%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0/dispaction_highlight.gif)

#### 饼图内标题文字自适应显示
  - `options` 配置，动态设置字体大小
    ```javascript
    title: [
        {
            text: _.get(this.state, `chartData.${day}`, 0),
            top: '32%',
            left: "center",
            textStyle: {
                color: '#FF0014',
                fontSize: this.getFontSize(_.get(this.state, `chartData.${day}`, 0)),
                fontWeight: 600,
            },
        }
    ]
    ```
  - 获取自适应后的字体大小
    ```javascript
    getFontSize = (value) => {
        const screenWidth = document.body.clientWidth;
        let fontSize = 12;
        const valueLength = _.isNumber(value) && value.toString().length;
        if (screenWidth >= 1900) {
            fontSize = this.generateSize(120, valueLength);
        } else if (screenWidth < 1920 && screenWidth >= 1660) {
            fontSize = this.generateSize(100, valueLength);
        } else if (screenWidth < 1680 && screenWidth >= 1400) {
            fontSize = this.generateSize(80, valueLength);
        }
        return fontSize;
    }
    ```
  - 限定字体大小范围
    ```javascript
    generateSize = (size, length) => {
        const fontSize = Math.ceil(size / length);
        if (fontSize > 26) {
            return 26;
        } else if (fontSize < 8) {
            return 8;
        } else {
            return fontSize;
        }
    }
    ```
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Echarts%20-%20%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0/pie_title_autoSize.png)

#### 根据y轴刻度标签文本动态设置边距
- 获取Y轴文本长度最长的一项
```javascript
const maxLabel = _.get(yData.slice().sort((pre, next) => computedTextWidth(next) - computedTextWidth(pre)), '[0]', '');
```
- `options` 配置
```yaml
grid: {
    borderWidth: 0,
    top: 15,
    bottom: 20,
    right: computedTextWidth(maxValue) + 18,
    left: computedTextWidth(maxLabel, 12, true) + 18,
}
```
- 计算文本长度工具方法
```javascript
/**
 * @description 计算字符串在浏览器中显示的宽度
 * @param text {string|number} 需要计算的文本
 * @param fontSize {number} 文本字体大小
 * @param overflowFlag {boolean} 是否超长省略显示
 * @return {number}
 */
export const computedTextWidth = (text, fontSize = 12, overflowFlag) => {
    let span = document.getElementById('computedTextWidth');
    if (!span) {
        span = document.createElement('span');
        span.id = 'computedTextWidth';
        span.style.cssText = 'visibility:hidden;position: absolute;left: -999em;top:-999em;';
        document.body.appendChild(span);
    }
    span.style.fontSize = `${fontSize}px`;
    // 如果设置超长省略显示，则超出8个字符串后，接省略号显示
    span.innerHTML = overflowFlag && _.isString(text) && text.length > 8 ? `${text.slice(0, 8)}...` : text;
    return span.offsetWidth;
};
```
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Echarts%20-%20%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0/Y_label_overflow.png)

#### `legend` 文本过长换行显示
- `legend` 配置项设置
```yaml
legend: {
          top:'20%',
          width:222,
          right:30,
          orient: 'vertical',
          type: 'scroll',
          data: this.props.userList,
          formatter: function (params) {
            return formatterLegendText(params);
          }
}
```
- 工具方法
```javascript
/**
 * 格式化legend 文本过长换行显示
 * @params:
 *  params: 文本
 *  provideNumber: 每一行要显示的文本字数
 *  rows: 指定最多显示多少行
 * */
export const formatterLegendText = (params, provideNumber = 17, rows) => {
    //超过十个字符就换行展示
    let newParamsName = "";// 最终拼接成的字符串
    const paramsNameNumber = params.length;// 实际标签的个数
    // const provideNumber = 17;// 每行能显示的字的个数
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
    if (rows && rows < maxRows) {
        newParamsName += '...';
    }
    //将最终的字符串返回
    return newParamsName
}
```
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Echarts%20-%20%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0/legend_wrap.png)

#### 将某个省份地区，切割成两部分显示
- 引入完整天津地图
```javascript
import chinaCity from 'echarts/map/json/province/tianjin.json';
```
- 通过地区代码定义需要分割的副地图区域数据
```javascript
subMapArea = ['120101','120102','120103','120104','120105','120106'];
```
- 通过区域数据，将完整地图json数据划分为两份地图数据，并注册地图名称
```javascript
componentWillMount() {
    const mainMap = _.cloneDeep(chinaCity);
    const subMap = _.cloneDeep(chinaCity);
    const mainFeatures = [], subFeatures = [];
    chinaCity.features.map(item => {
        if (this.subMapArea.indexOf(item.id) < 0) {
            mainFeatures.push(_.cloneDeep(item));
        } else {
            subFeatures.push(_.cloneDeep(item));
        }
    });
    mainMap.features = _.cloneDeep(mainFeatures);
    subMap.features = _.cloneDeep(subFeatures);
    echarts.registerMap('mainMap', mainMap);
    echarts.registerMap('subMap', subMap);
    mainMap.features.map(({properties: {cp = [], name = ''}, id}) => {
        this.geoCoordMap[name] = cp.slice();
        return;
    });
    subMap.features.map(({properties: {cp = [], name = ''}, id}) => {
        this.subGeoCoordMap[name] = cp.slice();
        return;
    });
}
```
- 在各自的option中geo的定义中，使用不同的地图名称显示地图轮廓
```yaml
geo: [
  {
    map:'mainMap',
    ...
  },
]
```
![预览](https://hsj-studio.oss-cn-shanghai.aliyuncs.com/blog/articles/Echarts%20-%20%E5%BC%80%E5%8F%91%E7%AC%94%E8%AE%B0/subMap.png)