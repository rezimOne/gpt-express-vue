import { RequestHandler } from 'express';
import { OpenAIApi } from 'openai';
import { COMPLETION_SETTINGS, CHATMODEL, CONFIGURATION, completionModel} from '../assets/utils';

export const getChatSessionStatus: RequestHandler = async (req, res, next) => {
  const sessionStatus =  req.query.sessionStatus;
  console.log(sessionStatus)
  return res.status(200).json({
    isSessionOpen: sessionStatus
  });
}

export const postChatCompletion: RequestHandler = async (req, res, next) => {
  const openai = new OpenAIApi(CONFIGURATION);
  const text = req.query.text;
  const chatContext = req.query.chatContext;
  const prompt = `${ text }`;

  console.log('chatContext: ', chatContext);

  try {
    if (COMPLETION_SETTINGS) {
      if (prompt === null) {
        console.log('no prompt provided');
        return;
      }
      const response = await openai.createChatCompletion({
        model: CHATMODEL!,
        ...COMPLETION_SETTINGS,
        messages: chatContext as []
      });

      const completion = completionModel(response);
      //console.log('chat message: ', completion.message?.content);
      return res.status(200).json({
        completion: completion,
      });
    }
  } catch (err: any) {
      console.log(err);
  }
}

