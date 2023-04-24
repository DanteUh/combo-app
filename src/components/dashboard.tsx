import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import ComboListCard from '~/components/comboListCard';
import AddComboListForm from '~/components/addComboListForm';
import Navbar from '~/components/navbar';

const Dashboard = ({ userId }: { userId: string }) => {
  const sessionData = useSession();
  const [isCreatingList, setIsCreatingList] = useState<boolean>(false);

  const apiDeleteComboList = api.comboList.removeComboList.useMutation();
  const { data, isLoading, isError, refetch, isRefetchError } =
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

  const renderComboLists = data?.map(({ id, title }) => {
    return (
      <ComboListCard
        key={id}
        id={id}
        title={title}
        refetchComboLists={refetchComboLists}
        removeComboList={removeComboList}
      />
    );
  });

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <div className="container relative mx-auto flex max-w-7xl flex-col gap-10 px-4 pt-8 sm:px-6 lg:px-8">
          <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-white sm:text-[3rem]">
            Combo Lists
          </h1>
          <div>
            <button
              className="mb-5 rounded-sm border-2 border-white bg-transparent py-2 px-10 transition-all duration-200 hover:bg-white/10"
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
            {sessionData ? (
              <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {renderComboLists}
              </div>
            ) : sessionData && isLoading ? (
              <div>Loading combolists...</div>
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
