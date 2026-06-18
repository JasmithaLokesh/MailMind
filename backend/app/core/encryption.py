import json
import base64
import hashlib

from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad


SECRET_KEY = "MAILMIND_2026_SECRET"


def decrypt_payload(payload: str):

    key = hashlib.sha256(
        SECRET_KEY.encode()
    ).digest()

    raw = base64.b64decode(payload)

    iv = raw[:16]

    cipher_text = raw[16:]

    cipher = AES.new(
        key,
        AES.MODE_CBC,
        iv
    )

    decrypted = unpad(
        cipher.decrypt(cipher_text),
        AES.block_size
    )

    return json.loads(
        decrypted.decode("utf-8")
    )