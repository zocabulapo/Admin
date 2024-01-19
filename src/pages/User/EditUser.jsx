import {
  Breadcrumb,
  Button,
  Checkbox,
  Label,
  Modal,
  Table,
  TextInput,
  Select,
} from "flowbite-react"
import { useState } from "react"
import { updateUser } from "../../api/apiServices";
import isEmail from "validator/lib/isEmail";

export default function EditUser({data, setData, tableData, setTableData, editRow, show, onClose}) {

  const [error, setError] = useState({
    fullname: "",
    email: "",
    gender: "",
    password: "",
    permission: "",
    department: ""
  });

  const handleChangeInput = (e) => {
    let {name, value} = e.target;
    setData({...data, [name]: value})
    setError({...error, [name]: ""})
  }

  const validateAll = () => {
    let msg = {}
    if (data.fullname === "") {
      msg.fullname = "Fullname field is required!"
    } if (data.email === "") {
      msg.email = "Email field is required!"
    } else if (!isEmail(data.email)) {
      msg.email = "Invalid email!"
    } if (data.gender === "") {
      msg.gender = "Gender field is required!"
    } if (data.password === "") {
      msg.password = "Password field is required!"
    } else if (data.password.length < 6) { 
      msg.password = "Password must be greater than 6!"
    } if (data.permission === "") {
      msg.permission = "Permission field is required!"
    } if (data.department === "") {
      msg.department = "Department field is required!"
    }
    
    setError(msg)
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

  const clearState = () => {
    setError({
      fullname: "",
      email: "",
      gender: "",
      password: "",
      permission: "",
      department: ""
    })
    setData({
      fullname: "",
      email: "",
      gender: "",
      password: "",
      permission: "",
      department: ""
    });
    onClose()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", data._id)
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("password", data.password);
    formData.append("permission", data.permission);
    formData.append("department", data.department);
    formData.append("image", data.image);

    const parseData = JSON.stringify(Object.fromEntries(formData))
    tableData[editRow.index] = JSON.parse(parseData);

    const isValid = validateAll()
    if (isValid){
    return await updateUser(data._id, formData)
      .then(res => {
        console.log(res)
        setTableData([...tableData]);
        clearState()
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }
  
  return (
    <>
      {show? 
        <div
        class="fixed top-0 left-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-non bg-gray-900 bg-opacity-50 dark:bg-opacity-80"
        id="exampleModalCenterEditUser">
        <div
          data-te-modal-dialog-ref
          class="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]">
          <div
            class="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
            <div
              class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
              <h5
                class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                id="exampleModalScrollableLabel">
                Edit User
              </h5>
              <button
                type="button"
                class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => clearState()}>
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
            <form onSubmit={handleSubmit}> 
                <div class="relative p-4">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="fullname">Name</Label>
                      <div className="mt-1">
                        <TextInput
                        id="fullname"
                        name="fullname"
                        type="text"
                        placeholder="Ariana Grande"
                        value={data.fullname}
                        onChange={handleChangeInput}
                        />
                        <p class="mt-1 text-sm text-red-500"> 
                          {error.fullname}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <div className="mt-1">
                        <TextInput 
                          id="password" 
                          name="password" 
                          type="password"
                          placeholder="Your password" 
                          value={data.password}
                          onChange={handleChangeInput}
                          />
                        <p class="mt-1 text-sm text-red-500"> 
                          {error.password}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="mt-1">
                        <TextInput
                        id="email"
                        name="email"
                        placeholder="example@company.com"
                        type="email"
                        value={data.email}
                        onChange={handleChangeInput}
                        />
                        <p class="mt-1 text-sm text-red-500"> 
                          {error.email}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="gender">Gender</Label>
                      <div className="mt-1">
                        <Select
                          id="gender"
                          name="gender"
                          value={data.gender}
                          onChange={handleChangeInput}
                        > 
                            <option selected>---Select---</option>
                            <option>Female</option>
                            <option>Male</option>
                        </Select>
                        <p class="mt-1 text-sm text-red-500"> 
                          {error.gender}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <div className="mt-1">
                        <Select
                          id="department"
                          name="department"
                          value={data.department}
                          onChange={handleChangeInput}
                        >
                          <option selected>---Select---</option>
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                        </Select>
                        <p class="mt-1 text-sm text-red-500"> 
                          {error.department}
                        </p>
                    </div>
                    </div>
                    <div>
                      <Label htmlFor="permission">Permission</Label>
                      <div className="mt-1">
                        <Select
                          id="permission"
                          name="permission"
                          value={data.permission}
                          onChange={handleChangeInput}
                        >
                          <option selected>---Select---</option>
                          <option>Staff</option>
                          <option>QA</option>
                          <option>QAManager</option>
                        </Select>
                        <p class="mt-1 text-sm text-red-500"> 
                          {error.permission}
                        </p>
                      </div>
                    </div>
                      {/* <div className="lg:col-span-2">
                        <div className="flex w-full items-center justify-center">
                          <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            
                              { !show ? <>
                                <HiUpload className="text-4xl text-gray-300" />
                              <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                                Upload a file or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PNG, JPG, GIF up to 10MB
                              </p>
                              </>
                                : 
                                image && ( 
                                  <div style={styles.preview}>
                                    <img
                                      src={URL.createObjectURL(image)}
                                      style={styles.image}
                                      alt="Thumb"
                                    />
                                    <button onClick={removeSelectedImage} style={styles.delete}>
                                      Remove This Image
                                    </button>
                                  </div>
                                )
                                }
                            </div>
                            <input 
                              type="file" 
                              className="hidden"
                              onChange={imageChange}
                              />
                              
                          </label>
                        </div>
                      </div> */}
                    </div>
                </div>
              </form>
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
      </div> : null
      }
    </>
  )
}