//import { randomBytes } from 'crypto';
//
//// Generar una clave secreta de 64 caracteres en formato hexadecimal
//const secretKey = randomBytes(32).toString('hex');
//
//export const {
//    PORT_SERVER = 3000,          // Puerto por defecto del servidor
//    DB_HOST = "localhost",       // Nombre del host o servicio definido en docker-compose.yml
//    DB_PORT = 5432,              // Puerto por defecto de PostgreSQL
//    DB_NAME = "bd_maquinaria",   // Nombre de la base de datos
//    DB_USER = "postgres",        // Usuario de la base de datos
//    DB_PASSWORD = "MAQUINARIA123",       // Contraseña del usuario
//    SECRET_KEY = secretKey,
//    apiKey = "AIzaSyDtHsht4FKBFIhkbcnQrC2G3G6eKUEiVPk",
//    authDomain = "sistema-juarez-de-oriente.firebaseapp.com",
//    projectId = "sistema-juarez-de-oriente",
//    storageBucket = "sistema-juarez-de-oriente.firebaseapp.com",
//    messagingSenderId = "343706863287",
//    appId = "1:343706863287:web:9190894c381099c4f8ef32",
//    measurementId = "G-309SJVELQM",
//} = process.env;


import { randomBytes } from 'node:crypto';
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

// Generar una clave secreta si no está definida en el .env
const secretKey = process.env.SECRET_KEY || randomBytes(32).toString('hex');

// Exportar un objeto con todas las variables de entorno
export const config = {
    PORT_SERVER: process.env.PORT_SERVER || 3000,
    DB_HOST: process.env.PGHOST || "localhost",
    DB_PORT: process.env.PGPORT || 5432,
    DB_NAME: process.env.PGDATABASE || "bd_maquinaria",
    DB_USER: process.env.PGUSER || "postgres",
    DB_PASSWORD: process.env.PGPASSWORD || "MAQUINARIA123",
    SECRET_KEY: process.env.SECRET_KEY || "eb76ef171b6fdf80407c14d02edfd364646582e92c38f55dcfb1a81d99255844", // Usa la clave del .env o genera una nueva
    DATABASE_URL: process.env.DATABASE_URL ||"postgresql://postgres:MAQUINARIA123@localhost:5432/bd_maquinaria",



    // Configuración de Firebase
    API_KEY: process.env.API_KEY || "",
    AUTH_DOMAIN: process.env.AUTH_DOMAIN || "",
    PROJECT_ID: process.env.PROJECT_ID || "",
    STORAGE_BUCKET: process.env.STORAGE_BUCKET || "",
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID || "",
    APP_ID: process.env.APP_ID || "",
    MEASUREMENT_ID: process.env.MEASUREMENT_ID || "",

    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Escapar correctamente los saltos de línea
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,

};
