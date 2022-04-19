import { useEffect } from "react";
import { useParams } from "react-router";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const SearchPagination = ({ result }) => {

  const { page } = useParams();

  // Arbitrarily using the number 10 since it is my default limit per page
  // This should be a number returned from the api
  const totalPages = Math.ceil(result.count / 10);

  const pages = () => {
    const res = [];

    let startPage = parseInt(page);

    if (startPage > 1 && startPage < 3) {
      startPage = 1;
    } else if (startPage >= 3) {
      startPage -= 2
    }

    let currentPage = startPage;
    
    while (
      (currentPage - 1 < totalPages)
    ) {
      res.push(currentPage);
      currentPage++;
    }
    return res;
  };

  useEffect(() => {
    console.log(result);
    if (result !== null) {
      pages();
    }
  }, []);

  return(
    <Pagination>
      <PaginationItem disabled={parseInt(page) === 1}>
        <PaginationLink
          first
          href="/search/page/1"
        />
      </PaginationItem>
      <PaginationItem disabled={parseInt(page) - 1 === 0}>
        <PaginationLink
          href={`/search/page/${parseInt(page) - 1}`}
          previous
        />
      </PaginationItem>
      {
        pages().map(p => {
          return (
            <PaginationItem key={p} active={parseInt(page) === p}>
              <PaginationLink href={`/search/page/${p}`}>
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })
      }
      <PaginationItem disabled={parseInt(page) === totalPages}>
        <PaginationLink
          href={`/search/page/${parseInt(page) + 1}`}
          next
        />
      </PaginationItem>
      <PaginationItem disabled={parseInt(page) === totalPages}>
        <PaginationLink
          href="#"
          last
        />
      </PaginationItem>
    </Pagination>
  );
};

export default SearchPagination;