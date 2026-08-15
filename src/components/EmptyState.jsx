import { Link } from "react-router-dom";

function EmptyState({title,message,actionText,actionTo}) {
  return (
    <div className="text-center py-5">
      <h3 className="mb-3"> {title} </h3>
      {message && (
        <p className="text-muted mb-4">{message}</p>
        )}
      {actionText && actionTo && (
        <Link to={actionTo} className="btn btn-primary"> {actionText} </Link>
      )}
    </div>
  );
}

export default EmptyState;