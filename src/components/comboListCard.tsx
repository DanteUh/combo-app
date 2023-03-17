import Link from 'next/link';
import { useState, type FC } from 'react';

interface IComboListCardProps {
  id: number;
  title: string;
  removeComboList: (id: number) => void;
}

const ComboListCard: FC<IComboListCardProps> = ({
  id,
  title,
  removeComboList,
}) => {
  const [edit, setEdit] = useState<boolean>(false);

  return (
    <section className="flex w-2/4 max-w-md flex-col items-center justify-center rounded-md border-2 border-purple-500 bg-neutral-800">
      {edit ? (
        <div className="w-full p-5">
          <input
            className="w-full rounded-md border border-white bg-transparent p-2 text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]"
            defaultValue={title}
          />
        </div>
      ) : (
        <Link href={`/combo-list/${id}`} className="w-full p-5 pb-0">
          <h2 className="m-2 w-full text-start text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]">
            {title}
          </h2>
        </Link>
      )}
      <div className="mt-5 flex w-full flex-row justify-between p-5 pt-0">
        <button
          className="rounded-sm border border-red-600 bg-transparent py-1 px-5 transition-all duration-200 hover:bg-red-600"
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
    </section>
  );
};

export default ComboListCard;
