<template>
  <div class="chat-container">
    <!-- Floating Button -->
    <button @click="toggleChat" class="chat-button" :class="{ 'chat-button-open': isOpen }">
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    <!-- Chat Window -->
    <div v-show="isOpen" class="chat-window" :style="windowStyle" ref="chatWindow">
      <div class="chat-header">
        <div class="header-left">
          <span class="chat-title">AI 助手</span>
          <select v-model="currentModel" class="model-select" @change="savePreference">
            <option v-for="m in availableModels" :key="m.id" :value="m.id">{{ m.id }}</option>
          </select>
        </div>
        <button @click="clearMessages" class="clear-button">清空</button>
      </div>
      
      <div class="chat-messages" ref="messageContainer">
        <div v-for="(msg, index) in processedMessages" :key="index" :class="['message', msg.role]">
          <div class="message-content markdown-body" v-html="renderMarkdown(msg.content)"></div>
        </div>
        <div v-if="isLoading && !isStreaming" class="message assistant loading">
          <div class="message-content">AI 正在思考中...</div>
        </div>
      </div>

      <div class="chat-input-area">
        <input 
          v-model="userInput" 
          @keyup.enter="sendMessage" 
          placeholder="问点什么吧..." 
          :disabled="isLoading"
        />
        <button @click="sendMessage" :disabled="isLoading || !userInput.trim()">发送</button>
      </div>
      <!-- Resize Handle -->
      <div class="resize-handle" @mousedown="startResize" title="拖拽调整大小"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import MarkdownIt from 'markdown-it';
import renderMathInElement from 'katex/contrib/auto-render';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

const STORAGE_KEY = 'ai_chat_messages_v1';
const MAX_MESSAGES = 100;
const DEFAULT_ASSISTANT_MESSAGE = '你好！我是主人的 AI 助手，有什么可以帮你的吗？';

const isOpen = ref(false);
const userInput = ref('');
const isLoading = ref(false);
const isStreaming = ref(false);
const availableModels = ref([{ id: 'deepseek-ai/deepseek-v3.2' }]);
const currentModel = ref('deepseek-ai/deepseek-v3.2');
const messages = ref([
  { role: 'assistant', content: DEFAULT_ASSISTANT_MESSAGE }
]);
const messageContainer = ref(null);
const chatWindow = ref(null);
const windowStyle = ref({});

const minWidth = 300;
const minHeight = 400;
let isResizing = false;
let resizeStartX = 0;
let resizeStartY = 0;
let resizeStartWidth = 0;
let resizeStartHeight = 0;
let resizeRaf = 0;
let previousUserSelect = '';
let saveTimer = 0;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const getMaxWidth = () => Math.floor(window.innerWidth * 0.9);
const getMaxHeight = () => Math.floor(window.innerHeight * 0.8);

const applyResize = (width, height) => {
  windowStyle.value = {
    width: `${width}px`,
    height: `${height}px`
  };
};

const onResizeMove = (event) => {
  if (!isResizing) return;
  const dx = event.clientX - resizeStartX;
  const dy = event.clientY - resizeStartY;
  const nextWidth = clamp(resizeStartWidth - dx, minWidth, getMaxWidth());
  const nextHeight = clamp(resizeStartHeight - dy, minHeight, getMaxHeight());
  if (resizeRaf) cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    applyResize(nextWidth, nextHeight);
  });
};

const stopResize = () => {
  if (!isResizing) return;
  isResizing = false;
  if (resizeRaf) cancelAnimationFrame(resizeRaf);
  resizeRaf = 0;
  document.body.style.userSelect = previousUserSelect;
  window.removeEventListener('mousemove', onResizeMove);
  window.removeEventListener('mouseup', stopResize);
};

const startResize = (event) => {
  if (!chatWindow.value) return;
  const rect = chatWindow.value.getBoundingClientRect();
  isResizing = true;
  resizeStartX = event.clientX;
  resizeStartY = event.clientY;
  resizeStartWidth = rect.width;
  resizeStartHeight = rect.height;
  previousUserSelect = document.body.style.userSelect;
  document.body.style.userSelect = 'none';
  window.addEventListener('mousemove', onResizeMove);
  window.addEventListener('mouseup', stopResize);
  event.preventDefault();
};

onBeforeUnmount(() => {
  stopResize();
  if (saveTimer) clearTimeout(saveTimer);
});

// 过滤掉思考内容
const processedMessages = computed(() => {
  return messages.value.map(msg => {
    if (msg.role === 'assistant') {
      // 过滤 [WebSearch] 或其他类似格式的思考过程 (不区分转义)
      let cleanContent = msg.content.replace(/\\[WebSearch\\]/g, '').replace(/\[WebSearch\]/g, '');
      return { ...msg, content: cleanContent.trim() };
    }
    return msg;
  });
});

const renderMarkdown = (content) => {
  return md.render(content);
};

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    scrollToBottom();
  }
};

const scrollToBottom = async () => {
  await nextTick();
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

const renderMath = async () => {
  await nextTick();
  if (!messageContainer.value) return;
  try {
    renderMathInElement(messageContainer.value, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false
    });
  } catch (e) {}
};

const normalizeMessages = (input) => {
  if (!Array.isArray(input)) return [];
  return input
    .filter((item) => item && typeof item.role === 'string' && typeof item.content === 'string')
    .map((item) => ({ role: item.role, content: item.content }))
    .slice(-MAX_MESSAGES);
};

const loadMessages = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return normalizeMessages(parsed);
    if (parsed && Array.isArray(parsed.messages)) return normalizeMessages(parsed.messages);
  } catch (e) {}
  return [];
};

const persistMessages = (list) => {
  try {
    const payload = {
      version: 1,
      savedAt: Date.now(),
      messages: normalizeMessages(list)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {}
};

const schedulePersist = (list) => {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    persistMessages(list);
  }, 300);
};

const clearMessages = () => {
  messages.value = [{ role: 'assistant', content: '记忆已清除，开启新的对话吧！' }];
};

const fetchModels = async () => {
  try {
    const response = await fetch('https://api.veyu.me/v1/models', {
      headers: {
        'Authorization': 'Bearer sk-wj2ApVgdELzimNO02YJRGS5iaAOXximWwpjnY9aJi9GKCPGg'
      }
    });
    const data = await response.json();
    if (data.data) {
      availableModels.value = data.data;
      const savedModel = localStorage.getItem('ai_chat_model');
      if (savedModel && data.data.find(m => m.id === savedModel)) {
        currentModel.value = savedModel;
      } else if (!data.data.find(m => m.id === currentModel.value)) {
        currentModel.value = data.data[0].id;
      }
    }
  } catch (e) {
    console.error('Fetch models failed', e);
  }
};

onMounted(() => {
  const storedMessages = loadMessages();
  if (storedMessages.length > 0) {
    messages.value = storedMessages;
  } else {
    messages.value = [{ role: 'assistant', content: DEFAULT_ASSISTANT_MESSAGE }];
  }
  fetchModels();
  void scrollToBottom();
  void renderMath();
});

const savePreference = () => {
  localStorage.setItem('ai_chat_model', currentModel.value);
};

watch(
  messages,
  (next) => {
    schedulePersist(next);
  },
  { deep: true }
);

const getChoiceContent = (choice) => {
  if (!choice) return '';
  if (choice.delta && typeof choice.delta.content === 'string') return choice.delta.content;
  if (choice.message && typeof choice.message.content === 'string') return choice.message.content;
  if (typeof choice.text === 'string') return choice.text;
  return '';
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;

  const content = userInput.value;
  messages.value.push({ role: 'user', content });
  userInput.value = '';
  isLoading.value = true;
  isStreaming.value = false;
  await scrollToBottom();

  try {
    const response = await fetch('https://api.veyu.me/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-wj2ApVgdELzimNO02YJRGS5iaAOXximWwpjnY9aJi9GKCPGg'
      },
      body: JSON.stringify({
        model: currentModel.value,
        messages: [
          { role: 'system', content: '你是一个友好且专业的 AI 助手，负责在博客中回答读者的问题。请直接回答问题，绝对不要输出任何类似 [WebSearch] 的思考过程。请使用 Markdown 格式回答。' },
          ...messages.value.filter(m => m.content !== '记忆已清除，开启新的对话吧！').map(m => ({ role: m.role, content: m.content }))
        ],
        stream: true
      })
    });

    if (!response.ok) throw new Error('网络请求失败');

    if (!response.body) throw new Error('响应体为空');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    messages.value.push({ role: 'assistant', content: '' });
    const assistantMsg = messages.value[messages.value.length - 1];

    let buffer = '';
    let rawText = '';
    let sawDataLine = false;
    let appended = false;
    let streamDone = false;

    const appendContent = async (text) => {
      if (!text) return;
      appended = true;
      assistantMsg.content += text;
      await scrollToBottom();
    };

    const processLine = async (line) => {
      const trimmed = line.trim();
      if (!trimmed || !trimmed.startsWith('data:')) return;
      sawDataLine = true;
      if (!isStreaming.value) isStreaming.value = true;
      const dataStr = trimmed.replace(/^data:\s*/, '');
      if (!dataStr) return;
      if (dataStr === '[DONE]') {
        streamDone = true;
        return;
      }
      try {
        const data = JSON.parse(dataStr);
        const delta = getChoiceContent(data?.choices?.[0]);
        if (delta) {
          await appendContent(delta);
        }
      } catch (e) {}
    };

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      rawText += chunk;
      buffer += chunk;
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || '';

      for (const line of lines) {
        await processLine(line);
        if (streamDone) break;
      }
    }

    const rest = decoder.decode();
    rawText += rest;
    buffer += rest;

    if (!streamDone && buffer) {
      const tailLines = buffer.split(/\r?\n/);
      for (const line of tailLines) {
        await processLine(line);
      }
    }

    if (!appended) {
      const fallbackText = rawText.trim();
      if (fallbackText) {
        try {
          const data = JSON.parse(fallbackText);
          const content = getChoiceContent(data?.choices?.[0]);
          assistantMsg.content = content || fallbackText;
        } catch (e) {
          assistantMsg.content = fallbackText;
        }
        await scrollToBottom();
      } else if (!sawDataLine) {
        assistantMsg.content = '模型未返回可显示的内容。';
      }
    }
  } catch (error) {
    console.error('Chat Error:', error);
    messages.value.push({
      role: 'assistant',
      content: '抱歉，我好像断网了，请稍后再试。'
    });
  } finally {
    isLoading.value = false;
    isStreaming.value = false;
    await scrollToBottom();
    await renderMath();
  }
};
</script>

<style scoped>
.chat-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-button {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #3b82f6;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.chat-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 350px;
  height: 500px;
  min-width: 300px;
  min-height: 400px;
  max-width: 90vw;
  max-height: 80vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  overflow: hidden; 
}

.chat-header {
  padding: 10px 16px;
  background: #2563eb;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.chat-title {
  font-weight: bold;
  font-size: 14px;
}

.model-select {
  background: #1d4ed8;
  border: 1px solid rgba(255,255,255,0.3);
  color: #ffffff;
  font-size: 12px;
  border-radius: 4px;
  padding: 2px 6px;
  outline: none;
  max-width: 200px;
  cursor: pointer;
}

.model-select option {
  background: white;
  color: #1f2937;
}

.clear-button {
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.clear-button:hover {
  background: rgba(255,255,255,0.25);
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #ffffff;
}

.message {
  max-width: 85%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  word-wrap: break-word;
}

.user {
  align-self: flex-end;
  background: #3b82f6;
  color: white;
  border-bottom-right-radius: 2px;
}

.assistant {
  align-self: flex-start;
  background: #f3f4f6;
  color: #1f2937;
  border: 1px solid #e5e7eb;
  border-bottom-left-radius: 2px;
}

/* Markdown Rendering Fixes */
.markdown-body :deep(p) { margin-bottom: 10px; }
.markdown-body :deep(p:last-child) { margin-bottom: 0; }
.markdown-body :deep(code) { 
  background: #fee2e2; 
  color: #991b1b; 
  padding: 2px 4px; 
  border-radius: 4px; 
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
}
.markdown-body :deep(pre) { 
  background: #0f172a; 
  color: #e2e8f0; 
  padding: 14px; 
  border-radius: 8px; 
  overflow-x: auto; 
  margin: 12px 0; 
  border: 1px solid #1e293b;
  font-size: 13px;
  line-height: 1.5;
}
.markdown-body :deep(pre code) { 
  background: transparent; 
  color: inherit; 
  padding: 0; 
}
.markdown-body :deep(ul), .markdown-body :deep(ol) { padding-left: 24px; margin-bottom: 10px; }
.markdown-body :deep(li) { margin-bottom: 6px; }

.chat-input-area {
  padding: 14px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 10px;
  background: #ffffff;
  flex-shrink: 0;
}

.chat-input-area input {
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 24px;
  outline: none;
  font-size: 14px;
  transition: border-color 0.2s;
}

.chat-input-area input:focus {
  border-color: #3b82f6;
}

.chat-input-area button {
  padding: 8px 18px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
}

.chat-input-area button:hover:not(:disabled) {
  background: #2563eb;
}

.chat-input-area button:disabled {
  opacity: 0.5;
}

/* Custom Resize Handle Area */
.resize-handle {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 18px;
  height: 18px;
  cursor: nesw-resize;
  background: linear-gradient(45deg, transparent 50%, #d1d5db 50%);
  border-bottom-left-radius: 12px;
}

.loading {
  font-style: italic;
  opacity: 0.6;
}
</style>
