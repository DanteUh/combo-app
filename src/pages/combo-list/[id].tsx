/* eslint-disable @typescript-eslint/no-misused-promises */
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

import Head from 'next/head';
import ComboForm from '~/components/comboForm';
import ComboCard from '~/components/comboCard';
import { type NextPage } from 'next';
import Navbar from '~/components/navbar';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  comboListSchema,
  type ComboFormSchema,
  ComboListSchema,
} from '~/shared/formSchemas';
import { useForm } from 'react-hook-form';

const ComboListPage: NextPage = () => {
  const comboListId = Number(useRouter().query.id);
  const { data: sessionData } = useSession();
  const { data, refetch, isLoading, isError, isRefetchError } =
    api.comboList.getComboList.useQuery({
      id: comboListId,
    });
  const addComboToList = api.combo.addComboToList.useMutation();
  const upDateComboList = api.comboList.updateComboList.useMutation();
  const [isCreatingCombo, setIsCreatingCombo] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<boolean>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComboListSchema>({
    resolver: zodResolver(comboListSchema),
  });

  const refetchCombos = () => {
    refetch().catch((err: string) =>
      console.error(`Something went wrong when refetching your combos: ${err}`)
    );
  };

  const onSubmitTitle = (data: ComboListSchema) => {
    upDateComboList.mutate(
      { title: data.title, id: comboListId },
      {
        onSuccess: () => {
          setEditTitle(false);
          void refetch();
        },
      }
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
        <div className="container relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-8 sm:px-6 lg:px-8">
          <div>
            {editTitle ? (
              <form onSubmit={handleSubmit(onSubmitTitle)}>
                <input
                  type="text"
                  id="title"
                  placeholder="List Title"
                  className="w-full border-b border-b-white bg-transparent py-2 px-3 text-3xl font-extrabold tracking-tight text-white outline-none focus:border-2 sm:text-[3rem]"
                  defaultValue={data?.title}
                  required
                  aria-required
                  {...register('title')}
                />
                {errors.title?.message && (
                  <p className="text-red-400">{errors.title?.message}</p>
                )}
                <div className="mt-3">
                  <button
                    type="button"
                    className="mr-3 inline-flex w-full justify-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      editTitle &&
                        reset({
                          title: data?.title,
                        });
                      setEditTitle(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-green-600 bg-opacity-80 px-5 py-2 font-bold transition-all duration-300 hover:bg-opacity-100"
                  >
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
                  {data?.title}
                </h1>
                <button
                  className="rounded-sm border border-white bg-transparent py-1 px-10 transition-all duration-200 hover:bg-white/20"
                  aria-label={`Edit combolist title`}
                  onClick={() => setEditTitle(true)}
                >
                  Edit
                </button>
              </>
            )}
          </div>
          <div>
            <button
              className="mb-5 rounded-sm border-2 border-white bg-transparent py-2 px-10 transition-all duration-200 hover:bg-white/10"
              onClick={() => setIsCreatingCombo(true)}
            >
              Add Combo +
            </button>
            {isCreatingCombo && (
              <ComboForm
                onSubmit={onSubmit}
                setIsCreating={setIsCreatingCombo}
              />
            )}
            {sessionData?.user ? (
              <div className="flex w-full flex-col gap-3">{renderCombos}</div>
            ) : sessionData?.user && isLoading ? (
              <div>Loading combolists...</div>
            ) : isError || isRefetchError ? (
              <div>An Error occured fetching combos</div>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ComboListPage;
