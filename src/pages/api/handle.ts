import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { idNumber, dob } = req.body;
  if (!idNumber || !dob) {
    return res.status(400).json({ message: 'Missing required parameters' });
  }

  const formattedDob = new Date(dob).toLocaleDateString('en-US');

  const url = `http://165.22.46.7/olive-tree-demos/api/kyc.php?id_number=${idNumber}&dob=${formattedDob}`;

  try {
    const response = await axios.post(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
