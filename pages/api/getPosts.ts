// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises';
import path from 'path';

type Post = {
  title: string;
  content: string;
};

type Sub = {
	name: string;
	posts: [Post];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[]>
) {
	try {
		const jsonDirectory = path.join(process.cwd(), 'data/posts.json');
		const fileContents = await fs.readFile(jsonDirectory, 'utf8');
		let { sub } = req.query;
		const subName = sub || "any";
		const subs = JSON.parse(fileContents).subs;
		let i = 0;
		let subIndex = 0;
		let found = false;
		subs.forEach((sub : Sub) => {
			if(sub.name == subName){
				subIndex = i;
				found = true;
			}
			i++;
		});
		if(!found){
			res.status(200).json([{
				"title":"No posts available. Be the first one!",
				"content":""
			}])
		}
		const posts: Post[] = subs[subIndex].posts;
		res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).end('Server error');
	}
}
