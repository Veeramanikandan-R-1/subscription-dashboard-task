import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between">
      <div className="flex gap-4">
        <Link to="/plans" className="font-semibold">Plans</Link>
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user?.role === 'admin' && <Link to="/admin/subscriptions">Admin</Link>}
      </div>
      <div>
        {user ? (
          <button onClick={() => dispatch(logout())} className="bg-red-600 px-3 py-1 rounded">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mr-3">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
