import { Request, Response } from 'express';
import * as UserService from '../services/user.service';
import { IUser } from '../interfaces/IUser';
import jwt from 'jsonwebtoken';


interface TokenPayload {
  id: string;
  isAdmin: boolean;
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const Users = await UserService.getAllUsersService();
    if (!Users) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    res.json(Users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const User = await UserService.getUserByIdService(id);
    if (!User) {
      res.status(404).json({ msg: 'User not found' });
      return;
    }
    res.json(User);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const updatedUserFromBody: IUser = req.body;  
  try {    
  if (updatedUserFromBody) {
    const updatedUser = await UserService.updateUserService(updatedUserFromBody);    
    if (!updatedUser) {
      res.status(404).json({ msg: 'User not found' });
      return;
  }
    res.json({ msg: 'User updated', updatedUser });
}
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const createNewUser = async (req: Request, res: Response): Promise<void> => {
  const userFromBody: IUser = req.body;    
  try {
    if (userFromBody) {
      const newUser = await UserService.createNewUserService(userFromBody);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
      const result = await UserService.deleteUserService(req.params.id);
      res.json(result);
  } catch (error: any) {
    console.error(error);
  }
}
