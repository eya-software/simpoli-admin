import { Transition } from "@headlessui/react";

export default function InfoModal(props) {
  return (
    <Transition
      show={props.isOpen}
      className="fixed z-30 inset-0 h-full overflow-y-auto"
    >
      <div className="flex items-end justify-center min-h-full pt-4 px-4 pb-12 text-center sm:block">
        <Transition.Child
          className="fixed inset-0 transition-opacity"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75" />
        </Transition.Child>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <Transition.Child
          className="w-full inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full"
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
              <button
                type="button"
                onClick={() => props.setOpen(false)}
                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Close</span>
                {/* Heroicon name: x */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <h className="text-lg leading-6 font-medium text-gray-900 p-0">
              {props.title}
            </h>
            {props.children}
          </div>
        </Transition.Child>
      </div>
    </Transition>
    // <Transition.Root show={props.isOpen} as={Fragment}>
    //   <Dialog
    //     as="div"
    //     static
    //     className="fixed z-10 inset-0 overflow-y-auto"
    //     initialFocus={cancelButtonRef}
    //     open={props.isOpen}
    //     onClose={props.setOpen}
    //   >
    //     <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    //       <Transition.Child
    //         as={Fragment}
    //         enter="ease-out duration-300"
    //         enterFrom="opacity-0"
    //         enterTo="opacity-100"
    //         leave="ease-in duration-200"
    //         leaveFrom="opacity-100"
    //         leaveTo="opacity-0"
    //       >
    //         <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    //       </Transition.Child>

    //       <span
    //         className="hidden sm:inline-block sm:align-middle sm:h-screen"
    //         aria-hidden="true"
    //       >
    //         &#8203;
    //       </span>
    //       <Transition.Child
    //         as={Fragment}
    //         enter="ease-out duration-300"
    //         enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //         enterTo="opacity-100 translate-y-0 sm:scale-100"
    //         leave="ease-in duration-200"
    //         leaveFrom="opacity-100 translate-y-0 sm:scale-100"
    //         leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    //       >
    //         <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
    //           <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
    //             <div className="sm:flex sm:items-start">
    //               <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
    //                 <Dialog.Title
    //                   as="h3"
    //                   className="text-lg leading-6 font-medium text-gray-900"
    //                 >
    //                   {props.title}
    //                 </Dialog.Title>
    //                 <div className="mt-2">
    //                   <p className="text-sm text-gray-500">{props.children}</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
    //             <button
    //               type="button"
    //               className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
    //               onClick={() => props.setOpen(false)}
    //               ref={cancelButtonRef}
    //             >
    //               Close
    //             </button>
    //           </div>
    //         </div>
    //       </Transition.Child>
    //     </div>
    //   </Dialog>
    // </Transition.Root>
  );
}
