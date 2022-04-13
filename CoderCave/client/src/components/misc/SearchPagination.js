import { useEffect } from "react";
import { useParams } from "react-router";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const SearchPagination = ({ result }) => {

  const { page } = useParams();

  const pages = () => {
    const res = [];

    const startPage = parseInt(page);
    let currentPage = startPage;
    
    while (((currentPage * ((result.endValue - result.startValue) + 1)) - 1) < result.count) {
      debugger;
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
      <PaginationItem>
        <PaginationLink
          first
          href="/search/1"
        />
      </PaginationItem>
      <PaginationItem disabled={page - 1 === 0}>
        <PaginationLink
          href={`/search/${page - 1}`}
          previous
        />
      </PaginationItem>
      {
        pages().map(p => {
          return (
            <PaginationItem key={p}>
              <PaginationLink>
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })
      }
      <PaginationItem>
        <PaginationLink
          href={`/search/${page + 1}`}
          next
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          href="#"
          last
        />
      </PaginationItem>
    </Pagination>
  );
};

export default SearchPagination;