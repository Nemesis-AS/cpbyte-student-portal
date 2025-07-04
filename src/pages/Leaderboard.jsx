import React, { useEffect, useState } from "react";
import trophy from "../../public/trophy.png";
import noimage from "../../public/noImage.webp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../redux/slices/Leaderboard";
import { FiLoader } from "react-icons/fi";

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.leaderboard);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!users || users.length == 0){ 
      dispatch(getAll({}));
    }
  }, []);

  useEffect(() => {
    setData(users);
  }, [users]);

  return (
    <div className=" p-4 bg-gray-950 w-full lg:p-8 min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold my-4 text-center text-white drop-shadow-lg">
          Leaderboard🚀
        </h1>
        {!loading && <div className="w-full p-4 lg:p-12 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full">
            {data?.map(
              (item, index) =>
                index < 3 && (
                  <div
                    key={item.id}
                    className={`relative w-full border-3 ${
                      index == 0
                        ? "md:col-span-2 lg:col-span-1 border-amber-400"
                        : index == 1
                        ? "border-gray-500"
                        : "border-yellow-700"
                    } flex shadow-lg shadow-gray-900 flex-col text-white text-2xl rounded-lg p-4`}
                  >
                    <div className="flex items-center justify-between font-bold w-full">
                      <Link
                        to={`/u/dashboard/${item.library_id}`}
                        className="flex md:flex-col lg:flex items-center gap-4 font-bold w-full"
                      >
                        <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center">
                          <img
                            src={item?.avatar || noimage}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="overflow-hidden text-nowrap">
                          {item?.name}
                        </span>
                      </Link>
                      <div className="absolute w-18 h-18 overflow-hidden flex items-center justify-center right-0">
                        <img src={trophy} alt="" className="w-18 h-18" />
                      </div>
                    </div>
                    <div className="flex w-full items-center mt-4">
                      <div className="w-full flex flex-col items-center">
                        <h1 className="text-gray-500 text-lg font-semibold">
                          Rank
                        </h1>
                        <h1 className="text-white text-2xl font-bold">
                          {index + 1}
                        </h1>
                      </div>
                      <div className="w-full flex flex-col items-center">
                        <h1 className="text-gray-500 text-lg font-semibold">
                          Total
                        </h1>
                        <h1 className="text-white text-2xl font-bold">
                          {item?.solvedProblems}
                        </h1>
                      </div>
                      <div className="w-full flex flex-col items-center">
                        <h1 className="text-gray-500 text-lg font-semibold">
                          Language
                        </h1>
                        <h1 className="text-white text-2xl font-bold">
                          {item?.language}
                        </h1>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>

          <div className="overflow-x-auto mt-12">
            <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg">
              <thead className="bg-gray-950">
                <tr className="text-left">
                  <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                    Year
                  </th>
                  <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                    Language
                  </th>
                  <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                    Total
                  </th>
                  <th className="py-3 px-6 text-gray-300 text-sm font-bold uppercase tracking-wider">
                    Previous
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item, index) => (
                  <tr key={item.id} className="border-b border-gray-700">
                    <td className="py-3 px-6 text-white">{index + 1}</td>
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                          <img
                            src={item.avatar || noimage}
                            alt="avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Link
                          to={`/Tracker/${item.library_id}`}
                          className="text-white hover:text-gray-400 text-nowrap"
                        >
                          {item.name}
                        </Link>
                      </div>
                    </td>
                    <td
                      className={`text-white hover:text-gray-400 text-nowrap py-3 px-6`}
                    >
                      {item.year}
                    </td>
                    <td className="py-3 px-6 text-white">{item.language}</td>
                    <td className="py-3 px-6 text-white">
                      {item.solvedProblems}
                    </td>
                    <td className="py-3 px-6">
                      <div className="flex gap-2">
                        {item.previous.map((day, idx) => (
                          <div
                            key={idx}
                            className={`w-5 h-5 rounded-md ${
                              day === 0 ? "bg-red-500" : "bg-green-500"
                            }`}
                          ></div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>}
        {
          loading && <div className="w-full mt-16 flex justify-center items-center"><FiLoader size={40} color='white' className='animate-spin'/></div>
        }
      </div>
    </div>
  );
};

export default Leaderboard;
