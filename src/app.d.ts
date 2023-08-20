// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				id: number,
				username: string,
				first_name: string,
				last_name: string,
				email: string,
				password_hash: string,
				is_verified: boolean
				created_at: Date
				tier: string,
				role: string
				profile_picture: string
				last_login_at: Date
				is_active: boolean,
				encryption_key: string,
				subscription: string
			}
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
