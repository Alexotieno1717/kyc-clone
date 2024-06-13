import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let data = new FormData();
  data.append('id_number', req.body.idNumber);
  data.append('dob', req.body.dob);

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://161.35.6.91/iprs/index.php',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    },
  };

  try {
    const response = await axios.request(config);
    // console.log('API response:', response.data);

    // Parse the API response JSON string into an object
    const parsedResponse = JSON.parse(response.data);

    // Send the parsed JSON response
    res.status(response.status).json(parsedResponse);
  } catch (error) {
    console.error('Error:', error);
    // res.status(error.response.status).json({ status: error.response.status, message: error.message });
  }
}