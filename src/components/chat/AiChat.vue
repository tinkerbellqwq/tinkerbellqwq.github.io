<template>
  <div class="chat-container">
    <!-- Floating Button -->
    <button @click="toggleChat" class="chat-button" :class="{ 'chat-button-open': isOpen }">
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    <!-- Chat Window -->
    <div v-show="isOpen" class="chat-window" ref="chatWindow">
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
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
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
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
});

const isOpen = ref(false);
const userInput = ref('');
const isLoading = ref(false);
const isStreaming = ref(false);
const availableModels = ref([{ id: 'deepseek-ai/deepseek-v3.2' }]);
const currentModel = ref('deepseek-ai/deepseek-v3.2');
const messages = ref([
  { role: 'assistant', content: '你好！我是主人的 AI 助手，有什么可以帮你的吗？' }
]);
const messageContainer = ref(null);

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
  fetchModels();
});

const savePreference = () => {
  localStorage.setItem('ai_chat_model', currentModel.value);
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
          { role: 'system', content: '你是一个友好且专业的 AI 助手，负责在博客中回答读者的问题。请使用 Markdown 格式回答。' },
          ...messages.value.filter(m => m.content !== '记忆已清除，开启新的对话吧！').map(m => ({ role: m.role, content: m.content }))
        ],
        stream: true
      })
    });

    if (!response.ok) throw new Error('网络请求失败');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let assistantMsg = { role: 'assistant', content: '' };
    messages.value.push(assistantMsg);
    isStreaming.value = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const dataStr = line.slice(6).trim();
          if (dataStr === '[DONE]') break;
          try {
            const data = JSON.parse(dataStr);
            const delta = data.choices[0].delta.content || '';
            assistantMsg.content += delta;
            await scrollToBottom();
          } catch (e) {}
        }
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
  min-width: 280px;
  min-height: 350px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  overflow: auto; 
  resize: both;
  border: 1px solid #e5e7eb;
}

.chat-header {
  padding: 8px 16px;
  background: #3b82f6;
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
}

.chat-title {
  font-weight: bold;
  font-size: 14px;
}

.model-select {
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.4);
  color: white;
  font-size: 11px;
  border-radius: 4px;
  padding: 2px 4px;
  outline: none;
  max-width: 180px;
}

.model-select option {
  color: #374151;
}

.clear-button {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f9fafb;
}

.message {
  max-width: 90%;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
}

.user {
  align-self: flex-end;
  background: #3b82f6;
  color: white;
}

.assistant {
  align-self: flex-start;
  background: white;
  color: #1f2937;
  border: 1px solid #e5e7eb;
}

/* Markdown Styles Fix */
.markdown-body :deep(p) { margin-bottom: 8px; color: inherit; }
.markdown-body :deep(code) { 
  background: #fee2e2; 
  color: #991b1b; 
  padding: 2px 4px; 
  border-radius: 4px; 
  font-family: monospace;
  font-size: 0.9em;
}
.markdown-body :deep(pre) { 
  background: #1e293b; 
  color: #f8fafc; 
  padding: 12px; 
  border-radius: 6px; 
  overflow-x: auto; 
  margin: 10px 0; 
  border: 1px solid #334155;
}
.markdown-body :deep(pre code) { 
  background: transparent; 
  color: #cbd5e1; 
  padding: 0; 
  font-size: 13px;
  line-height: 1.6;
}
.markdown-body :deep(ul), .markdown-body :deep(ol) { padding-left: 20px; margin-bottom: 8px; }
.markdown-body :deep(li) { margin-bottom: 4px; }

.chat-input-area {
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 8px;
  background: white;
  flex-shrink: 0;
}

.chat-input-area input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
}

.chat-input-area button {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
}

.chat-input-area button:disabled {
  opacity: 0.5;
}

.loading {
  font-style: italic;
  opacity: 0.7;
}
</style>
