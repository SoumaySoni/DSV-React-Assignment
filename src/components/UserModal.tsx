import DynamicForm from "./DynamicForm";
import type { User } from "../types/user";

interface Props {
  show: boolean;
  editUser: User | null;
  onClose: () => void;
  onSubmit: (data: User) => void;
}

function UserModal({ show, editUser, onClose, onSubmit }: Props) {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-3">
            <button className="btn-close ms-auto" onClick={onClose}></button>

            <DynamicForm
              title={editUser ? "Edit User" : "Add User"}
              onSubmit={onSubmit}
              defaultValues={editUser || undefined}
            />
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
}

export default UserModal;
