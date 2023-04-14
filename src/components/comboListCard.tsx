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
    <section className="flex w-2/4 max-w-md flex-col items-center justify-center rounded-md border-2 border-purple-500 bg-neutral-800">
      {edit ? (
        <form className="w-full p-5" onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="title" className="mb-1 block">
            Title
          </label>
          <input
            className={`${
              errors?.title?.message
                ? 'border-red-500 focus:border-red-500 focus-visible:border-red-500'
                : 'border-white'
            } w-full rounded-md border bg-transparent p-2 text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]`}
            defaultValue={title}
            {...register('title')}
          />
          {errors?.title?.message && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
          <button
            className="mt-3 rounded-md bg-green-600 bg-opacity-80 px-6 py-2 font-bold transition-all duration-300 hover:bg-opacity-100"
            type="submit"
          >
            Save
          </button>
        </form>
      ) : (
        <Link href={`/combo-list/${id}`} className="w-full p-5 pb-0">
          <h2 className="m-2 w-full text-start text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
            {title}
          </h2>
        </Link>
      )}
      <div className="mt-5 flex w-full flex-row p-5 pt-0">
        <button
          className="mr-3 rounded-sm border border-red-600 bg-transparent py-1 px-5 transition-all duration-200 hover:bg-red-600"
          aria-label={`Delete ${title} combolist`}
          onClick={() => removeComboList(id)}
        >
          Delete
        </button>
        {edit ? (
          <button
            className="rounded-sm border border-yellow-600 bg-transparent py-1 px-5 transition-all duration-200 hover:bg-yellow-600"
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
        ) : (
          <button
            className="rounded-sm border border-yellow-600 bg-transparent py-1 px-5 transition-all duration-200 hover:bg-yellow-600"
            aria-label={`Edit ${title} combolist`}
            onClick={() => setEdit(!edit)}
          >
            Edit
          </button>
        )}
      </div>
    </section>
  );
};

export default ComboListCard;
