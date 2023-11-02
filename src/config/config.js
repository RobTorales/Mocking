import dotenv from "dotenv";

dotenv.config();

export const PORT = 8080;
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR;
export const SECRET_KEY_SESSION = process.env.SECRET_KEY_SESSION;
export const JWT_SECRET = process.env.JWT_SECRET;
export const CLIENT_ID_GITHUB = process.env.CLIENT_ID_GITHUB
export const CLIENT_SECRET_GITHUB = process.env.CLIENT_SECRET_GITHUB
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
export const SECRET_SESSIONS = process.env.SECRET_SESSIONS
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
export const PERSISTENCE = process.env.PERSISTENCE;
export const GMAIL_USER = process.env.EMAIL_USER;
export const GMAIL_PASS = process.env.EMAIL_PASS;
export const TWILIO_NUMBER = process.env.TWILIO_NUMBER;
export const TWILIO_SID = process.env.TWILIO_SID;
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;