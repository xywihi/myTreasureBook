### 1. location
location.href -> 'https://www.baidu.com/search?class=browser#comments'
        .origin -> 'https://www.baidu.com'
        .protocol -> 'https:'
        .host -> 'www.baidu.com'
        .hostname -> 'www.baidu.com'
        .port -> ''
        .pathname -> '/search'
        .search -> '?class=browser'
        .hash -> '#comments'
        .searchParams -> URLSearchParams { 'class' => 'browser' }
        .username -> ''
        .password -> ''
        .path -> '/search?class=browser#comments'
        .href -> 'https://www.baidu.com/search?class=browser#comments'
        .assign -> 'https://www.baidu.com/search?class=browser#comments'

location.assign('https://www.baidu.com/search?class=browser#comments')   //跳转指定path，替换pathname
location.reload() //重新加载刷新

location.replace('https://www.baidu.com/search?class=browser#comments')  //效果同assign，同时替换掉浏览历史
location.toString()  //产出当前地址
location.toJSON()
location.toString() == location.href
location.toString() == location.pathname + location.search + location.hash
location.toString() == location.origin + location.pathname + location.search + location.hash

### 2. history
history.length -> 11  //获取当前浏览器历史记录长度
history.back()  //后退
history.forward()  //前进
history.go(-1)  //后退
history.go(1)  //前进
history.go(0)  //刷新
history.go(10)  //前进10步
history.go(-10)  //后退10步
history.go(100)  //前进100步

### 3. navigator
navigator.userAgent -> 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'  //获取当前用户环境信息
navigator.appName -> 'Netscape'  //获取当前浏览器名称
navigator.appVersion -> '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'  //获取当前浏览器版本
navigator.language -> 'zh-CN'  //获取当前浏览器语言
navigator.platform -> 'Win32'  //获取当前浏览器平台
navigator.vendor -> 'Google Inc.'  //获取当前浏览器厂商
navigator.product -> 'Gecko'  //获取当前浏览器内核
navigator.onLine -> true  //获取当前浏览器是否在线
navigator.cookieEnabled -> true  //获取当前浏览器是否支持cookie
navigator.doNotTrack -> '1'  //获取当前浏览器是否支持dnt
navigator.geolocation -> Geolocation { getCurrentPosition: [Function: getCurrentPosition], watchPosition: [Function: watchPosition], clearWatch: [Function: clearWatch] }
navigator.appCodeName -> 'Mozilla'

### 4. screen
screen.width -> 1920  //获取当前屏幕宽度
screen.height -> 1080  //获取当前屏幕高度
screen.availWidth -> 1920  //获取当前屏幕可用宽度
screen.availHeight -> 1080  //获取当前屏幕可用高度
screen.colorDepth -> 24  //获取当前屏幕颜色深度
screen.pixelDepth -> 24  //获取当前屏幕像素深度

### 5. window
window.innerWidth -> 1920  //获取当前浏览器窗口宽度
window.innerHeight -> 1080  //获取当前浏览器窗口高度
window.outerWidth -> 1920  //获取当前浏览器窗口宽度
window.outerHeight -> 1080  //获取当前浏览器窗口高度
window.pageXOffset -> 0  //获取当前浏览器窗口水平滚动条位置
window.pageYOffset -> 0  //获取当前浏览器窗口垂直滚动条位置
window.scrollX -> 0  //获取当前浏览器窗口水平滚动条位置
window.scrollY -> 0  //获取当前浏览器窗口垂直滚动条位置
window.screenX -> 0  //获取当前浏览器窗口水平位置
window.screenY -> 0  //获取当前浏览器窗口垂直位置
window.screenLeft -> 0  //获取当前浏览器窗口水平位置
window.screenTop -> 0  //获取当前浏览器窗口垂直位置
window.screenX -> 0  //获取当前浏览器窗口水平位置

### Event事件模型

```js
    <div id="app">
        <p id="dom">Click</p>
    </div>
    //冒泡 - ms: p -> div -> body -> html
    //捕获 - ms: body -> html -> div -> p

    el.addEventListener(event,function,useCapture)  //默认useCapture为false

    //如何阻止事件的传播
    event.stopPropagation()   //不能阻止默认事件的传播
    //如何阻止默认事件的传播
    event.preventDefault()   //阻止默认事件的传播
    //如何阻止相同节点上多个同类事件
    event.stopImmediatePropagation()   //阻止事件

    //手写事件绑定
    //attachEvent & addEventListener
    //区别
    // el.attachEvent('on'+event,function)   //IE8及以下，先执行后绑定
    // el.addEventListener(event,function,useCapture)   //IE9+，先绑定先执行
    //解绑：detachEvent & removeEventListener
    //阻断事件传播 event.cancelBubble = true vs event.stopPropagation() 
    //默认事件打断 event.preventDefault() vs event.returnValue = false 

    class bindEvent{
        constructor(element){
            this.element=element
        }
        addEventListener = (type, handler){
            if(this.element.addEventListener){
                this.element.addEventListener(type,handler,false)
            }else if(this.element.attachEvent){
                this.element.attachEvent('on'+type,() => {
                    handler.call(element)
                })
            }else{
                this.element['on'+type] = handler;
            }
        }

        removeEventListener =(type, handler){
            if(this.element.removeEventListener){
                this.element.removeEventListener(type,handler,false)
            }else if(this.element.detachEvent){
                this.element.detachEvent('on'+type,handler)
            }else{
                this.element['on'+type] = null;
            }
        }

        static stopPropagation(event){
            if(event.stopPropagation){
                event.stopPropagation()
            }else{
                event.cancelBubble = true
            }
        }

        static preventDefault(event){
            if(event.preventDefault){
                event.preventDefault()
            }else{
                event.returnValue = true
            }
        }

        static stopImmediatePropagation(event){
            if(event.stopImmediatePropagation){
                event.stopImmediatePropagation()
            }else{
                this.stopPropagation(event)
                this.preventDefault(event)
            }
        }
    }

    //性能优化 - 事件代理
      //事件委托：利用事件冒泡，将事件绑定在父元素上，通过事件冒泡，将事件传递给子元素
    //优点：
    //1.减少内存消耗
    //2.动态绑定事件
    //3.减少事件绑定次数
    //利用了冒泡
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>

    function onClick(e){
        var  e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.nodeName.toLowerCase() == 'li'){
            console.log(target.innerHTML)
            const liList = this.querySelectorAll('li')
            index = Array.prototype.indexOf.call(liList,target)
            console.log(index)
        }
    }

    var list = document.querySelector('ul')
    list.addEventListener('click',onClick,false)

```

### 网络请求
```js
    //实例化
    const xhr = new XMLHttpRequest()
    //初始化连接，配置请求参数 method -> get/post url -> 请求地址 async -> 是否异步
    xhr.open(method,url,async)
    //发送请求 
    xhr.send(null)
    //监听请求状态 0 -> 未初始化，尚未调用open 1 -> 已调用open 2 -> 已发送请求，（已调用send） 3 -> 已接收到请求返回的数据
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                console.log(xhr.responseText)
            }
        }
    }

    //设置超时时间
    xhr.timeout = 1000
    //监听超时时间
    xhr.ontimeout = function(){
        console.log('请求超时')
    }
    //设置请求头
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    //取消请求
    xhr.abort()

    //封装
    function ajax(options){
        const {method,url,async,data,timeout} = options;
        const xhr = new XMLHttpRequest();
        if(timeout && timeout > 0){
            xhr.timeout = timeout
        }
        return new Promise((resolve,reject) => {
            //成功
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                        resolve(xhr.responseText)
                    }else{
                        reject(xhr.status)
                    }
                }
            }
            //失败
            xhr.ontimeout = function(){
                reject('请求超时')
            }
            xhr.onerror = function(){
                reject('请求失败')
            }

            //传参处理
            let _params = [];
            let encodeData;
            if (data instanceof Object){
                for(let key in data){
                    _params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
                }
                encodeData = _params.join('&')
            }
            if(method == 'get' && encodeData){
                const index = url.indexOf('?');
                if (index === -1) url += '?';
                else if (index !== url.length - 1) url += '&';
                url += encodeData
            }

            //初始化连接
            xhr.open(method,url,async);
            
            //发送
            if(method === 'get'){
                xhr.send(null)
            }else if(method === 'post'){
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
                xhr.send(encodeData)
            }
            // xhr.abort()  //拦截器
        })
    }

    ajax({
        method:'get',
        url:'http://localhost:3000/data',
        async:true,
        timeout:3000,
        data:{
            payload:'text'
        }
    }).then(
        res => {
        console.log(res)
    },err => {
        console.log(err)
    })
    //fetch
```