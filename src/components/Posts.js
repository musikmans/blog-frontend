import React, { Component } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "../Styles/Posts.css";
import { WithContext as ReactTags } from 'react-tag-input';
import Cookies from 'universal-cookie';

const BASE_URL = `http://localhost:8000/api`;

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = { 
          hashtags: '',
          tags: [],
          title: '',
          content: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
      }

      modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      };
    
      formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];
    
      handleChange(value) {
        this.setState({ content: value })
      }

      handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }

      handleDelete(i) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

      onSubmit = (event) => {
        event.preventDefault();
        if (!this.state.content || this.state.content==="<p><br></p>"){
          alert("You need to put some text in your blog content")
        }
        else {
          let content2send = '';
          let tagsToString = '';
          this.state.tags.map(function(tags) {
              tagsToString = tagsToString + tags.text + ',';
          })
          tagsToString=tagsToString.slice(0, -1);
          content2send = JSON.stringify("title:" + this.state.title + ",content:" + this.state.content + ",hashtags:" + tagsToString);
          const cookies = new Cookies();
          const key = cookies.get('Authorization');
          fetch(`${BASE_URL}/posts`, {
            method: 'POST',
            body: content2send,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              "Authorization": "Bearer " + key
            }
          })
          .then(res => {
            const cookies = new Cookies();
            console.log(res)
          })
          .catch(err => {
            console.error(err);
          });
        }
      }

    render() {
        return ( <main className="createPost">
            <h1>Post a blog</h1>
            <form className="blogPost" onSubmit={this.onSubmit}>
            <input type="text" id="title" name="title" className="form-control" placeholder="Title" value={this.state.title}
          onChange={this.handleInputChange} required />
            <ReactQuill 
            value={this.state.content}
                  onChange={this.handleChange}
                  modules={this.modules}
                    formats={this.formats}
                    placeholder="Text" style={{marginBottom:30 + 'px'}} />
                    <ReactTags tags={this.state.tags}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}
                    delimiters={delimiters} />
                    <button className="btn btn-primary btn-lg btn-block text-uppercase" type="submit">Post</button>
            </form>
            </main>
        );
    }
}

export default Posts;