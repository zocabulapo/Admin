import { React, useState, memo } from "react";
import { HiOutlineExclamationCircle, HiTrash } from "react-icons/hi"

function DeleteUser(props){
  return (
    <>
      {props.show?
        <div
          class="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-non bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
          id="exampleModalCenterDeleteUser">
          <div
            class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
            <div
              class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
              <div
                class="flex flex-shrink-0 items-center justify-between rounded-t-md border-none border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <h5
                  class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                  id="exampleModalScrollableLabel">
                </h5>
                <button
                  type="button"
                  class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => props.onClose()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-6 w-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="relative p-4">
                <div className="flex flex-col items-center gap-y-6 text-center">
                  <HiOutlineExclamationCircle className="text-7xl text-red-700" />
                  <p className="text-lg text-gray-500 dark:text-gray-300">
                    Are you sure you want to delete this User?
                  </p>
                  <div className="flex items-center pb-4">
                    <button
                    type="button"
                    class="pb-2 uppercase text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                    onClick={() => props.onClose()}>
                    Close
                    </button>
                    <button
                      type="button"
                      class="pb-2 uppercase text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                      onClick={() => {return props.handleDelete(), props.onClose()}}>
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      : null}
    </>
  )
}

export default memo(DeleteUser)