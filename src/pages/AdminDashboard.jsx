import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import {getAllUsers, deleteUser} from "../services/usersService";
import Pagination from "../components/Pagination";
import ConfirmationModal from "../components/ConfirmationModal";
import getErrorMessage from "../utils/getErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
const USERS_PER_PAGE = 8;

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [userToDelete, setUserToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers();

        // Supports either:
        // [...]
        // or { users: [...] }
        const usersList = Array.isArray(data)
          ? data
          : data?.users || [];

        setUsers(usersList);
      } catch (error) {
        const message = getErrorMessage(
          error,
          "Failed to load users."
        );

        setError(message);

        if (!error?.response) {
          toast.error(message, {
            toastId: "admin-users-load-error",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const fullName = [
        user.name?.first,
        user.name?.middle,
        user.name?.last,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        fullName.includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.phone?.toLowerCase().includes(query)
      );
    });
  }, [users, searchTerm]);

  const totalPages = Math.ceil(
    filteredUsers.length / USERS_PER_PAGE
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };

  const handleCancelDelete = () => {
    if (!deleting) {
      setUserToDelete(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) {
      return;
    }

    try {
      setDeleting(true);

      await deleteUser(userToDelete._id);

      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) =>
            user._id !== userToDelete._id
        )
      );

      toast.success(
        "User deleted successfully."
      );

      setUserToDelete(null);

      const remainingUsers =
        filteredUsers.length - 1;

      const newTotalPages = Math.max(
        1,
        Math.ceil(
          remainingUsers / USERS_PER_PAGE
        )
      );

      if (currentPage > newTotalPages) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Could not delete the user."
        )
      );
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString(
      "en-GB"
    );
  };

  const getFullName = (user) => {
    return [
      user.name?.first,
      user.name?.middle,
      user.name?.last,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const isAdminUser = (user) =>
    Boolean(
      user.isAdmin ?? user._isAdmin
    );

  if (loading) {
    return (
    <main className="container py-5">
      <LoadingSpinner message="Loading users..." />
    </main>
    );
  }

  return (
    <main className="container py-5">
      <div className="mb-4">
        <h1>Admin Dashboard</h1>

        <p className="text-muted">
          Manage registered users.
        </p>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {!error && (
        <>
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <label
                htmlFor="user-search"
                className="form-label"
              >
                Search Users
              </label>

              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>

                <input
                  id="user-search"
                  type="search"
                  className="form-control"
                  placeholder="Search by name, email or phone..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="text-center py-5">
              <h3>No users found</h3>

              <p className="text-muted">
                Try changing your search.
              </p>
            </div>
          ) : (
            <>
              <div className="card shadow-sm">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Created</th>
                          <th>Recruiter</th>
                          <th>Admin</th>
                          <th className="text-end">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {paginatedUsers.map(
                          (user) => {
                            const admin =
                              isAdminUser(user);

                            return (
                              <tr key={user._id}>
                                <td className="fw-semibold">
                                  {getFullName(user)}
                                </td>

                                <td>
                                  {user.email}
                                </td>

                                <td>
                                  {user.phone}
                                </td>

                                <td>
                                  {formatDate(
                                    user.createdAt
                                  )}
                                </td>

                                <td>
                                  <span
                                    className={`badge ${
                                      user.isRecruiter
                                        ? "text-bg-success"
                                        : "text-bg-secondary"
                                    }`}
                                  >
                                    {user.isRecruiter
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </td>

                                <td>
                                  <span
                                    className={`badge ${
                                      admin
                                        ? "text-bg-danger"
                                        : "text-bg-secondary"
                                    }`}
                                  >
                                    {admin
                                      ? "Yes"
                                      : "No"}
                                  </span>
                                </td>

                                <td className="text-end">
                                  {!admin && (
                                    <button
                                      type="button"
                                      className="btn btn-outline-danger btn-sm"
                                      onClick={() =>
                                        handleDeleteClick(
                                          user
                                        )
                                      }
                                      aria-label={`Delete ${getFullName(
                                        user
                                      )}`}
                                    >
                                      <FaTrash />
                                      <span className="ms-2 d-none d-lg-inline">
                                        Delete
                                      </span>
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </>
      )}

      {userToDelete && (
        <ConfirmationModal
          show={Boolean(userToDelete)}
          title="Delete User"
          message={`Are you sure you want to delete ${getFullName(
            userToDelete
          )}? This action cannot be undone.`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          loading={deleting}
        />
      )}
    </main>
  );
}

export default AdminDashboard;