import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "./userService";

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchAllUsers();
        setUsers(data.data); // Assuming the response format includes a data field
      } catch (error) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-gray-100 p-5">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-4">Admin Panel - User Data</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Father</th>
                <th className="py-3 px-4 text-left">Phone Number</th>
                <th className="py-3 px-4 text-left">State</th>
                <th className="py-3 px-4 text-left">District Name</th>
                <th className="py-3 px-4 text-left">Education</th>
                <th className="py-3 px-4 text-left">Job</th>
                <th className="py-3 px-4 text-left">Category</th>
                <th className="py-3 px-4 text-left">Lok Sabha Constituency</th>
                <th className="py-3 px-4 text-left">Vidhan Sabha Constituency</th>
                <th className="py-3 px-4 text-left">Tehsil</th>
                <th className="py-3 px-4 text-left">Zila Panchayat Constituency</th>
                <th className="py-3 px-4 text-left">Janpad Panchayat Constituency</th>
                <th className="py-3 px-4 text-left">Municipal Corporation</th>
                <th className="py-3 px-4 text-left">Municipality</th>
                <th className="py-3 px-4 text-left">Nagar Panchayat</th>
                <th className="py-3 px-4 text-left">Gram Panchayat</th>
                <th className="py-3 px-4 text-left">Ward No</th>
                <th className="py-3 px-4 text-left">Pincode</th>
                <th className="py-3 px-4 text-left">Sagetan</th>
                <th className="py-3 px-4 text-left">Marrid</th>
                <th className="py-3 px-4 text-left">Photo</th>
                <th className="py-3 px-4 text-left">Screenshot</th>
    
    
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="border-t border-gray-200">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{user.randomCode}</td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.father}</td>
                  <td className="py-3 px-4">{user.number}</td>
                  <td className="py-3 px-4">{user.statename}</td>
                  <td className="py-3 px-4">{user.districtname}</td>
                  <td className="py-3 px-4">{user.education}</td>
                  <td className="py-3 px-4">{user.job}</td>
                  <td className="py-3 px-4">{user.category}</td>
                  <td className="py-3 px-4">{user.loksabhaconstituencyname}</td>
                  <td className="py-3 px-4">{user.vidhansabhaconstituencyname}</td>
                  <td className="py-3 px-4">{user.tehsilname}</td>
                  <td className="py-3 px-4">{user.zilapanchayatconstituencyname}</td>
                  <td className="py-3 px-4">{user.janpadpanchayatconstituencyname}</td>
                  <td className="py-3 px-4">{user.municipalcorporationname}</td>
                  <td className="py-3 px-4">{user.municipalityname}</td>
                  <td className="py-3 px-4">{user.nagarpanchayatname}</td>
                  <td className="py-3 px-4">{user.grampanchayatname}</td>
                  <td className="py-3 px-4">{user.wardno}</td>
                  <td className="py-3 px-4">{user.pincode}</td>
                  <td className="py-3 px-4">{user.sagetan}</td>
                  <td className="py-3 px-4">{user.marrid}</td>
                       <td className="py-3 px-4">{user.image}</td>
  <td className="py-3 px-4">{user.screenshot}</td>
  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserData;
