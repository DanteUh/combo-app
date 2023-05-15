import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface IDeleteModal {
  title: string;
  id: number;
  isOpen: boolean;
  toggleModal: () => void;
  removeItemHandler: (id: number) => void;
}

export default function DeleteModal({
  title,
  id,
  isOpen,
  toggleModal,
  removeItemHandler,
}: IDeleteModal) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggleModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl border border-white bg-neutral-800 p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-white"
                >
                  Delete
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-md text-white">
                    Are you sure you want to delete:
                  </p>
                  <p>
                    <b>{title}</b>
                  </p>
                </div>
                <div className="mt-4 flex flex-row">
                  <button
                    type="button"
                    className="mr-3 inline-flex w-full justify-center rounded-sm bg-red-600 px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700 sm:mt-0 sm:w-auto"
                    onClick={() => {
                      toggleModal();
                      removeItemHandler(id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="mr-3 inline-flex w-full justify-center rounded-sm bg-white px-5 py-2 text-sm font-semibold text-gray-900 transition-all duration-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    aria-label={`Edit ${title} combolist`}
                    onClick={() => {
                      toggleModal();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
