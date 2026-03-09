---
title: "信也科技后端一面面经"
published: 2026-03-09
description: "信也科技面试记录，涵盖 Java 并发、JVM 基础及 SQL 实战"
tags: ["面经", "信也科技", "Java", "JVM", "SQL"]
category: "面试求职"
draft: false
---

> 来源：[牛客](https://www.nowcoder.com/)

## 面试问题整理

### Java 基础与并发
- **集合类**：
    - HashMap 和 ConcurrentHashMap 的区别。
    - ConcurrentHashMap 保证线程安全的原理。
    - 是否了解 LinkedHashMap。
- **ThreadLocal**：
    - ThreadLocal 的使用场景。
    - 在异步线程池下使用 ThreadLocal 会有什么问题？
- **并发进阶**：
    - CompletableFuture 的底层原理与用途。
    - AQS 的底层实现及锁机制。

### JVM 与监控
- **对象创建**：创建新对象在 JVM 层面的过程。
- **垃圾回收**：常用的垃圾回收算法有哪些？
- **日志查询**：一般如何查询上线项目的日志？

### RAG 与 数据库
- **RAG 优化**：RAG 检索涉及到哪些优化？
- **SQL 实战**：两个表用户表（包含用户id 城市），订单表（包含用户id 金额），查询所有城市中总消费金额大于10000的城市名称以及总金额，按照金额倒序排序。

### 算法题
1. **前 K 个高频元素**（Hot100 原题）。
2. **三个线程交替打印 1-100**（讲思路）。
