import { comboRouter } from './routers/combo';
import { createTRPCRouter } from '~/server/api/trpc';
import { userRouter } from '~/server/api/routers/user';
import { comboListRouter } from '~/server/api/routers/comboList';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  comboList: comboListRouter,
  combo: comboRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
