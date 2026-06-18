import CryptoJS from "crypto-js";

const SECRET_KEY =
  "MAILMIND_2026_SECRET";

export const encryptData = (
  data: any
) => {

  const key =
    CryptoJS.SHA256(
      SECRET_KEY
    );

  const iv =
    CryptoJS.lib.WordArray.random(
      16
    );

  const encrypted =
    CryptoJS.AES.encrypt(
      JSON.stringify(data),
      key,
      {
        iv,
        mode: CryptoJS.mode.CBC,
        padding:
          CryptoJS.pad.Pkcs7,
      }
    );

  const combined =
    iv.concat(
      encrypted.ciphertext
    );

  return CryptoJS.enc.Base64.stringify(
    combined
  );
};