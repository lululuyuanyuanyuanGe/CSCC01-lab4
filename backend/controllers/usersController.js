import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import crypto from 'crypto';

export default {
  async register(req, res) {
    try {
      const {username, password} = req.body;
      // TODO: Implement the user registration

      if (!username || !password) {
        return res.status(400).json({ error: "Missing parameters in the request body" });
      }

      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(400).json({ error: "The username is already taken." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await User.create({
        username,
        password: hashedPassword,
      });

      res.status(201).json({ message: "The user has been successfully registered" });
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
      if (!username || !password) {
        return res.status(400).json({ error: "Missing parameters in the request body" });
      }

      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ error: "The username/password is incorrect" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "The username/password is incorrect" });
      }

      req.session.userId = user.id;
      req.session.username = user.username;

      res.status(201).json({ message: "Logged in successfully" });
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
      if (!req.session.userId) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      // Return user info from the session
      res.status(200).json({
        id: req.session.userId,
        username: req.session.username
      });
    }
    catch(err) {
      console.error(err);
      res.status(500).json({
        error: 'An error occurred while retrieving the user.'
      });
    }
  }
}