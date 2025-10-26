import { useParams, useLoaderData } from "react-router-dom";
import axios from "axios";
import articles from "../article-content";

const ArticlePage = () => {
  // const params = useParams();
  // const name = params.name;

  //for object destructuring we can do
  const {name} = useParams();
  const { upvotes, comments } = useLoaderData();

  const article = articles.find(a => a.name === name)

  return (
    <>

      <h1>This is the {article.title} article</h1>
      <p>This article has {upvotes} upvotes!</p>
      {article.content.map(p => <p key={p}>{p}</p>)}
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