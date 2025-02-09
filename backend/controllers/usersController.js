import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default {
  async register(req, res) {
    try {
      const {username, password} = req.body;
      // TODO: Implement the user registration
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while registering the user.'
      });
    }
  },

  async login(req, res) {
    try {
      const {username, password} = req.body;
      // TODO: Implement the user login
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while logging in.'
      });
    }
  },

  async logout(req, res) {
    try {
      req.session.destroy();
      res.status(200).json({
        message: 'The user has been logged out.',
      });
    }
    catch (err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while logging out.'
      });
    }
  },

  async me(req, res) {
    try {
      // TODO: Implement the retrieval of the currently logged in user's username
    }
    catch(err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while retrieving the user.'
      });
    }
  }
}