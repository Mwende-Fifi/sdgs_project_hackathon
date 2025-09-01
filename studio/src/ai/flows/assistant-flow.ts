/**
 * @fileoverview A health assistant flow that can answer questions about healthcare services in Kenya.
 *
 * This file defines a Genkit flow that acts as a health assistant. It's designed to
 * understand user queries in natural language, provide helpful information, and
 * guide users to the right type of healthcare facility based on their needs.
 *
 * The flow uses a predefined prompt and is set up to be streamable for real-time
 * interaction in a chat interface.
 */
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const HealthAssistantInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'assistant']),
      content: z.string(),
    })
  ),
});

const AssistantPrompt = ai.definePrompt({
  name: 'healthAssistantPrompt',
  input: { schema: HealthAssistantInputSchema },
  prompt: `You are HealthPoint, a friendly and helpful AI assistant for a service that helps people in Kenya find healthcare facilities. Your goal is to guide users to the right type of service based on their needs.

You have knowledge of the following service types:
- Hospitals: For general medical needs, emergencies, surgery, and specialized care like maternity or pediatrics.
- Clinics: For primary care, check-ups, immunizations, and family planning.
- Mental Health: For counseling, psychiatric care, and mental wellness support.
- Programs: For community health initiatives, education, and preventive care.
- Pharmacies: For getting prescription drugs and medical supplies.

Conversation History:
{{#each history}}
- {{role}}: {{content}}
{{/each}}

Based on the conversation history, provide a helpful and reassuring response.
- If the user describes a medical issue, gently suggest the most appropriate service type(s) and explain why.
- If the user asks a general question about healthcare, provide a clear and concise answer.
- Keep your responses brief and easy to understand.
- Always be empathetic and supportive.
- Do not diagnose medical conditions. Instead, suggest the user consult a professional at a specific type of facility.
- Your response should be in plain text, not JSON.`,
});

export const assistantFlow = ai.defineFlow(
  {
    name: 'assistantFlow',
    inputSchema: HealthAssistantInputSchema,
    outputSchema: z.any(),
  },
  async (input) => {
    const { stream, response } = await AssistantPrompt.stream(input);
    
    const outputStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          controller.enqueue(chunk.text);
        }
        controller.close();
      },
    });

    return { stream: outputStream, response: response };
  }
);
