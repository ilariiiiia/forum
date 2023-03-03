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
		console.log(req.query);
		const subName = sub || "planes";
		const subs = JSON.parse(fileContents).subs;
		let i = 0;
		let subIndex = 0;
		subs.forEach((sub : Sub) => {
			if(sub.name == subName){
				subIndex = i;
			}
			i++;
		});
		const posts: Post[] = subs[subIndex].posts;
		res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		res.status(500).end('Server error');
	}
}
