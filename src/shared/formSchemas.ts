import { z } from 'zod';

export const comboListSchema = z.object({
  title: z.string().min(1, { message: 'Required' }),
});

export type ComboListSchema = z.infer<typeof comboListSchema>;

export const comboFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  notation: z.string().min(1, { message: 'Notation is required' }),
  notes: z.string(),
});

export type ComboFormSchema = z.infer<typeof comboFormSchema>;
