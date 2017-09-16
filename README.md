# chrome_kit
#### 这是一款借助chrome 插件的微信机器人，JS注入，非协议分析，不封号不掉线（交流群：553059667）<br>

### 1.chrome kit微信机器人简介

1.借助chrome 插件 js注入来实现消息的发送<br>
2.chrome devtool api的调用来监听https请求<br>
3.打开微信登录界面，在扫码登录前必须先打开toolbar（F12 或者 鼠标右键检查），如上所说因为借助了chrome devtool api所以需要打开toolbar才能执行相关dev域的js。<br>

### 2.相关开发原理介绍

1.https://developer.chrome.com/extensions/devtools 。（需要FQ）这个文档介绍了三个域之间的关系，了解对使用非常有帮助。<br>
2.content scripts 是注入域，可以注入javascript到打开的页面中。<br>
3.Backgroud 域在第一次加载插件就执行，可以用来做各类监听<br>
4.dev -tool是在打开toolbar调试的时候才会执行，它有很多对应自己的api，如network的api，可以监听所有的请求。<br>
5.三个域之间如何通讯，该图也描述得很清楚了，具体内容不过多描述，看上面的文档或者我的代码例子即可。<br>
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914132752219-1166818163.png) <br> 

### 3，我设计的原理图
1.原理图如下<br>
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914141740328-429332579.png) <br>

### 4.使用操作说明
1.加载插件 ， 如下<br>
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914133750735-2027952550.png) <br> 
把我整个github文件夹下载下来加载即可<br>
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914133925735-2021058884.png) <br> 
<br> 
2.打开网页版微信登录界面，同时打开toolbar（记住这个非常重要，不然监听不到链接请求），如下图
<br> 
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914134522719-864800133.png) <br>
<br> 
3.扫码登录，等待5秒左右初始化，会有一个同步信号发送到手机微信的“同步助手”中，即表示成功登录。如果太久没有反应关掉浏览器从新来（非常小的概率），如下图
<br> 
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914135053438-470690741.png) 
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914135147625-664586208.png) 
<br> 
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914135259766-1807997694.png) <br>

### 5.如何调试和进一步开发
1.content注入域的调试如下<br>
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914135634063-1006901200.png) <br>
<br>
2.backgroud域的调试如下
<br>
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914135738782-1231276103.png) <br>
![](https://raw.githubusercontent.com/LinuxForYQH/chrome_kit/master/test/804379-20170914135819125-478405978.png) <br>
<br>
3.dev-tool域的调试说明：dev-tool没有控制台可以调试，而且出现错误也不会有提示，调试只能把相应的javascript注入到content层来查看输出，或者把消息发送到backgroud域查看执行结果。
<br>
