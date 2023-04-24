import { useState, type FC } from 'react';
import { z } from 'zod';
import { api } from '~/utils/api';
import ComboForm from './comboForm';

interface IComboCardProps {
  id: number;
  title: string;
  notation: string | null;
  notes: string | null;
  comboListId: number;
  refetchCombos: () => void;
}

const schema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  notation: z.string().min(1, { message: 'Notation is required' }),
  notes: z.string(),
});

type Schema = z.infer<typeof schema>;

const ComboCard: FC<IComboCardProps> = ({
  id,
  title,
  notation,
  notes,
  refetchCombos,
}) => {
  const removeCombo = api.combo.removeCombo.useMutation();
  const updateCombo = api.combo.updateCombo.useMutation();
  const [edit, setEdit] = useState<boolean>(false);

  const onSubmit = (data: Schema) => {
    updateCombo.mutate(
      {
        id,
        title: data.title,
        notation: data.notation,
        notes: data.notes,
      },
      {
        onSuccess: () => {
          setEdit(false);
          refetchCombos();
        },
      }
    );
  };

  return (
    <>
      {!edit ? (
        <div className="w-full border-y border-y-white bg-neutral-800/60 p-5">
          <h2 className="mb-5 w-full text-xl font-extrabold tracking-tight text-white sm:text-[1.5rem]">
            {title}
          </h2>
          <p className="text-lg font-bold">{notation}</p>
          {notes && (
            <p className="mt-3 font-extralight">
              <i>Notes: {notes}</i>
            </p>
          )}
          <div className="mt-5 flex w-full flex-row pt-0">
            <button
              className="mr-3 rounded-sm border border-red-600 bg-transparent py-1 px-5 transition-all duration-200 hover:bg-red-600"
              aria-label={`Delete ${title} combolist`}
              onClick={() =>
                removeCombo.mutate(
                  { id },
                  {
                    onSuccess: () => {
                      refetchCombos();
                    },
                  }
                )
              }
            >
              Delete
            </button>
            {edit ? (
              <button
                className="rounded-sm border border-yellow-600 bg-transparent py-1 px-5 transition-all duration-200 hover:bg-yellow-600"
                aria-label={`Edit ${title} combolist`}
                onClick={() => {
                  edit && setEdit(!edit);
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
        </div>
      ) : (
        <ComboForm
          onSubmit={onSubmit}
          setIsCreating={setEdit}
          defaultValues={{
            title,
            notation,
            notes,
          }}
        />
      )}
    </>
  );
};

export default ComboCard;
