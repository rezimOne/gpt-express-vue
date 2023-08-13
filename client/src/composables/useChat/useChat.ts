import { reactive } from 'vue';
import axios from 'axios';
import { Chat, ChatContext, Completion, CompletionData } from './useChat.model';

const state = reactive<Chat>({
  sessionStatus: undefined,
  sessionId: null,
  chatHistory: []
})

export default function useChat(){
  const set = <T extends keyof(Chat)>(parameter: T, value: Chat[T]) => {
    state[parameter] = value;
  }
  const get = <T extends keyof(Chat)>(parameter: T) => {
    return state[parameter];
  }

  const _saveUserPromptToChatHistory = (text: any): void => {
    const user = {
      sessionId: state.sessionId,
      id: 'user_id',
      created: Date.now(),
      message: {
        content: text,
        role: 'user'
      },
    }
    state.chatHistory.push(user)
    console.log(`%c 👤 ${ text }`, 'color: #6D8ED4');
  }

  const _saveChatAnswerToChatHistory = (response: Completion): void => {
    const chat = {
      sessionId: state.sessionId,
      ...response,
      created: Date.now(),
    }
    state.chatHistory.push(chat)
    console.log(`%c 🤖 ${ response.message.content }`, 'color: #F4B10A');
  }

  const setChatContext = (): ChatContext[] => {
    return state.chatHistory?.map((item: CompletionData) => item.message);
  }
  
  const postChatCompletion = async (text: string): Promise<void> => {
    try {
      _saveUserPromptToChatHistory(text);

      const body = {
        text: text,
        chatContext: setChatContext()
      }

      const response = await axios({
        method: 'POST',
        url: 'http://localhost:4000/chat/chat-completion',
        headers: {
        ' Content-Type': 'application/json'
        },
        params: body
      });

      if (response && response.status === 200) {
        _saveChatAnswerToChatHistory(response.data.completion);
      }
    } catch(e) {
      console.log(e);
    }
  };

  const getChatSessionStatus = async (payload: boolean): Promise<void> => {
    try{
      const response = await axios({
        method: 'GET',
        url: 'http://localhost:4000/chat/session-status',
        params: {
          sessionStatus: payload
        }
      });
      if (response.status === 200) {
        state.sessionStatus = response.data;
      }
    } catch (err){
      console.error(err);
    }
  }

  return {
    set,
    get,
    getChatSessionStatus,
    setChatContext,
    postChatCompletion
  }
}