from cryptography.fernet import Fernet
import os

# In a real app, this key should be stored in environment variables
KEY = Fernet.generate_key()
cipher_suite = Fernet(KEY)

def encrypt_data(data: str) -> bytes:
    return cipher_suite.encrypt(data.encode())

def decrypt_data(encrypted_data: bytes) -> str:
    return cipher_suite.decrypt(encrypted_data).decode()
