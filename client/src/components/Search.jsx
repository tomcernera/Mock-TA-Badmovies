import React from 'react';
import Axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      genreid : 28
    };
    this.handleSelection = this.handleSelection.bind(this);
  }

  componentDidMount(){
    this.getGenres()
  }

  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    Axios.get('http://localhost:3000/genres')
      .then(genres => this.setState({genres : genres.data}))
      .catch(err=> 'There was an error getting genres')
  }

  handleSelection(event) {
    this.setState({genreid : event.target.value})
  }


  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>
        <select onChange={this.handleSelection}>
          {this.state.genres.map(genre => {
            return <option key={genre.id} value={genre.id}>{genre.name}</option>
          })}
        </select>
        <br/><br/>
        <button onClick={()=>(this.props.handleSubmit(this.state.genreid))}>Search</button>
      </div>
    );
  }
}

export default Search;