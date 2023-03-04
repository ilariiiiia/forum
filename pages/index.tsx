import type { NextPage } from 'next';
import React, { useState, useEffect, SyntheticEvent } from "react"
import indexStyles from "../styles/header.module.css";
import postStyles from "../styles/post.module.css";
import inputStyles from "../styles/inputStyles.module.css";
import Post from "./_post.tsx";
import PostForm from "./_newPostForm.tsx";

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
	const [formData, setFormData] = useState({
		title:"",
		content:"",
		sub:""
	});

	const hideNewPost = () => {
		setHidden(true);
	}

	const showNewPost = () => {
		setHidden(false);
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
	{ hidden ? null : (<PostForm/>) }
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