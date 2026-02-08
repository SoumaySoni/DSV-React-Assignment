import { useEffect, useState } from "react";
import { userApi } from "../services/api";
import type { User } from "../types/user";
import DynamicForm from "../components/DynamicForm";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import Header from "../components/Header";
import UsersTable from "../components/UsersTable";
import UserModal from "../components/UserModal";

function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [show, setShow] = useState(false);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            setTableLoading(true);
            const res = await userApi.getUsers();
            setUsers(res.data);
            setError(null);
        } catch (err) {
            setError("Failed to fetch users");
            toast.error("Something went wrong");
        } finally {
            setTableLoading(false);
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
                toast.success("User updated");
            } else {
                await userApi.createUser(data);
                toast.success("User created");
            }

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
            toast.success("User deleted");
            fetchUsers();
        } catch {
            setError("Delete failed");
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4 position-relative">
            <Header setShow={setShow} />

            {error && <p className="text-danger">{error}</p>}

            <div className="table-responsive position-relative">

                {/* Table Loader (No CLS) */}
                {tableLoading && (
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "300px" }}
                    >
                        <div className="spinner-border" />
                    </div>
                )}

                {!tableLoading && (
                    <UsersTable
                        users={users}
                        tableLoading={tableLoading}
                        onEdit={(u) => {
                            setEditUser(u);
                            setShow(true);
                        }}
                        onDelete={handleDelete}
                    />
                )}
            </div>

            {/* Global Overlay Spinner (Create / Update / Delete) */}
            {loading && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ background: "rgba(255,255,255,0.6)", zIndex: 2000 }}
                >
                    <div className="spinner-border text-primary" style={{ width: 50, height: 50 }} />
                </div>
            )}

            {show && (
                <UserModal
                    show={show}
                    editUser={editUser}
                    onClose={() => {
                        setShow(false);
                        setEditUser(null);
                    }}
                    onSubmit={handleCreate}
                />
            )}
        </div>
    );
}

export default Users;
