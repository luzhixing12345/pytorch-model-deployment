# pytorch模型部署

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/luzhixing12345/pytorch-model-deployment/main)
![GitHub](https://img.shields.io/github/license/luzhixing12345/pytorch-model-deployment)

## 背景和前言

深度学习的教程很多,网上也有很多现成的简单的模型训练的例子和预训练模型,然而在实际的工业场景中,我们往往更加关注如何部署一个已经训练好的模型.

- 我们希望可以客户端/移动端访问网页就可以看到模型的效果,计算由服务器帮我们处理.
- 我们希望在一个没有python环境的地方依然可以执行模型的效果
- 我们希望加速模型的计算,python换成c++提高计算性能

## 分支介绍

本仓库是笔者博客记录对应的代码仓库,该仓库有多个分支,此分支对应 **服务器+web部署** 的内容

克隆本分支代码的命令行代码如下

```bash
git clone git@github.com:luzhixing12345/pytorch-model-deployment.git
```

## 博客

笔者在博客上整理了相关的内容,请参考**对应部分的博客和相应的分支**

- [深度学习模型部署(1)-前言和基本介绍](https://luzhixing12345.github.io/2022/06/13/pytorch/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E6%A8%A1%E5%9E%8B%E9%83%A8%E7%BD%B2-1/)
- [深度学习模型部署(2)-服务器与本地](https://luzhixing12345.github.io/2022/06/13/pytorch/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E6%A8%A1%E5%9E%8B%E9%83%A8%E7%BD%B2-2/)
- [深度学习模型部署(3)-真正的服务器](https://luzhixing12345.github.io/2022/06/14/pytorch/%E6%B7%B1%E5%BA%A6%E5%AD%A6%E4%B9%A0%E6%A8%A1%E5%9E%8B%E9%83%A8%E7%BD%B2-3/)

## 运行

```bash
flask run --host=0.0.0.0 --port=3000
```

```bash
nohup flask run --host=0.0.0.0 --port=3000 2>&1 &
```

```bash
ps -ef
kill PID 
```

## 实例

笔者使用服务器搭建了一个[基于WGAN生成动漫头像的网站](https://visual.kamilu.top)

第一个页面因为本身模型是一个0,1的正态分布输入,而输入范围是一个0-255的均匀分布,这就导致它的潜在空间探索就不完备,生成的结果质量就很差,第二个页面会好一些,直接使用的`torch.randn`来生成输入

> 如果网站挂了估计是被攻击了或者我没续费服务器,请留issue提醒我,谢谢

原项目地址在[Anime-WGAN](https://github.com/luzhixing12345/Anime-WGAN),web分支为对应网页的代码
