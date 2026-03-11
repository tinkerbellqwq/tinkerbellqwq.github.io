---

> 💡 **提示**：以下内容包含详细的参考答案，点击对应的“查看答案”即可展开阅读。
title: "腾讯后台开发暑期实习一面面经 (2026.3.4)"
published: 2026-03-11
description: "腾讯后台开发暑期实习一面记录，包含RAG、Spring AI、分布式锁及并发等问题"
tags: ["面经", "腾讯", "后端", "实习", "AI"]
category: "面试求职"
draft: false
---

> 💡 **提示**：以下内容包含详细的参考答案，点击对应的“查看答案”即可展开阅读。

> 来源：[牛客](https://www.nowcoder.com/) (根据图片整理)

## 面试问题整理

### 个人经历与项目
1. 先简单做个自我介绍。
2. 你现在还在实习吗？
3. 说一下你实习时候的工作。
4. 这几项工作都是你独立做的吗？你主要负责哪一个？

### RAG 与大模型/Agent
5. RAG和传统搜索有什么区别？为什么不直接用关键词检索？
  <details>
  <summary>查看答案</summary>

  > **区别**：传统搜索主要基于倒排索引和 BM25 算法，强依赖关键词的字面匹配。RAG（检索增强生成）利用 Embedding 模型将文本映射为高维向量，基于语义相似度检索，并结合大模型对检索结果进行润色和总结。
  > **为什么不直接用关键词**：关键词检索存在“词汇鸿沟”问题，比如搜索“苹果”，它无法分辨是水果还是公司；而向量检索能理解上下文语义，即使字面不同（如“番茄”和“水果”），也能找到内在关联。

  </details>
7. 举个例子，智能体和大模型怎么交互、协同？工作流程是什么？
8. 检索这块你做过效果上的优化吗？
9. 有具体的优化案例吗？从效果不好到变好的过程。
14. 介绍一下 Spring AI 这个框架。
15. 是用 workflow 方式搭建的 agent 吗？
16. 用 Spring AI 写一个 agent 的过程大概是什么样的？
17. 整个过程完全是大模型自己决策吗？
18. 还接触过其他 Agent 开发框架吗？
28. MCP、Skills、Function Call 有什么区别？

### 业务与系统设计 (分布式 & MQ)
10. 怎么保证积分可靠性，防止多扣/多增？
  <details>
  <summary>查看答案</summary>

  > 1. **数据库层面**：使用乐观锁，每次更新时带上版本号或原有的积分数量 (\`UPDATE points SET balance = balance + 10, version = version + 1 WHERE id = 1 AND version = old_version\`)。
  > 2. **业务层面**：引入流水表，每一次积分变动都记录一条流水记录。系统通过唯一业务流水号进行幂等性校验，防止重复增加或扣减。
  > 3. **并发控制**：在修改积分前，使用 Redis 分布式锁锁住该用户的积分资源。

  </details>
11. 分布式锁原理大概是什么？SETNX 的功能是什么？加锁后进程异常退出，锁泄露怎么办？
  <details>
  <summary>查看答案</summary>

  > **原理**：利用存储系统（如 Redis、ZooKeeper）在集群中的一致性和单点特性，保证多个节点在同一时刻只能有一个成功写入特定的标识，从而获取锁。
  > **SETNX**：\`Set if Not eXists\` 的缩写。当且仅当 key 不存在时，将 key 设为 value 并返回 1（加锁成功）；若 key 存在，则不做任何动作并返回 0（加锁失败）。
  > **锁泄露解决**：必须给锁设置合理的过期时间（\`EXPIRE\`）。为了保证原子性，使用 \`SET key value NX EX seconds\`。更进阶的做法是使用 Redisson 框架，通过后台“看门狗（Watch Dog）”线程在进程存活时自动给锁续期，进程崩溃后看门狗停止续期，锁自然过期释放。

  </details>
23. Kafka 分区的目的是什么？压力具体指什么？
24. 实际自己搭建、使用过消息队列吗？
25. 为什么选用 RocketMQ，而不是 Kafka？
26. 延迟队列是怎么实现的？
27. 抛开 MQ，让你自己实现延迟功能，你会怎么做？

### 操作系统与并发
19. 进程和线程有什么区别？线程之间哪些内存是共享的？
  <details>
  <summary>查看答案</summary>

  > **区别**：
  > - **进程**：是操作系统资源分配的基本单位。拥有独立的内存空间，切换开销大。
  > - **线程**：是 CPU 调度的基本单位。依赖于进程存在，多个线程共享同一个进程的内存资源，切换开销小。
  > **共享内存**：堆（Heap）和方法区（Method Area/MetaSpace）。
  > **不共享的内存**：每个线程有自己独立的虚拟机栈（VM Stack）、本地方法栈（Native Method Stack）和程序计数器（Program Counter Register）。

  </details>
21. CAS 是什么？
  <details>
  <summary>查看答案</summary>

  > **CAS (Compare And Swap)**：比较并交换，是一种无锁的并发编程技术。
  > 它包含三个操作数：内存位置（V）、预期原值（A）和新值（B）。执行 CAS 操作时，只有当 V 的值等于 A 时，才会将 V 的值更新为 B，否则不执行任何操作。整个比较和赋值的操作在底层硬件指令（如 \`cmpxchg\`）层面是原子性的。常用于解决 ABA 问题时需配合版本号（如 \`AtomicStampedReference\`）。

  </details>
22. ThreadLocal 有什么作用？原理是什么，怎么实现线程隔离？

### 编程基础与算法
29. Java 之外还会其他语言吗？
30. 写一段堆排序，不要用系统 API，15 分钟写可运行代码。
  <details>
  <summary>查看答案</summary>

  > \`\`\`java
  > public class HeapSort {
  >     public void sort(int[] arr) {
  >         int n = arr.length;
  >         // 1. 构建大顶堆
  >         for (int i = n / 2 - 1; i >= 0; i--) {
  >             heapify(arr, n, i);
  >         }
  >         // 2. 逐个将堆顶元素移到数组末尾，并重新调整堆
  >         for (int i = n - 1; i > 0; i--) {
  >             int temp = arr[0];
  >             arr[0] = arr[i];
  >             arr[i] = temp;
  >             heapify(arr, i, 0);
  >         }
  >     }
  >
  >     private void heapify(int[] arr, int n, int i) {
  >         int largest = i; // 初始化父节点为最大值
  >         int left = 2 * i + 1;
  >         int right = 2 * i + 2;
  >
  >         if (left < n && arr[left] > arr[largest]) largest = left;
  >         if (right < n && arr[right] > arr[largest]) largest = right;
  >
  >         if (largest != i) {
  >             int swap = arr[i];
  >             arr[i] = arr[largest];
  >             arr[largest] = swap;
  >             // 递归调整受影响的子树
  >             heapify(arr, n, largest);
  >         }
  >     }
  > }
  > \`\`\`

  </details>
