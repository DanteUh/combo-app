import { z } from 'zod';
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';

export const comboListRouter = createTRPCRouter({
  getComboLists: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.comboList.findMany({
        include: {
          combos: true,
        },
        where: {
          userId: {
            equals: input.userId,
          },
        },
      });
    }),

  // Should be protected
  getComboList: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.comboList.findUnique({
        include: {
          combos: true,
        },
        where: {
          id: input.id,
        },
      });
    }),

  addComboList: publicProcedure
    .input(
      z.object({
        title: z.string(),
        userId: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.comboList.create({
        data: {
          userId: input.userId,
          title: input.title,
        },
      });
    }),

  updateComboList: publicProcedure
    .input(
      z.object({
        title: z.string(),
        id: z.number().int(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.comboList.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });
    }),

  // Needs to be protected route in the future
  removeComboList: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.comboList.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
