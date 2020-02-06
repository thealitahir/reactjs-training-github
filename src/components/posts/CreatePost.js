import React from "react";
import axios from "axios";
import Logo from "../../imgs/nbslogo.png";
import "./CreatePost.css";
import { URL } from "../../global.js";
import { Link } from "react-router-dom";

export default class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      title: "",
      body: "",
      tags: "",
      edit_gate: false
    };
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      axios.get(`${URL}/posts/${this.props.match.params.id}`).then(res => {
        this.setState({
          id: res.data.id,
          title: res.data.title,
          body: res.data.body,
          tags: res.data.tags,
          edit_gate: true
        });
      });
    }
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = e => {
    e.preventDefault();
    const { title, body, tags, edit_gate, id } = this.state;
    if (edit_gate) {
      axios
        .put(`${URL}/posts/${id}`, {
          title,
          body,
          tags
        })
        .then(() => {
          this.props.history.push("/");
        })
        .catch(err => {});
    } else {
      axios
        .post(`${URL}/posts/`, {
          title,
          body,
          tags
        })
        .then(() => {
          this.props.history.push("/");
        })
        .catch(err => {});
    }
  };
  render() {
    const { title, body, tags } = this.state;
    return (
      <div>
        <div className="logo-container">
          <Link to="/reactjs-training-github">
            <img className="create-logo-img" src={Logo} alt="NBS logo" />
          </Link>
        </div>
        <hr />
        <form className="main-container" action="" method="POST">
          <div className="heading-container">
            <h2>Add New Post</h2>
          </div>
          <div className="form-container">
            <div className="input-box">
              <input
                type="text"
                className="search-input"
                placeholder="Enter post title here"
                name="title"
                required
                value={title}
                onChange={this.handleChange}
              />
              <input
                type="text"
                className="long-input"
                name="body"
                required
                value={body}
                onChange={this.handleChange}
              />
            </div>
            <div className="empty-container"></div>
            <div className="tag-box">
              <h4>Post Tags</h4>
              <input
                type="text"
                name="tags"
                value={tags}
                required
                onChange={this.handleChange}
              />
              <br />
              <span className="info">Separate tags with commas</span>
              <button
                type="submit"
                className="publish-btn"
                onClick={this.handleClick}
              >
                Publish
              </button>
            </div>
          </div>
        </form>
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
