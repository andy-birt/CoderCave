import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { InquireContext } from "../../providers/InquireProvider";

const InquireDetails = () => {

  const { inquire, getInquire } = useContext(InquireContext);

  const { id } = useParams();

  useEffect(() => {
    getInquire(id);
  }, [id]);

  return (
    <div>{inquire.title}</div>
  );
};

export default InquireDetails;