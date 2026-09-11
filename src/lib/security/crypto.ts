import crypto from 'crypto';

// AES-256-GCM configuration
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH_BYTES = 12; // Standard 96-bit IV for GCM
const AUTH_TAG_LENGTH_BYTES = 16; // Standard 128-bit Auth Tag

// Fallback key for dev environment (In production: loaded via process.env.VSP_ENCRYPTION_KEY)
const DEFAULT_SECRET = process.env.VSP_ENCRYPTION_KEY || 'vsp_prime_panama_master_encryption_key_32bytes_sec!';

function getEncryptionKey(): Buffer {
  // Ensure the key is exactly 32 bytes (256 bits) via SHA-256
  return crypto.createHash('sha256').update(DEFAULT_SECRET).digest();
}

export interface EncryptedData {
  ciphertext: string;
  iv: string;
  authTag: string;
  algorithm: string;
}

/**
 * Encrypts sensitive text or PII using AES-256-GCM authenticated encryption.
 */
export function encryptAES256GCM(plaintext: string): EncryptedData {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH_BYTES);
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH_BYTES,
  });

  let ciphertext = cipher.update(plaintext, 'utf8', 'hex');
  ciphertext += cipher.final('hex');

  const authTag = cipher.getAuthTag().toString('hex');

  return {
    ciphertext,
    iv: iv.toString('hex'),
    authTag,
    algorithm: ALGORITHM,
  };
}

/**
 * Decrypts ciphertext encrypted with encryptAES256GCM. Throws if tampered with.
 */
export function decryptAES256GCM(encrypted: EncryptedData): string {
  const key = getEncryptionKey();
  const iv = Buffer.from(encrypted.iv, 'hex');
  const authTag = Buffer.from(encrypted.authTag, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv, {
    authTagLength: AUTH_TAG_LENGTH_BYTES,
  });

  decipher.setAuthTag(authTag);

  let plaintext = decipher.update(encrypted.ciphertext, 'hex', 'utf8');
  plaintext += decipher.final('utf8');

  return plaintext;
}
