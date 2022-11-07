import React from 'react'
import ReactPaginate from 'react-paginate'

const FooterTable = ({ handlePageChange, perPage, totalPages, from, to, total, currentPage }) => {
  // //TODO Ver si se le puede definir un tamaño estatico y que no varie mucho cuando aparecen las demas paginas
  return (
    <div className='flex items-end'>
      <div className='block h-full flex-none'>
        <p>{from} a {to}, de {total}</p>
      </div>
      <div className='grow'>

        <ReactPaginate
          breakLabel="..."
          onPageChange={handlePageChange}
          pageRangeDisplayed={3}
          pageCount={totalPages}
          renderOnZeroPageCount={<p>No hay resultados</p>}
          nextLabel="next >"
          previousLabel="< previous"
          containerClassName={`flex justify-center items-center mt-4 text-sm`}
          pageClassName={`border-2 border-gray-900 cursor-pointer hover:bg-gray-800 hover:text-white rounded-md mx-1 my-2`}
          pageLinkClassName={`px-3 py-1  text-lg`}
          activeClassName={`bg-gray-900 `}
          activeLinkClassName={`text-white`}
          previousClassName={``}
          previousLinkClassName={``}
          nextClassName={``}
          nextLinkClassName={``}
          breakClassName={`text-xl mx-2`}
          breakLinkClassName={``}
          disabledClassName={`hidden`}
          initialPage={currentPage - 1}
        />
      </div>
    </div>
  )
}

export default FooterTable