# qB-Torents-Auto-Resume

## 简介
- 解决IYUU Plus辅种校验完成且完成率为100%后不自动开始做种的问题
- 只支持qb，只在qb 4.4.3.1版本中测试通过

## 使用方法：
1. Chrome浏览嚣安装Tampermonkey扩展程序
2. 复制qb torents auto resume.user.js文件内的所有代码
3. 打开Tampermonkey的管理面板，点击“+”号新建用户脚本
4. 删除编辑框内自动生成的代码，粘贴刚才复制的代码
5. 把代码内第7行 “// @match        http://127.0.0.1:60009/*” 内的IP和端口改成你自己qb webui的IP和端口
6. Chrome打开qb的Web UI登录一次
7. Chrome打开 “http://你的qb地址:端口/api/v2/torrents/info?filter=paused” ，F12打开控制台，查看运行情况
   - 之所以推荐打开此地址，是因为此地址不像webui那样会定时刷新，省资源占用，如果你觉得打开webui更方便也可以
