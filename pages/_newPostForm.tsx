import inputStyles from "../styles/inputStyles.module.css";

export default function postForm() {
	return (<div className={inputStyles.newPostWrapper}>
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
	</div>)
}