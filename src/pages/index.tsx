"use client"

import Forms from "@/components/forms/Forms";
import { Button } from "@/components/ui/button";
import { ErrorAlert, SuccessAlert } from "@/utils/alerts";
import axios from "axios";
import { useState } from "react";

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


export default function Home() {
  const [idNumber, setIdNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dob, setDob] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/handle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idNumber, dob }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      SuccessAlert("Fetching data...");

      const data: ResponseData = await response.json();
      // console.log('API Response:', data);

      const formattedDob = new Date(dob).toLocaleDateString('en-US');
      const apiDob = new Date(data.dob).toLocaleDateString('en-US');

      if (data.id_number !== idNumber || apiDob !== formattedDob) {
        setError('The Id Number and Date of Birth provided do not match.');
        setResponseData(null);
      } else {
        setError(null);
        setResponseData(data);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing your request.');
    }
  };

  const handleAmountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = `/api/proxy-initiate-payment?phone=${accountNumber}&amount=${amount}`;
      console.log("api url", apiUrl);
  
      const response = await axios.get(apiUrl);
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      SuccessAlert()
  
      const data = response.data;
      // console.log(data);
      // setPaymentResponse(data);
    } catch (error) {
      console.error('Error:', error);
      ErrorAlert("Your Request Failed!!")
    }
  }


  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

      <form className='py-4 mx-auto max-w-7xl bg-white shadow-md p-8'onSubmit={handleSubmit}>
        <div className='space-y-8'>
            <div>
              <input 
                type="number"
                min={0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIdNumber(e.target.value)} 
                placeholder="Enter your ID Number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div>
            <input 
                    type="date" 
                    placeholder="Date of Birth" 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDob(e.target.value)} 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required 
                />
            </div>
        </div>
        <Button className='mt-4' type="submit">Submit</Button>
      </form>

      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}

      {responseData && (
        <>
          {/* <div className="mt-12">
            <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(responseData, null, 2)}</pre>
          </div> */}
          <div className="mt-12">
            <table className="w-full min-w-max table-auto text-left shadow-md rounded-md divide-y divide-gray-200">
              <thead className="text-lg bg-gray-100 uppercase">
                <tr>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Other Name</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surname</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Number</th>
                  <th className="px-1 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
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

          <div className="mt-12">
          <form className='py-4 mx-auto max-w-7xl bg-white shadow-md p-8' onSubmit={handleAmountSubmit}>
            <div className='space-y-8'>
                <div>
                  <input 
                    type="number"
                    min={0}
                    placeholder="Enter your Phone Number"
                    value={accountNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAccountNumber(e.target.value)} 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div>
                    <input 
                        type="number" 
                        placeholder="Enter Your Amount" 
                        value={amount}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)} 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required 
                    />
                </div>
            </div>
            <Button className='mt-4' type="submit">Submit</Button>
          </form>
          </div>
        </>
      )}
      {/* {paymentResponse && (
        <div className="mt-12">
          <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(paymentResponse, null, 2)}</pre>
        </div>
      )} */}
    </main>
  );
}



