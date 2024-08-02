// @ts-ignore
import CryptoJS from "crypto-js";

const cryptoKey = process.env.NEXT_PUBLIC_CRYPTO_KEY;

export const dataEncrypt = (message: string) => {
  if (typeof message !== "string") return false;
  return CryptoJS.AES.encrypt(message, cryptoKey as string).toString();
};

export const dataDecrypt = (message: string) => {
  if (typeof message !== "string") return false;
  const byte = CryptoJS.AES.decrypt(message, cryptoKey as string);
  return byte.toString(CryptoJS.enc.Utf8);
};
