---
title: "快手 Agent 算法实习一面面经"
published: 2026-03-08
description: "快手 Agent 算法实习面试记录，涵盖 MCP 协议、Prefix Caching 及大模型底层原理"
tags: ["面经", "快手", "Agent", "MCP", "Prefix Caching"]
category: "面试求职"
draft: false
---

> 💡 **提示**：以下内容包含详细的参考答案，点击对应的“查看答案”即可展开阅读。

> 来源：[牛客](https://www.nowcoder.com/)

## 面试问题整理

### Agent 架构与工程化
- **Agent 与 Workflow**：两者的区别是什么？在实际业务中，你会根据什么标准选择对应的方案？

    <details>
    <summary>查看答案</summary>

    > **区别**：
    > - **Workflow (工作流)**：确定性高，按照预设的静态节点（DAG 图）和条件分支一步步执行，每一步的输入输出结构固定，缺乏自主决策能力。
    > - **Agent (智能体)**：具有高度自主性，大模型作为核心“大脑”，根据目标自行规划步骤（Planning）、选择工具（Tools）、反思调整（Reflection）直到完成任务。
    > **选择标准**：
    > 1. **确定性与容错率**：如果业务要求 100% 确定且不容许幻觉（如金融结算），选 Workflow；如果场景开放、步骤多变（如资料搜索、代码编写），选 Agent。
    > 2. **意图复杂度**：单一固定意图用 Workflow，复杂且需动态拆解的意图用 Agent。

    </details>

- **企业级 Agent 架构**：如何实现 BFF、Tool Server 与 Worker 的多组件拆分？

    <details>
    <summary>查看答案</summary>

    > **BFF (Backend for Frontend)**：作为接入层，处理不同前端终端（Web/App）的鉴权、限流、会话管理和协议转换（如将流式 SSE 转为 WebSocket）。
    > **Worker**：核心的大模型调度层，负责维护上下文、执行 ReAct 循环（Thought/Action/Observation）。
    > **Tool Server**：独立的工具服务集群，将内部 API、数据库查询、外部搜索封装成标准的 OpenAPI 或 MCP 协议，供 Worker 调度。
    > **拆分优势**：实现算力解耦，Worker 侧重调度，Tool Server 侧重执行，支持各种语言开发工具，且利于做细粒度的安全管控。

    </details>

- **安全与隔离**：在企业级 Agent 中，怎么实现安全与隔离？权限管理、审计与日志追踪具体的落地方案是什么？

    <details>
    <summary>查看答案</summary>

    > **安全与隔离**：
    > - 代码执行：放在 Docker 或 gVisor 等沙盒沙箱中执行。
    > - 数据隔离：租户级别的数据物理/逻辑隔离，RAG 检索时必须带上 user_id 或 tenant_id 过滤。
    > **权限与审计**：
    > - **RBAC/ABAC**：工具层面实施权限控制，Agent 请求 Tool Server 时携带用户 Token，Tool Server 校验用户是否有该工具（如“删除数据”）的权限。
    > - **日志追踪**：引入 TraceId，打通 BFF -> Worker -> LLM -> Tool Server 的全链路。所有的 prompt 输入、LLM 输出、工具调用入参出参全部落盘存储，便于合规审计和复盘。

    </details>

### 协议与前沿产品
- **MCP (Model Context Protocol)**：它在 Agent 生态中解决了什么痛点？有哪些具体的分类？Transport 层是怎么工作的？如何开发一个 MCP Server？

    <details>
    <summary>查看答案</summary>

    > **痛点解决**：解决了大模型/Agent 框架与外部工具/数据源对接的标准化问题。避免了每个框架（如 LangChain, LlamaIndex）和每个数据源之间都要写一对一适配器的“N*M”困境。
    > **分类**：主要分为三种核心能力：**Resources** (读取上下文/数据)、**Tools** (执行动作)、**Prompts** (预设模板)。
    > **Transport 层**：目前主要支持基于 \`stdio\` (标准输入输出，适合本地/同机运行) 和基于 \`SSE (Server-Sent Events) + HTTP POST\` (适合远程客户端-服务端通信)。
    > **开发流程**：选择对应的 SDK（如 Python/TS MCP SDK），定义好被暴露的 Tool（加上强类型的 Schema 描述），配置好 Server 的基本信息，最后通过 stdio 或 web 框架启动服务。

    </details>

- **Agent 产品理解**：谈谈你对 Claude Code、Manus 这类 Agent 产品的理解，它们的架构逻辑与传统 Chat Agent 有什么差别？它的工程部分的能力是怎么实现的？

    <details>
    <summary>查看答案</summary>

    > **理解与差别**：
    > - 传统 Chat Agent 依赖对话轮次驱动，通常是单步工具调用（ReAct），需要人类不断介入。
    > - Claude Code / Manus 属于 **Autonomous Agent (自主智能体)** 或 **Agentic IDE**，采用长时间的后台运行模式（长上下文记忆），能进行超长步骤的自主规划、自我纠错（Self-Correction）和代码生成与执行验证。
    > **工程能力实现**：
    > - **Computer Use/Sandbox**：底层分配了隔离的 Linux 容器或浏览器环境，Agent 可以通过预设的接口读取屏幕、模拟键鼠，或执行 Bash 命令。
    > - **多 Agent 协同**：内部可能是多智能体架构（规划者、执行者、审查者）。

    </details>

- **Methodology**：如何实现 Claude 的 Agent Research 方法论？Deepsearch 场景下需要配备哪些工具？基础设施与安全挑战在哪里？

### 记忆与上下文管理
- **Memory 实现**：在多轮对话中，分别实现 Short-term memory、Long-term memory 与 Task memory 怎么做？

    <details>
    <summary>查看答案</summary>

    > - **短期记忆 (Short-term)**：直接利用大模型的上下文窗口，将最近 N 轮的对话历史（Message History）按原样或滑动窗口截断后拼接在 Prompt 中。
    > - **长期记忆 (Long-term)**：将重要信息（用户画像、事实事实）抽取并转化为向量，存入向量数据库（Vector DB），或者构建知识图谱（Knowledge Graph）。下次对话时通过相似度检索或实体关联召回。
    > - **任务记忆 (Task memory)**：通常使用状态机或黑板模式（Blackboard），记录当前任务的执行进度、已获得的中间变量和阶段性成果。

    </details>

- **上下文机制**：完整的实现流程是怎样的？说一下它的写入策略、读取策略以及 Rerank 的做法是怎样的。

    <details>
    <summary>查看答案</summary>

    > **完整流程**：多模态/文本解析 -> 分块 (Chunking) -> 向量化 (Embedding) -> 入库存储。检索时：Query 解析 -> 召回 (Recall) -> 重排 (Rerank) -> Prompt 组装 -> LLM 生成。
    > **写入策略**：结合滑动窗口切分、添加元数据（时间、作者、来源等）以及文档摘要生成。
    > **读取策略**：双路或多路召回（如 Dense 向量检索 + BM25 关键词检索）。
    > **Rerank 做法**：召回阶段为了速度会返回较多粗糙结果，然后使用交叉编码器（Cross-Encoder，如 BGE-Reranker）将 Query 和每一个 Chunk 拼接输入模型，计算相关性得分，然后截断取 Top-K。

    </details>

- **Token 限制处理**：当上下文超过 Token 限制时，如何组合使用 Rolling Summary、State Extraction 与 RAG 这三段式策略？

    <details>
    <summary>查看答案</summary>

    > 1. **State Extraction (状态抽取)**：最优先，对当前对话提取核心要素（如用户的具体需求、已经确定的参数），保留高信息密度的结构化数据。
    > 2. **Rolling Summary (滚动摘要)**：对于无法结构化的过往长对话，使用 LLM 总结其核心脉络，用几百字替代原本几千字的废话。
    > 3. **RAG (检索增强)**：将更早期的对话历史或文档直接做向量化存入数据库。只有当当前 Query 需要用到历史细节时，才通过检索将其重新拉回上下文。
    > **组合**：Prompt = System + 状态抽取结果 + 滚动摘要 + RAG 召回片段 + 最近 N 轮对话 + Current Query。

    </details>

### 模型底层与性能优化
- **Prefix Caching**：说一下 Prefix Caching 和 KV Cache 的原理。为什么缓存的是 K 和 V 而不是 Q？不再计算前缀具体节省了哪部分算力？

    <details>
    <summary>查看答案</summary>

    > **KV Cache**：在自回归生成阶段（Decode），前面的 Token 已经计算过的 Key 和 Value 矩阵状态被缓存下来，新生成一个 Token 时，只需计算当前 Token 的 Q、K、V，并用当前的 Q 与历史缓存的 K、V 计算注意力，避免重复计算前面的 Token。
    > **Prefix Caching**：在 Prompt 阶段（Prefill），如果多个请求共享了相同的前缀（如长 System Prompt），推理引擎（如 vLLM）会将这部分前缀的 KV Cache 保留在显存中，后续命中时直接复用，实现 TTFT（首字延迟）的大幅降低。
    > **为什么不存 Q**：在 Attention 公式 \`Softmax(Q*K^T)*V\` 中，生成第 $t$ 个 Token 时，其 $Q_t$ 只与所有的 $K_{1..t}$ 和 $V_{1..t}$ 进行点乘。历史的 $Q_{1..t-1}$ 在计算第 $t$ 步时根本用不上，所以不需要存。
    > **节省了什么**：省去了 Prefill 阶段前缀部分巨大的全量矩阵乘法（$O(N^2)$ 的 Attention 计算量）和对应的显存带宽读取压力。

    </details>

- **Attention 优化**：引入 Prefix Caching 后，Attention 的计算复杂度是怎么下降的？为什么 Prefix Caching 只能优化 Attention 部分，而无法优化 FFN 部分？
- **Transformer 细节**：对比一下 Transformer 中 Self-attention 与 FFN 的作用差异。

    <details>
    <summary>查看答案</summary>

    > - **Self-attention (自注意力)**：核心作用是**全局信息交互**（Routing/Mixing）。它决定了“当前 Token 需要看向上下文中的哪些其他 Token”，建立了词与词之间的关联依赖。
    > - **FFN (前馈神经网络)**：核心作用是**知识记忆与非线性变换**。它对每个 Token 的表示进行独立的升维和降维操作（不涉及其他 Token）。很多研究认为，大模型学习到的事实性知识主要存储在 FFN 的庞大权重参数中。

    </details>

- **评测策略**：Few-shot 在 Agent 评测中是为了提升能力还是降低方差？在评测 Pipeline 的哪个阶段注入？如何防止过拟合？

### 数学与基础
- **Softmax 机制**：从 Softmax 的数学角度解释，为什么在计算过程中加上负无穷就能让注意力权重变为 0？

    <details>
    <summary>查看答案</summary>

    > Softmax 的公式为：$P_i = rac{e^{x_i}}{\sum e^{x_j}}$。
    > 如果我们将某个位置的值 $x_i$ 加上负无穷（在代码中通常是 \`-1e9\`），那么 $e^{-\infty}$ 极其接近于 0。
    > 因此，这个位置在分子中的值变为 0，在经过归一化后，其最终的注意力权重 $P_i$ 也就变成了 0。这正是掩码（Mask）机制实现的基础。

    </details>

- **掩码机制**：什么是掩码？你分别说一下 Causal Mask 与 Padding Mask 的作用是什么？

    <details>
    <summary>查看答案</summary>

    > **掩码 (Mask)**：在计算 Attention 时，通过给某些位置的得分加上负无穷，强制让模型忽略这些位置的信息。
    > - **Causal Mask (因果掩码/下三角掩码)**：用于 Decoder 中，确保在生成当前词时，模型只能“看到”前面的词，而不能“看到”未来的词，保证自回归生成的因果性。
    > - **Padding Mask (填充掩码)**：因为输入批次（Batch）中句子的长度不一，短句子需要用无意义的 Padding Token（如 0）补齐。Padding Mask 确保模型在计算注意力时，完全忽略这些人为填充的无意义字符。

    </details>

