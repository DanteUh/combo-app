import { type NextPage } from 'next';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import Dashboard from '~/components/dashboard';

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="Combo App" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {sessionData?.user.id && <Dashboard userId={sessionData.user.id} />}
      {sessionData === null && (
        <main className="flex min-h-screen flex-col items-center">
          <div className="container relative flex h-screen flex-col items-center justify-center gap-10 px-4 py-16">
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
              Combo Collection App
            </h1>
            <p className="mb-6 text-lg">
              Create and save your personal combos for your favourite fighting
              games
            </p>
            <button
              className="rounded-lg bg-indigo-700 px-24 py-2 font-semibold text-white no-underline transition hover:bg-indigo-600"
              onClick={() => void signIn('discord')}
            >
              Sign in
            </button>
          </div>
        </main>
      )}
    </>
  );
};

export default Home;
