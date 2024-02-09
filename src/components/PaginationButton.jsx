export default function PaginationButton({
  page,
  stateValue,
  setStateValue,
  searchParams,
  setSearchParams,
}) {
  const handleClick = (event) => {
    const visablePageNum = Number(event.target.value);
    const correctedPage = Number(event.target.value) -1;
    setStateValue(correctedPage);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("p", visablePageNum);
    setSearchParams(newParams);
  };

  return (
    <button onClick={handleClick} value={page}  className={page === stateValue + 1?"button-pagination button-pagination-current":"button-pagination"}>
      {page}
    </button>
  );
}

