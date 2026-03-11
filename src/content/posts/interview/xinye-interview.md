---
title: "信也科技后端一面面经"
published: 2026-03-09
description: "信也科技面试记录，涵盖 Java 并发、JVM 基础及 SQL 实战"
tags: ["面经", "信也科技", "Java", "JVM", "SQL"]
category: "面试求职"
draft: false
---

> 💡 **提示**：以下内容包含详细的参考答案，点击对应的“查看答案”即可展开阅读。

> 来源：[牛客](https://www.nowcoder.com/)

## 面试问题整理

### Java 基础与并发
- **集合类**：HashMap 和 ConcurrentHashMap 的区别。ConcurrentHashMap 保证线程安全的原理。是否了解 LinkedHashMap。
  <details>
  <summary>查看答案</summary>

  > **区别**：HashMap 线程不安全，允许 null 键和值；ConcurrentHashMap 线程安全，不允许 null 键和值。 
  > **安全原理**：JDK 1.8 放弃了分段锁，采用 CAS + synchronized 保证并发安全，锁的粒度更细，只锁住链表或红黑树的首节点。
  > **LinkedHashMap**：继承自 HashMap，内部维护了一个双向链表，用于记录插入顺序或访问顺序（LRU），适合实现简单的缓存淘汰策略。

  </details>
- **ThreadLocal**：ThreadLocal 的使用场景。在异步线程池下使用 ThreadLocal 会有什么问题？
  <details>
  <summary>查看答案</summary>

  > **场景**：解决变量的并发访问问题，常用于保存用户登录信息、数据库连接、Session 等，实现线程隔离。
  > **异步线程池问题**：1. **数据丢失**：子线程无法直接获取父线程的 ThreadLocal 数据（需用 InheritableThreadLocal 或 TransmittableThreadLocal）。2. **内存泄漏**：线程池中的线程会被复用，如果使用完不调用 \`remove()\` 清理，会导致旧数据残留及内存泄漏。

  </details>
- **并发进阶**：CompletableFuture 的底层原理与用途。AQS 的底层实现及锁机制。
  <details>
  <summary>查看答案</summary>

  > **CompletableFuture**：用于实现异步编程和复杂的任务编排（如串行、并行、组合等）。底层基于 \`ForkJoinPool\`，通过维护一个内部的 \`Completion\` 栈来记录依赖任务，主任务完成后触发回调。
  > **AQS (AbstractQueuedSynchronizer)**：底层使用一个 \`volatile\` 修饰的 \`state\` 变量表示同步状态，并通过一个双向的 FIFO 队列（CLH 队列）来管理等待获取锁的线程。使用 CAS 操作来安全地修改 \`state\`。

  </details>

### JVM 与监控
- **对象创建**：创建新对象在 JVM 层面的过程。
  <details>
  <summary>查看答案</summary>

  > 1. **类加载检查**：检查指令的参数能否在常量池中定位到一个类的符号引用，并检查该类是否已被加载、解析和初始化过。
  > 2. **分配内存**：为新对象分配内存空间（指针碰撞或空闲列表方式），并发情况下使用 TLAB 或 CAS 保证安全。
  > 3. **初始化零值**：将分配到的内存空间（不包括对象头）都初始化为零值。
  > 4. **设置对象头**：设置对象的哈希码、GC 分代年龄、锁状态等信息。
  > 5. **执行 \`<init>\` 方法**：执行构造函数，按照程序员的意图进行初始化。

  </details>
- **垃圾回收**：常用的垃圾回收算法有哪些？
  <details>
  <summary>查看答案</summary>

  > 1. **标记-清除 (Mark-Sweep)**：标记存活对象，清除未标记对象。容易产生内存碎片。
  > 2. **标记-复制 (Copying)**：将内存分为两块，每次只使用一块。存活对象复制到另一块，清除当前块。适合存活率低的年轻代。
  > 3. **标记-整理 (Mark-Compact)**：标记存活对象，让所有存活对象向一端移动，清理边界外内存。适合老年代，无碎片。

  </details>
- **日志查询**：一般如何查询上线项目的日志？
  <details>
  <summary>查看答案</summary>

  > - **基础命令**：使用 \`tail -f\` 实时查看，\`grep\` 过滤关键字，\`less\` 或 \`more\` 分页查看。
  > - **分布式系统**：通常使用 ELK (Elasticsearch, Logstash, Kibana) 或 EFK 堆栈进行集中式日志收集和查询。通过 TraceId 来串联整个调用链路。

  </details>

### RAG 与 数据库
- **RAG 优化**：RAG 检索涉及到哪些优化？
  <details>
  <summary>查看答案</summary>

  > 1. **数据切分优化**：调整 Chunk size 和 overlap，或者使用父子文档切分（Parent-Document Retrieval）。
  > 2. **向量检索优化**：混合检索（向量 Dense + 关键词 Sparse/BM25）。
  > 3. **查询重写**：Query Rewrite/HyDE，通过 LLM 扩展用户意图。
  > 4. **重排 (Rerank)**：使用专门的 Reranker 模型对召回结果进行二次排序。

  </details>
- **SQL 实战**：两个表用户表（包含用户id 城市），订单表（包含用户id 金额），查询所有城市中总消费金额大于10000的城市名称以及总金额，按照金额倒序排序。
  <details>
  <summary>查看答案</summary>

  > \`\`\`sql
  > SELECT u.city, SUM(o.amount) AS total_amount
  > FROM user u
  > JOIN orders o ON u.user_id = o.user_id
  > GROUP BY u.city
  > HAVING total_amount > 10000
  > ORDER BY total_amount DESC;
  > \`\`\`

  </details>

### 算法题
1. **前 K 个高频元素**（Hot100 原题）。
  <details>
  <summary>查看答案</summary>

  > 思路：先用 HashMap 统计频率，然后维护一个大小为 K 的小顶堆（PriorityQueue）。遍历 Map，若堆大小小于 K 直接加入；若频率大于堆顶元素，则弹出堆顶并加入新元素。时间复杂度 O(N log K)。

  </details>
2. **三个线程交替打印 1-100**（讲思路）。
  <details>
  <summary>查看答案</summary>

  > 思路：使用 \`ReentrantLock\` 配合三个 \`Condition\` (c1, c2, c3)。
  > 维护一个状态变量 \`state\`（初始为 0）。
  > - 线程 A 判断 \`state % 3 == 0\`，成立则打印并唤醒 c2，否则在 c1 上等待。
  > - 线程 B 判断 \`state % 3 == 1\`，成立则打印并唤醒 c3，否则在 c2 上等待。
  > - 线程 C 判断 \`state % 3 == 2\`，成立则打印并唤醒 c1，否则在 c3 上等待。

  </details>
