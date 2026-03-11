---
title: "虾皮日常算法实习一面面经"
published: 2026-03-08
description: "虾皮日常算法实习面试记录，涵盖Java基础、JVM、Spring及算法题"
tags: ["面经", "虾皮", "Java", "JVM", "Spring"]
category: "面试求职"
draft: false
---

> 💡 **提示**：以下内容包含详细的参考答案，点击对应的“查看答案”即可展开阅读。

> 来源：[牛客](https://www.nowcoder.com/)

## 面试问题整理

1. **HashMap 原理**：底层实现是什么？哈希冲突了怎么办？
  <details>
  <summary>查看答案</summary>

  > **底层**：数组 + 链表 + 红黑树。
  > **冲突解决**：采用链地址法，发生冲突的元素挂在同一个槽位的链表上。当链表长度大于 8 且数组长度大于 64 时，链表转化为红黑树以保证 O(logN) 的查询效率。

  </details>
2. **Java 锁工具**：有哪些常用的锁工具？
  <details>
  <summary>查看答案</summary>

  > 内置锁：\`synchronized\`。
  > JUC 锁：\`ReentrantLock\` (可重入锁)、\`ReentrantReadWriteLock\` (读写锁)、\`StampedLock\` (邮戳锁)。
  > 同步工具类：\`CountDownLatch\`、\`CyclicBarrier\`、\`Semaphore\`。

  </details>
3. **CountDownLatch**：其实现原理是什么？
  <details>
  <summary>查看答案</summary>

  > 基于 AQS 实现。初始化时设置 AQS 的 \`state\` 为计数器的值。调用 \`countDown()\` 时通过 CAS 将 \`state\` 减 1；调用 \`await()\` 时，当前线程会被放入 AQS 的阻塞队列中，直到 \`state\` 变为 0，才会唤醒队列中的等待线程。

  </details>
4. **读写锁**：读写锁应该怎么使用？
  <details>
  <summary>查看答案</summary>

  > 使用 \`ReentrantReadWriteLock\`。分为读锁（共享锁）和写锁（排他锁）。
  > 在读多写少的场景下，读操作获取读锁，多个线程可同时读取；写操作获取写锁，阻塞其他所有的读和写操作，从而提高并发度。

  </details>
5. **接口优化**：项目里的接口优化是怎么实现的？
6. **排序算法**：快排和归并的过程与区别。
  <details>
  <summary>查看答案</summary>

  > **快排**：选定基准值（pivot），将小于它的放左边，大于它的放右边，递归这个过程。是不稳定排序，最坏 O(N^2)，平均 O(N logN)，空间 O(logN)。
  > **归并**：将数组不断对半拆分直到长度为 1，然后两两合并有序数组。是稳定排序，时间始终 O(N logN)，但需要额外的 O(N) 空间。

  </details>
7. **IOC**：谈谈对控制反转的理解。
  <details>
  <summary>查看答案</summary>

  > 控制反转是指将对象的创建和依赖关系的管理，从应用程序的代码中抽离出来，交由 Spring 容器（BeanFactory/ApplicationContext）来控制。降低了组件之间的耦合度，便于测试和维护。

  </details>
8. **Spring Bean**：详细说明 Bean 的生命周期。
  <details>
  <summary>查看答案</summary>

  > 1. 实例化 (Instantiation) -> 2. 属性赋值 (Populate Properties) -> 3. 初始化 (Initialization, 调用 afterPropertiesSet 和自定义 init 方法) -> 4. 销毁 (Destruction)。
  > 期间穿插 \`BeanPostProcessor\` 的 \`postProcessBeforeInitialization\` 和 \`postProcessAfterInitialization\` (AOP 代理通常在此处生成)。

  </details>
9. **G1 垃圾回收器**：其特点和工作原理。
  <details>
  <summary>查看答案</summary>

  > 特点：面向服务端的全堆收集器，可预测的停顿时间模型。
  > 原理：取消了物理上的分代，将堆划分为多个大小相等的 Region。工作过程分为：初始标记 -> 并发标记 -> 最终标记 -> 筛选回收。回收时优先回收垃圾最多的 Region (Garbage First)。

  </details>
10. **排序 Map**：Java 中有没有自带排序功能的 Map？
  <details>
  <summary>查看答案</summary>

  > 有，\`TreeMap\`（按 Key 自然排序或自定义 Comparator 排序），以及 \`LinkedHashMap\`（按插入顺序或访问顺序维护）。

  </details>
11. **HashMap 排序**：HashMap 是不可排序的，如果要实现排序该怎么做？如果 Value 要排序该怎么做？
  <details>
  <summary>查看答案</summary>

  > 若按 Key 排序，可将内容转存到 \`TreeMap\` 中。
  > 若按 Value 排序，需将 HashMap 的 \`entrySet\` 放入 List 中，使用 \`Collections.sort()\` 并传入自定义的 \`Comparator\` 根据 value 进行比较，最后将结果存入 \`LinkedHashMap\` 保持顺序。

  </details>
12. **HashMap 的 Key**：如果要使用对象作为 HashMap 的 Key，该如何实现？
  <details>
  <summary>查看答案</summary>

  > 必须重写该对象类的 \`hashCode()\` 和 \`equals()\` 方法。重写 \`hashCode\` 决定放在哪个桶，重写 \`equals\` 决定在链表/红黑树中如何判断是否为同一个键。

  </details>
13. **ThreadLocal**：ThreadLocal 之间该怎么通信？
  <details>
  <summary>查看答案</summary>

  > ThreadLocal 本身就是为了“隔离”而生，不应该直接通信。如果在业务层必须让不同的线程共享数据，应该使用共享对象、消息队列或者并发安全的集合，而不是 ThreadLocal。

  </details>
14. **红黑树**：红黑树是什么？插入时会遇到什么问题？
  <details>
  <summary>查看答案</summary>

  > 红黑树是一种自平衡的二叉查找树。要求：根和叶子(NIL)是黑色，红节点不能相邻，任一节点到其所有叶子的路径包含相同数量的黑节点。
  > 插入时默认插入红色节点，可能会破坏“红节点不相邻”的规则。需要通过**变色**和**旋转（左旋/右旋）**来重新平衡。

  </details>
15. **认证与鉴权**：JWT 和 Cookie/Session 的区别。
  <details>
  <summary>查看答案</summary>

  > - **Cookie/Session**：有状态。Session 存在服务端，客户端保存 Cookie (SessionId)。服务端压力大，且在分布式系统下需要解决 Session 共享问题。
  > - **JWT**：无状态。用户信息加密并签名存放在 Token 中下发给客户端，服务端无需保存状态，适合分布式系统。缺点是无法在过期前主动作废某一个 Token。

  </details>
16. **JVM 调优**：谈谈 JVM 调优的相关经验或问题。

## 算法与数据库
1. **SQL**：写建表语句和查询语句。
2. **多线程**：用线程池写一个死锁。
  <details>
  <summary>查看答案</summary>

  > 常见场景：线程池内部的任务又向同一个线程池提交子任务，并等待 \`Future.get()\`。如果核心线程被父任务占满，子任务在队列中排队，父任务等待子任务，导致互相等待的死锁。

  </details>
