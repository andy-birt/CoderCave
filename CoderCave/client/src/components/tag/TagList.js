import { Badge } from "reactstrap";

const TagList = ({ tags }) => {
  return tags?.map(t => {
    return (
      <div key={t.id} className="details-tag-list mt-2">
        <Badge href={`/tag/details/${t.id}`}>
          {t.name}
        </Badge>
      </div>
    );
  });
};

export default TagList;