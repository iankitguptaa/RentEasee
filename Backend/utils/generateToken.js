import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'rentease_super_secret_jwt_key_2026_dev', {
    expiresIn: '30d',
  });
};

export default generateToken;
