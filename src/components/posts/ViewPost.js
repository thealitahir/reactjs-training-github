import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ViewPost.css";
import Logo from "../../imgs/nbslogo.png";
import Background from "../../imgs/background.jpg";
import Likes from "./Likes";
import Comment from "./Comment";
import { URL } from "../../global.js";
class ViewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      likes: false
    };
    this.handleLikeChange = this.handleLikeChange.bind(this);
  }

  componentDidMount() {
    axios.get(`${URL}posts/${this.props.match.params.id}`).then(res => {
      this.setState({ post: res.data });
    });
    axios.get(`${URL}posts/${this.props.match.params.id}/likes`).then(res => {
      if (res.data.length < 1) {
        this.setState({ likes: false });
      } else {
        this.setState({ likes: true });
      }
    });
  }
  handleLikeChange(like) {
    if (this.state.post.id) {
      if (!like) {
        var obj = {
          postId: this.state.post.id,
          createdAt: +new Date()
        };
        localStorage.setItem(this.state.post.id, JSON.stringify(obj));
      } else {
        localStorage.removeItem(this.state.post.id);
      }
    }
  }
  render() {
    var likes;
    var comments;
    if (this.state.post.id) {
      likes = (
        <Likes
          className="box-2"
          data={this.state.likes}
          post={this.state.post}
          onLikeChange={this.handleLikeChange}
        />
      );
      comments = <Comment data={this.state.post.id} />;
    } else {
      likes = <div></div>;
      comments = <div></div>;
    }
    return (
      <div className="main">
        <div className="view-logo-container">
          <Link to="/reactjs-training-github">
            <img className="view-logo-img" src={Logo} alt="NBS logo" />
          </Link>
        </div>
        <hr />
        <div className="background-container">
          <img src={Background} alt="No Background" />
          <h1>{this.state.post.title}</h1>
        </div>
        <div className="text-container">
          <p className="box-1">{this.state.post.body}</p>
          {likes}
        </div>
        <div className="comment-container">{comments}</div>
        <div className="back-div">
          <button variant="info" className="back-button">
            <Link className="back-link" to="/reactjs-training-github">
              Back
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default ViewPost;
