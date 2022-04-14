import { Badge } from "reactstrap";

const TagList = ({ tags }) => {
  return tags?.map(t => {
    return (
      <span key={t.id}>
        <Badge href={`/tag/details/${t.id}`}>
          {t.name}
        </Badge>
        {' '}
      </span>
    );
  });
};

export default TagList;