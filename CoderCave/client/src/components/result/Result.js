import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container } from "reactstrap";
import { SearchContext } from "../../providers/SearchProvider";
import Inquire from "../inquire/Inquire";
import SearchPagination from "../misc/SearchPagination";

const Result = () => {

  const [result, setResult] = useState({});

  const { getSearchResult } = useContext(SearchContext);

  const { page } = useParams();


  useEffect(() => {
    getSearchResult(page).then(setResult);
  }, [page]);

  return(
    <Container>
      <p>You are viewing <strong>{result.startValue}</strong> - <strong>{result.endValue}</strong> out of <strong>{result.count}</strong> results.</p>
      { (result && result.count > result.limit) && <SearchPagination result={result}/> }
      {
        result.data?.map(inquire => <Inquire key={inquire.id} inquire={inquire}/>)
      }
      <div className="mb-3"></div>
      { (result && result.count > result.limit) && <SearchPagination result={result}/> }
    </Container>
  );
};

export default Result;