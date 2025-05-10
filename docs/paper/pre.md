# 总结

## **表1：论文信息总览**

<table style="width:100%">
  <thead>
    <tr>
      <th style="width:5%;">年份</th>
      <th style="width:25%;">论文标题 (主要部分)</th>
      <th style="width:35%;">动机 (核心问题)</th>
      <th style="width:35%;">提出的方法</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left;">2020</td>
      <td style="text-align:left;">When Radiology Report Generation Meets Knowledge Graph</td>
      <td style="text-align:left;">标准图像描述方法未利用医学知识；现有评估指标（如BLEU）无法准确反映医学报告的临床正确性。</td>
      <td style="text-align:left;">1. 构建先验知识图谱 (胸部发现) 并通过图嵌入模块 (GCN) 学习；2. 提出新的评估指标 MIRQI，关注疾病提及的正确性。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2020</td>
      <td style="text-align:left;">Generating Radiology Reports via Memory-driven Transformer</td>
      <td style="text-align:left;">放射学报告长且高度模式化，传统图像描述方法难以捕捉这些特性。</td>
      <td style="text-align:left;">记忆驱动的Transformer：1. 关系记忆 (Relational Memory, RM) 记录生成模式；2. 记忆驱动的条件层归一化 (Memory-driven Conditional Layer Normalization, MCLN) 将RM集成到解码器。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2021</td>
      <td style="text-align:left;">Exploring and Distilling Posterior and Prior Knowledge...</td>
      <td style="text-align:left;">数据驱动的神经网络在放射学报告生成中面临严重的视觉和文本数据偏差问题（异常区域少/多样，正常描述多/重复）。</td>
      <td style="text-align:left;">后验与先验知识探索与蒸馏 (PPKED)：1. 后验知识探索器(PoKE)提取异常区域；2. 先验知识探索器(PrKE)利用检索报告和医学知识图谱；3. 多领域知识蒸馏器(MKD)与自适应蒸馏注意力(ADA)融合知识生成报告。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2022</td>
      <td style="text-align:left;">Cross-modal Memory Networks for Radiology Report G...</td>
      <td style="text-align:left;">现有模型在利用图像和文本间跨模态映射关系方面不足，缺乏显式利用机制。</td>
      <td style="text-align:left;">跨模态记忆网络 (Cross-modal Memory Networks, CMN)：引入共享记忆矩阵记录图文对齐信息，通过记忆查询和响应增强编解码过程。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2022</td>
      <td style="text-align:left;">Knowledge Matters: Radiology Report Generation with General and Specific Knowledge</td>
      <td style="text-align:left;">纯数据驱动方法存在偏见且缺乏专家知识；现有知识图谱方法知识范围有限。</td>
      <td style="text-align:left;">引入通用知识 (基于RadGraph的预构建图谱) 和特定知识 (从基于疾病标签分布相似性检索到的报告中提取的RadGraph三元组)，设计知识增强的多头注意力 (KEMHA) 模块进行融合。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2022</td>
      <td style="text-align:left;">AlignTransformer: Hierarchical Alignment of Visual...</td>
      <td style="text-align:left;">医学报告生成中的数据偏差问题 (正常视觉区域占主导)；医学报告序列长，传统RNN难以建模。</td>
      <td style="text-align:left;">AlignTransformer框架：1. 对齐分层注意力 (AHA) 编码器，分层对齐视觉区域和疾病标签以提取异常特征；2. 多粒度Transformer (MGT) 解码器，通过自适应利用注意力 (AEA) 和MCLN利用多粒度视觉特征生成报告。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2023</td>
      <td style="text-align:left;">ORGAN: Observation-Guided Radiology Report Generation...</td>
      <td style="text-align:left;">基于规划的方法仅依赖高级观察计划，缺乏细节；现有方法未能充分利用观察语义信息和图像信息，导致图文一致性不佳。</td>
      <td style="text-align:left;">两阶段框架：1. 观察规划 (Transformer E-D)；2. 报告生成，构建三层观察图 (观察-Ngram-Token)并通过树状推理 (TrR) 机制动态聚合图信息指导解码。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2023</td>
      <td style="text-align:left;">KiUT: Knowledge-injected U-Transformer for Radiology...</td>
      <td style="text-align:left;">数据偏差；需捕捉多层次视觉细节及图文交互；外部临床知识直接引入可能导致不一致或干扰。</td>
      <td style="text-align:left;">知识注入U-Transformer (KiUT)：1. 区域关系编码器 (RR-Encoder)；2. U-连接编解码器；3. 注入知识蒸馏器，在解码末端融合视觉、上下文和临床知识 (症状图)。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2023</td>
      <td style="text-align:left;">Dynamic Graph Enhanced Contrastive Learning for Ch...</td>
      <td style="text-align:left;">固定知识图谱不灵活；需更好视觉/文本表示以克服数据偏见。</td>
      <td style="text-align:left;">动态图 (通用知识+从检索报告中提取的特定知识三元组构建) 增强的对比学习：1. 动态图构建与编码；2. 图文对比损失(IRC)和图文匹配损失(IRM)提升表示质量和检索准确性。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2023</td>
      <td style="text-align:left;">Enhanced Knowledge Injection for Radiology Report ...</td>
      <td style="text-align:left;">视觉和文本数据偏差；缺乏准确、低噪声的领域知识；现有知识注入方法常忽略重要的位置和存在性信息。</td>
      <td style="text-align:left;">双分支增强知识注入：1. 加权概念知识 (WCK)，TF-IDF加权临床概念；2. 多模态检索知识 (MRK)，从相似报告提取{entity, position, exist}三元组并用提示工程处理；3. 知识融合模块(MoK)。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2023</td>
      <td style="text-align:left;">Interactive and Explainable Region-guided Radiolog...</td>
      <td style="text-align:left;">现有方法从全局图像特征生成，未能明确关注解剖区域；报告事实不完整或不一致；缺乏可解释性和人机交互。</td>
      <td style="text-align:left;">区域引导的报告生成 (RGRG)：1. 目标检测器检测解剖区域；2. 区域选择模块筛选显著区域；3. 异常分类模块增强特征；4. 语言模型为每个选区独立生成句子；5. 提供交互模式。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2023</td>
      <td style="text-align:left;">Radiology Report Generation with a Learned Knowled...</td>
      <td style="text-align:left;">手动构建知识库费力且难迁移；需更好对齐多模态信息以生成准确描述异常的报告。</td>
      <td style="text-align:left;">1. 可学习的知识库 (通过MHA从报告中自动学习和存储医学知识)；2. 多模态对齐 (视觉-文本，视觉-标签) 指导知识库学习并优化表示；3. 知识增强的报告生成器。</td>
    </tr>
    <tr>
      <td style="text-align:left;">2024</td>
      <td style="text-align:left;">PromptMRG: Diagnosis-Driven Prompts for Medical Re...</td>
      <td style="text-align:left;">现有MRG模型临床效用(CE)不足；疾病分布不均衡导致对罕见病诊断不可靠。</td>
      <td style="text-align:left;">诊断驱动的提示 (DDP)：1. 编码器-解码器+疾病分类分支；2. 分类结果转为token prompts指导解码；3. 跨模态特征增强(CFE)提升分类；4. 自适应疾病均衡学习(SDL)处理不平衡。</td>
    </tr>
  </tbody>
</table>

---

## **表2：论文实验结果详情**

**NLG 指标说明:**
* **B-n:** BLEU-n (越高越好)
* **MTR:** METEOR (越高越好)
* **RG-L:** ROUGE-L (越高越好)
* **CDR:** CIDEr (越高越好)

**CE 指标说明 (通常针对MIMIC-CXR):**
* **P:** Precision (越高越好)
* **R:** Recall (越高越好)
* **F1:** F1-score (越高越好)
* **Acc:** Accuracy (越高越好)

**MIRQI 指标说明 (由Zhang 等人提出，针对IU-RR):**
* **MIRQI-r:** MIRQI-Recall
* **MIRQI-p:** MIRQI-Precision
* **MIRQI-F1:** MIRQI-F1-score

<table style="width:100%">
  <thead>
    <tr>
      <th style="width:22%; text-align:left;">论文标题 (主要部分)</th>
      <th style="width:10%; text-align:left;">数据集</th>
      <th style="width:4%; text-align:left;">B-1</th>
      <th style="width:4%; text-align:left;">B-2</th>
      <th style="width:4%; text-align:left;">B-3</th>
      <th style="width:4%; text-align:left;">B-4</th>
      <th style="width:4%; text-align:left;">MTR</th>
      <th style="width:4%; text-align:left;">RG-L</th>
      <th style="width:4%; text-align:left;">CDR</th>
      <th style="width:4%; text-align:left;">P</th>
      <th style="width:4%; text-align:left;">R</th>
      <th style="width:4%; text-align:left;">F1</th>
      <th style="width:28%; text-align:left;">其他指标 (Acc, MIRQI等)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="text-align:left;">When Radiology Report Generation Meets Knowledge Graph</td>
      <td style="text-align:left;">IU-RR</td>
      <td style="text-align:left;">0.441</td>
      <td style="text-align:left;">0.291</td>
      <td style="text-align:left;">0.203</td>
      <td style="text-align:left;">0.147</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.367</td>
      <td style="text-align:left;">0.304</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">MIRQI-r:0.483, MIRQI-p:0.490, MIRQI-F1:0.478</td>
    </tr>
    <tr>
      <td style="text-align:left;">Generating Radiology Reports via Memory-driven Transformer</td>
      <td style="text-align:left;">IU X-Ray</td>
      <td style="text-align:left;">0.470</td>
      <td style="text-align:left;">0.304</td>
      <td style="text-align:left;">0.219</td>
      <td style="text-align:left;">0.165</td>
      <td style="text-align:left;">0.187</td>
      <td style="text-align:left;">0.371</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">0.353</td>
      <td style="text-align:left;">0.218</td>
      <td style="text-align:left;">0.145</td>
      <td style="text-align:left;">0.103</td>
      <td style="text-align:left;">0.142</td>
      <td style="text-align:left;">0.277</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.333</td>
      <td style="text-align:left;">0.273</td>
      <td style="text-align:left;">0.276</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;">Exploring and Distilling Posterior and Prior Knowledge...</td>
      <td style="text-align:left;">IU-Xray</td>
      <td style="text-align:left;">0.483</td>
      <td style="text-align:left;">0.315</td>
      <td style="text-align:left;">0.224</td>
      <td style="text-align:left;">0.168</td>
      <td style="text-align:left;">0.190</td>
      <td style="text-align:left;">0.376</td>
      <td style="text-align:left;">0.351</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">0.360</td>
      <td style="text-align:left;">0.224</td>
      <td style="text-align:left;">0.149</td>
      <td style="text-align:left;">0.106</td>
      <td style="text-align:left;">0.149</td>
      <td style="text-align:left;">0.284</td>
      <td style="text-align:left;">0.237</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;">Cross-modal Memory Networks for Radiology Report G...</td>
      <td style="text-align:left;">IU X-Ray</td>
      <td style="text-align:left;">0.475</td>
      <td style="text-align:left;">0.309</td>
      <td style="text-align:left;">0.222</td>
      <td style="text-align:left;">0.170</td>
      <td style="text-align:left;">0.191</td>
      <td style="text-align:left;">0.375</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">0.353</td>
      <td style="text-align:left;">0.218</td>
      <td style="text-align:left;">0.148</td>
      <td style="text-align:left;">0.106</td>
      <td style="text-align:left;">0.142</td>
      <td style="text-align:left;">0.278</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.334</td>
      <td style="text-align:left;">0.275</td>
      <td style="text-align:left;">0.278</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;">Knowledge Matters: Radiology Report Generation with General and Specific Knowledge</td>
      <td style="text-align:left;">IU-Xray</td>
      <td style="text-align:left;">0.496</td>
      <td style="text-align:left;">0.327</td>
      <td style="text-align:left;">0.238</td>
      <td style="text-align:left;">0.178</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.381</td>
      <td style="text-align:left;">0.382</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">0.363</td>
      <td style="text-align:left;">0.228</td>
      <td style="text-align:left;">0.156</td>
      <td style="text-align:left;">0.115</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.284</td>
      <td style="text-align:left;">0.203</td>
      <td style="text-align:left;">0.458</td>
      <td style="text-align:left;">0.348</td>
      <td style="text-align:left;">0.371</td>
      <td style="text-align:left;">Acc: 0.816</td>
    </tr>
    <tr>
      <td style="text-align:left;">AlignTransformer: Hierarchical Alignment of Visual...</td>
      <td style="text-align:left;">IU-Xray</td>
      <td style="text-align:left;">0.484</td>
      <td style="text-align:left;">0.313</td>
      <td style="text-align:left;">0.225</td>
      <td style="text-align:left;">0.173</td>
      <td style="text-align:left;">0.204</td>
      <td style="text-align:left;">0.379</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">0.378</td>
      <td style="text-align:left;">0.235</td>
      <td style="text-align:left;">0.156</td>
      <td style="text-align:left;">0.112</td>
      <td style="text-align:left;">0.158</td>
      <td style="text-align:left;">0.283</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;">ORGAN: Observation-Guided Radiology Report Generation...</td>
      <td style="text-align:left;">IU X-RAY</td>
      <td style="text-align:left;">0.510</td>
      <td style="text-align:left;">0.346</td>
      <td style="text-align:left;">0.255</td>
      <td style="text-align:left;">0.195</td>
      <td style="text-align:left;">0.205</td>
      <td style="text-align:left;">0.399</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">0.407</td>
      <td style="text-align:left;">0.256</td>
      <td style="text-align:left;">0.172</td>
      <td style="text-align:left;">0.123</td>
      <td style="text-align:left;">0.162</td>
      <td style="text-align:left;">0.293</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.416</td>
      <td style="text-align:left;">0.418</td>
      <td style="text-align:left;">0.385</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;">KiUT: Knowledge-injected U-Transformer for Radiology...</td>
      <td style="text-align:left;">IU-Xray</td>
      <td style="text-align:left;">0.525</td>
      <td style="text-align:left;">0.360</td>
      <td style="text-align:left;">0.251</td>
      <td style="text-align:left;">0.185</td>
      <td style="text-align:left;">0.242</td>
      <td style="text-align:left;">0.409</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">0.393</td>
      <td style="text-align:left;">0.243</td>
      <td style="text-align:left;">0.159</td>
      <td style="text-align:left;">0.113</td>
      <td style="text-align:left;">0.160</td>
      <td style="text-align:left;">0.285</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.371</td>
      <td style="text-align:left;">0.318</td>
      <td style="text-align:left;">0.321</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;">Dynamic Graph Enhanced Contrastive Learning for Ch...</td>
      <td style="text-align:left;">IU-Xray</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.163</td>
      <td style="text-align:left;">0.193</td>
      <td style="text-align:left;">0.383</td>
      <td style="text-align:left;">0.586</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.109</td>
      <td style="text-align:left;">0.150</td>
      <td style="text-align:left;">0.284</td>
      <td style="text-align:left;">0.281</td>
      <td style="text-align:left;">0.471</td>
      <td style="text-align:left;">0.352</td>
      <td style="text-align:left;">0.373</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;">Enhanced Knowledge Injection for Radiology Report ...</td>
      <td style="text-align:left;">IU-Xray</td>
      <td style="text-align:left;">0.516</td>
      <td style="text-align:left;">0.349</td>
      <td style="text-align:left;">0.262</td>
      <td style="text-align:left;">0.207</td>
      <td style="text-align:left;">0.222</td>
      <td style="text-align:left;">0.400</td>
      <td style="text-align:left;">0.608</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">0.360</td>
      <td style="text-align:left;">0.231</td>
      <td style="text-align:left;">0.162</td>
      <td style="text-align:left;">0.119</td>
      <td style="text-align:left;">0.153</td>
      <td style="text-align:left;">0.298</td>
      <td style="text-align:left;">0.217</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;">Interactive and Explainable Region-guided Radiolog...</td>
      <td style="text-align:left;">MIMIC-CXR (Chest ImaGenome)</td>
      <td style="text-align:left;">0.373</td>
      <td style="text-align:left;">0.249</td>
      <td style="text-align:left;">0.175</td>
      <td style="text-align:left;">0.126</td>
      <td style="text-align:left;">0.168</td>
      <td style="text-align:left;">0.264</td>
      <td style="text-align:left;">0.495</td>
      <td style="text-align:left;">0.461 (ex-14)</td>
      <td style="text-align:left;">0.475 (ex-14)</td>
      <td style="text-align:left;">0.447 (ex-14)</td>
      <td style="text-align:left;">P(mic-5):0.491, R(mic-5):0.617, F1(mic-5):0.547</td>
    </tr>
    <tr>
      <td style="text-align:left;">Radiology Report Generation with a Learned Knowled...</td>
      <td style="text-align:left;">IU-Xray</td>
      <td style="text-align:left;">0.497</td>
      <td style="text-align:left;">0.319</td>
      <td style="text-align:left;">0.230</td>
      <td style="text-align:left;">0.174</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.399</td>
      <td style="text-align:left;">0.407</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">0.386</td>
      <td style="text-align:left;">0.237</td>
      <td style="text-align:left;">0.157</td>
      <td style="text-align:left;">0.111</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.274</td>
      <td style="text-align:left;">0.111</td>
      <td style="text-align:left;">0.420</td>
      <td style="text-align:left;">0.339</td>
      <td style="text-align:left;">0.352</td>
      <td style="text-align:left;">Acc: 0.795</td>
    </tr>
    <tr>
      <td style="text-align:left;">PromptMRG: Diagnosis-Driven Prompts for Medical Re...</td>
      <td style="text-align:left;">IU X-Ray</td>
      <td style="text-align:left;">0.401</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.098</td>
      <td style="text-align:left;">0.160</td>
      <td style="text-align:left;">0.281</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.213</td>
      <td style="text-align:left;">0.229</td>
      <td style="text-align:left;">0.211</td>
      <td style="text-align:left;"></td>
    </tr>
    <tr>
      <td style="text-align:left;"></td>
      <td style="text-align:left;">MIMIC-CXR</td>
      <td style="text-align:left;">0.398</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.112</td>
      <td style="text-align:left;">0.157</td>
      <td style="text-align:left;">0.268</td>
      <td style="text-align:left;">-</td>
      <td style="text-align:left;">0.501</td>
      <td style="text-align:left;">0.509</td>
      <td style="text-align:left;">0.476</td>
      <td style="text-align:left;"></td>
    </tr>
  </tbody>
</table>

**请注意:**
* "-" 表示该论文未报告此项指标
* 指标的数值直接来自论文，不同论文的评测脚本、数据预处理、甚至数据集的精确划分可能存在细微差异，因此跨论文的直接比较需要谨慎。
* 对于RGRG，特别注明了其使用的是MIMIC-CXR的Chest ImaGenome版本，并且CE指标报告了example-based (ex-14) 和 micro-averaged (mic-5) 两种。
* 由于空间限制和信息提取的焦点，此表主要列出了论文中提出的**自身模型**在相应数据集上的表现，并非所有论文都直接给出了一个统一的“基线”进行对比。SOTA的声明是相对于其发表时的情况。
* 有些论文可能只报告BLEU-4而没有细分的BLEU-1到3，或者只报告CIDEr。
