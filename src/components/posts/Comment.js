import React from "react";
import "./Comment.css";
import {
  postCommentRequest,
  getCommentRequest,
  deleteCommentRequest,
  editCommentRequest
} from "../../actions/action";
import { connect } from "react-redux";
import Avatar from "../../imgs/avatar.png";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment_id: "",
      comment: "",
      edit_comment: "",
      edit_gate: false
    };
  }
  componentDidMount = () => {
    this.setState({ edit_gate: false });
    this.getComments();
  };
  getComments = () => {
    this.props.getCommentRequest(this.props.data);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onEdit = () => {
    this.setState({ comment: "", edit_comment: "" });
    const editComment = {
      comment: this.state.edit_comment,
      comment_id: this.state.comment_id,
      id: this.props.data
    };
    this.props.editCommentRequest(editComment);
    this.setState({ edit_gate: false });
  };
  onSubmit = () => {
    this.setState({ comment: "" });
    const commentData = {
      name: "Ali Tahir",
      comment: this.state.comment,
      id: this.props.data,
      createdAt: +new Date()
    };
    this.props.postCommentRequest(commentData);
  };
  handleEdit = comment => {
    this.setState({
      edit_gate: true,
      comment_id: comment.id,
      edit_comment: comment.comment
    });
  };
  handleDelete = comment_id => {
    const delComment = {
      id: this.props.data,
      comment_id: comment_id
    };
    this.props.deleteCommentRequest(delComment);
  };
  render = () => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    const { comment_id, edit_gate } = this.state;
    const all_comments = this.props.comments.map(comment => {
      var date = new Date(comment.createdAt);
      var day = date.getDate();
      var month = monthNames[date.getMonth()];
      var year = date.getFullYear();
      comment.createdAt = `${day} ${month}, ${year}`;
      return (
        <div key={comment.id} className="comment-list-main">
          <ul>
            <li>
              <img src={Avatar} className="avatar" alt="" />
              <div className="comment-body">
                <strong className="user">{comment.name}</strong>
                <small className="date-text">{comment.createdAt}</small>
                {edit_gate && comment.id === comment_id ? (
                  <div className="edit-commet-main">
                    <input
                      className="edit-comment-input"
                      name="edit_comment"
                      onChange={this.handleChange}
                      value={this.state.edit_comment}
                      type="text"
                    />

                    <button
                      type="button"
                      value="submit"
                      className="edit-comment-btn"
                      onClick={e => this.onEdit(e)}
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <p>{comment.comment}</p>
                )}
                <div className="button-box">
                  <button
                    href="#"
                    className="button-box1"
                    onClick={() => this.handleEdit(comment)}
                  >
                    Edit
                  </button>
                  <button
                    className="button-box2"
                    onClick={() => this.handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
            <hr className="separator" />
          </ul>
        </div>
      );
    });
    return (
      <div>
        <div className="comment-main-input">
          Comments
          <input
            type="text"
            className="comment-input"
            placeholder="Write your comment"
            name="comment"
            value={this.state.comment}
            onChange={this.handleChange}
            required
          />
        </div>
        <div className="comment-main-button">
          <button className="comment-button" onClick={this.onSubmit}>
            Leave Your Comment
          </button>
        </div>

        <div className="comment-list">{all_comments}</div>
      </div>
    );
  };
}
const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};

const mapDispachToProps = dispatch => {
  return {
    postCommentRequest: commentsData =>
      dispatch(postCommentRequest(commentsData)),
    getCommentRequest: postId => dispatch(getCommentRequest(postId)),
    deleteCommentRequest: delComment =>
      dispatch(deleteCommentRequest(delComment)),
    editCommentRequest: editComment => dispatch(editCommentRequest(editComment))
  };
};
export default connect(mapStateToProps, mapDispachToProps)(Comment);
