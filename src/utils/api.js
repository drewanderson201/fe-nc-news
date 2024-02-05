import axios from "axios";


export const getArticles = () => {
  return axios
    .get("https://nc-news-da.onrender.com/api/articles")
    .then((response) => {
      return response.data;
    })
};

