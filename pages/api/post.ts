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
  res: NextApiResponse<string>
) {
	try {
		const jsonDirectory = path.join(process.cwd(), 'data/posts.json');
		const fileContents = await fs.readFile(jsonDirectory, 'utf8');
		let newJSON = JSON.parse(fileContents).subs;
		let i = 0;
		let subIndex = 0;
		newJSON.forEach((sub : Sub) => {
			if(sub.name == req.body.sub){
				subIndex = i;
			}
			i++;
		});
		console.log(newJSON[subIndex].posts);
		newJSON[subIndex].posts.push({
			"title" : req.body.title,
			"content" : req.body.content
		});
		newJSON = {"subs":newJSON};
		await fs.writeFile(
		  jsonDirectory,
		  JSON.stringify(newJSON, null, 2),
		  (err: fs.ErrnoException | null) => {
		    if (err) {
		      console.error(err);
		    } else {
		      console.log('File saved successfully.');
		    }
		  }
		);
		res.status(200).json("success!");
	} catch (error) {
		console.error(error);
		res.status(500).end('Server error');
	}
}
