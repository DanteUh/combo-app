/* eslint-disable @typescript-eslint/no-misused-promises */
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { type NextPage } from 'next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import Head from 'next/head';
import ComboForm from '~/components/comboForm';
import ComboCard from '~/components/comboCard';
import Navbar from '~/components/navbar';
import {
  comboListSchema,
  type ComboListSchema,
  type ComboFormSchema,
} from '~/shared/formSchemas';
import DeleteModal from '~/components/deleteModal';

const ComboListPage: NextPage = () => {
  const comboListId = Number(useRouter().query.id);
  const { data: sessionData } = useSession();
  const { data, refetch, isLoading, isError, isRefetching, isRefetchError } =
    api.comboList.getComboList.useQuery({
      id: comboListId,
    });
  const addComboToList = api.combo.addComboToList.useMutation();
  const upDateComboList = api.comboList.updateComboList.useMutation();
  const apiRemoveCombo = api.combo.removeCombo.useMutation();

  const [isCreatingCombo, setIsCreatingCombo] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<boolean>();
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [activeCombo, setActiveCombo] = useState<{ title: string; id: number }>(
    {
      title: '',
      id: 0,
    }
  );
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

  const removeCombo = (id: number) => {
    apiRemoveCombo.mutate(
      { id },
      {
        onSuccess: () => {
          refetchCombos();
        },
      }
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

  const toggleModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const renderCombos = data?.combos.map(({ id, title, notation, notes }) => {
    return (
      <ComboCard
        key={id}
        id={id}
        title={title}
        notation={notation}
        notes={notes}
        deleteHandler={(e) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          e.preventDefault();
          setActiveCombo({ title, id });
          toggleModal();
        }}
        refetchCombos={refetchCombos}
        comboListId={comboListId}
      />
    );
  });

  return (
    <>
      <Head>
        <title>Combo App - {data?.title}</title>
        <meta name={data?.title} content="Combo app" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Navbar />
      <DeleteModal
        title={activeCombo.title}
        id={activeCombo.id}
        isOpen={openDeleteModal}
        toggleModal={toggleModal}
        removeItemHandler={removeCombo}
      />
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
                    type="submit"
                    className="mr-3 rounded-md bg-green-600 bg-opacity-80 px-5 py-2 font-bold transition-all duration-300 hover:bg-opacity-100"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
                </div>
              </form>
            ) : (
              <>
                <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-left sm:text-[3rem] md:mb-5">
                  {data && !(isLoading || isRefetching)
                    ? data?.title
                    : 'Loading...'}
                </h1>
                {/* <button
                  className="rounded-sm border border-white bg-transparent py-1 px-10 transition-all duration-200 hover:bg-white/20"
                  aria-label={`Edit combolist title`}
                  onClick={() => setEditTitle(true)}
                >
                  Edit
                </button> */}
              </>
            )}
          </div>
          <div>
            <button
              className="mb-5 w-full rounded-sm border-2 border-white bg-transparent py-2 px-10 transition-all duration-200 hover:bg-white/10 sm:w-fit"
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
            {sessionData?.user && !(isLoading || isRefetching) ? (
              <div className="flex w-full flex-col gap-3">{renderCombos}</div>
            ) : sessionData?.user && (isLoading || isRefetching) ? (
              <p>Loading combos...</p>
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
