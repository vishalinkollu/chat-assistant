import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    activeJobs: {},
    isTyping: false,
    error: null,
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    updateMessage(state, action) {
      const i = state.messages.findIndex(m => m.id === action.payload.id);
      if (i !== -1) state.messages[i] = action.payload;
    },
    setTyping(state, action) {
      state.isTyping = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  addMessage,
  updateMessage,
  setTyping,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;
