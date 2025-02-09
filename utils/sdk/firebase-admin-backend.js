//import admin from 'firebase-admin';
//import { readFileSync } from 'fs';
//import path from 'path';
//
//// Lee el archivo JSON
//const serviceAccount = JSON.parse(
//  readFileSync(path.resolve('utils/sdk/serviceAccountKey.json'), 'utf-8')
//);
//
//// Inicializa Firebase Admin SDK
//export const adminSDK = admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount),
//});
//
//console.log("Firebase Admin SDK initialized!");
//


import admin from 'firebase-admin';
import { config } from "../../config/config.js";

const { type, project_id, private_key,client_x509_cert_url, private_key_id, client_email, client_id, auth_uri, token_uri, auth_provider_x509_cert_url, universe_domain } = config;

// Define las credenciales como un objeto JavaScript
const serviceAccount = {
  type: type,
  project_id: project_id,
  private_key_id: private_key_id,
  private_key: private_key,
  client_email: client_email,
  client_id: client_id,
  auth_uri: auth_uri,
  token_uri: token_uri,
  auth_provider_x509_cert_url: auth_provider_x509_cert_url,
  client_x509_cert_url: client_x509_cert_url,
  universe_domain: universe_domain
};

// Inicializa Firebase Admin SDK
export const adminSDK = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Firebase Admin SDK initialized!");