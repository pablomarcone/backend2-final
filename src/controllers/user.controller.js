import { userRepository } from '../service/factory.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config/config.js';
import { UserDTO } from '../dto/user.dto.js';

export const register = async (req, res) => {
    delete req.user.password
    res.setHeader('Content-Type', 'application/json')
    res.status(201).json({ message: `Registro exitoso`, nuevoUsuario: req.user })
}

export const login = async (req, res) => {
    try {
        const user = {
            id: req.user._id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email,
            age: req.user.age,
            role: req.user.role
        }
        delete user.password;
        const token = jwt.sign(user, config.jwt_secret, { expiresIn: config.jwt_expires_in });
        res.cookie(config.jwt_cookie_name, token, { httpOnly: true, maxAge: config.jwt_expires_in * 1000 });
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ message: `Login exitoso`, token: token, user: user })
    } catch (error) {
        console.log(error.message);
        res.setHeader('Content-Type', 'application/json')
        res.status(400).json({ message: `Error al iniciar sesión` })
    }
}

export const updateUser = async (req, res) => {
    try {
        let { first_name, last_name, age, password, cart } = req.body;
        const { email } = req.user;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            password = hashedPassword;
        }
        const user = await userRepository.updateUser({ email, first_name, last_name, age, password, cart });
        delete user.password;
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ message: `Usuario actualizado`, user: user })
    } catch (error) {
        console.log(error.message);
        res.setHeader('Content-Type', 'application/json')
        res.status(400).json({ message: `Error al actualizar el usuario` })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { email } = req.user;
        const user = await userRepository.deleteUser(email);
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ message: `Usuario eliminado`, user: user })
    } catch (error) {
        console.log(error.message);
        res.setHeader('Content-Type', 'application/json')
        res.status(400).json({ message: `Error al eliminar el usuario` })
    }
}

export const current = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json({ message: `Usuario autenticado`, user: new UserDTO(req.user) })
}

export const logout = async (req, res) => {
    try {
        res.clearCookie(config.jwt_cookie_name);
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ message: `Logout exitoso` })
    } catch (error) {
        console.log(error.message);
        res.setHeader('Content-Type', 'application/json')
        res.status(400).json({ message: `Error al cerrar sesión` })
    }
}

export const register_error = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(400).json({ message: `Error de registro` })
}

export const login_error = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(400).json({ message: `Error de autenticación` })
}

export const current_error = async (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(401).json({ message: `Token no válido o inexistente` })
}