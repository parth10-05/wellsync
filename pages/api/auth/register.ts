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
    const { name, email, password, confirmPassword } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (!email.includes('@') || password.length < 6) {
      return res.status(400).json({ message: 'Invalid email or password too short' });
    }

    // Mock successful registration
    return res.status(201).json({
      token: `mock_jwt_token_${Date.now()}`,
      user: {
        id: '1',
        name: name,
        email: email,
        isPremium: false
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 