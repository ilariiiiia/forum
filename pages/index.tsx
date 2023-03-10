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
	const [subToSearch, setSubToSearch] = useState<string>("planes");
	const [formData, setFormData] = useState<FormData>({
		title: "",
		content: "",
		sub: ""
	});
	async function handleSubSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const { value } = event.target;
		setSubToSearch(value);
		setFormData((prevState) => ({ ...prevState, ["sub"]: value }));
		const response = await fetch(`/api/getPosts?sub=${value}`);
		const postsData = await response.json();
		setPosts(postsData);
	}

	const showNewPost = () => {
		setHidden(false);
	}

	const hideNewPost = () => {
		setHidden(true);
	}

	function handleSubmit(event: SyntheticEvent) {
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

	function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target;
		setFormData((prevState) => ({ ...prevState, [name]: value }));
	}

	async function refreshPosts() {
		const response = await fetch(`/api/getPosts?sub=${subToSearch}`);
		const postsData = await response.json();
		setPosts(postsData);
	}

	useEffect(() => {
		refreshPosts();
		setTimeout(() => refreshPosts(), 5000);
	}, []);

	return (
		<>
			{hidden ? null : (<div className={inputStyles.newPostWrapper}>
				<form className={inputStyles.newPostContainer} onSubmit={handleSubmit}>
					<label>Title</label>
					<input
						className={inputStyles.newPostContent}
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
						disabled={true}
						className={inputStyles.newPostContentDisabled}
						name="sub"
						onChange={handleInputChange}
						type="text"
						value={formData.sub}
						placeholder="sub"
					/>
					<div style={{ display: 'flex' }}>
						<input className={indexStyles.searchBarInput} type="submit" value="Post"></input>
						<button className={indexStyles.searchBarInput} onClick={hideNewPost}>Close</button>
					</div>
				</form>
			</div>)}
			<div className={indexStyles.header}>
				<div className={indexStyles.headerElement}>
					Title
				</div>
			</div>
			<div className={indexStyles.searchBarWrapper}>
				<input className={indexStyles.searchBarInput} type="text" placeholder="search for a sub..." name="sub" onChange={handleSubSearch} value={subToSearch}></input>
				<button className={indexStyles.searchBarInput} onClick={showNewPost}>New post</button>
			</div>

			{posts.map((post, index) => (
				<div key={index} className={indexStyles.postWrapper}>
					<Post key={index} title={post.title} content={post.content} />
				</div>
			))}

		</>
	);
};

export default Home;