import type { NextPage } from 'next';
import React, { useState, useEffect, SyntheticEvent } from "react"
import indexStyles from "../styles/header.module.css";
import postStyles from "../styles/post.module.css";
import inputStyles from "../styles/inputStyles.module.css";
import Post from "./_post";

type PostData = {
  title: string;
  content: string;
};

type FormData = {
	title: string;
	content: string;
	sub: string;
}

const Home: NextPage = () => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [hidden, setHidden] = useState(true);	

	const showNewPost = () => {
		setHidden(false);
	}

	const [formData, setFormData] = useState({
		title:"",
		content:"",
		sub:""
	});
	
	const hideNewPost = () => {
		setHidden(true);
	}
	
	function handleSubmit(event : SyntheticEvent) {
		hideNewPost();
		event.preventDefault();
		
		fetch('/api/post', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error(error));
	}
	
	function handleInputChange(event : SyntheticEvent) {
		const { name, value } = event.target;
		
		setFormData(prevState => ({
			...prevState,
			[name]: value,
		}));
	}
	
	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch('/api/getPosts?sub=all');
			const postsData = await response.json();
			setPosts(postsData);
		};
		
		fetchPosts();
		
		const intervalId = setInterval(() => {
			fetchPosts();
		}, 5000);
		
		return () => clearInterval(intervalId);
	}, []);
	
	return (
	<>
	{ hidden ? null : (<div className={inputStyles.newPostWrapper}>
		<form className={inputStyles.newPostContainer} onSubmit={handleSubmit}>
			<label>Title</label>
			<input
				className={inputStyles.newPostTitle}
				name="title"
				onChange={handleInputChange}
				type="text"
				value={formData.title}
				placeholder="title"
			/>
			<label>Content</label>
			<input 
				className={inputStyles.newPostContent}
				name="content"
				onChange={handleInputChange}
				type="text"
				value={formData.content}
				placeholder="content"
			/>
			<label>Sub</label>
			<input 
				className={inputStyles.newPostContent}
				name="sub"
				onChange={handleInputChange}
				type="text"
				value={formData.sub}
				placeholder="sub"
			/>
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
		<div key={index} className={indexStyles.postWrapper}>
			<Post className={postStyles.post} key={index} title={post.title} content={post.content} />
		</div>
	))}
	
	</>
  );
};

export default Home;