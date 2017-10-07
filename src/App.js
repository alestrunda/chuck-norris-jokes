import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import ListCategories from './components/ListCategories';
import ListJokes from './components/ListJokes';
import Button from './components/Button';
import InputNumber from './components/InputNumber';
import Note from './components/Note';
import Search from './components/Search';

import { API_URL, JOKE_PEREX_LEN, INPUT_NUMBER_MIN, INPUT_NUMBER_MAX } from './settings.js';
import { sampleJokesRating, sampleJokesFavourite } from './data/sampleData.js';

import './App.css';
import 'react-select/dist/react-select.css';


const getTextPerex = (text, length = JOKE_PEREX_LEN) => {
	return text.length > length ? text.substring(0, length) + "..." : text;
}

const findItemIndexById = (items, id) => {
	const itemsLen = items.length;
	for(let i=0; i<itemsLen; i++) {
		if(items[i].id === id)
			return i;
	}
	return -1;
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			jokes: [],
			jokesFavourite: [],
			jokesRatings: [],
			categories: [],
			activeCategory: "",
			itemsPerLoad: 10,
			currentInfo: '',
			searchQuery: '',
			hasError: false
		};
	}

	componentDidMount() {
		this.loadFavouriteJokes();
		this.loadJokesRating();
		this.loadCategories();
		this.loadNewJokes();
	}

	componentDidCatch(error, info) {
		this.setState({ hasError: true });
	}

	loadJokesRating() {
		this.setState({
			jokesRatings: sampleJokesRating
		});
	}

	loadFavouriteJokes() {
		this.setState({
			jokesFavourite: sampleJokesFavourite
		});
	}

	loadCategories() {
		axios.get(API_URL + "/categories")
		.then((response) => {
			this.setState({
				categories: response.data,
				currentInfo: response.data.length + " categories loaded"
			});
		})
		.catch((error) => {
			this.setState({
				currentInfo: "Cannot load category",
			});
		});
	}

	loadJoke(category) {
		let url = API_URL + "/random" + (category ? "?category=" + category : "");
		
		axios.get(url)
			.then((response) => {
				if(!this.isNewJoke(response.data, this.state.jokes)) {
					this.setState({
						currentInfo: `Skipped - joke '${getTextPerex(response.data.value)}' already loaded`,
					});
					return;
				}
				const jokes = [...this.state.jokes, response.data];
				this.setState({
					jokes: jokes
				});
			})
			.catch((error) => {
				this.setState({
					currentInfo: "Cannot load new joke",
				});
			});
	}

	isNewJoke(joke, jokes) {
		return findItemIndexById(jokes, joke.id) === -1 ? true : false;
	}

	loadNewJokes() {
		this.setState({
			currentInfo: "Loaded new jokes",
		});
		for(let i = 0; i < this.state.itemsPerLoad; i++) {
			this.loadJoke(this.state.activeCategory);
		}
	}

	handleFavouriteClick = (item) => {
		let actionStr = "";
		let jokes = [...this.state.jokesFavourite];
		const jokeIndex = findItemIndexById(jokes, item.id);
		if(jokeIndex === -1) {
			jokes.push(item);
			actionStr = "added to favourites";
		} else {
			jokes.splice(jokeIndex, 1);
			actionStr = "removed from favourites";
		}
		this.setState({
			jokesFavourite: jokes,
			currentInfo: `Joke '${getTextPerex(item.value)}' ${actionStr}.`,
		});
	}

	handleRatingChange = (item, value) => {
		let jokes = [...this.state.jokesRatings];
		const jokeIndex = findItemIndexById(jokes, item.id);
		if(jokeIndex === -1) {
			item.rating = value;
			jokes.push(item);
		} else if(value === null) {
			jokes.splice(jokeIndex, 1);
		} else {
			jokes[jokeIndex].rating = value;
		}
		this.setState({
			jokesRatings: jokes,
			currentInfo: `Joke '${getTextPerex(item.value)}' rating set to ${value}.`,
		});
	}

	handleSearchTrigger = () => {
		if(!this.state.searchQuery)
			return;
		axios.get(API_URL + "/search?query=" + encodeURIComponent(this.state.searchQuery))
			.then((response) => {
				if(response.data.result === "null") {
					this.setState({
						currentInfo: "No jokes found matching this query",
					});
					return;
				}
				this.setState({
					jokes: response.data.result,
					currentInfo: "Jokes loaded",
					activeCategory: "",
				});
			})
			.catch((error) => {
				this.setState({
					currentInfo: "Cannot load new joke",
				});
			});
	}

	handleSearchChange = (text) => {
		this.setState({
			searchQuery: text
		});
	}

	handleItemsPerLoadChange = (number) => {
		this.setState({
			itemsPerLoad: number
		});
	}

	handleLoadNewJokesClick = () => {
		this.setState({
			currentInfo: "Loaded new jokes",
		});
		this.loadNewJokes();
	}

	handleCategoryClick = (category) => {
		this.setState({
			jokes: [],
			activeCategory: category
		}, this.loadNewJokes);
	}

	render() {
		if(this.state.hasError) {
			return (
				<div>Error occured...</div>
			);
		}
		return (
			<div className="main">
				<div className="main__sidebar sidebar">
					<div className="sidebar__head container heading-img">
						<img className="heading-img__img" src="images/smiles/smile-32.png" alt="smile" />
						<span className="text-yellow">Joke</span> settings
					</div>
					<div className="container">
						<div className="sidebar__section">
							<div className="opening-icon__container">
								<Link className="sidebar__link link-big" to={'/'}>
									<i className="opening-icon opening-icon--center fa fa-home"></i>
									Home
								</Link>
							</div>
							<div className="opening-icon__container">
								<Link className="sidebar__link link-big" to={'/favourites'}>
									<span className="opening-icon opening-icon--center circle-number circle-number--purple">{this.state.jokesFavourite.length}</span>
									My favourites
								</Link>
							</div>
							<div className="opening-icon__container">
								<Link className="sidebar__link link-big" to={'/ratings'}>
									<span className="opening-icon opening-icon--center circle-number circle-number--purple">{this.state.jokesRatings.length}</span>
									My ratings
								</Link>
							</div>
						</div>
						<div className="sidebar__section">
							<h3 className="sidebar__heading">Search</h3>
							<Search
								placeholder="Search for... word"
								onChange={this.handleSearchChange}
								onSearchTrigger={this.handleSearchTrigger}>
							</Search>
						</div>
						<div className="sidebar__section">
							<h3 className="sidebar__heading">Results per load</h3>
							<InputNumber
								value={this.state.itemsPerLoad}
								handleChange={this.handleItemsPerLoadChange}
								min={INPUT_NUMBER_MIN}
								max={INPUT_NUMBER_MAX}>
							</InputNumber>
						</div>
					</div>
					<div className="sidebar__section">
						<div className="container">
							<h3 className="sidebar__heading">Categories</h3>
						</div>
						<ListCategories
							items={this.state.categories}
							activeCategory={this.state.activeCategory}
							onCategoryClick={this.handleCategoryClick}>
						</ListCategories>
					</div>
				</div>
				<div className="main__content">
					<div className="page-header container">
						<h1 className="page-header__heading">Chuck Norris jokes</h1>
					</div>
					<div className="main__content-inner">
						<Switch>
							<Route path='/' exact render={() => (
								<div className="container">
									<h2 className="opening-icon__container">
										<span className="opening-icon circle-number circle-number--purple">{this.state.jokes.length}</span>
										Random jokes
									</h2>
									<ListJokes
										items={this.state.jokes}
										favourites={this.state.jokesFavourite}
										ratings={this.state.jokesRatings}
										onFavouriteClick={this.handleFavouriteClick}
										onRatingClick={this.handleRatingChange}>
									</ListJokes>
									<Button cssClass="button" onClick={this.handleLoadNewJokesClick} text="Load more jokes"></Button>
								</div>
							)} />
							<Route path='/favourites' render={() => (
								<div className="container">
									<h2 className="opening-icon__container">
										<span className="opening-icon circle-number circle-number--purple">{this.state.jokesFavourite.length}</span>
										My favourite jokes
									</h2>
									<ListJokes
										items={this.state.jokesFavourite}
										favourites={this.state.jokesFavourite}
										ratings={this.state.jokesRatings}
										onFavouriteClick={this.handleFavouriteClick}
										onRatingClick={this.handleRatingChange}>
									</ListJokes>
								</div>
							)} />
							<Route path='/ratings' render={() => (
								<div className="container">
									<h2 className="opening-icon__container">
										<span className="opening-icon circle-number circle-number--purple">{this.state.jokesRatings.length}</span>
										My ratings
									</h2>
									<ListJokes
										items={this.state.jokesRatings}
										favourites={this.state.jokesFavourite}
										ratings={this.state.jokesRatings}
										onFavouriteClick={this.handleFavouriteClick}
										onRatingClick={this.handleRatingChange}>
									</ListJokes>
								</div>
							)} />
						</Switch>
						<div className="container">
							<Note text={this.state.currentInfo}></Note>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
