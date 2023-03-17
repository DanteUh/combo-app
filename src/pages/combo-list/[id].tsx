import { NextPage } from 'next';
import { useRouter } from 'next/router';

const ComboListPage: NextPage = () => {
  const router = useRouter();

  // Display combos for the list

  return (
    <main className="h-full">
      <p>Combo list page with id of {router.query.id}</p>
    </main>
  );
};

export default ComboListPage;
