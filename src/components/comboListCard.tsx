/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '~/utils/api';
import { comboListSchema, type ComboListSchema } from '~/shared/formSchemas';
import ComboListMenu from './comboListMenu';

interface IComboListCardProps {
  id: number;
  title: string;
  toggleModal: () => void;
  setActiveList: (title: string, id: number) => void;
  refetchComboLists: () => void;
}

const ComboListCard: FC<IComboListCardProps> = ({
  id,
  title,
  toggleModal,
  setActiveList,
  refetchComboLists,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ComboListSchema>({
    resolver: zodResolver(comboListSchema),
  });
  const updateComboList = api.comboList.updateComboList.useMutation();

  const onSubmit = (data: ComboListSchema) => {
    updateComboList.mutate(
      { title: data.title, id },
      {
        onSuccess: () => {
          setEdit(false);
          refetchComboLists();
        },
      }
    );
  };

  return (
    <>
      {edit ? (
        <form
          className="flex w-full flex-col items-start justify-between rounded-3xl border-2 border-purple-500 bg-neutral-800 p-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="title" className="mb-1 block">
            Title
          </label>
          <textarea
            rows={2}
            className={`${
              errors?.title?.message
                ? 'border-red-500 focus:border-red-500 focus-visible:border-red-500'
                : 'border-white'
            } w-full rounded-md border bg-transparent p-2 tracking-tight text-white`}
            defaultValue={title}
            {...register('title')}
          />
          {errors?.title?.message && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <div className="mt-5 flex w-full">
            <button
              type="submit"
              className="mr-3 inline-flex w-1/2 justify-center rounded-sm bg-green-600 bg-opacity-80 px-8 py-2 text-sm font-semibold transition-all duration-300 hover:bg-opacity-100 sm:mt-0 sm:w-auto"
            >
              Save
            </button>
            <button
              type="button"
              className="inline-flex w-1/2 justify-center rounded-sm bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              aria-label={`Edit ${title} combolist`}
              onClick={(e) => {
                e.preventDefault();
                edit &&
                  reset({
                    title,
                  });
                setEdit(!edit);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <Link
          href={`/combo-list/${id}`}
          className="rounded-3xl border-2 border-purple-500 bg-neutral-800 p-5 hover:border-orange-500 hover:bg-neutral-800/90"
        >
          <div className="flex h-fit flex-row items-center justify-between">
            <h2 className="flex h-fit w-9/12 whitespace-pre-line pb-0 text-start text-xl font-extrabold tracking-tight text-white sm:text-[1.5rem]">
              {title}
            </h2>
            <div className="ml-5 flex flex-row justify-end pt-0">
              <ComboListMenu
                editHandler={(e) => {
                  e.preventDefault();
                  setEdit(!edit);
                }}
                deleteHandler={(e) => {
                  e.preventDefault();
                  setActiveList(title, id);
                  toggleModal();
                }}
              />
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default ComboListCard;
