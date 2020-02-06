import React from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faSearch,
  faEdit,
  faTrash,
  faThumbsUp,
  faThumbsDown
} from "@fortawesome/free-solid-svg-icons";
import PostsList from "./components/posts/PostsList";
import ViewPost from "./components/posts/ViewPost";
import CreatePost from "./components/posts/CreatePost";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
library.add(fab, faCheckSquare, faCoffee, faSearch, faEdit, faTrash, faThumbsUp, faThumbsDown);

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/reactjs-training-github/edit/:id" exact component={CreatePost} />
          <Route path="/reactjs-training-github/add" exact component={CreatePost} />
          <Route path="/reactjs-training-github/:id" exact component={ViewPost} />
          <Route path="/reactjs-training-github" exact component={PostsList} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
