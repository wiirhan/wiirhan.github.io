---
title: Cursor工作流
description: Cursor工作流
dateFormatted: Nov 11 2024
---

在日常使用 Cursor 的过程中，我总结了一些能够是 Cursor 更高效工作的技巧。
通过这些配置，能让 Cursor 更加"智能"。

### 先想清楚内容，再写代码

首先创建一个包含项目每个细节的完整文档：

- 核心功能
- 技术栈
- 目标和宗旨
- 项目文件夹结构
- 数据库设计
- 配色方案
- 文案

将这些内容放入 `instructions.md` 文件中(文件名随便起)，并放入项目根目录下，这样 Cursor 就能根据这些内容来编写代码。

### 使用 `.cursorrules` 文件

`.cursorrules` 是 Cursor AI 中的一个强大功能，允许开发人员为 AI 定义特定于项目的指令。

[awesome-cursorrules](https://github.com/PatrickJS/awesome-cursorrules) 是一个帮助你编写 `.cursorrules` 文件的仓库。
你可以从仓库中选择一个模板，然后根据需要进行修改。

在根目录创建 `.cursorrules` 文件，然后根据项目需求，配置相应的规则。

### 聊天 vs 编辑器

使用聊天功能完成较小的任务，解释代码/命令。可以用它来提问和导航。

用编辑器（Composer）来写代码，始终在编辑器中标记你的`instructions.md`文件。

### 标记文档

复制项目使用的框架文档。

进入 Cursor 设置 > 功能 > 文档

粘贴这些连接，并在聊天/编辑器中通过`@Docs`使用。
