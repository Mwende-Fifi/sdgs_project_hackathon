'use server';

import { assistantFlow } from '@/ai/flows/assistant-flow';
import { createStreamableValue } from 'ai/rsc';

export async function continueConversation(
  history: { role: 'user' | 'assistant'; content: string }[]
) {
  const stream = createStreamableValue();
  (async () => {
    const { stream: assistantStream } = await assistantFlow({
      history,
    });
    for await (const chunk of assistantStream) {
      stream.update(chunk);
    }
    stream.done();
  })();

  return {
    newMessages: stream.value,
  };
}
