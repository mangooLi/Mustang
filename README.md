## 环境说明
全局需要安装`gulp`，`ts-node`，`typescript`库。为了更好的理解改项目，改项目的结构将采用`UML类图`表示，如果不熟悉的开发可以跳转到[UML学习](http://design-patterns.readthedocs.io/zh_CN/latest/read_uml.html)进行学习。

## 各模块说明

#### 特殊文件说明
`types.ts`：用于记录IOC标识符
`inversify.config.ts`：用于进行IOC注入
`gulp.ts`：利用`ts-node`支持基于`TypeScript`的Gulp脚手架


#### 配置文件
如果需要调整配置文件的根文件夹路径请在引用Config模块前使用如下代码进行调整：   
```
process.env["NODE_CONFIG_DIR"] = __dirname + "/configDir/";
```

当然为了保证开发、测试和生产环境下能够支持不同的配置文件，默认为开发环境，如果需要修改请在引用Config模块前使用如下代码进行调整：
```
process.env.NODE_ENV = "stage";
```
当然在实际使用中，都是通过环境变量设置即可：
```
NODE_ENV=stage
```
那么读取的配置文件将会是如下文件：
```
default-stage.json
stage.json
```

#### 如何调试单元测试
选择调试单元测试，并通过将`launch.json`中的参数修改为需要调试的ts文件即可，比如下方表示调试`configuration.spce.ts`
```
            "args": [
                "-u",
                "tdd",
                "-r",
                "ts-node/register",
                "--no-timeouts",
                "${workspaceFolder}/test/configuration.spec.ts"
            ]
```
但是直接使用vscode自带的断点是无法命中的，所以需要在需要调试的代码前临时增加一行代码`debugger`这样后面的断点才会命中。   

#### 如何扩展第三方库
在使用TypeScript开发过程中我们会需要许多第三方类库，而我们基本都是参考JavaScript的文档，这中间就带来了一个问题，就是可能我们通过文档发现其提供了某个方法，但是在我们使用TypeScript开发的时候发现并没有找个方法，这个时候我们不可能自己修改官方的dt.ts文件重新发布，那么我们可以通过以下方式来增加，比如我们使用的`Socketio`中的`Socket`对象在dt.ts中没有`use`方法，那么我们只要按照该接口所在的模块直接写同名接口并将缺少的方法写入其中即可：
```
declare module "socket.io" {
    interface Socket {
        use(fn:(packet: Array<any>, next: (Error?) => void) => void);
    }
}
```    


## 实现与依赖框架
* 配置采用[node-config](https://github.com/lorenwest/node-config)支持
* Redis存储采用[node-redis](https://github.com/NodeRedis/node_redis)支持
* JWT采用[node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)支持
* MongoDB采用[mongoose](https://github.com/Automattic/mongoose)支持
* MemoryCache采用[node-cache](https://github.com/ptarjan/node-cache)支持
* IOC采用[InversifyJS](https://github.com/inversify/InversifyJS)支持
* 日志采用[node-bunyan](https://github.com/trentm/node-bunyan)配合[bunyan-logstash-tcp](https://github.com/transcovo/bunyan-logstash-tcp)直接接入现有的`ELK`日志体系中
* 异步`MongoDB`刷新采用[kue](https://github.com/Automattic/kue)支持
* 自动重试采用[node-retry](https://github.com/tim-kos/node-retry)支持