## 性能优化
### 一、从输入地址，浏览器经历了哪些阶段
1. 输入地址
    URL:资源定位符
    ```js
        //http://www.baidu.com/index.html?name=zhangsan&age=18
        //http与TCP的区别？
        //http -> 应用层  TCP -> 传输层
        //http基于TCP实现连接 TCP（请求、发送、断开）
        //http1.0 1.1 2.0 => 1.0 -> 持续链接 1.1 -> <<<优化点：应用keep-alive 保持TCP连接状态，不用反复连接>>> 2.0 -> 支持了多条并发复用同一条通路，避免chrome最大六条TCP连接限制，服用通路，无并发限制
        //UDP（注重传输) vs TCP（注重验证）

        //http -> 无状态 TCP -> 有状态
        //<<<优化点：socket连接，其实并不是链接，而是一个封装化的TCP，方便应用更加方便调用>>>
        
        //http vs https
        //https = http + SSL(TLS) => 位于TCP与传输应用层协议之间
        //实现过程：
        //1. 客户端发起请求
        //2. 服务器向客户端返回证书（公钥）
        //3. 客户端产生随机（对称）密钥
        //4. 客户端对对称密钥进行加密
        //5. 客户端向服务端发送加密后的对称密钥
        //6. 服务器向客户端发送收到信息
        //7. 客户端和服务端通过对称加密的密钥进行密文通信
        //HTTPS会多次连接，导致网络请求加载时间延长，增加开销和功耗
        //<<<优化点：合并请求 + 保持长连接>>>
        //<<<优化点：中间层 整合请求 => 需要考虑异常处理>>>


    ```
2. 域名解析，浏览器查找域名的IP地址
    ```js
        //浏览器缓存 - 浏览器中会缓存DNS
        //系统缓存 - 操作系统会在系统中做一些缓存 => host
        //路由器缓存 - 各级路由器上
        //运营商的各级缓存 => traceRoute
        //根域名服务器
        
        //优化点：
        //CDN - Content Delivery Network 内容分发网络
            //1.为同一个主机配置多个IP地址,增加访问效率，使得就近就快
            //2.LB - 负载平衡
                //将用户的请求平均分配到多台服务器上，提高系统并发处理能力
            //3.
    ```
3. WEB服务器
```js
    //apache、nginx
    //接受请求 => 传递给服务器的代码
    //反向代理 => 传递给其他服务器
    //不同域名 => 指向相同IP的服务器 => nginx域名解析 => 引导到不同的服务监听端口

    //什么是CDN？
    //CDN是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。
    //CDN的关键技术主要有内容存储和分发技术。
    //内容存储技术
        //将网站内容存储在离用户最近的服务器上，通过CDN系统，使用户可以就近取得所需内容，提高用户访问网站的响应速度。
    //内容分发技术
        //使用内容分发网络将网站的内容发布到最接近用户的网络"边缘"，使用户可以就近取得所需内容，降低网络拥塞，提高用户访问网站的响应速度。
    //负载均衡技术
        //将向服务器发送的请求，平均分配到多台服务器上，提高系统并发处理能力。
    //调度技术
        //将用户的请求按照一定的策略分发到不同的服务器上，从而实现负载均衡。

```

### 二、前端网络优化
*手写并发控制 - QPS-limit
```js
    //面试题：并发优化，10个请求，由于后台性能所限或者业务需求只能同时执行n个请求
    class LimitPromise {
        constructor(max){
            this._max = max || 6; //异步任务的并发上线
            this._count = 0;   //当前正在执行的任务数量
            this._taskQueue = [];  //等待执行的任务队列
            this.instance = null;   //单例模式复用
        }

        //主入口
        run(caller){   //外部要传入的请求
            //输出：返回队列处理的promise
            return new Promise((resolve,reject)=>{
                //创建一个任务
                const task = this._createTask(caller,resolve,reject);
                //判断当前队列任务数量是否达到上限
                if(this._count >= this._max){
                    this._taskQueue.push(task);
                }else{
                    task();
                }
            })
        }

        _createTask(caller,resolve,reject){
            return ()=>{
                //执行任务
                caller().then(res=>{
                    resolve(res)
                }).catch(err =>{
                    reject(err)
                }).finally(()=>{
                    //任务执行完毕，释放计数器
                    this._count--;
                    //判断当前队列任务数量是否达到上限
                    if(this._taskQueue.length){
                        const task =this._taskQueue.shift();
                        task();
                    }
                })
                this.count++;
            }
        }

        //单例
        static getInstance(max){
            if(!this.instance){
                this.instance = new LimitPromise(max);
            }
            return this.instance;
        }
    }
```

### 浏览器在渲染时
*浏览器的执行顺序
主线：HTML => DOM + CSSOM => renderTree + js => layout(布局) => paint(绘制) => 合成 => 显示
面试：如何改善渲染性能
*渲染性能优化
    *减少重排和重绘
        *减少重排和重绘，减少DOM操作
        *减少重排和重绘，减少style操作
        *减少重排和重绘，减少读写offsetTop、offsetLeft、offsetWidth、offsetHeight、scrollTop、scrollLeft、scrollWidth、scrollHeight等属性
        *减少重排和重绘，减少读写clientTop、clientLeft、clientWidth、clientHeight等属性
    
    =>减少重绘、避免重排（影响更大）
    =>display:none => reflow(重排)； visibility: hidden => repaint(重绘)

### 在脚本执行层 - JS
mark & sweep => 触达标记、锁定清空、未触达的直接抹掉
```js
    const test = {
        js:{
            performance: 'good',
            teacher:'yunduan'
        }
    }
    //建立引用关系
        const _obj = test;
        //引用源替换  - 暂未gc
        test = 'best';
        //深入层级引用 - 暂未gc
        const _class = _obj.js;
        //引用替换 - 暂未gc
        _obj = 'over';
        //触发gc完成
        _class = null;

        //内存泄漏
        function foo(){
            bar = "";
            this.bar2 c= "";
        }

        //未清理定时器
        setInterval(()=>{
            console.log('hello');
        },1000);

        //使用后的闭包需要及时清理
        function foo(){
            const bar = 'hello';
            return function(){
                console.log(bar);
            }
        }
        const _foo = foo();
        _foo();
        _foo = null;
        
        //未清理的DOM引用
        const _div = document.getElementById('div');
        _div.innerHTML = 'hello';
        _div = null;
```