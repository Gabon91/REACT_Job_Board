
function ConfirmationModal({show, title, message, onConfirm, onCancel, loading = false}) {
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> {title} </h5>
              <button type="button" className="btn-close" onClick={onCancel} disabled={loading}/>
            </div>

            <div className="modal-body">
              <p>{message}</p>
              <p className="text-danger mb-0"> This action cannot be undone. </p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={loading}> Cancel </button>

              <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={loading}>
                {loading ? "Deleting..." : "Delete Job"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" />
    </>
  );
}

export default ConfirmationModal;