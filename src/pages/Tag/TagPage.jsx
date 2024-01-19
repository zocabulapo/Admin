/* eslint-disable jsx-a11y/anchor-is-valid */
import { Breadcrumb, Button, Label, TextInput, Textarea } from "flowbite-react";
import { HiHome, HiPencilAlt, HiTrash } from "react-icons/hi";
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import MaterialReactTable from 'material-react-table';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import AddTag from "./AddTag";
import DeleteTag from "./DeleteTag";
import EditTag from "./EditTag";
import { getAllTags, deleteTag, getIdeaByTagID } from "../../api/apiServices";
import { decodeJwt } from "../../api/decodeJwt";

export default function TagPage() {
    return (
      <>
        <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
          <div className="mb-1 w-full">
            <div className="mb-4">
              <Breadcrumb className="mb-4">
                <Breadcrumb.Item href="#">
                  <div className="flex items-center gap-x-3">
                    <HiHome className="text-xl" />
                    <span className="dark:text-white">Home</span>
                  </div>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Tags</Breadcrumb.Item>
              </Breadcrumb>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                All Tags
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow">
                <TagsTable />
              </div>
            </div>
          </div>
        </div> 
      </>
    )
  }
  
  const TagsTable = function() {
  
  const [tableData, setTableData] = useState([]);
  const [user_id, setUser_id] = useState("");
  const [editRow, setEditRow] = useState("")
  const [row, setRow] = useState("");
  const [data, setData] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [idea, setIdea] = useState("");
  const [showErr, setShowErr] = useState(false)
  const [error, setError] = useState("");

  useEffect(() => {
    if (decodeJwt().id !== "") {
      setUser_id(decodeJwt().id)
    }
    getAllTags()
      .then(res => {
        setTableData(res)
      })
      .catch(err => {
        console.log(err); 
      }) 
  }, [tableData.length])

  const handleShowDelete =  (row) => {
    setShowDelete(true)
    console.log(row.original._id)
     getIdeaByTagID(row.original._id)
      .then(res => {
        console.log(res)
        console.log("delete: " + res.length)
        setIdea(res.length)
      })
      .catch(err => {
        console.log(err); 
      })  
  }

  const handleDelete = (row) => {
    if (idea === 0) {
      deleteTag(row.original._id)
      .then((response) => { 
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
        })
      .catch((err)=>{
          console.log(err)
      })  
      setShowDelete(false)
    } else {
      setShowErr(true)
      setError("Please delete the entire ideas of this tag to delete!")
    }
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'subject',
      header: 'Subject',
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      size: 140,
      // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //   ...getCommonEditTextFieldProps(cell),
      // }),
    },
    {
      accessorFn: (originalRow) => formatDateTimeDislay(originalRow.start_dateOfTag),
      header: `Tag's start date`,
      size: 140,
      // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //   ...getCommonEditTextFieldProps(cell),
      // }),
    },
    {
      accessorFn: (originalRow) => formatDateTimeDislay(originalRow.end_dateOfTag),
      header: `Tag's end date`,
      // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //   ...getCommonEditTextFieldProps(cell),
      //   type: 'email',
      // }),
    },
    {
      accessorFn: (originalRow) => formatDateTimeDislay(originalRow.end_dateOfIdea),
      header: `Idea's end date`,
      size: 80,
      // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //   ...getCommonEditTextFieldProps(cell),
      //   type: 'number',
      // }),
    },
    {
      accessorFn: (originalRow) => originalRow.user_id.fullname, //alternative to accessorKey, using accessorFn
      id: 'fullname',
      header: `Created By`,
      size: 80,
      // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
      //   ...getCommonEditTextFieldProps(cell),
      //   type: 'number',
      // }),
    },
  ],
  // [getCommonEditTextFieldProps],
  []
  );

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
        columns={columns}
        data={tableData || []}
        enableEditing
        enableColumnOrdering
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => {return setData(row.original), setEditRow(row), setShowEdit(true)}}> 
                <button
                  type="button"
                  class="text-blue-700"
                  >
                  <HiPencilAlt size='1.5rem'/>
                </button>
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => {return setRow(row), handleShowDelete(row)}}>
                <button
                  type="button"
                  class="text-red-700"
                  >
                  <HiTrash size='1.5rem' />
                </button>
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <button
            type="button"
            class="inline-block rounded px-3 pt-2.5 pb-2 text-blue-700"
            onClick={() => setShowAdd(true)}>
            <i class="gg-add-r"></i>
          </button>
        )}
      />
      <AddTag 
        data={tableData}
        setData={setTableData}
        user_id={user_id}
        show={showAdd}
        onClose={() => setShowAdd(false)}
        />
      <EditTag 
        show={showEdit}
        onClose={() => setShowEdit(false)}
        data={data}
        setData={setData}
        tableData={tableData}
        setTableData={setTableData}
        editRow={editRow}
      />
      <DeleteTag 
        show={showDelete}
        error={error}
        showErr={showErr}
        onCloseErr={() => setShowErr(false)}
        onClose={() => setShowDelete(false)}
        handleDelete={() => handleDelete(row)}/>
    </>
  )
}

const formatDateTimeDislay = (inputString) => {
        // Convert input string to JavaScript Date object
  var date = new Date(inputString);

        // Extract individual components (year, month, day, hours, minutes, seconds) from the Date object
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1 and pad with leading zero
  var day = ("0" + date.getDate()).slice(-2); // Pad with leading zero
  var hours = ("0" + date.getHours()).slice(-2); // Pad with leading zero
  var minutes = ("0" + date.getMinutes()).slice(-2); // Pad with leading zero
  var seconds = ("0" + date.getSeconds()).slice(-2); // Pad with leading zero
        // Format the date and time components into a user-friendly string
  var formattedDateTime = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
        // Return the formatted date and time string
  return formattedDateTime;
}