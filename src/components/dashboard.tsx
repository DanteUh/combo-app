import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import ComboListCard from '~/components/comboListCard';
import AddComboListForm from '~/components/addComboListForm';
import Navbar from '~/components/navbar';
import DeleteModal from './deleteModal';

const Dashboard = ({ userId }: { userId: string }) => {
  const sessionData = useSession();
  const [isCreatingList, setIsCreatingList] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [activeList, setActiveList] = useState<{ title: string; id: number }>({
    title: '',
    id: 0,
  });

  const apiDeleteComboList = api.comboList.removeComboList.useMutation();
  const { data, isLoading, isError, refetch, isRefetching, isRefetchError } =
    api.comboList.getComboLists.useQuery({
      userId,
    });

  const removeComboList = (id: number) => {
    apiDeleteComboList.mutate(
      { id },
      {
        onSuccess: () => {
          refetchComboLists();
        },
      }
    );
  };

  const refetchComboLists = () => {
    refetch().catch((err: string) =>
      console.error(`Something went wrong when refetching combo lists: ${err}`)
    );
  };

  const toggleModal = () => {
    setOpenDeleteModal(!openDeleteModal);
  };

  const setList = (title: string, id: number) => {
    setActiveList({
      title,
      id,
    });
  };

  const renderComboLists = data?.map(({ id, title }) => {
    return (
      <ComboListCard
        key={id}
        id={id}
        title={title}
        setActiveList={setList}
        toggleModal={toggleModal}
        refetchComboLists={refetchComboLists}
      />
    );
  });

  return (
    <>
      <Navbar />
      <DeleteModal
        title={activeList.title}
        id={activeList.id}
        isOpen={openDeleteModal}
        toggleModal={toggleModal}
        removeItemHandler={removeComboList}
      />
      <main className="flex min-h-fit flex-col">
        <div className="container relative mx-auto flex max-w-7xl flex-col gap-10 px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-left sm:text-[3rem] md:mb-5">
            Combo Lists
          </h1>
          <div className="flex w-full flex-col">
            <button
              className="mb-5 w-full rounded-sm border-2 border-white bg-transparent py-2 px-10 transition-all duration-200 hover:bg-white/10 sm:w-1/3 lg:w-1/5"
              onClick={() => setIsCreatingList(true)}
            >
              Add list +
            </button>
            {isCreatingList && (
              <AddComboListForm
                userId={userId}
                refetchComboLists={refetchComboLists}
                setIsCreatingList={setIsCreatingList}
              />
            )}
            {sessionData && !(isLoading || isRefetching) ? (
              <div className="lg:grid-cols grid grid-cols-1 gap-5 pb-20 sm:grid-cols-2 md:grid-cols-3">
                {renderComboLists}
              </div>
            ) : sessionData && (isLoading || isRefetching) ? (
              <p>Loading lists...</p>
            ) : isError || isRefetchError ? (
              <div>An Error occured!</div>
            ) : (
              ''
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
