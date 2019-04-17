import React, { Component } from "react";
import { Article } from '../requests';
import { Link } from 'react-router-dom';
import "../Styles/Articles.css";
import Moment from 'react-moment';
import 'moment-timezone';

class Articles extends Component {
    constructor(props) {
        super(props);

        this.state = {
            articles: null
        };
    }

    componentDidMount() {
        Article.all().then(posts => {
            this.setState({
                articles: posts
            });
        });
    }

    render() {
        if (!this.state.articles) {
            return ( <main className="articlesList">
                <h1>Loading...</h1>
              </main>
            );
        }
        return ( <main className="articlesList">
            <h1>Blog post</h1>{
                this.state.articles.map(article => (  <div key={article.id}><h2><Link to = { `/posts/${article.id}` } > { article.title } </Link></h2>
                <small>Created by: { article.author } </small><br />
                <small>Last updated: <Moment>{article.updated_at}</Moment></small> 
                <p>{ article.content.split(/\s+/).slice(0,25).join(" ") }... <Link to = { `/posts/${article.id}` } >read more</Link> </p><hr /></div>
                ))
            } </main>
        );
    }
}

export default Articles;