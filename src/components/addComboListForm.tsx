/* eslint-disable @typescript-eslint/no-misused-promises */
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '~/utils/api';

interface IAddComboListForm {
  userId: string;
  refetchComboLists: () => void;
  setIsCreatingList: (show: boolean) => void;
}

const schema = z.object({
  title: z.string().min(1, { message: 'Required' }),
});

type Schema = z.infer<typeof schema>;

const AddComboListForm: FC<IAddComboListForm> = ({
  setIsCreatingList,
  refetchComboLists,
  userId,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });
  const addComboList = api.comboList.addComboList.useMutation();

  const onSubmit = (data: Schema) => {
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
        <h2 className="text-md mb-2 text-start font-extrabold tracking-tight text-white sm:text-[2rem]">
          New combo list
        </h2>
        <label htmlFor="title" className="mb-3 block">
          List Title*
        </label>
        <input
          type="text"
          id="title"
          placeholder="List Title"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base text-neutral-800 outline-none focus:border-2"
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
          className="mt-3 mr-3 inline-flex w-full justify-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setIsCreatingList(false)}
        >
          Cancel
        </button>
        <button
          className="rounded-md bg-green-600 bg-opacity-80 px-5 py-2 font-bold transition-all duration-300 hover:bg-opacity-100"
          onClick={() => setIsCreatingList(true)}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddComboListForm;
