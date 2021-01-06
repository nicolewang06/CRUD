// installed axios - npm i axios. axios makes HTTP requests (calls)
  // import axios
// installed react router - npm install react-router-dom. router generates urls
  // import react-router-dom
import React from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css'

const WINES_URL = 'http://myapi-profstream.herokuapp.com/api/06f82d/wines'
const BOOKS_URL = 'http://myapi-profstream.herokuapp.com/api/ffbede/books'
const PEOPLE_URL = 'http://myapi-profstream.herokuapp.com/api/fdf5d8/persons'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    return (
    //   <div className="App">
    //     <header className="App-header">
    //       <Wines wines = { this.state.wines }/>
    //     </header>
    //   </div>
    // );
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/people">People</Link>
            </li>
            <li>
              <Link to="/wines">Wines</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/wines">
            <Wines />
          </Route>
          <Route path="/books">
            <Books />
          </Route>
          <Route path="/people">
            <People />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
}



class Wines extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getWines() {
    try {
      const res = await axios.get(WINES_URL);
      //console.log(res.data)
      this.setState({ wines: res.data })
    } catch(e) {
      console.error(e);
    }
  }
  componentDidMount() {
    this.getWines();
  }

  handleChange(e){
    /*  DESTRUCTING >>
    e.target.name
    e.target.value */    
    const { name, value } = e.target;
    //console.log(name, value)
    this.setState( { [name]: value } )
  }

  async handleSubmit(e) {
    //console.log('something')
    /* DESTRUCTING >>
    this.state.name
    this.state.year
    this.state.grapes */
    e.preventDefault();
    const { name, year, grapes, country, region, description, picture, price } = this.state;
    const wine = { name, year, grapes, country, region, description, picture, price };
    try {
      const res = await axios.post(WINES_URL, wine);
      console.log(res.data);

      const updateRes = await axios.get(WINES_URL);
      this.setState( { wines: updateRes.data } )
    } catch(e) {
      console.error (e);
    }
    //console.log( { name, year, grapes, country, region, description, picture, price } );
    //const lastName = "wang";
    //console.log( { lastName })
    // const obj = { name: 'nicole', lastName: "wang" }
  }

  async handleDelete(id) {
    console.log(WINES_URL + id);
    try{
      const res = await axios.delete(WINES_URL + '/' + id); // target wine id
      console.log(res.data);

      const updateRes = await axios.get(WINES_URL);
      this.setState( { wines: updateRes.data } )
    } catch(e) {
      console.error(e.message)
    }
  }

  render() {
    return (
      <div className="wines">
        <ul>
          {/* render info */}
          {
            this.state.wines && this.state.wines.map(wine => (
              <li id={ wine.id }>
                { wine.name }: price { wine.price }
                <button onClick={ () => this.handleDelete(wine.id) }>Delete wine</button>
              </li>
              ))
          }
        </ul>
        <form className="new-wine-form"
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }
          >
          <label>
            Wine Name:
            <input type="text" name="name" />
          </label><br></br>
          <label>
            Year wine was made:
            <input type="text" name="year" />
          </label><br></br>
          <label>
            Grapes used:
            <input type="text" name="grapes" />
          </label><br></br>
          <label>
            Country of wine:
            <input type="text" name="country" />
          </label><br></br>
          <label>
            Wine Region:
            <input type="text" name="region" />
          </label><br></br>
          <label>
            Description of wine:
            <input type="text" name="description" />
          </label><br></br>
          <label>
            Picture url:
            <input type="text" name="picture" />
          </label><br></br>
          <label>
            Price:
            <input type="text" name="price" />
          </label><br></br>
          <input type="submit" />
        </form>
    </div>
    )
  }
}

class Books extends App {
  constructor(props) {
    super(props);

    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getBooks() {
    try{
      const res = await axios.get(BOOKS_URL);
      console.log(res.data)
      this.setState( { books: res.data } )
    } catch(er) {
      console.error(er.message);
    }
  }
  componentDidMount() {
    this.getBooks();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState( { [name]: value } )
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { title, author, release_date, image } = this.state;
    const book = { title, author, release_date, image };
    try {
      const res = await axios.post(BOOKS_URL, book);
      console.log(res.data);

      const updateRes = await axios.get(BOOKS_URL);
      this.setState( { books: updateRes.data })
    } catch(er) {
      console.error(er.message);
    }
  }

  async handleDelete(id) {
    console.log(BOOKS_URL + id);
    try{
      const res = await axios.delete(BOOKS_URL + '/' + id);
      console.log(res.data);

      const updateRes = await axios.get(BOOKS_URL);
      this.setState( { books: updateRes.data } )
    } catch(er) {
      console.error(er.message)
    }
  }

  render() {
    return (
      <div className="books">
        <ul>
          {
            this.state.books && this.state.books.map(book => (
              <li key={ book.id }>
                {book.title}, Author: {book.author} <button onClick={ () => this.handleDelete(book.id) }>Delete book</button>
              </li>
            ))
          }
        </ul>
        <form className="new-book-form"
        onChange = { this.handleChange }
        onSubmit = { this.handleSubmit }>
          <label>
            Title:
            <input type="text" name="title" />
          </label><br></br>
          <label>
            Author:
            <input type="text" name="author" />
          </label><br></br>
          <label>
            Release Date:
            <input type="text" name="release_date" />
          </label><br></br>
          <label>
            Image:
            <input type="text" name="image" />
          </label><br></br>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

class People extends App {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async getPeople() {
    try{
      const res = await axios.get(PEOPLE_URL);
      this.setState({ people: res.data })
    } catch(e) {
      console.error(e.message);
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState( { [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const { firstname, lastname, email, username} = this.state;
    const person = { firstname, lastname, email, username};

    try {
      const res = await axios.post(PEOPLE_URL, person);
      console.log(res.data);

      const updateRes = await axios.get(PEOPLE_URL);
      this.setState( { people: updateRes.data });
    } catch(er) {
      console.error(er.message);
    }
  }

  async handleDelete(id) {
    try {
      const res = await axios.delete(PEOPLE_URL + '/' + id);

      const updateRes = await axios.get(PEOPLE_URL);
      this.setState({ people: updateRes.data });
    } catch(er) {
      console.error(er.message);
    }
  }

  componentDidMount() {
    this.getPeople();
  }

  render () {
    return(
      <div className="people">
        <ul>
          {
            this.state.people && this.state.people.map(person => (
              <li id={person.id}>
                { person.firstname} { person.lastname } <button onClick= { () => this.handleDelete(person.id) }>Delete Person</button>
              </li>
            ))
          }
        </ul>
        <form className="people-form"
          onChange = { this.handleChange }
          onSubmit = { this.handleSubmit }>
          <label>
            First Name: 
            <input type="text" name="firstname" />
          </label><br></br>
          <label>
            Last Name: 
            <input type="text" name="lastname" />
          </label><br></br>
          <label>
            Email Address: 
            <input type="text" name="email" />
          </label><br></br>
          <label>
            Username: 
            <input type="text" name="username" />
          </label><br></br>
          <input type="submit" />
        </form>
      </div>
    )
  }
}

export default App;
