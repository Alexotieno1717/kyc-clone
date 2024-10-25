"use client"


import React, { useState } from 'react';
import { Check } from "lucide-react";
import { ErrorAlert, SuccessAlert } from "@/utils/alerts";
import { Button } from "@/components/ui/button"; // Ensure Button component exists
import axios from "axios";

interface ResponseData {
  surname: string;
  serial_no: string;
  photo: string;
  other_name: string;
  id_number: string;
  gender: string;
  first_name: string;
  family: string;
  dob: string;
  citizenship: string;
  valid: boolean;
}

const Home = () => {
  const [idNumber, setIdNumber] = useState('');
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/handle', { idNumber });
      const data: ResponseData = response.data;

      if (data.id_number !== idNumber) {
        setError('The Id Number and Date of Birth provided do not match.');
        ErrorAlert('The details provided do not match!');
        setResponseData(null);
      } else {
        setError(null);
        setResponseData(data);
        SuccessAlert("Fetching data...");
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request.');
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="mx-auto max-w-7xl bg-gray-100 border border-gray-100 rounded-xl">
        <div className="grid grid-cols-12 gap-6">
          <div
              className="col-span-3 relative overflow-hidden"
              style={{ background: 'linear-gradient(to bottom, #78B9E4, #78B9E4, #78B9E4, white)' }}
          >
            <img
                src="/sideimg.png"
                alt="side image"
                className="absolute top-0 left-0 w-full h-full object-cover opacity-40"
            />
            <h1 className="text-2xl text-[#475467] font-extrabold text-center pt-4 pb-5 relative">KYC</h1>
            <div className="px-[63px] relative bg-transparent">
              <h2 className="pb-3">Account</h2>
              <div className="relative pb-[382px]">
                <div className="absolute top-6 left-3 w-0.5 h-full bg-gray-300"></div>
                <ul className="space-y-[100px]">
                  <li className="flex items-center space-x-4 relative z-10">
                      <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-yellow-300 bg-yellow-300">
                          <Check className="w-5 h-5" />
                      </span>
                    <span className="font-bold text-gray-800">User’s Details</span>
                  </li>
                  <li className={`flex items-center space-x-4 relative z-10`}>
                      <span
                          // className="w-6 h-6 rounded-full border-2 flex items-center justify-center "
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center  ${responseData ? 'border-yellow-300 bg-yellow-300' : 'border-black bg-black'}`}
                      >
                          <Check className="w-5 h-5" />
                      </span>
                    <span className="font-bold text-gray-800">Verify</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-9">
            <div className="px-10 py-6 mx-auto">
              <div className="flex items-center justify-center mx-auto space-x-2 mb-7 bg-blue-400 rounded-full w-fit">
                <button
                    // className="py-2 px-8 rounded-full transition-colors duration-300 bg-white text-gray-900"
                    className={`py-2 px-8 rounded-full transition-colors duration-300 ${responseData === null ? ' bg-white text-gray-900' : ' bg-transparent text-white'}`}

                >
                  ID Number
                </button>
                <button
                    // className="py-2 px-8 rounded-full transition-colors duration-300"
                    className={`py-2 px-8 rounded-full transition-colors duration-300 ${responseData ? ' bg-white text-gray-900' : ' bg-transparent text-gray-900'}`}
                >
                  User Details
                </button>
              </div>
            </div>

            <main className='max-w-4xl'>
              <form onSubmit={handleSubmit} className="flex items-center space-x-4">
                <div className="flex-grow">
                  <input
                      type="number"
                      min={0}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdNumber(e.target.value)}
                      placeholder="Enter your ID Number"
                      className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2"
                      required
                  />
                </div>
                <Button className="mt-0" type="submit" disabled={loading}>
                  {loading ? 'Loading...' : 'Search'}
                </Button>
              </form>

              {error && <div className="mt-4 text-red-500">{error}</div>}

              {responseData && (
                  <div className="mt-12 overflow-x-auto">
                    <table
                        className="w-full min-w-max table-auto text-left shadow-md rounded-md divide-y divide-gray-200">
                      <thead className="text-lg bg-gray-100 uppercase">
                      <tr>
                        <th className="px-1 py-2 text-left text-xs font-medium text-gray-500">First
                          Name
                        </th>
                        <th className="px-1 py-2 text-left text-xs font-medium text-gray-500">Other
                          Name
                        </th>
                        <th className="px-1 py-2 text-left text-xs font-medium text-gray-500">Surname</th>
                        <th className="px-1 py-2 text-left text-xs font-medium text-gray-500">ID
                          Number
                        </th>
                        <th className="px-1 py-2 text-left text-xs font-medium text-gray-500">Serial
                          Number
                        </th>
                      </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="even:bg-blue-gray-50/50">
                        <td className="px-6 py-4 whitespace-nowrap pl-2">{responseData.first_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap pl-2">{responseData.other_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap pl-2">{responseData.surname}</td>
                        <td className="px-6 py-4 whitespace-nowrap pl-2">{responseData.id_number}</td>
                        <td className="px-6 py-4 whitespace-nowrap pl-2">{responseData.serial_no}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
              )}
            </main>
          </div>
        </div>
      </div>
  );
};

export default Home;
