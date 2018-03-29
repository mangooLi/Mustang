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