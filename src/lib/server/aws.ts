import { S3_ACCESS_KEY, S3_REGION, S3_SECRET_KEY } from "$env/static/private";
import { S3Client } from "@aws-sdk/client-s3";

export const S3 = new S3Client({
	region: S3_REGION,
	credentials: {
		accessKeyId: S3_ACCESS_KEY,
		secretAccessKey: S3_SECRET_KEY
	},
});


// const video = data.get('youtube_video') as File;
// const video_key = '';
// if (video == null || video instanceof File === false || video.size === 0) {
//     return fail(400);
// }
// const send = await S3.send(
//     new PutObjectCommand({
//         Bucket: S3_BUCKET,
//         Key: video.name,
//         Body: (await video.arrayBuffer()) as Buffer
//     })
// );