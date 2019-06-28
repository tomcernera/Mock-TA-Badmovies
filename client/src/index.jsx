import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import Axios from 'axios'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    
    // you might have to do something important here!
    this.handleSubmit = this.handleSubmit.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }


  componentDidMount(){
    this.getMovies(28)
    this.getFavorites()
  }

  getFavorites() {
    Axios.get('http://localhost:3000/save')
    .then(movies => this.setState({favorites : movies.data}))
    .catch(err => console.log('error saving movie'))
  }

  getMovies(genre) {
    // make an axios request to your server on the GET SEARCH endpoint
    Axios.get(`http://localhost:3000/search?id=${genre}`)
      .then(results => this.setState({movies : results.data}))
      .catch(err => console.log('There was an error'))
  }

  saveMovie(movie) {
    // same as above but do something diff
    Axios.post('http://localhost:3000/save', {
      movie : movie
    })
    .then(movies => this.setState({favorites : movies.data}))
    .catch(err => console.log('error saving movie'))
  }

  deleteMovie(movie) {
    // same as above but do something diff
    Axios.post('http://localhost:3000/delete', {
      movie:movie
    })
    .then(movies => this.setState({favorites : movies.data}))
    .catch(()=> console.log('error deleting moving'))
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  handleSubmit(genre) {
    this.getMovies(genre)
  }

  handleClick(movie) {
    if (this.state.showFaves) {
      this.deleteMovie(movie)
    } else {
      this.saveMovie(movie)
    }
  }
    

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search swapFavorites={this.swapFavorites}
                  showFaves={this.state.showFaves}
                  handleSubmit = {this.handleSubmit}/>
          <Movies movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}
                  handleClick = {this.handleClick}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));