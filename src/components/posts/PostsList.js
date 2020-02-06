import React from "react";
import axios from "axios";
import Table from "../Table";
import Logo from "../../imgs/nbslogo.png";
import Pencil from "../../imgs/pencil.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Post.css";
import { URL } from "../../global.js";
import {
  getPostsRequest,
  searchPostsRequest,
  resetPosts
} from "../../actions/action";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class PostsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      success: false,
      order: "desc",
      pageNo: 1,
      limit: 13,
      postCount: 100,
      search: "",
      posts: []
    };
    this.handlePostChange = this.handlePostChange.bind(this);
    window.addEventListener("scroll", this.onScroll);
  }

  handlePostChange = post => {
    this.state.posts.splice(
      this.state.posts.findIndex(x => x.id === post.id),
      1
    );
    axios
      .delete(`${URL}posts/${post.id}`)
      .then(() => {
        this.setState({ success: true });
        this.getAllPosts();
      })
      .catch(err => {
        this.setState({ error: true });
      });
  };
  componentDidMount() {
    this.props.resetPosts();
    this.getAllPosts();
  }
  getAllPosts = () => {
    const { pageNo, limit, order } = this.state;
    const postParams = {
      params: `?page=${pageNo}&limit=${limit}&sortBy=createdAt&order=${order}`
    };
    this.props.getPostsRequest({ postParams });
  };
  onScroll = e => {
    const { pageNo, postCount, limit } = this.state;
    const scrollTop = e.target.scrollingElement.scrollTop;
    if (scrollTop > pageNo * 13) {
      this.setState({ pageNo: postCount < limit ? pageNo : pageNo + 1 }, () => {
        this.getParamsObject();
      });
    }
  };
  onSearch = e => {
    this.setState({ search: e.target.value }, () => {
      const { pageNo, limit, order, search } = this.state;
      const searchParams = {
        params: `?page=${pageNo}&limit=${limit}&sortBy=createdAt&order=${order}&search=${search}`
      };
      this.props.searchPostsRequest(searchParams);
    });
  };
  getParamsObject = () => {
    const { pageNo, limit, order } = this.state;
    const postParams = {
      params: `?page=${pageNo}&limit=${limit}&sortBy=createdAt&order=${order}`
    };
    this.props.getPostsRequest({ postParams });
    this.setState({ postCount: this.props.posts.length });
  };
  render() {
    return (
      <div className="main">
        <div className="container-1 logo">
          <Link to="/reactjs-training-github">
            <img className="logo-img" src={Logo} alt="logo not found" />
          </Link>
        </div>
        <hr />
        <div className="container-2">
          <div className="box-1">
            <img className="image" src={Pencil} alt="Pencil not found" />
          </div>
          <div className="box-2">
            <h2>Posts</h2>
          </div>
          <div className="box-3">
            <Link to="/reactjs-training-github/add">
              <button className="add-btn">Add New</button>
            </Link>
          </div>
          <div className="gap"></div>
          <div className="box-5">
            <input
              type="text"
              className="search-bar"
              placeholder="Search Post"
              name="search"
              onChange={this.onSearch}
            />
            <button className="search-btn">
              <FontAwesomeIcon icon="search" />
            </button>
          </div>
        </div>
        <div className="table">
          {this.props.posts.length > 0 && (
            <Table
              posts={this.props.posts}
              onPostChange={this.handlePostChange}
            />
          )}
          {this.props.posts.length < 1 && (
            <Table
              posts={[{ id: "", createdAt: "", title: "", body: "", tags: "" }]}
              onPostChange={this.handlePostChange}
            />
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    posts: state.posts,
    page: state.page
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPostsRequest: postParams => dispatch(getPostsRequest(postParams)),
    resetPosts: () => dispatch(resetPosts()),
    searchPostsRequest: searchParams =>
      dispatch(searchPostsRequest(searchParams))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
