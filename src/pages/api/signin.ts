import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password } = req.body;

    try {
        const response = await axios.post(`http://161.35.6.91/bonga_api/auth?email=${email}&password=${password}&action=login`);

        // Set token in HttpOnly cookie
        res.setHeader('Set-Cookie', `token=${response.data.token}; HttpOnly; Path=/; Secure; SameSite=Strict`);

        res.status(response.status).json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            res.status(error.response?.status || 500).json(error.response?.data || 'Internal Server Error');
        } else {
            res.status(500).json('Internal Server Error');
        }
    }
}
