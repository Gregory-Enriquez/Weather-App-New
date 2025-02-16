import { User } from 'firebase/auth';
import { FaGoogle, FaGithub, FaSignOutAlt } from 'react-icons/fa';

interface UserInfoProps {
  user: User;
  handleLogout: () => void;
  showEmail: boolean;
  setShowEmail: (show: boolean) => void;
}

const UserInfo = ({ user, handleLogout, showEmail, setShowEmail }: UserInfoProps) => {
  return (
    <div className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-lg shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="cursor-pointer" onClick={() => setShowEmail(!showEmail)}>
          {user.providerData[0].providerId === 'google.com' ? (
            <FaGoogle className="text-gray-700 text-lg" data-testid="google-icon" />
          ) : (
            <FaGithub className="text-gray-700 text-lg" data-testid="github-icon" />
          )}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-2 py-1 rounded-md text-sm hover:bg-red-600 transition-colors flex items-center space-x-1"
        >
          <FaSignOutAlt className="text-sm" />
          <span>Cerrar sesión</span>
        </button>
      </div>
      {showEmail && <p className="text-gray-700 text-sm mt-2 text-center">{user.email}</p>}
    </div>
  );
};

export default UserInfo;