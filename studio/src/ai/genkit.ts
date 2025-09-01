/**
 * @fileoverview This file initializes the Genkit AI singleton with the Google AI plugin.
 * It ensures that the AI client is configured and ready for use throughout the application.
 */

import { genkit, Ai } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

export const ai: Ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
