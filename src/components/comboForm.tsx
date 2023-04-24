/* eslint-disable @typescript-eslint/no-misused-promises */
import { type FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { comboFormSchema, type ComboFormSchema } from '~/shared/formSchemas';

interface IAddComboForm {
  defaultValues?: {
    title: string;
    notation: string | null;
    notes: string | null;
  };
  setIsCreating: (show: boolean) => void;
  onSubmit: (data: any) => void;
}

const ComboForm: FC<IAddComboForm> = ({
  setIsCreating,
  defaultValues,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComboFormSchema>({
    resolver: zodResolver(comboFormSchema),
  });
  const formTitle = defaultValues?.title
    ? defaultValues.title
    : 'Add new combo';

  return (
    <form
      className="mb-3 flex w-full flex-col items-start
      justify-center border-2 border-cyan-600 bg-neutral-800/60 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-5 flex w-full flex-col justify-start">
        <h2 className="mb-5 w-full text-xl font-extrabold tracking-tight text-white sm:text-[1.5rem]">
          {formTitle}
        </h2>
        <div className="mb-5">
          <label htmlFor="title" className="mb-2 block">
            Title*
          </label>
          <input
            type="text"
            id="title"
            defaultValue={defaultValues?.title ? defaultValues?.title : ''}
            placeholder="Title"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-base text-neutral-800 outline-none focus:border-2"
            aria-required
            {...register('title')}
          />
          {errors.title?.message && (
            <p className="text-red-400">{errors.title?.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="notation" className="mb-2 block">
            Notation*
          </label>
          <textarea
            rows={3}
            id="notation"
            defaultValue={
              defaultValues?.notation ? defaultValues?.notation : ''
            }
            placeholder="Notation"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-base text-neutral-800 outline-none focus:border-2"
            aria-required
            {...register('notation')}
          />
          {errors.notation?.message && (
            <p className="text-red-400">{errors.notation?.message}</p>
          )}
        </div>
        <label htmlFor="notes" className="mb-2 block">
          Notes
        </label>
        <input
          type="text"
          id="notes"
          defaultValue={defaultValues?.notes ? defaultValues?.notes : ''}
          placeholder="Notes"
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-3 text-base text-neutral-800 outline-none focus:border-2"
          {...register('notes')}
        />
      </div>
      <div className="mt-3">
        <button
          type="button"
          className="mr-3 inline-flex w-full justify-center rounded-md bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={() => setIsCreating(false)}
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
  );
};

export default ComboForm;
