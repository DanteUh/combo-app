import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: input.id
      }
    })
  }),

  // For Auth, leave be atm
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
