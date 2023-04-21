/* eslint-disable @typescript-eslint/no-misused-promises */
import { api } from '~/utils/api';
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { comboListSchema, type ComboListSchema } from '~/shared/formSchemas';

interface IAddComboListForm {
  userId: string;
  refetchComboLists: () => void;
  setIsCreatingList: (show: boolean) => void;
}

const AddComboListForm: FC<IAddComboListForm> = ({
  setIsCreatingList,
  refetchComboLists,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComboListSchema>({
    resolver: zodResolver(comboListSchema),
  });
  const addComboList = api.comboList.addComboList.useMutation();

  const onSubmit = (data: ComboListSchema) => {
    addComboList.mutate(
      { title: data.title, userId },
      {
        onSuccess: () => {
          setIsCreatingList(false);
          refetchComboLists();
        },
      }
    );
  };

  return (
    <form
      className="flex w-2/4 max-w-md flex-col items-start justify-center rounded-md border-2 border-purple-500 bg-neutral-800 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-5 flex w-full flex-col justify-start">
        <h2 className="text-md mb-2 text-start font-extrabold tracking-tight text-white sm:text-[1.5rem]">
          New combo list
        </h2>
        <label htmlFor="title" className="mb-3 block">
          List Title*
        </label>
        <input
          type="text"
          id="title"
          placeholder="List Title"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-base text-neutral-800 outline-none focus:border-2"
          required
          aria-required
          {...register('title')}
        />
        {errors.title?.message && (
          <p className="text-red-400">{errors.title?.message}</p>
        )}
      </div>
      <div>
        <button
          type="button"
          className="mr-3 inline-flex w-full justify-center rounded-sm bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setIsCreatingList(false)}
        >
          Cancel
        </button>
        <button
          className="inline-flex w-full justify-center rounded-sm bg-green-600 bg-opacity-80 px-8 py-2 text-sm font-semibold transition-all duration-300 hover:bg-opacity-100 sm:mt-0 sm:w-auto"
          onClick={() => setIsCreatingList(true)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddComboListForm;
