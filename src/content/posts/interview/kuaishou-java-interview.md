---
title: "快手 Java 一面面经"
published: 2026-03-09
description: "快手 Java 面试记录，涵盖线程池细节、JVM 内存管理及 MySQL 死锁场景分析"
tags: ["面经", "快手", "Java", "线程池", "MySQL"]
category: "面试求职"
draft: false
---

> 💡 **提示**：以下内容包含详细的参考答案，点击对应的“查看答案”即可展开阅读。

> 来源：[牛客](https://www.nowcoder.com/)

## 面试问题整理

### Java 线程池
- **线程池基础**：谈谈对 Java 线程池的了解，及其拒绝策略有哪些？
  <details>
  <summary>查看答案</summary>

  > **了解**：线程池主要用于复用线程、控制并发数、管理线程生命周期。核心参数包括：corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue, threadFactory, handler。
  > **拒绝策略**：
  > 1. AbortPolicy：直接抛出异常（默认）。
  > 2. CallerRunsPolicy：用调用者所在的线程执行任务。
  > 3. DiscardPolicy：直接丢弃任务，不抛异常。
  > 4. DiscardOldestPolicy：丢弃队列中最老的任务，重新尝试执行新任务。

  </details>
- **实际应用**：实际项目中在什么场景下使用过线程池？
  <details>
  <summary>查看答案</summary>

  > 场景：异步发送邮件/短信、批量数据导入导出、耗时较长的后台计算任务、利用 CompletableFuture 进行多个微服务接口的并行调用组装数据。

  </details>
- **参数配置**：
    - 核心线程数、最大线程数、等待队列设置的数值是多少？
    - 核心线程数的设置基于什么考虑，是否随便设置？
  <details>
  <summary>查看答案</summary>

  > **不能随便设置**。设置基于任务类型：
  > - **CPU 密集型**：核心线程数通常设置为 `CPU 核心数 + 1`。
  > - **IO 密集型**：核心线程数通常设置为 `CPU 核心数 * 2`（或根据公式：CPU核心数 / (1 - 阻塞系数)）。
  > 队列大小要根据可用内存和任务执行时间来估算，坚决避免使用无界队列（如默认的 LinkedBlockingQueue），防止 OOM。

  </details>
- **动态配置**：是否考虑过将线程池核心线程数、等待队列大小设置为动态的？
  <details>
  <summary>查看答案</summary>

  > 考虑过。可以通过美团开源的 **Hippo4j** 或 **Dynamic-tp** 等动态线程池框架实现。底层原理是调用 ThreadPoolExecutor 提供的 `setCorePoolSize()` 和 `setMaximumPoolSize()` 方法在运行时修改配置，并通过 Nacos 等配置中心下发变更。

  </details>
- **ThreadLocal**：ThreadLocal 有用过吗？在什么场景下使用，使用时需要注意什么？
  <details>
  <summary>查看答案</summary>

  > **场景**：用于存储用户登录的上下文信息（如 User 对象），在 Controller/Service/DAO 层传递，避免作为参数传来传去。
  > **注意**：必须在拦截器的 `afterCompletion` 或 `finally` 块中调用 `remove()` 方法清理，否则在线程池环境下会导致内存泄漏，甚至引发串号问题（拿到上一个请求的用户数据）。

  </details>

### JVM 相关
- **内存布局**：JVM 的内存区域分为哪些块？介绍一下 JVM 的垃圾回收机制。
  <details>
  <summary>查看答案</summary>

  > **内存区域**：堆（Heap）、方法区（元空间）、虚拟机栈（VM Stack）、本地方法栈、程序计数器。前两者线程共享，后三者线程私有。
  > **垃圾回收机制**：基于分代收集理论，将堆分为新生代和老年代。新生代使用复制算法（Minor GC），老年代使用标记-清除或标记-整理算法（Major/Full GC）。通过可达性分析确定垃圾对象。

  </details>
- **OOM 处理**：
    - 项目中是否遇到过 OOM？一般什么情况下会出现 OOM？
    - 出现后怎么处理，日常编码如何避免？
  <details>
  <summary>查看答案</summary>

  > **情况**：1. 内存泄漏（如 ThreadLocal 未清理，静态集合不断膨胀）；2. 瞬间大对象分配（如一次性查出百万条数据库记录）；3. 无界队列堆积（线程池任务堵塞）。
  > **处理**：JVM 启动参数加上 `-XX:+HeapDumpOnOutOfMemoryError`。拿到 Heap Dump 文件后，使用 MAT (Memory Analyzer Tool) 或 JProfiler 分析，找出大对象（Dominator Tree）和到 GC Roots 的引用链。
  > **避免**：分页查询、及时释放无用资源引用、使用有界队列。

  </details>

### MySQL 数据库
- **索引底层**：MySQL InnoDB 引擎中索引的底层结构是什么？其构建和使用有哪些注意事项？
  <details>
  <summary>查看答案</summary>

  > **底层结构**：B+ 树。非叶子节点只存索引，叶子节点存数据且带有双向链表指针，范围查询极快。
  > **注意事项**：遵循最左前缀法则；尽量使用覆盖索引避免回表；不要在经常更新的列上建索引；主键最好是自增的，以避免页分裂。

  </details>
- **慢查询分析**：1 亿条数据的学生表，按低辨识度的 student 字段查询指定 4 个字段，是否会出现慢查询，原因是什么？
  <details>
  <summary>查看答案</summary>

  > **会发生慢查询**。
  > **原因**：低辨识度（低区分度）字段建索引会导致在 B+ 树中匹配到大量记录。因为要查询 4 个字段，这大概率需要**回表**。当回表的数据量过大时，MySQL 优化器计算成本后，可能会放弃索引直接走**全表扫描**，导致查询极慢。

  </details>
- **死锁分析**：
    - 是否遇到过 MySQL 死锁？死锁在什么情况下产生，举场景例子并说明如何避免。
    - 学生表中按 `student+type` 更新数据，两个线程同时执行该操作是否会发生死锁？普通索引更新会加什么锁？
    - 上述死锁场景，如何提前避免或解决？
  <details>
  <summary>查看答案</summary>

  > **产生原因**：两个事务分别持有对方需要的锁，并相互等待。例如：事务 A 锁住行 1 请求行 2，事务 B 锁住行 2 请求行 1。
  > **死锁场景**：在 RR 隔离级别下，按普通索引更新时，除了给索引加记录锁（Record Lock），还会加间隙锁（Gap Lock）。如果两个线程更新的条件落在同一个间隙，且同时试图插入/修改该间隙内的数据，就可能触发死锁（尤其是 Insert Intention Lock 与 Gap Lock 冲突）。
  > **避免方案**：1. 保持加锁顺序一致；2. 尽量通过主键进行更新；3. 将长事务拆分成短事务；4. 降低隔离级别为 RC（去除了间隙锁，但会有幻读）。

  </details>

### 分布式系统
- **分布式锁**：项目中分布式锁在什么情况使用，大概是怎么用的？
  <details>
  <summary>查看答案</summary>

  > **场景**：定时任务防重跑、防止超卖扣减库存、缓存击穿重建缓存。
  > **用法**：引入 Redisson，使用 `RLock lock = redissonClient.getLock("key"); lock.tryLock(waitTimeout, leaseTime, TimeUnit)`。最后在 finally 块中判断 `isHeldByCurrentThread()` 然后释放锁。

  </details>

### 算法题
- 手写实现：**反转链表**（循环/递归方式）。
  <details>
  <summary>查看答案</summary>

  > **循环**：维护 `prev`, `curr`, `next` 三个指针，遍历改变 `curr.next = prev`。
  > **递归**：
  > ```java
  > public ListNode reverseList(ListNode head) {
  >     if (head == null || head.next == null) return head;
  >     ListNode newHead = reverseList(head.next);
  >     head.next.next = head;
  >     head.next = null;
  >     return newHead;
  > }
  > ```

  </details>
