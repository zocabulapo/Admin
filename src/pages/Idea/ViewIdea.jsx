import { React, useState, useEffect } from "react";

import { Label, Textarea, TextInput } from "flowbite-react";
import { getIdea } from "../../api/apiServices";

export default function ViewIdea({show, onClose, data, ideaID}) {
  const [ideaFiles, setIdeaFiles] = useState("")

  console.log(ideaID)
  useEffect(() => {
    getIdea(ideaID)
       .then(res => {
          console.log(res.data)
          setIdeaFiles(res.data.files)
       })
       .catch(err => {
          console.log(err)
       })
  }, [data])
  console.log(ideaFiles)

  const getIdeaFiles = Object.values(ideaFiles || {}).map((val, index) => {
    return (
      <div key={index} className="flex items-center p-3 mb-3.5 border border-gray-200 dark:border-gray-700 rounded-lg">
        <div className="flex items-center justify-center w-10 h-10 mr-3 rounded-lg bg-primary-100 dark:bg-primary-900">
          <svg
            className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true">
            <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
            />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
          </svg>
        </div>
        <div className="mr-4">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{val.filename}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{(val.contentType.split("/")[0])}, {(val.length / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
        <div className="flex items-center ml-auto">
        <button type="button" className="p-2 rounded hover:bg-gray-100">
          <svg
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true">
          <path
          clipRule="evenodd"
          fillRule="evenodd"
          d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
          />
          </svg>
          <span className="sr-only">Download</span>
        </button>
      </div>
    </div>
    )
  })
  return (
    <>
      {show? 
        <div
          class="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
          id="exampleModalLg">
          <div
            class="flex min-h-[calc(100%-1rem)] items-center relative w-auto transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]">
            <div
              class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
              <div
                class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <h5
                  class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                  id="exampleModalLgLabel">
                  View Idea
                </h5>
                <button
                  type="button"
                  class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => onClose()}>
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
              <div data-te-modal-body-ref class="relative overflow-y-auto p-4">
                <form>
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <div>
                      <Label htmlFor="tag">Tag</Label>
                      <TextInput
                        id="tag"
                        name="tag"
                        placeholder='#'
                        readOnly
                        className="mt-1"
                        value={data.tag_id.subject}
                      />
                    </div>
                    <div>
                      <Label htmlFor="user">User Name</Label>
                      <TextInput
                        id="user"
                        name="user"
                        type="text"
                        readOnly
                        placeholder="#"
                        className="mt-1"
                        value={data.user_id.fullname}
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <TextInput
                        id="title"
                        name="title"
                        readOnly
                        type="text"
                        placeholder="#"
                        className="mt-1"
                        value={data.title}
                      />
                    </div>
                    <div>
                      <Label htmlFor="like">Like</Label>
                      <TextInput
                        id="like"
                        name="like"
                        type="text"
                        readOnly
                        placeholder="#"
                        className="mt-1"
                        value={data.like}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dislike">Dislike</Label>
                      <TextInput
                        id="dislike"
                        name="dislike"
                        type="text"
                        readOnly
                        placeholder="#"
                        className="mt-1"
                        value={data.dislike}
                      />
                    </div>
                    <div>
                      <Label htmlFor="viewtime">View time</Label>
                      <TextInput
                        id="viewtime"
                        name="viewtime"
                        type="text"
                        readOnly
                        placeholder="#"
                        className="mt-1"
                        value={data.view_time}
                      />
                    </div>
                    <div>
                    <Label htmlFor="documents">Documents</Label>
                      <>{getIdeaFiles}</>
                    </div>
                    <div className="lg:col-span-2">
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        name="content"
                        placeholder="content"
                        rows={6}
                        readOnly
                        className="mt-1"
                        value={data.content}
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div
                class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button
                  type="button"
                  class="pb-2 uppercase text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                  onClick={() => onClose()}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      : null}
    </>
  )
}