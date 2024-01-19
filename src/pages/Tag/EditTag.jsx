import { React, useState } from "react";
import {
    Breadcrumb,
    Button,
    Checkbox,
    Label,
    Modal,
    Table,
    Textarea,
    TextInput
} from "flowbite-react";
import { updateTag } from "../../api/apiServices";

export default function EditTag({data, setData, tableData, setTableData, editRow, show, onClose}){

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [error, setError] = useState({
    subject: "",
    description: "",
    start_dateOfTag: "",
    end_dateOfTag: "",
    end_dateOfIdea: ""
  });

  const validateAll = () => {
    let msg = {}
    if (data.subject === "") {
      msg.subject = "Subject field is required!"
    } if (data.description === "") {
      msg.description = "Description field is required!"
    } if (data.end_dateOfIdea === "") {
      msg.end_dateOfIdea = "Idea's end date field is required!"
    } if (data.end_dateOfTag === "") {
      msg.end_dateOfTag = "Start date field is required!"
    } if (data.start_dateOfTag === "") {
      msg.start_dateOfTag = "End date field is required!"
    }
    
    setError(msg)
    console.log("validating")
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };


  const clearState = () => {
    setError({
      subject: "",
      description: "",
      start_dateOfTag: "",
      end_dateOfTag: "",
      end_dateOfIdea: ""
    })
    setData(data)
    onClose()
  }
  
  const handleChangeInput = (e) => {
    let {name, value} = e.target;
    setData({...data, [name]: value})
    setError({...error, [name]: ""})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("id", data._id)
    formData.append("subject", data.subject)
    formData.append("description", data.description)
    formData.append("start_dateOfTag", data.start_dateOfTag)
    formData.append("end_dateOfTag", data.end_dateOfTag)
    formData.append("end_dateOfIdea", data.end_dateOfIdea)
    formData.append("user_id", data.user_id)

    const parseData = JSON.stringify(Object.fromEntries(formData))
    tableData[editRow.index] = JSON.parse(parseData);

    const isValid = validateAll()
    if (isValid){
      await updateTag(data._id, parseData)
      .then(res => {
        console.log(res)
        tableData.push(res);
        setTableData([...tableData]);
        clearState()
      })
      .catch((err)=>{
        console.log(err)
      })  
    }
  }

  console.log(show)
  
  return (
    <>
    { show ?
      <div
        className="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
        data-te-backdrop="static"
        data-te-keyboard="false"
        id="exampleModalScrollableEdit">
        <div
          data-te-modal-dialog-ref
          class="relative h-[calc(100%-1rem)] w-auto transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
          <div
            class="pointer-events-auto relative flex max-h-[100%] w-full flex-col overflow-hidden rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div
              class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel">
                Update Tag
              </h5>
              <button
                type="button"
                class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => clearState()}
                aria-label="Close">
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
            <div class="relative overflow-y-auto p-4">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <TextInput
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder='Subject'
                      className="mt-1"
                      value={data.subject}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.subject}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="end_dateOfIdea">Idea's end date</Label>
                    <TextInput
                      id="end_dateOfIdea"
                      name="end_dateOfIdea"
                      type="date"
                      placeholder="mm/dd/yyyy"
                      className="mt-1"
                      value={formatDate(data.end_dateOfIdea)}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.end_dateOfIdea}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="start_dateOfTag">Start date</Label>
                    <TextInput
                      id="start_dateOfTag"
                      name="start_dateOfTag"
                      type="date"
                      placeholder="mm/dd/yyyy"
                      className="mt-1"
                      value={formatDate(data.start_dateOfTag)}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.start_dateOfTag}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="end_dateOfTag">End date</Label>
                    <TextInput
                      id="end_dateOfTag"
                      name="end_dateOfTag"
                      type="date"
                      placeholder="mm/dd/yyyy"
                      className="mt-1"
                      value={formatDate(data.end_dateOfTag)}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.end_dateOfTag}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Description"
                      rows={6}
                      className="mt-1"
                      value={data.description}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.description}
                    </p>
                  </div>
                </div>
              </form>
            </div>
            <div
              class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <button
                type="button"
                class="pb-2 uppercase text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                onClick={() => clearState()}>
                Close
              </button>
              <button
                type="button"
                class="pb-2 uppercase text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                onClick={handleSubmit}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
        : null }      
    </>
  )
}