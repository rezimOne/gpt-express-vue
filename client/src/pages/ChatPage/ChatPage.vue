<template>
  <div class="chat-box">
    <div class="chat-box__display">
      <DigitalClock class="digital-clock"/>
      <div class="chat-box__display-area" ref="displayArea">
        <div class="chat-box__card-wrapper"
          v-for="(item, index) in chatHistory"
          :class="[item.message.role === 'user' ? 'user' : 'chat']"
          :key="`card_${index}`">
          <img v-if="item.message.role === 'assistant'" id="gpt-logo" class="gpt-logo" src="../../assets/images/openai_dark.svg" height="18" width="18" alt="gpt-logo" />
          <img v-else id="user-logo" class="user-logo" src="../../assets/images/fingerprint.svg" height="18" width="18" alt="user-logo" />   
          <BaseCard :role="item.message.role">
            <template #content>
              <p class="chat-box__display-msg" >{{ item.message.content }}</p>
            </template>
          </BaseCard>
        </div>
        <BaseLoader v-if="isLoading"/>
      </div>
    </div>
    <div class="chat-box__action">
      <textarea class="chat-box__action-input" v-model="text" spellcheck="false"/>
      <div class="btns">
        <button id="clear-msg-btn" class="btn-2" @click="onClear">Clear</button>
        <button id="submit-msg-btn" class="btn-1" @click="onSubmit">
          <img class="logo" src="../../assets/images/openai_white.svg" height="22" width="22" alt="logo" />
          askGPT
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch, onUpdated } from 'vue';
import useChat from '../../composables/useChat'
import { CompletionData } from '../../composables/useChat/useChat.model';
import BaseLoader from '../../components/BaseLoader'
import BaseCard from '../../components/BaseCard';
import DigitalClock from '../../components/DigitalClock'
const regex = /```([a-zA-Z]*)\n([\s\S]*?)\n```/g; 
const text = ref<string>('');
const chatHistory = computed<CompletionData[]>(() => useChat().get('chatHistory'));
const displayArea = ref<HTMLElement | null>(null);
const { getChatSessionStatus, postChatCompletion } = useChat();
const isLoading = computed<boolean>(() => useChat().get('isLoading'));

const scrollToBottom = (): void => {
  if(displayArea.value){
    setTimeout(() => displayArea.value!.scrollTop = displayArea.value!.scrollHeight, 100)
  }
}

const onClear = (): void => {
  text.value = '';
}

const onSubmit = async (): Promise<void> => {
  if (text.value.length > 0) {
    await postChatCompletion(text.value);
  }
};

watch(
  (): CompletionData[] => chatHistory.value,
  (data): void => {
    scrollToBottom()
    if (text.value.length > 0) {
      onClear();
    }
    console.log(regex)
    for (let completion of data){
      if(completion.message.content.match(regex)){
        console.log('yes')
      }
    }
    const codeSnippets = data.map((el) => el.message.content.match(regex))
  },
  { deep: true }
)

const onEnter = async (event: KeyboardEvent): Promise<void> => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    await onSubmit();
  }
};

onMounted( async() => {
  await getChatSessionStatus(true)
  useChat().set('sessionId', '1000');
  document.addEventListener('keydown', onEnter);
})

onUnmounted( async() => await getChatSessionStatus(false))
document.removeEventListener('keydown', onEnter);
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
.chat-box {
  background-color: #925a7f;
  min-width: 300px;
  max-width: 90%;
  height: 100%;
  border-radius: 20px;
  border: 2px solid #7d436a;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0 auto;

  &__display {
    width: 100%;
    border-radius: 10px;
    border: solid 2px rgb(230, 160, 90);
    background-color: rgb(242, 186, 130);
    box-shadow: inset 0px 0px 8px rgba(94, 93, 93, 0.834);
    box-sizing: border-box;
    display: flex;
    padding: 10px;
    padding-top: 26px;
    margin-bottom: 10px;
  }

  &__display-area {
    position: relative;
    width: 100%;
    height: 380px;
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

  &__card-wrapper {
    position: relative;
    display: flex;
    flex-direction: row-reverse;
    gap: 0.5rem;
  }

  &__display-msg {
    font-size: 1.1rem;
    color: #e1f4f7;
    font-weight: 500;
    line-height: 95%;
    margin: 0;
    font-family: 'VT323', sans-serif;
    word-wrap: break-word;
    text-align: left;
  }

  &__action {
    width: 100%;
    //height: 150px;
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
    font-size: 1.5rem;
    color: rgb(96, 93, 93);
    outline: none;
    background-color: rgb(246, 240, 234);
    font-weight: 500;
    resize: none;
    padding: 10px;
    font-family: 'VT323', sans-serif;
    margin-bottom: 10px;
    caret-shape: block;
  }

  .btns {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    .btn-1, .btn-2 {
      gap: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 0.875rem;
      padding: .5rem;
      text-align: center;
      transition: transform 0.15s ease-in-out, border 0.15s ease-in-out,
        background-color 0.15s ease-in-out;
      outline: none;
      word-break: break-word;
      height: 40px;
      width: 100px;
      border: none;
      border-radius: 10px;
      box-shadow: 2px 4px 8px hsl(0, 3%, 25%);
      color: #f6f0ea;
      background-color: rgb(74, 71, 68);
      &:active{
        transform: scale(0.9);
      }
      &:disabled {
        transform: scale(1);
      }
    }
  }
}

::-webkit-scrollbar {
  width: 10px;
  background: none;
}
::-webkit-scrollbar-thumb {
  background: hsla(0, 0%, 67%, 0.295); 
  border-radius: 10px;
}
.user-logo{
  margin-left: 2px;
}

.digital-clock{
  position: absolute;
  right: 20px;
  top: 13px;
}

.user {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}


</style>