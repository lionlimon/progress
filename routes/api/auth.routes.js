import express from 'express';
import httpCodes from 'http-status-codes';
import bcrypt from 'bcryptjs';
import expressValidator from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import mapValidation from '../../mapValidation';
import { JWT_SECRET } from '../../config';

const { validationResult } = expressValidator;
const { StatusCodes, getReasonPhrase } = httpCodes;
const { BAD_REQUEST } = StatusCodes;

const router = express.Router();

router.post('register/',
  mapValidation(['password', 'email']),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const foundedUser = User.findOne({ email });

    const hashedPassword = await bcrypt.hash(password, 12);

    if (foundedUser) return res.status(BAD_REQUEST).json({ message: getReasonPhrase(BAD_REQUEST) });

    const user = new User({ email, password: hashedPassword });
    await user.save();
  });

router.post('login/', mapValidation(['password', 'email']),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const foundedUser = User.findOne({ email });

    if (!foundedUser) {
      return res.status(BAD_REQUEST).json({ message: getReasonPhrase(BAD_REQUEST) });
    }

    const psswordIsMatch = await bcrypt.compare(foundedUser.password, password);

    if (!psswordIsMatch) {
      return res.status(BAD_REQUEST).json({ message: LOGIN_FAILED });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user: foundedUser });
  });

export default router;
