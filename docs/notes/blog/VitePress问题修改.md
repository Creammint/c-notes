# VitePress 问题修改

## ERR_PNPM_OUTDATED_LOCKFILE

**问题**：

ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with \<ROOT>/package.json

`pnpm` 进行安装时出现 `ERR_PNPM_OUTDATED_LOCKFILE` 错误，提示 `pnpm-lock.yaml` 不是最新的，不能与 `<ROOT>/package.json` 保持同步。这个问题通常发生在 `pnpm` 的版本升级后，新版本的 `pnpm` 生成了一个新的 `pnpm-lock.yaml` 文件，而这个文件与旧版本的 `pnpm` 不兼容

**处理方案**：

重新生成 `pnpm-lock.yaml`：删除现有的 `pnpm-lock.yaml` 文件和 `node_modules` 目录，然后重新运行 `pnpm install` 来生成一个新的 `pnpm-lock.yaml` 文件。这样可以确保新的锁文件与您当前的 `pnpm` 版本和 `package.json` 完全同步；

```bash
pnpm install
```
