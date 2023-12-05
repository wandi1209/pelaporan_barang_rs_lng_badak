import React from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';

const DataTable = ({ columns, data, buttonCrud }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    setPageSize,
    pageSize,
    pageOptions,
  } = useTable({ columns, data }, useGlobalFilter, usePagination);

  const { pageIndex, globalFilter } = state;

  return (
    <div className='p-3 overflow-x-auto lg:overflow-hidden'>
      <div className='flex items-center justify-between text-gray-100 mb-5 '> 
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="shadow-xl animate__animated animate__fadeInLeft animate__slow rounded-lg bg-cyan-900 border-none hover:bg-cyan-950">
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        {buttonCrud && (
          <div>{buttonCrud}</div>
        )}
        <input
          type="text"
          value={globalFilter || ''}
          className='rounded-lg bg-cyan-900 border-none placeholder-gray-100 shadow-xl hover:bg-cyan-950 animate__animated animate__fadeInDown animate__slow'
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </div>
      <table {...getTableProps()} className="table-auto w-full bg-cyan-900 rounded-xl shadow-xl animate__animated animate__fadeInRight animate__slow">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="py-4 font-semibold text-center text-white text-xs lg:text-lg">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-t border-gray-300 bg-gray-200">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 text-center text-gray-700 text-xs lg:text-lg">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-5 text-white bg-cyan-900 rounded-lg w-max shadow-xl animate__animated animate__fadeInUp animate__slow">
        <button onClick={() => previousPage()} disabled={!canPreviousPage} className='cursor-pointer border-r-2 border-gray-400 py-2 px-4 hover:bg-cyan-950 hover:text-white transition-color duration-300 rounded-l-lg'>
          Previous
        </button>
        <span className="mx-2">
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} className='cursor-pointer border-l-2 border-gray-400 py-2 px-4 hover:bg-cyan-950 hover:text-white transition-color duration-300 rounded-r-lg'>
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
