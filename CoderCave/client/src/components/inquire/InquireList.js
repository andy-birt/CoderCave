import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { InquireContext } from "../../providers/InquireProvider";


const InquireList = ({ isLoggedIn }) => {
  const { inquiries, getAllByTagId } = useContext(InquireContext);

  const { id } = useParams();

  useEffect(() => {
    getAllByTagId(id);
  }, [id]);
  
  return inquiries.map(i => 
    <div key={i.id}>
      <div>{i.title}</div>
      <div>{i.content}</div>
    </div>
  );
};

export default InquireList;