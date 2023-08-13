<template>
  <div class="chat-box">
    <div class="chat-box__display">
      <div class="chat-box__display-area">
        <div v-for="item in chatHistory" :class="['chat-box__display-area-card', item.message.role === 'user' ? 'user' : '']">
          <p class="chat-box__display-area-card-msg">{{ item.message.content }}</p>
        </div>
      </div>
    </div>
    <div class="chat-box__action">
      <textarea class="chat-box__action-input" v-model="text" spellcheck="false">
      </textarea>
      <button id="submit-msg-btn" class="chat-box__action-submit-btn" @click="onSubmit">></button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import useChat from '../../composables/useChat'

const text = ref<string>('');
const chatHistory = computed(() => useChat().get('chatHistory'));
const { getChatSessionStatus, postChatCompletion } = useChat();

const onSubmit = async () => {
  await handleChatCompletion();
};

const onClear = (): void => {
  text.value = '';
}

const handleChatCompletion = async (): Promise<void> => {
  if (text.value.length > 0) {
    postChatCompletion(text.value);
    onClear();
  }
};

onMounted( async() => {
  await getChatSessionStatus(true)
  useChat().set('sessionId', '1000');
})
onUnmounted( async() => await getChatSessionStatus(false))
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

.chat-box {
  background-color: rgb(57, 58, 128);
  width: 400px;
  height: 480px;
  border-radius: 20px;
  border: 2px solid rgb(246, 240, 234);
  position: relative;
  display: flex;
  justify-content: center;

  &__display {
    position: absolute;
    width: 360px;
    height: 320px;
    border-radius: 10px;
    border: solid 2px rgb(140, 141, 144);
    top: 20px;
    background-color: rgb(246, 240, 234);
    box-shadow: inset 0px 0px 8px rgba(94, 93, 93, 0.834);
    //padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    &-area {
      position: absolute;
      width: 340px;
      height: 300px;
      border-radius: 10px;
      border: solid 2px rgb(140, 141, 144);
      //background-color: rgb(246, 240, 234);
      //box-shadow: inset 0px 0px 8px rgba(94, 93, 93, 0.834);
      padding: 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 8px;
      overflow: hidden;

      &-card {
        box-sizing: border-box;
        background-color: rgb(70, 91, 130);
        width: 300px;
        border-radius: 10px;
        box-shadow: 0px 2px 3px rgba(108, 127, 136, 0.516);
        padding: 10px;

        &-msg {
          font-size: 0.9rem;
          color: rgb(246, 240, 234);
          font-weight: 600;
          line-height: 120%;
          margin: 0;
          font-family: 'Poppins', sans-serif;
        }
      }
    }
  }

  &__action {
    position: absolute;
    width: 360px;
    min-height: 100px;
    display: flex;
    bottom: 20px;
    display: flex;
    align-items: center;

    &-input {
      box-sizing: border-box;
      height: 100px;
      width: 290px;
      border: none;
      border: solid 2px rgb(140, 141, 144);
      border-radius: 10px;
      box-shadow: inset 0px 0px 8px rgba(94, 93, 93, 0.834);
      font-family: sans-serif;
      font-size: 0.9rem;
      color: rgb(96, 93, 93);
      outline: none;
      background-color: rgb(246, 240, 234);
      font-weight: 400;
      position: absolute;
      resize: none;
      padding: 10px;
      font-family: 'Poppins', sans-serif;
    }

    &-submit-btn {
      position: absolute;
      width: 50px;
      height: 50px;
      border: none;
      border-radius: 50%;
      right: 0;
      box-shadow: 0px 2px 4px rgb(0, 0, 0);
      box-shadow: inset 0px 0px 4px rgba(94, 93, 93, 0.834);
      background-color: rgb(246, 240, 234);
      color: rgb(57, 58, 128);
      font-weight: 900;
    }
  }
}

.user {
  margin-left: 16px;
  background-color: rgb(77, 113, 181);
}
</style>