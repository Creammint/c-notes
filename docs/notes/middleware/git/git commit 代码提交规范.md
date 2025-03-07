# git commit 代码提交规范

## git 提交规范

### [commitizen](https://www.npmjs.com/package/commitizen)

[AngularJS](https://github.com/angular/angular/commits/master) 在 github 上 的提交记录被业内许多人认可，逐渐被大家引用。

#### 格式

```less
type(scope): subject;
```

1. type（必须） : commit 的类别，只允许使用下面几个标识：

   - `feat` : 新功能
   - `fix` : 修复 bug
   - docs : 文档改变
   - style : 代码格式改变
   - `refactor` : 某个已有功能重构
   - perf : 性能优化
   - test : 增加测试
   - `build` : 改变了 build 工具 如 grunt 换成了 npm
   - revert : 撤销上一次的 commit
   - chore : 构建过程或辅助工具的变动

2. scope（可选） : 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

3. subject（必须） : commit 的简短描述，不超过 50 个字符。
   commitizen 是一个撰写合格 Commit message 的工具，
   遵循 Angular 的提交规范。

#### 优点

- 符合业内标准（许多项目使用 AngularJS 的 commit 规范）
- 提交过程更加规范（使用 commitizen 规范工具，风格统一）
- 能够生成风格统一的 commit log（type(scope):subject)

#### 缺点

- 需要安装 commitizen 工具包，使项目更大、更重了（适合大型开源项目）
- 提交过程受约束较大
- 有一定的学习成本

:::tip

[git commit 代码提交规范](https://www.cnblogs.com/anly95/p/13163384.html)

[git 代码提交规范，feat，fix，chore 都是什么意思?](https://blog.csdn.net/chenyajundd/article/details/139322838)

:::
