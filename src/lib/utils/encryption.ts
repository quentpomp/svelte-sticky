import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

export function generate_key(): string {
	const key = crypto.randomBytes(32);
	return key.toString('hex');
}

export function encrypt_data(data: string, key: string): string {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
	let encrypt_data = cipher.update(data, 'utf8', 'hex');
	encrypt_data += cipher.final('hex');
	return iv.toString('hex') + encrypt_data;
}

export function decrypt_data(encrypted_data: string, key: string): string {
	const iv = Buffer.from(encrypted_data.slice(0, 32), 'hex');
	const data = encrypted_data.slice(32);
	const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
	let decrypted_data = decipher.update(data, 'hex', 'utf8');
	decrypted_data += decipher.final('utf8');
	return decrypted_data;
}
