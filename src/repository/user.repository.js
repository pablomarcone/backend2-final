export class UserRepository {
    constructor(manager) {
        this.manager = manager;
    }
    async createUser(user) {
        try {
            return await this.manager.createUser(user);
        } catch (error) {
            throw new Error("Error al crear el usuario: " + error);
        }
    }
    async getUserByEmail(email) {
        try {
            return await this.manager.getUserByEmail(email);
        } catch (error) {
            throw new Error("Error al obtener el usuario: " + error);
        }
    }
    async updateUser(user) {
        try {
            const updUser = await this.manager.getUserByEmail(user.email);
            if (!updUser) {
                throw new Error("Usuario no encontrado");
            }
            updUser.first_name = user.first_name ? user.first_name : updUser.first_name;
            updUser.last_name = user.last_name ? user.last_name : updUser.last_name;
            updUser.age = user.age ? user.age : updUser.age;
            updUser.password = user.password ? user.password : updUser.password;
            updUser.cart = user.cart ? user.cart : updUser.cart;
            updUser.role = user.role ? user.role : updUser.role;
            return await this.manager.updateUser(updUser);
        } catch (error) {
            throw new Error("Error al actualizar el usuario: " + error);
        }
    }
    async deleteUser(email) {
        try {
            const delUser = await this.manager.getUserByEmail(email);
            if (!delUser) {
                throw new Error("Usuario no encontrado");
            }
            return await this.manager.deleteUser(email);
        } catch (error) {
            throw new Error("Error al eliminar el usuario: " + error);
        }
    }
}
