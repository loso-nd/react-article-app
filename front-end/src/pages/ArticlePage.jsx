import { useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import axios from "axios";
import articles from "../article-content";
import CommentLists from "./CommentLists";
import AddCommentForm from "../AddCommentForm";
import useUser from "../useUser";

const ArticlePage = () => {
  const {name} = useParams();
  const { upvotes: initialUpvotes, comments: initialComments } = useLoaderData();
  const [upvotes, setUpvotes ] = useState(initialUpvotes);
  const [comments, setComments ] = useState(initialComments);

  const {isLoading, user} = useUser();

  const article = articles.find(a => a.name === name)

  async function onUpvoteClicked() {
    const token = user && await user.getIdToken();
    const headers = token ? { authtoken: token} : {};
    const response = await axios.post(`http://localhost:8000/api/articles/${name}/upvote`, null, { headers });
    const updatedArticleData = response.data;
    setUpvotes(updatedArticleData.upvotes)
  }

    async function onAddComment({ nameText, commentText}) {
      const token = user && await user.getIdToken();
      const headers = token ? { authtoken: token} : {};
    const response = await axios.post(`http://localhost:8000/api/articles/${name}/comments`, {
      postedBy: nameText,
      text: commentText
    }, { headers});

    const updatedArticleData = response.data;
    setComments(updatedArticleData.comments)
  }

  return (
    <>
      <h1>This is the {article.title} article</h1>
      {user && 
        <button onClick={onUpvoteClicked}>Upvote</button>
      }
      <p>This article has {upvotes} upvotes!</p>
      
      {article.content.map(p => <p key={p}>{p}</p>)}
      {user 
      ? <AddCommentForm onAddComment={onAddComment}/>
      : <p>Log in to add a comment</p>
      }
      <CommentLists comments={comments} />
    </>
  );
}

export async function loader({params}) {
  const response = await axios.get(`http://localhost:8000/api/articles/${params.name}`);

      // response body
      const { upvotes, comments} = response.data

      return {upvotes, comments}
      
};

export default ArticlePage



/**
 * 
 * Use Loader to load all of the article data for our individual articles 
 * */