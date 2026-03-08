---
title: "字节跳动 AI Agent 算法一面面经"
published: 2026-03-08
description: "字节跳动 AI Agent 算法面试记录，涵盖 RAG 深度优化、分布式限流及 MySQL 事务机制"
tags: ["面经", "字节跳动", "RAG", "MySQL", "限流"]
category: "面试求职"
draft: false
---

> 来源：[牛客](https://www.nowcoder.com/)

## 面试问题整理

### RAG 深度优化
- 为什么在 RAG 流程中引入父子索引（Parent-Document Retrieval）？
- 为什么引入 BM25？向量检索和 BM25 的融合比例是怎样的？
- 检索融合的具体流程是什么？召回后有没有做 Rerank？
- Rerank 后返回几个块（Chunk）？有没有针对这个返回数量做过验证？
- Rerank 后的 TopK 截断是怎么做的？为什么是这个值？有没有其他截断方案？

### Agent 与工程化
- 讲一下上下文工程（Context Engineering）。
- Agent 的记忆（Memory）是怎么做的？
- 为什么选择 Python 和 Go 作为技术栈？在处理并发时有什么区别？

### 分布式限流与缓存
- 详细讲解分布式令牌桶限流的实现。
- 漏桶算法（Leaky Bucket）的原理讲一下。
- 滑动窗口算法限流讲一下。如果用代码实现，滑动窗口的结构体会包含哪些字段？
- 滑动窗口和令牌桶相比有什么缺点？
- 在 Redis 中，你会用什么数据结构来实现滑动窗口限流？
- LRU 缓存的实现原理讲一下。
- 布隆过滤器（Bloom Filter）的底层原理和适用场景讲一下。

### MySQL 深度解析
- MySQL 索引会在哪些情况下失效？
- 在使用 LIKE 进行模糊查询时，索引什么情况下会失效？
- MySQL 的事务隔离级别有哪些？如何保证一致性？
- 详细说说 MVCC 的实现，ReadView 的生成时机是怎样的？
- 在不同的隔离级别下，一个事务分别会创造几个 ReadView？
- MySQL 都有哪些锁？它们的作用分别是什么？

### 手撕代码
- 实现反转链表。
