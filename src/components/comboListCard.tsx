/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState, type FC } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '~/utils/api';
import { comboListSchema, type ComboListSchema } from '~/shared/formSchemas';

interface IComboListCardProps {
  id: number;
  title: string;
  refetchComboLists: () => void;
  removeComboList: (id: number) => void;
}

const ComboListCard: FC<IComboListCardProps> = ({
  id,
  title,
  removeComboList,
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
    <section className="flex flex-col items-center justify-between rounded-md border-2 border-purple-500 bg-neutral-800">
      {edit ? (
        <form className="w-full p-5" onSubmit={handleSubmit(onSubmit)}>
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
          <div className="mt-3 flex w-full justify-end">
            <button
              type="button"
              className="mr-3 inline-flex w-full justify-center rounded-sm bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              aria-label={`Edit ${title} combolist`}
              onClick={() => {
                edit &&
                  reset({
                    title,
                  });
                setEdit(!edit);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex w-full justify-center rounded-sm bg-green-600 bg-opacity-80 px-8 py-2 text-sm font-semibold transition-all duration-300 hover:bg-opacity-100 sm:mt-0 sm:w-auto"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
          <Link href={`/combo-list/${id}`} className="h-full w-full p-5 pb-0">
            <h2 className="w-full text-start text-xl font-extrabold tracking-tight text-white sm:text-[1.5rem]">
              {title}
            </h2>
          </Link>
          <div className="mt-5 flex w-full flex-row justify-end p-5 pt-0">
            <button
              className="mr-3 rounded-sm border border-red-600 bg-transparent px-5 text-sm transition-all duration-200 hover:bg-red-600"
              aria-label={`Delete ${title} combolist`}
              onClick={() => removeComboList(id)}
            >
              Delete
            </button>
            <button
              className="rounded-sm border border-yellow-600 bg-transparent py-1 px-5 transition-all duration-200 hover:bg-yellow-600"
              aria-label={`Edit ${title} combolist`}
              onClick={() => setEdit(!edit)}
            >
              Edit
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default ComboListCard;
