<template>
  <div class="chat-box">
    <div class="chat-box__display">
      <div class="chat-box__display-area" ref="displayArea">
        <div v-for="(item, index) in chatHistory"
          :key="index"
          :class="['chat-box__display-card', item.message.role === 'user' ? 'user' : '']">
          <p class="chat-box__display-msg">{{ item.message.content }}</p>
        </div>
      </div>
    </div>
    <div class="chat-box__action">
      <textarea class="chat-box__action-input" v-model="text" spellcheck="false"/>
      <div class="btns">
        <button id="clear-msg-btn" class="btn-2" @click="onClear">Clear</button>
        <button id="submit-msg-btn" class="btn-1" @click="onSubmit">AskGPT</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import useChat from '../../composables/useChat'

const text = ref<string>('');
const chatHistory = computed<CompletionData[]>(() => useChat().get('chatHistory'));
const displayArea = ref<HTMLElement | null>(null);
const { getChatSessionStatus, postChatCompletion } = useChat();

const scrollToBottom = () => {
  setTimeout(
    () => displayArea.value.scrollTop = displayArea.value.scrollHeight, 
  200)
};

const onSubmit = async () => {
  await handleChatCompletion();
  scrollToBottom();
};

const onClear = (): void => {
  text.value = '';
   scrollToBottom();
}

const handleChatCompletion = async (): Promise<void> => {
  if (text.value.length > 0) {
    postChatCompletion(text.value);
    onClear();
  }
};

watch(
  (): CompletionData[] => chatHistory.value,
  (data): void => {
    scrollToBottom()
  },
  { deep: true }
)

onMounted( async() => {
  await getChatSessionStatus(true)
  useChat().set('sessionId', '1000');
})
onUnmounted( async() => await getChatSessionStatus(false))
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

.chat-box {
  background-color: #925a7f;
  width: 400px;
  height: 460px;
  border-radius: 20px;
  border: 2px solid #7d436a;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;

  &__display {
    width: 100%;
    border-radius: 10px;
    border: solid 2px rgb(230, 160, 90);
    background-color: rgb(242, 186, 130);
    box-shadow: inset 0px 0px 8px rgba(94, 93, 93, 0.834);
    box-sizing: border-box;
    display: flex;
    //align-items: center;
    padding: 10px;
    margin-bottom: 10px;
  }

  &__display-area {
    width: 100%;
    height: 294px;
    border-radius: 10px;
    border: solid 2px rgb(140, 141, 144);
    background-color: rgb(210, 241, 247);
    box-shadow: inset 0px 0px 8px rgba(94, 93, 93, 0.834);
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    overflow-y: auto;
  }

  &__display-area > :first-child {
    margin-top: auto !important;
}

  &__display-card {
    box-sizing: border-box;
    background-color: rgb(70, 91, 130);
    width: 320px;
    border-radius: 10px;
    box-shadow: 0px 2px 3px rgba(108, 127, 136, 0.516);
    padding: 10px;
  }

  &__display-msg {
    font-size: 0.9rem;
    color: rgb(246, 240, 234);
    font-weight: 500;
    line-height: 120%;
    margin: 0;
    font-family: 'Poppins', sans-serif;
    word-wrap: break-word;
    text-align: left;
  }

  &__action {
    width: 100%;
    height: 150px;
    display: flex;
    flex-direction: column;
  }

  &__action-input {
    box-sizing: border-box;
    height: 82px;
    width: 100%;
    border: none;
    border: solid 2px rgb(140, 141, 144);
    border-radius: 10px;
    box-shadow: inset 0px 0px 8px rgba(94, 93, 93, 0.834);
    font-family: sans-serif;
    font-size: 0.9rem;
    color: rgb(96, 93, 93);
    outline: none;
    background-color: rgb(246, 240, 234);
    font-weight: 500;
    resize: none;
    padding: 10px;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 10px;
  }

  .btns {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    .btn-1, .btn-2, .btn-3{
      height: 40px;
      width: 100px;
      border: none;
      border-radius: 10px;
      box-shadow: 0px 2px 4px rgb(0, 0, 0);
      box-shadow: inset 0px 0px 4px rgba(94, 93, 93, 0.834);
      color: rgb(246, 240, 234);
      background-color: rgb(74, 71, 68);
    }
  }

}
.user {
  margin-left: 30px;
  background-color: rgb(77, 113, 181);
}


</style>