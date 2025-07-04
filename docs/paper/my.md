# 医学报告生成

## Automatic Radiology Reports Generation via Memory Alignment Network （AAAI 2024）

- 动机：医学影像和文本的跨模态对齐（cross-modal alignment）困难，前人工作有依靠分类器的疾病标签与文本对齐，这依赖分类器的高精度，一旦分类错误将导致后续所有任务；此外，还有人采用了记忆矩阵，作为知识库，所有的图像和文本都可以从中查询特征，从而间接的实现了对齐。本文从记忆矩阵的局限性出发：记忆矩阵存在双重任务，既要学习表征，又要学习对齐，职责不专一，并且效率十分低下，因为它在生成报告时，每生成一个新词都需要重新查询一次记忆矩阵。

- 创新点：

    - 机制创新：提出了一个解耦的记忆对齐（Decoupled Memory Alignment）模块。它将特征表示（Representation）和对齐（Alignment）这两个任务分开，让记忆矩阵只专注于对 - 齐，从而学习更纯粹的跨模态映射关系。
    - 效率创新：对齐过程被设计为一次性计算（One-time Calculation）。在送入BERT生成器之前，所有视觉特征的对齐嵌入可以一次性全部计算完成，与CMN逐词计算的方式形成鲜明对比，极大地提升了推理速度。
    - 信息融合创新：在构建查询（Query）时，巧妙地融合了视觉特征和其对应的位置嵌入（Positional Embedding）。这为对齐模块引入了空间位置的“常识”，使其能更好地理解图像布局，做出更鲁棒的对齐。

- 核心方法：将视觉特征，利用记忆矩阵进行类似注意力操作获取对齐特征，在送入BERT之前，我们可以一次性把所有视觉特征进行对齐，从而实现了高效率。

- 实验结果：


| 数据集 | B@1 | B@2 | B@3 | B@4 | M | R |
| --- | --- | --- | --- | --- | --- | --- |
| MIMIC-CXR | 0.396 | 0.244 | 0.162 | 0.115 | 0.151 | 0.274 |
| IU X-Ray | 0.501 | 0.328 | 0.230 | 0.170 | 0.213 | 0.386 |