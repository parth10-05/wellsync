import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    isPremium: boolean;
  };
  message?: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Only allow POST method
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Mock validation - in a real app, this would verify credentials against a database
    if (!email.includes('@') || password.length < 6) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Mock successful authentication
    return res.status(200).json({
      token: `mock_jwt_token_${Date.now()}`,
      user: {
        id: '1',
        name: 'User Smith',
        email: email,
        isPremium: true
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 