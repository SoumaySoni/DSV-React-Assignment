import type { HeaderProps } from '../types/header';

export default function Header({ setShow }: HeaderProps) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <div>
        <h4 className="mb-0 fw-semibold">User Management</h4>
        <small className="text-muted">Manage system users</small>
      </div>

      <button className="btn btn-primary" onClick={() => setShow(true)}>
        + Add User
      </button>
    </div>
  );
}
