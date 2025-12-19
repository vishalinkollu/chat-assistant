import { v4 as uuid } from 'uuid';
import { pollJob, postChat } from '../../api/mockApi';
import {
    addMessage,
    setError,
    setTyping,
    updateMessage,
} from './chatSlice';

/**
 * Send user message and handle assistant response
 */
export const sendMessage = (text) => async (dispatch) => {
  // 1Add user message immediately
  dispatch(
    addMessage({
      id: uuid(),
      role: 'user',
      content: text,
    })
  );

  dispatch(setTyping(true));

  try {
    //  Call mock API
    const response = await postChat(text);

    //  TEXT RESPONSE (no polling)
    if (response.type === 'text') {
      dispatch(
        addMessage({
          id: uuid(),
          role: 'assistant',
          content: response.content, 
        })
      );

      dispatch(setTyping(false));
      return;
    }

    //  IMAGE or DATA RESPONSE (polling required)
    const messageId = uuid();

    dispatch(
      addMessage({
        id: messageId,
        role: 'assistant',
        content: response.content, 
        loading: true,
      })
    );

    dispatch(startPolling(response.jobId, messageId));
  } catch (error) {
    dispatch(setTyping(false));
    dispatch(
      addMessage({
        id: uuid(),
        role: 'assistant',
        content: '❌ Something went wrong. Please try again.',
      })
    );
    dispatch(setError(error.message));
  }
};

/**
 * Polling logic with retry + failure handling
 */
const startPolling = (jobId, messageId) => async (dispatch) => {
    let retries = 0;
    const MAX_RETRIES = 3;
  
    const interval = setInterval(async () => {
      try {
        const res = await pollJob(jobId);
  
        // Update progress message
        if (res.status === 'pending') {
          dispatch(
            updateMessage({
              id: messageId,
              role: 'assistant',
              content: `Processing data… ${res.progress}%`,
              loading: true,
            })
          );
        }
  
        // Completed
        if (res.status === 'complete') {
          dispatch(
            updateMessage({
              id: messageId,
              role: 'assistant',
              content: res.result,
              loading: false,
            })
          );
          dispatch(setTyping(false));
          clearInterval(interval);
        }
      } catch (error) {
        retries += 1;
  
        if (retries >= MAX_RETRIES) {
          dispatch(
            updateMessage({
              id: messageId,
              role: 'assistant',
              content:
                '❌ Data processing failed after multiple attempts. Please try again.',
              loading: false,
            })
          );
          dispatch(setTyping(false));
          clearInterval(interval);
        }
      }
    }, 2000);
  };
  
