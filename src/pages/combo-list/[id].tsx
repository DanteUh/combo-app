import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Head from 'next/head';
import ComboForm from '~/components/comboForm';
import ComboCard from '~/components/comboCard';
import { type NextPage } from 'next';
import { type ComboFormSchema } from '~/shared/formSchemas';
import Navbar from '~/components/navbar';

const ComboListPage: NextPage = () => {
  const comboListId = Number(useRouter().query.id);
  const { data: sessionData } = useSession();
  const { data, refetch, isLoading, isError, isRefetchError } =
    api.comboList.getComboList.useQuery({
      id: comboListId,
    });
  const addComboToList = api.combo.addComboToList.useMutation();
  const [isCreatingCombo, setIsCreatingCombo] = useState<boolean>(false);

  const refetchCombos = () => {
    refetch().catch((err: string) =>
      console.error(`Something went wrong when refetching your combos: ${err}`)
    );
  };

  const onSubmit = (data: ComboFormSchema) => {
    addComboToList.mutate(
      {
        title: data.title,
        notation: data.notation,
        notes: data.notes,
        comboListId,
      },
      {
        onSuccess: () => {
          setIsCreatingCombo(false);
          void refetch();
        },
      }
    );
  };

  const renderCombos = data?.combos.map(({ id, title, notation, notes }) => {
    return (
      <ComboCard
        key={id}
        id={id}
        title={title}
        notation={notation}
        notes={notes}
        refetchCombos={refetchCombos}
        comboListId={comboListId}
      />
    );
  });

  return (
    <>
      <Head>
        <title>Combo App</title>
        <meta name="description" content="Combo app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center">
        <div className="container mx-auto flex flex-col items-center gap-10 px-4 py-16">
          <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
            {data?.title}
          </h1>
          <button
            className="rounded-xl bg-green-600 bg-opacity-80 px-8 py-3 font-bold transition-all duration-300 hover:bg-opacity-100"
            onClick={() => setIsCreatingCombo(true)}
          >
            Add Combo
          </button>
          {isCreatingCombo && (
            <ComboForm onSubmit={onSubmit} setIsCreating={setIsCreatingCombo} />
          )}
          {sessionData?.user ? (
            <>{renderCombos}</>
          ) : sessionData?.user && isLoading ? (
            <div>Loading combolists...</div>
          ) : isError || isRefetchError ? (
            <div>An Error occured fetching combos</div>
          ) : (
            ''
          )}
        </div>
      </main>
    </>
  );
};

export default ComboListPage;
