---
title: "快手 Agent 算法实习一面面经"
published: 2026-03-08
description: "快手 Agent 算法实习面试记录，涵盖 MCP 协议、Prefix Caching 及大模型底层原理"
tags: ["面经", "快手", "Agent", "MCP", "Prefix Caching"]
category: "面试求职"
draft: false
---

> 来源：[牛客](https://www.nowcoder.com/)

## 面试问题整理

### Agent 架构与工程化
- **Agent 与 Workflow**：两者的区别是什么？在实际业务中，你会根据什么标准选择对应的方案？
- **企业级 Agent 架构**：如何实现 BFF、Tool Server 与 Worker 的多组件拆分？
- **安全与隔离**：在企业级 Agent 中，怎么实现安全与隔离？权限管理、审计与日志追踪具体的落地方案是什么？

### 协议与前沿产品
- **MCP (Model Context Protocol)**：它在 Agent 生态中解决了什么痛点？有哪些具体的分类？Transport 层是怎么工作的？如何开发一个 MCP Server？
- **Agent 产品理解**：谈谈你对 Claude Code、Manus 这类 Agent 产品的理解，它们的架构逻辑与传统 Chat Agent 有什么差别？它的工程部分的能力是怎么实现的？
- **Methodology**：如何实现 Claude 的 Agent Research 方法论？Deepsearch 场景下需要配备哪些工具？基础设施与安全挑战在哪里？

### 记忆与上下文管理
- **Memory 实现**：在多轮对话中，分别实现 Short-term memory、Long-term memory 与 Task memory 怎么做？
- **上下文机制**：完整的实现流程是怎样的？说一下它的写入策略、读取策略以及 Rerank 的做法是怎样的。
- **Token 限制处理**：当上下文超过 Token 限制时，如何组合使用 Rolling Summary、State Extraction 与 RAG 这三段式策略？

### 模型底层与性能优化
- **Prefix Caching**：说一下 Prefix Caching 和 KV Cache 的原理。为什么缓存的是 K 和 V 而不是 Q？不再计算前缀具体节省了哪部分算力？
- **Attention 优化**：引入 Prefix Caching 后，Attention 的计算复杂度是怎么下降的？为什么 Prefix Caching 只能优化 Attention 部分，而无法优化 FFN 部分？
- **Transformer 细节**：对比一下 Transformer 中 Self-attention 与 FFN 的作用差异。
- **评测策略**：Few-shot 在 Agent 评测中是为了提升能力还是降低方差？在评测 Pipeline 的哪个阶段注入？如何防止过拟合？

### 数学与基础
- **Softmax 机制**：从 Softmax 的数学角度解释，为什么在计算过程中加上负无穷就能让注意力权重变为 0？
- **掩码机制**：什么是掩码？你分别说一下 Causal Mask 与 Padding Mask 的作用是什么？
