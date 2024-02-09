import axios from "axios";

export const getArticles = (article_id, topic, sortBy, orderBy, limitBy, pageBy) => {
  let endpointUrl = "https://nc-news-da.onrender.com/api/articles";
  article_id !== undefined ? (endpointUrl += `/${article_id}`) : null;

  return axios
    .get(endpointUrl, {
      params: {
        topic: topic,
        sort_by: sortBy,
        order_by: orderBy,
        limit: limitBy,
        p: pageBy,
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const getCommentsById = (article_id) => {
  let endpointURl = `https://nc-news-da.onrender.com/api/articles/${article_id}/comments`;
  return axios.get(endpointURl).then((response) => {
    return response.data;
  });
};

export const patchArticle = (article_id, updatedArticle) => {
  let endpointURl = `https://nc-news-da.onrender.com/api/articles/${article_id}`;
  return axios.patch(endpointURl, updatedArticle).then((response) => {
    return response.data;
  });
};

export const postComment = (article_id, newComment) => {
  let endpointURl = `https://nc-news-da.onrender.com/api/articles/${article_id}/comments`;
  return axios.post(endpointURl, newComment).then((response) => {
    return response.data;
  });
};

export const deleteComment = (comment_id) => {
  let endpointURl = `https://nc-news-da.onrender.com/api/comments/${comment_id}`;
  return axios.delete(endpointURl).then((response) => {
    return response;
  });
};

export const getTopics = () => {
  let endpointUrl = "https://nc-news-da.onrender.com/api/topics";
  return axios.get(endpointUrl).then((response) => {
    return response.data;
  });
};

export const getUsers = () => {
  let endpointUrl = "https://nc-news-da.onrender.com/api/users";
  return axios.get(endpointUrl).then((response) => {
    return response.data;
  });
}
