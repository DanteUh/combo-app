import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';

export const comboRouter = createTRPCRouter({
  addComboToList: protectedProcedure
    .input(
      z.object({
        comboListId: z.number().int(),
        title: z.string(),
        notation: z.string(),
        notes: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.combo.create({
        data: {
          comboListId: input.comboListId,
          title: input.title,
          notation: input.notation,
          notes: input.notes,
        },
      });
    }),

  updateCombo: protectedProcedure
    .input(
      z.object({
        id: z.number().int(),
        title: z.string(),
        notation: z.string(),
        notes: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.combo.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          notation: input.notation,
          notes: input.notes,
        },
      });
    }),

  removeCombo: protectedProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.combo.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
