import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Container } from "reactstrap";
import { InquireContext } from "../../providers/InquireProvider";
import Inquire from "./Inquire";


const InquireList = ({ isLoggedIn }) => {
  const { inquiries, getAllByTagId } = useContext(InquireContext);

  const { id } = useParams();

  useEffect(() => {
    getAllByTagId(id);
  }, [id]);
  
  return ( 
  <Container>
  {  
    inquiries.map(i => <Inquire key={i.id} inquire={i} />)
  }
  </Container>
  )
};

export default InquireList;