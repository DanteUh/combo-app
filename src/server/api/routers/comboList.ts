import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const comboListRouter = createTRPCRouter({
  getComboLists: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ input, ctx }) => {
    return ctx.prisma.comboList.findMany({
      include: {
        combos: true
      },
      where: {
        userId: {
          equals: input.userId
        }
      }
    });
  }),

  // Needs to be protected route in the future
  removeComboList: publicProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.comboList.delete({
        where: {
          id: input.id
        }
      })
    }
  )
});
