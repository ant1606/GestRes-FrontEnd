import React from 'react'
import ReactPaginate from 'react-paginate'

const Paginator = ({ handlePageChange, perPage, totalPages }) => {
  return (
    <ReactPaginate
      breakLabel="..."
      onPageChange={handlePageChange}
      pageRangeDisplayed={perPage}
      pageCount={totalPages}
      renderOnZeroPageCount={<p>No hay resultados</p>}
      nextLabel="next >"
      previousLabel="< previous"
      containerClassName={`flex justify-center items-center mt-4 text-sm`}
      pageClassName={`border-2 border-gray-900 cursor-pointer hover:bg-gray-800 hover:border-0 hover:text-white rounded-md mx-1 my-2`}
      pageLinkClassName={`px-3 py-1   text-lg`}
      activeClassName={`bg-gray-900 `}
      activeLinkClassName={`text-white`}
      previousClassName={``}
      previousLinkClassName={``}
      nextClassName={``}
      nextLinkClassName={``}
      breakClassName={`text-xl mx-2`}
      breakLinkClassName={``}
      disabledClassName={`hidden`}
    />
  )
}

export default Paginator