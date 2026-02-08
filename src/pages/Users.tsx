import { useEffect, useState } from "react";
import { userApi } from "../services/api";
import type { User } from "../types/user";
import DynamicForm from "../components/DynamicForm";
import { toast } from "react-toastify";

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [show, setShow] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await userApi.getUsers();
            setUsers(res.data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch users");
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreate = async (data: User) => {
        try {
            setLoading(true);
            if (editUser) {
                await userApi.updateUser(editUser.id!, data);
            } else {
                await userApi.createUser(data);
            }
            toast.success(editUser ? "User updated" : "User created");
            setShow(false);
            setEditUser(null);
            fetchUsers();
        } catch {
            setError("Operation failed");
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            setLoading(true);
            await userApi.deleteUser(id);
            fetchUsers();
            toast.success("User deleted");
        } catch {
            setError("Delete failed");
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <button
                className="btn btn-success mb-3"
                onClick={() => setShow(true)}
            >
                Add User
            </button>

            {loading && <p>Loading users...</p>}
            {error && <p className="text-danger">{error}</p>}

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.firstName}</td>
                            <td>{u.lastName}</td>
                            <td>{u.phone}</td>
                            <td>{u.email}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary me-2"
                                    onClick={() => {
                                        setEditUser(u);
                                        setShow(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(u.id!)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {show && (
                <div className="modal d-block" tabIndex={-1}>
                    <div className="modal-dialog">
                        <div className="modal-content p-3">
                            <button
                                className="btn-close ms-auto"
                                onClick={() => {
                                    setShow(false);
                                    setEditUser(null);
                                }}
                            ></button>

                            <DynamicForm
                                title={editUser ? "Edit User" : "Add User"}
                                onSubmit={handleCreate}
                                defaultValues={editUser || undefined}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Users;
