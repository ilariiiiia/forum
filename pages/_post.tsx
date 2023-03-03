export default function Post({ title, content }){
	return <>
	<div className="postWrapper">
		<h3 className="postTitle">
			{title}
		</h3>
		<p className="postContent">
			{content}
		</p>
	</div>
	</>	
}