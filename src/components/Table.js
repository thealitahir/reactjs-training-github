import React from "react";
import "./Table.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this);
    this.getRowsData = this.getRowsData.bind(this);
    this.getKeys = this.getKeys.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete = e => {
    this.props.onPostChange(e);
  };
  getKeys = function() {
    return Object.keys(this.props.posts[0])
      .sort()
      .reverse()
      .filter(data => data !== "body");
  };

  getHeader = function() {
    var keys = this.getKeys();
    keys.push("Actions");
    return keys.map((key, index) => {
      return (
        <th key={key}>
          {key !== "id" && (
            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          )}
        </th>
      );
    });
  };

  getRowsData = function() {
    var items = this.props.posts;
    var keys = this.getKeys();
    return items.map((row, index) => {
      return (
        <tr key={index}>
          <td className="checkbox">
            {row.id !== "" && <input type="checkbox" />}
          </td>
          <RenderRow key={index} data={row} keys={keys} />
          <td>
            {row.id !== "" && (
              <Link className="links" to={`/reactjs-training-github/edit/${row.id}`}>
                <FontAwesomeIcon icon="edit" />
              </Link>
            )}
            {row.id !== "" && (
              <Link className="links" to={``}>
                <FontAwesomeIcon
                  icon="trash"
                  onClick={() => this.handleDelete(row)}
                />
              </Link>
            )}
          </td>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <table id="posts">
          <thead>
            <tr>
              <th className="checkbox">
                <input type="checkbox" />
              </th>
              {this.getHeader()}
            </tr>
          </thead>
          <tbody>{this.getRowsData()}</tbody>
        </table>
      </div>
    );
  }
}
const RenderRow = props => {
  return props.keys.map((key, index) => (
    <td key={index}>
      {key === "title" && props.data[key] !== "" && (
        <Link to={`/reactjs-training-github/${props.data["id"]}`}>{props.data[key]}</Link>
      )}
      {key !== "title" && key !== "id" && props.data[key] !== "" && (
        <span>{props.data[key]}</span>
      )}
    </td>
  ));
};
