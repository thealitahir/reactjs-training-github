import React from "react";
import "./Like.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.data
    };
    this.changeLike = this.changeLike.bind(this);

  }
  componentDidMount(){
    var data =  JSON.parse(localStorage.getItem(this.props.post.id));
    if(data && this.props.post.id === data.postId){
      this.setState({liked:true});
    }
  }
  changeLike() {
    this.setState({ liked: !this.state.liked });
    this.props.onLikeChange(this.state.liked);
  }
  render() {
    let like = {
      class_name : "green-button",
      icon_name : <FontAwesomeIcon icon="thumbs-up" />,
      content: "Like"
    }
    let unLike = {
      class_name : "red-button",
      icon_name : <FontAwesomeIcon icon="thumbs-down" />,
      content: "Unlike"
    }
    let btn_class = this.state.liked ? unLike : like;
    return (
      <div className="like-main">
        <button className={btn_class.class_name} onClick={this.changeLike}>
          {btn_class.content} {btn_class.icon_name}
        </button>
      </div>
    );
  }
}

export default Likes;
