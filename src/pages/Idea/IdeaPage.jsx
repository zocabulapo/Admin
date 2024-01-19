/* eslint-disable jsx-a11y/anchor-is-valid */
import { Breadcrumb } from "flowbite-react";
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { HiHome, HiTrash, HiEye } from "react-icons/hi"

import DeleteIdea from "./DeleteIdea";
import MaterialReactTable from 'material-react-table';
import {
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import ViewIdea from "./ViewIdea";
import { deleteIdea, getAllIdeas, getIdea } from "../../api/apiServices";
  
export default function IdeaPage() {
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
              <Breadcrumb.Item>Ideas</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              All Ideas
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <IdeaTable />
            </div>
          </div>
        </div>
      </div> 
    </>
  )
}
  
const IdeaTable = function() {

  useEffect(() => {
    getAllIdeas()
    .then(res => {
      setTableData(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
  
  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [data, setData] = useState("");
  const [row, setRow] = useState("");
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [ideaID, setIdeaID] = useState('')

  console.log(ideaID)

  const handleDelete = useCallback(async (row) => {
    await deleteIdea(row.original._id)
      .then((response) => { 
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
        })
      .catch((err)=>{
          console.log(err)
      })  
  }, [tableData])

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: 'Title',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorFn: (originalRow) => originalRow.tag_id.subject,
        id: 'subject',
        header: 'Subject',
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorFn: (originalRow) => originalRow.user_id.fullname,
        id: 'fullname',
        header: 'User Name',
        size: 140,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        // }),
      },
      {
        accessorKey: 'like',
        header: 'Like',
        size: 140,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        // }),
      },
      {
        accessorKey: 'dislike',
        header: 'Dislike',
        size: 140,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        // }),
      },
      {
        accessorKey: 'view_time',
        header: 'View time',
        size: 80,
        // muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
        //   ...getCommonEditTextFieldProps(cell),
        //   type: 'number',
        // }),
      }
    ],
    // [getCommonEditTextFieldProps],
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
        data={tableData}
        editingMode="modal" //default
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="View">
              <IconButton onClick={() => {return setData(row.original), setShowView(true), setIdeaID(row.original._id)}}>
                <button
                  type="button"
                  class="cursor text-blue-700">
                  <HiEye size='1.5rem' />
                </button> 
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton onClick={() => {return setRow(row), setShowDelete(true)}}>
                <button
                  type="button"
                  class="cursor text-red-700">
                  <HiTrash size='1.5rem' />
                </button> 
              </IconButton>
            </Tooltip>
          </Box>
        )}
        // renderTopToolbarCustomActions={() => (
        //   <Button
        //     color="primary"
        //     onClick={() => setCreateModalOpen(true)}
        //     variant="contained"
        //   >
        //     Create New Account
        //   </Button>
        // )}
      />
      <DeleteIdea 
        show={showDelete}
        onClose={() => setShowDelete(false)}
        handleDelete={() => handleDelete(row)}/>
      <ViewIdea 
        show={showView}
        onClose={() => setShowView(false)}
        data={data}
        ideaID={ideaID} />
    </>
  );
}