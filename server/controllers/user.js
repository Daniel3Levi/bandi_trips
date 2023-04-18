import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';

export const register = tryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  if (password.length < 6) {
    res.statusCode = 400;
    res.json({
      success: false,
      message: 'Password must be six characters or more.',
    });
  }
  const emailLowerCase = email.toLowerCase();

  // check if the user already exists
  const existsUser = await User.findOne({ email: emailLowerCase });
  if (existsUser) {
    res.statusCode = 400;
    return res.json({ success: false, message: 'User already exists.' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  //create new user

  const user = await User.create({
    name,
    email: emailLowerCase,
    password: hashedPassword,
  });
  // for client side
  const { _id: id, photoURL } = user;

  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.statusCode = 201;
  return res.json({
    success: true,
    result: { id, name, email: user.email, photoURL, token },
    message: 'User created successfully.',
  });
});

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();

  // check if the user  exists
  const existsUser = await User.findOne({ email: emailLowerCase });
  if (!existsUser) {
    res.statusCode = 400;
    return res.json({ success: false, message: 'User dosen`t exists.' });
  }

  const correctPassword = await bcrypt.compare(password, existsUser.password);
  if (!correctPassword) {
    res.statusCode = 400;
    return res.json({ success: false, message: 'Invalid Password' });
  }

  // for client side
  const { _id: id, name, photoURL } = existsUser;

  const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.statusCode = 200;
  res.json({
    success: true,
    result: { id, name, email: emailLowerCase, photoURL, token },
    message: 'User login successfully.',
  });
});
