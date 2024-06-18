// pages/api/proxy-initiate-payment.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, amount } = req.query;

  try {
    const response = await axios.get(`http://165.22.46.7/olive-tree-demos/api/deposit.php`, {
      params: {
        phone,
        amount,
      },
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json(error.response?.data || 'Internal Server Error');
    } else {
      res.status(500).json('Internal Server Error');
    }
  }
}
