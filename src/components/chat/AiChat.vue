<template>
  <div class="chat-container">
    <!-- Floating Button -->
    <button @click="toggleChat" class="chat-button" :class="{ 'chat-button-open': isOpen }">
      <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>

    <!-- Chat Window -->
    <div v-show="isOpen" class="chat-window">
      <div class="chat-header">
        <span class="chat-title">AI 助手</span>
        <button @click="clearMessages" class="clear-button">清空</button>
      </div>
      
      <div class="chat-messages" ref="messageContainer">
        <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
          <div class="message-content" v-html="msg.content"></div>
        </div>
        <div v-if="isLoading" class="message assistant loading">
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
import { ref, nextTick } from 'vue';

const isOpen = ref(false);
const userInput = ref('');
const isLoading = ref(false);
const messages = ref([
  { role: 'assistant', content: '你好！我是主人的 AI 助手，有什么可以帮你的吗？' }
]);
const messageContainer = ref(null);

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

const sendMessage = async () => {
  if (!userInput.value.trim() || isLoading.value) return;

  const content = userInput.value;
  messages.value.push({ role: 'user', content });
  userInput.value = '';
  isLoading.value = true;
  await scrollToBottom();

  try {
    const response = await fetch('https://api.veyu.me/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-wj2ApVgdELzimNO02YJRGS5iaAOXximWwpjnY9aJi9GKCPGg'
      },
      body: JSON.stringify({
        model: 'deepseek-ai/deepseek-v3.2',
        messages: [
          { role: 'system', content: '你是一个友好且专业的 AI 助手，负责在博客中回答读者的问题。' },
          ...messages.value.map(m => ({ role: m.role, content: m.content }))
        ],
        stream: false
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]) {
      messages.value.push({
        role: 'assistant',
        content: data.choices[0].message.content
      });
    } else {
      throw new Error('回复解析失败');
    }
  } catch (error) {
    console.error('Chat Error:', error);
    messages.value.push({
      role: 'assistant',
      content: '抱歉，我好像断网了，请稍后再试。'
    });
  } finally {
    isLoading.value = false;
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

.chat-button:hover {
  transform: scale(1.1);
}

.chat-window {
  position: absolute;
  bottom: 70px;
  right: 0;
  width: 320px;
  height: 450px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.chat-header {
  padding: 12px 16px;
  background: #3b82f6;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  font-weight: bold;
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
}

.message {
  max-width: 85%;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.user {
  align-self: flex-end;
  background: #3b82f6;
  color: white;
}

.assistant {
  align-self: flex-start;
  background: #f3f4f6;
  color: #1f2937;
}

.chat-input-area {
  padding: 12px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 8px;
}

.chat-input-area input {
  flex: 1;
  padding: 8px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  outline: none;
}

.chat-input-area button {
  padding: 8px 12px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.chat-input-area button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading {
  font-style: italic;
  opacity: 0.7;
}
</style>
