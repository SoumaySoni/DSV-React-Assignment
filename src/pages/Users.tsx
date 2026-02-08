import { useEffect, useState } from "react";
import { userApi } from "../services/api";
import type { User } from "../types/user";
import DynamicForm from "../components/DynamicForm";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "../components/Header";

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
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if (!confirmDelete) return;

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

        <div className="container py-4">
           <Header setShow={setShow} />
            {loading && <p>Loading users...</p>}
            {error && <p className="text-danger">{error}</p>}
            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
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
                                <td className="text-nowrap">
                                    <div className="d-flex flex-column flex-md-row gap-2">
                                        <button
                                            className="btn btn-outline-primary btn-sm d-flex align-items-center"
                                            onClick={() => {
                                                setEditUser(u);
                                                setShow(true);
                                            }}
                                        >
                                            <FaEdit className="me-1" />Edit
                                        </button>

                                        <button
                                            className="btn btn-outline-danger btn-sm d-flex align-items-center"
                                            onClick={() => handleDelete(u.id!)}
                                        >
                                            <FaTrash className="me-1" />Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {show && (
                <>
                    <div className="modal fade show d-block" tabIndex={-1}>
                        <div className="modal-dialog modal-dialog-centered modal-lg">
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
                    <div className="modal-backdrop fade show"></div>
                </>
            )}
        </div>
    );
}

export default Users;
