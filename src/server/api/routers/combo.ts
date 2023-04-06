import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';

export const comboRouter = createTRPCRouter({
  addComboToList: publicProcedure
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

  updateCombo: publicProcedure
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

  removeCombo: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.combo.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
