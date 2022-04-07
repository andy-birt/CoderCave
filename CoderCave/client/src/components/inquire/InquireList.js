import { useContext } from "react";
import { InquireContext } from "../../providers/InquireProvider";
import Inquire from "./Inquire";


const InquireList = ({ isLoggedIn }) => {
  const { inquiries } = useContext(InquireContext);
  
  return inquiries.map(i => <Inquire key={i.id} inquire={i} />)
};

export default InquireList;