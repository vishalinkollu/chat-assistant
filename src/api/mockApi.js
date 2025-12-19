import { v4 as uuid } from 'uuid';

const jobs = {};
const delay = (ms) => new Promise((res) => setTimeout(res, ms));


export const postChat = async (message) => {
  await delay(800);

  // Simulate random network failure (10%)
  if (Math.random() < 0.1) {
    throw new Error('Network error. Please try again.');
  }

  const lower = message.toLowerCase().trim();

  // GREETING
  if (
    lower === 'hello' ||
    lower === 'hi' ||
    lower === 'hey' ||
    lower.includes('good morning') ||
    lower.includes('good evening')
  ) {
    return {
      type: 'text',
      content: {
        answer: 'Hello! 👋 How can I help you today?',
        source: 'greeting',
        suggestions: [
          'What is Redux?',
          'Generate a random image',
          'Process sample data',
        ],
      },
    };
  }

  // KNOWLEDGE QUESTIONS (TEXT)
  if (
    lower.includes('redux') ||
    lower.includes('thunk') ||
    lower.includes('explain redux') ||
    lower.includes('what is redux')
  ) {
    return {
      type: 'text',
      content: {
        answer:
          'Redux Thunk allows you to write async logic that interacts with the Redux store. It lets actions return functions instead of plain objects.',
        source: 'internal-knowledge',
      },
    };
  }

  // IMAGE GENERATION 
  if (lower.includes('image') || lower.includes('generate')) {
    const jobId = uuid();
    jobs[jobId] = { progress: 0, type: 'image' };

    return {
      type: 'image',
      jobId,
      content: 'Generating image…',
    };
  }

  // DATA PROCESSING
  if (
    lower.includes('process sample data') ||
    lower.includes('process data')
  ) {
    const jobId = uuid();
    jobs[jobId] = { progress: 0, type: 'data' };

    return {
      type: 'data',
      jobId,
      content: 'Processing data…',
    };
  }

  // FALLBACK — UNKNOWN QUESTION
  console.warn('[Unknown Question]', message);

  return {
    type: 'text',
    content: {
      answer: 'No answers found for this question.',
      source: 'fallback',
      suggestions: [
        'What is Redux?',
        'Generate a random image',
        'Process sample data',
      ],
    },
  };
};

/**
 * Simulates GET /poll/:jobId
 */
export const pollJob = async (jobId) => {
  await delay(600);

  // Simulate polling failure (5%)
  if (Math.random() < 0.05) {
    throw new Error('Job failed during processing.');
  }

  if (!jobs[jobId]) {
    throw new Error('Invalid job ID');
  }

  jobs[jobId].progress += 25;

  if (jobs[jobId].progress >= 100) {
    const result =
      jobs[jobId].type === 'image'
        ? 'https://picsum.photos/300'
        : {
            status: 'done',
            recordsProcessed: 1200,
            successRate: '98.4%',
            averageLatencyMs: 183,
            processedAt: new Date().toISOString(),
          };

    delete jobs[jobId];
    return { status: 'complete', result };
  }

  return { status: 'pending', progress: jobs[jobId].progress };
};
