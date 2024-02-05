import axios from "axios";


export const getArticles = (article_id) => {
  let endpointUrl = "https://nc-news-da.onrender.com/api/articles";

  article_id !== undefined ? endpointUrl += `/${article_id}`: null
  return axios.get(endpointUrl).then((response) => {
    return response.data;
  });
};



