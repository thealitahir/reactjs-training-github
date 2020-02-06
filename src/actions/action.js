export const POST_COMMENT_REQUEST = "POST_COMMENT_REQUEST";
export const POST_COMMENT_SUCCESS = "POST_COMMENT_SUCCESS";
export const POST_COMMENT_FAILURE = "POST_COMMENT_FAILURE";

export const GET_COMMENT_REQUEST = "GET_COMMENT_REQUEST";
export const GET_COMMENT_SUCCESS = "GET_COMMENT_SUCCESS";
export const GET_COMMENT_FAILURE = "GET_COMMENT_FAILURE";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

export const EDIT_COMMENT_REQUEST = "EDIT_COMMENT_REQUEST";
export const EDIT_COMMENT_SUCCESS = "EDIT_COMMENT_SUCCESS";
export const EDIT_COMMENT_FAILURE = "EDIT_COMMENT_FAILURE";

export const GET_POSTS_REQUEST = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

export const SEARCH_POSTS_REQUEST = "SEARCH_POSTS_REQUEST";
export const SEARCH_POSTS_SUCCESS = "SEARCH_POSTS_SUCCESS";
export const SEARCH_POSTS_FAILURE = "SEARCH_POSTS_FAILURE";

export const RESET_POSTS = "RESET_POSTS";

export const postCommentRequest = payload => ({
  type: POST_COMMENT_REQUEST,
  payload: payload
});
export const postCommentFailure = error => ({
  type: POST_COMMENT_FAILURE,
  payload: error
});

export const getCommentRequest = payload => ({
  type: GET_COMMENT_REQUEST,
  payload: payload
});
export const getCommentFailure = error => ({
  type: GET_COMMENT_FAILURE,
  payload: error
});

export const deleteCommentRequest = payload => ({
  type: DELETE_COMMENT_REQUEST,
  payload: payload
});
export const deleteCommentFailure = error => ({
  type: DELETE_COMMENT_FAILURE,
  payload: error
});

export const editCommentRequest = payload => ({
  type: EDIT_COMMENT_REQUEST,
  payload: payload
});
export const editCommentFailure = error => ({
  type: EDIT_COMMENT_FAILURE,
  payload: error
});

export const getPostsRequest = payload => ({
  type: GET_POSTS_REQUEST,
  payload: payload
});
export const getPostsFailure = error => ({
  type: GET_POSTS_FAILURE,
  payload: error
});

export const searchPostsRequest = payload => ({
  type: SEARCH_POSTS_REQUEST,
  payload: payload
});
export const searchPostsFailure = error => ({
  type: SEARCH_POSTS_FAILURE,
  payload: error
});
export const resetPosts = () => ({ type: RESET_POSTS });
