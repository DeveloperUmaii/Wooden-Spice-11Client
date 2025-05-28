import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm text-center">
                <img 
                    src={user?.photoURL || 'https://i.ibb.co/MBtjqXQ/default-profile.png'} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-green-300"
                />
                <h2 className="text-xl font-semibold text-gray-800">{user?.displayName || "Anonymous User"}</h2>
                <p className="text-gray-600 mt-2">{user?.email}</p>
            </div>
        </div>
    );
};

export default Profile;
