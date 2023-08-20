import { prisma } from "$lib/server/database";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {

	const folders = await prisma.folder.findMany({
		where: {
			user_id: locals.user?.id
		},
		orderBy: {
			id: 'asc'
		}
	});
	
	return {
		user: locals.user,
		folders: folders
	};
};
