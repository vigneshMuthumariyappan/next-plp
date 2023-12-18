import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function PaginatedItems({ itemsPerPage, total_count, handlePageClick }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const pageCount = Math.ceil(total_count / itemsPerPage);

  // Invoke when user click to request another page.

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;