export const renderPagination = (
  totalPages,
  handleClick,
  currentPage,
  setCurrentPage
) => {
  const pagination = [];
  for (let i = 1; i <= totalPages; i++) {
    pagination.push(
      <button
        key={i}
        onClick={() => handleClick(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </button>
    );
  }
  return (
    <div>
      <button
        onClick={() =>
          setCurrentPage(currentPage === 1 ? currentPage : currentPage - 1)
        }
        disabled={currentPage === 1}
      >
        prev
      </button>
      {pagination}
      <button
        onClick={() =>
          setCurrentPage(
            currentPage === totalPages ? totalPages : currentPage + 1
          )
        }
        disabled={currentPage === totalPages || totalPages === 0}
      >
        next
      </button>
    </div>
  );
};
