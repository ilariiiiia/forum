import type { NextPage } from 'next';
import React, { useState, useEffect } from "react"
import indexStyles from "../styles/header.module.css";
import postStyles from "../styles/post.module.css";
import inputStyles from "../styles/inputStyles.module.css";
import Post from "./_post.tsx";

type PostData = {
  title: string;
  content: string;
};

const Home: NextPage = () => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [hidden, setHidden] = useState<boolean>(true);

	const hideNewPost = () => {
		setHidden(true);
	}

	const showNewPost = () => {
		setHidden(false);
	}

	const submitNewPost = () => {
		
	}
	
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/getPosts?sub=animals');
			const postsData = await response.json();
			setPosts(postsData);
		};
		fetchPosts();
		}, []);
	
	return (
	<>
	{ hidden ? null : (<div className={inputStyles.newPostWrapper}>
		<form className={inputStyles.newPostContainer} method="POST" action="/api/post">
			<label>Title</label>
			<input className={inputStyles.newPostTitle} type="text" placeholder="title" />
			<label>Body</label>
			<input className={inputStyles.newPostContent} type="text" placeholder="content" />
			<input type="submit" value="Post"></input>
			<button onClick={hideNewPost}>Close</button>
		</form>
	</div>) }
	<div className={indexStyles.header}>
		<div className={indexStyles.headerElement}>
		  Title
		</div>
	</div>
	<div className={indexStyles.searchBar}>
		<input type="text" placeholder="search for a sub..."></input>
		<button onClick={showNewPost}>New post</button>
	</div>
	
	{posts.map((post, index) => (
		<div className={indexStyles.postWrapper}>
			<Post className={postStyles.post} key={index} title={post.title} content={post.content} />
		</div>
	))}
	
	</>
  );
};

export default Home;