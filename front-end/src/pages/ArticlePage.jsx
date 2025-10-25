import { useParams } from "react-router-dom";
import articles from "../article-content";

const ArticlePage = () => {
  // const params = useParams();
  // const name = params.name;

  //for object destructuring we can do
  const {name} = useParams();

  const article = articles.find(a => a.name === name)

  return (
    <>

      <h1>This is the {article.title} article</h1>
      {article.content.map(p => <p key={p}>{p}</p>)}
    </>
  );
}

export default ArticlePage

//  useParams


/**
 * 
 * it'll give us a JS object containing the names and values of any segments that were in that path. 
 * So, in our case, we're going to get a JavaScript object with a property called name, and the value
 * will be whatever is beyond the '/'. So this would be name learn-react, for example: articles/learn-react
 * */

/**
 * find that article by saying const article = articles.find. 
 * Using JavaScript's built-in find function to find the article whose name property is equal to 
 * the name parameter that we just got from useParams. Cool, so at this point, we have that article. 
 * So instead of displaying just a hard-coded title, we can actually display the title of the article 
 * itself by saying article.title, and then for the content
 * 
 * 
 */