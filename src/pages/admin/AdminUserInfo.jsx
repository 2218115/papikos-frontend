import React, { useState } from "react";

const AdminUserInfoPage = () => {
  const user = {
    id: 1,
    avatar: null,
    name: "Makrus Ali",
    email: "makrus361@gmail.com",
    email_verified_at: null,
    role: "ADMIN",
    created_at: "2024-12-16T23:13:35.000000Z",
    updated_at: "2024-12-16T23:13:35.000000Z",
  };

  const [avatar, setAvatar] = useState(user.avatar);
  const [preview, setPreview] = useState(user.avatar);
  const [isChanged, setIsChanged] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set preview to the file URL
        setAvatar(file); // Set avatar to the file object
        setIsChanged(true); // Mark as changed
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (isChanged && avatar) {
      console.log("Avatar uploaded:", avatar);
      // Here, you can handle the upload logic, e.g., sending to API
      setIsChanged(false); // Reset change state after save
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 w-full">
      <nav className="flex text-sm mb-8 text-gray-500">
        <ol className="list-none p-0 inline-flex">
          <li>User Detail</li>
        </ol>
      </nav>

      <div className="mb-4">
        <p className="text-xs mb-2 text-gray-500">Role Pengguna</p>
        <span
          className={`px-3 py-1 inline-flex leading-5 font-semibold rounded-full ${
            user.role === "ADMIN"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {user.role}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden mb-4 relative">
            {preview ? (
              <img
                src={preview}
                alt={`${user.name}'s avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                No Avatar
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            onChange={handleAvatarChange}
          />
          <button
            className={`mt-4 px-4 py-2 rounded-md text-white transition w-full ${
              isChanged
                ? "bg-blue-500 hover:bg-blue-600 shadow-md shadow-blue-200"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            onClick={handleSave}
            disabled={!isChanged}
          >
            Save
          </button>
        </div>

        <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-xs mb-1 text-gray-500">
              Nama
            </label>
            <input
              type="text"
              id="name"
              value={user.name}
              disabled
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-xs mb-1 text-gray-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              disabled
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="created_at" className="text-xs mb-1 text-gray-500">
              Dibuat Pada
            </label>
            <input
              type="text"
              id="created_at"
              value={new Date(user.created_at).toLocaleString()}
              disabled
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-gray-100"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="updated_at" className="text-xs mb-1 text-gray-500">
              Diperbarui Pada
            </label>
            <input
              type="text"
              id="updated_at"
              value={new Date(user.updated_at).toLocaleString()}
              disabled
              className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserInfoPage;
