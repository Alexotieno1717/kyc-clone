// import { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   const { accountNumber, amount } = req.body;

//   if (!accountNumber || !amount) {
//     return res.status(400).json({ error: 'Missing accountNumber or amount' });
//   }

//   const url = `http://197.248.4.233/mswali/mswali_app/backend/web/index.php?r=api/initiate-payment`;
//   const queryParams = new URLSearchParams();
//   queryParams.append('account_number', accountNumber.toString());
//   queryParams.append('amount', amount.toString());

//   console.log(`Request URL: ${url}&${queryParams.toString()}`);

//   try {
//     const response = await axios.get(`${url}&${queryParams.toString()}`, {
//       headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.status !== 200) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     res.json(response.data);
//   } catch (error: any) {
//     console.error('Error fetching data:', error.response ? error.response.data : error.message);
//     res.status(500).json({ error: 'Internal Server Error', details: error.response ? error.response.data : error.message });
//   }
// }





import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const url = `http://197.248.4.233/mswali/mswali_app/backend/web/index.php?r=api/initiate-payment`;

  try {
    const accountNumber = req.query.accountNumber;
    const amount = req.query.amount;

    console.log(req.query)

    const queryParams = new URLSearchParams();
    if (accountNumber) queryParams.append('account_number', accountNumber.toString());
    if (amount) queryParams.append('amount', amount.toString());

    console.log(queryParams)

    const response = await fetch(`${url}&${queryParams}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}