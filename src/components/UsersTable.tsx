import type { User } from "../types/user";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Props {
  users: User[];
  tableLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

function UsersTable({ users, tableLoading, onEdit, onDelete }: Props) {
  return (
    <div className="table-responsive position-relative">
      {tableLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "300px" }}
        >
          <div className="spinner-border" />
        </div>
      ) : (
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th style={{ width: "160px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted py-5">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>{u.firstName}</td>
                  <td>{u.lastName}</td>
                  <td>{u.phone}</td>
                  <td>{u.email}</td>
                  <td className="text-nowrap">
                    <div className="d-flex flex-column flex-md-row gap-2">
                      <button
                        className="btn btn-outline-primary btn-sm d-flex align-items-center"
                        onClick={() => onEdit(u)}
                      >
                        <FaEdit className="me-1" /> Edit
                      </button>

                      <button
                        className="btn btn-outline-danger btn-sm d-flex align-items-center"
                        onClick={() => onDelete(u.id!)}
                      >
                        <FaTrash className="me-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersTable;
