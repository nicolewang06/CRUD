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

const WINES_URL = 'http://myapi-profstream.herokuapp.com/api/779738/wines/'
const BOOKS_URL = 'http://myapi-profstream.herokuapp.com/api/ffbede/books/'
const PEOPLE_URL = 'http://myapi-profstream.herokuapp.com/api/fdf5d8/persons/'

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
    this.selectWine = this.selectWine.bind(this);
    this.editWine = this.editWine.bind(this);
    this.submitEditedWine = this.submitEditedWine.bind(this);
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
      const res = await axios.delete(WINES_URL + id); // target wine id
      console.log(res.data);

      const updateRes = await axios.get(WINES_URL);
      this.setState( { wines: updateRes.data } )
    } catch(e) {
      console.error(e.message)
    }
  }

  selectWine(selectedWine) {
    this.setState ( { selectedWine } );
    //console.log(wine);
  }

  editWine(e) {
    const { name, value } = e.target;
    this.setState( { ...this.state, selectedWine: { ...this.state.selectedWine, [name]: value } } );
    //console.log(e.target.value);
  }

  async submitEditedWine(e) {
    e.preventDefault();
    try {
      const editedWine = this.state.selectedWine; // this obj has an id
      console.log(editedWine)
      // to send our patch to url + /id
      const focusWine = WINES_URL + editedWine.id
      const res = await axios.patch(focusWine, editedWine);

      const resRefresh = await axios.get(WINES_URL);
      this.setState( { wines: resRefresh.data } );
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="wines">
        <ul>
          {/* render info */}
          {
            this.state.wines && this.state.wines.map(wine => (
              <li key={ wine.id }>
                { wine.name }: price { wine.price }
                <button onClick={ () => this.handleDelete(wine.id) }>Delete wine</button>
                <button onClick={ () => this.selectWine(wine) }>Edit Wine</button>
              </li>
              ))
          }
        </ul>
        <form className="new-wine-form"
          onChange={ this.handleChange }
          onSubmit={ this.handleSubmit }>
          <label>
            Wine Name:
            <input type="text" name="name" />
          </label>
          <label>
            Year wine was made:
            <input type="text" name="year" />
          </label>
          <label>
            Grapes used:
            <input type="text" name="grapes" />
          </label>
          <label>
            Country of wine:
            <input type="text" name="country" />
          </label>
          <label>
            Wine Region:
            <input type="text" name="region" />
          </label>
          <label>
            Description of wine:
            <input type="text" name="description" />
          </label>
          <label>
            Picture url:
            <input type="text" name="picture" />
          </label>
          <label>
            Price:
            <input type="text" name="price" />
          </label>
          <input type="submit" />
        </form>

        <hr></hr>
            { /* we want to show the form */ }
            { /* only after we select a wine */ }
            { /* if this.state.selectedWine exists */ }
            { /* render this form below */ }
            { /* this.state.selectedWine && formBelow */ }
        { 
        this.state.selectedWine && <form className="wine-edit-form"
          onChange={ this.editWine}
            onSubmit = {this.submitEditedWine}>
          <label>
            Wine Name:
            <input type="text" name="name" defaultValue={ this.state.selectedWine.name } />
          </label>
          <label>
            Year wine was made:
            <input type="text" name="year" defaultValue={ this.state.selectedWine.year }/>
          </label>
          <label>
            Grapes used:
            <input type="text" name="grapes" defaultValue={ this.state.selectedWine.grapes }/>
          </label>
          <label>
            Country of wine:
            <input type="text" name="country" defaultValue={ this.state.selectedWine.country }/>
          </label>
          <label>
            Wine Region:
            <input type="text" name="region" defaultValue={ this.state.selectedWine.region }/>
          </label>
          <label>
            Description of wine:
            <input type="text" name="description" defaultValue={ this.state.selectedWine.description }/>
          </label>
          <label>
            Picture url:
            <input type="text" name="picture" defaultValue={ this.state.selectedWine.picture }/>
          </label>
          <label>
            Price:
            <input type="text" name="price" defaultValue={ this.state.selectedWine.price }/>
          </label>
          <input type="submit" />
        </form>
  }
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
    this.selectBook = this.selectBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.submitEditedBook = this.submitEditedBook.bind(this);
  }

  async getBooks() {
    try{
      const res = await axios.get(BOOKS_URL);
      //console.log(res.data)
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
      const res = await axios.delete(BOOKS_URL + id);
      console.log(res.data);

      const updateRes = await axios.get(BOOKS_URL);
      this.setState( { books: updateRes.data } )
    } catch(er) {
      console.error(er.message)
    }
  }

  selectBook(selectedBook) {
    this.setState( { selectedBook } );
  }

  editBook(e) {
    const { name, value } = e.target;
    this.setState( { ...this.state, selectedBook: { ...this.state.selectedBook, [name]: value } } );
  }

  async submitEditedBook(e) {
    e.preventDefault();
    try {
      const editedBook = this.state.selectedBook;
      console.log(editedBook)

      const focusBook = BOOKS_URL + editedBook.id
      const res = await axios.patch(focusBook, editedBook);

      const resRefresh = await axios.get(BOOKS_URL);
      this.setState( { books: resRefresh.data } );
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    return (
      <div className="books">
        <ul>
          {
            this.state.books && this.state.books.map(book => (
              <li key={ book.id }>
                {book.title}, Author: {book.author}
                <button onClick={ () => this.handleDelete(book.id) }>Delete book</button>
                <button onClick={ () => this.selectBook(book) }>Edit Book</button>
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
          </label>
          <label>
            Author:
            <input type="text" name="author" />
          </label>
          <label>
            Release Date:
            <input type="text" name="release_date" />
          </label>
          <label>
            Image:
            <input type="text" name="image" />
          </label>
          <input type="submit" />
        </form>

        <hr></hr>
        {
        this.state.selectedBook && <form className="book-edit-form"
        onChange = { this.editBook }
        onSubmit = { this.submitEditedBook }>
          <label>
            Title:
            <input type="text" name="title" defaultValue={ this.state.selectedBook.title }/>
          </label>
          <label>
            Author:
            <input type="text" name="author" defaultValue={ this.state.selectedBook.author }/>
          </label>
          <label>
            Release Date:
            <input type="text" name="release_date" defaultValue={ this.state.selectedBook.release_date } />
          </label>
          <label>
            Image:
            <input type="text" name="image" defaultValue={ this.state.selectedBook.image }/>
          </label>
          <input type="submit" />
        </form>
  }
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
    this.selectPerson = this.selectPerson.bind(this);
    this.editPerson = this.editPerson.bind(this);
    this.submitEditedPerson = this.submitEditedPerson.bind(this);
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
      const res = await axios.delete(PEOPLE_URL + id);

      const updateRes = await axios.get(PEOPLE_URL);
      this.setState({ people: updateRes.data });
    } catch(er) {
      console.error(er.message);
    }
  }

  componentDidMount() {
    this.getPeople();
  }

  selectPerson(selectedPerson) {
    this.setState( { selectedPerson } );
  }

  editPerson(e) {
    const { name, value } = e.target;
    this.setState( { ...this.state, selectedPerson: { ...this.state.selectedPerson, [name]: value } } );
  }

  async submitEditedPerson(e) {
    e.preventDefault();
    try{
      const editedPerson = this.state.selectedPerson;
      console.log(editedPerson)

      const focusPerson = PEOPLE_URL + editedPerson.id
      const res = await axios.patch(focusPerson, editedPerson);

      const resRefresh = await axios.get(PEOPLE_URL);
      this.setState( { people: resRefresh.data } );
    } catch(e) {
      console.error(e);
    }
  }

  render () {
    return(
      <div className="people">
        <ul>
          {
            this.state.people && this.state.people.map(person => (
              <li key={person.id}>
                { person.firstname} { person.lastname }
                <button onClick= { () => this.handleDelete(person.id) }>Delete Person</button>
                <button onClick= { () => this.selectPerson(person) }>Edit Person</button>
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
          </label>
          <label>
            Last Name: 
            <input type="text" name="lastname" />
          </label>
          <label>
            Email Address: 
            <input type="text" name="email" />
          </label>
          <label>
            Username: 
            <input type="text" name="username" />
          </label>
          <input type="submit" />
        </form>

        <hr></hr>
{
        this.state.selectedPerson && <form className="people-edit-form"
          onChange = { this.editPerson }
          onSubmit = { this.submitEditedPerson }>
          <label>
            First Name: 
            <input type="text" name="firstname" defaultValue={ this.state.selectedPerson.firstname }/>
          </label>
          <label>
            Last Name: 
            <input type="text" name="lastname" defaultValue={ this.state.selectedPerson.lastname }/>
          </label>
          <label>
            Email Address: 
            <input type="text" name="email" defaultValue={ this.state.selectedPerson.email }/>
          </label>
          <label>
            Username: 
            <input type="text" name="username" defaultValue={ this.state.selectedPerson.username } />
          </label>
          <input type="submit" />
        </form>
}
      </div>
    )
  }
}

export default App;
