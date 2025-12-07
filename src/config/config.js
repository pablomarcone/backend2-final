import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.coder' });

export default {
    PORT: process.env.PORT || 8080,
    mongo_uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}
        ?retryWrites=true&w=majority&appName=${process.env.DB_APP}`,
    paths: {
        public: path.join(__dirname, "../../public"),
        views: path.join(__dirname, "../views"),
    },
    jwt_secret: process.env.JWT_SECRET || 'secret',
    jwt_expires_in: parseInt(process.env.JWT_EXPIRES_IN) || 24 * 60 * 60 * 1000,
    jwt_cookie_name: process.env.JWT_COOKIE_NAME || 'jwt'
};