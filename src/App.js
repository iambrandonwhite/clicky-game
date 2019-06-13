import React, { Component } from "react";
import "./App.css";
import Container from "./components/Container";
import Row from "./components/Row";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import GameCard from "./components/GameCard";
import Footer from "./components/Footer";
import characters from "./characters.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      highScore: 0,
      message: "Click any image to begin!",
      cards: this.getInitialCharacterSet()
    };
  }

  getInitialCharacterSet() {
    let initialState = {
      cards: {}
    };

    return characters.map(character => {
      return initialState.cards[character.id] = { clicked: false };
    });
  }

  // Use Fisher-Yates Shuffle to randomize array output
  shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  isClicked = id => {
    var currentStateCards = this.state.cards;
    var newCardArr = [];

    if (this.state.cards[id - 1].clicked) {
      this.setState({message: "Sorry, you guessed wrong!"});
      // TODO animation/modal for loss?
      this.resetGame();
    } else {
      for (var i = 0; i < currentStateCards.length; i++) {
        if (i === id - 1) {
          var newState = {
            clicked: true
          };
          currentStateCards[i] = newState;
          newCardArr.push(currentStateCards[i]);
        } else {
          newCardArr.push(currentStateCards[i]);
        }
      }
      this.setState({ cards: newCardArr, message: "You guessed correctly!" });
      this.incrementScore();
    }
  };

  incrementScore = () => {
    this.setState({ score: this.state.score + 1 });
    if (this.state.highScore <= this.state.score) {
      this.setState({ highScore: this.state.highScore + 1 });
    }
    this.checkWin();
  };

  checkWin = () => {
    if (this.state.score >= 11) {
      alert("You win!");
      this.resetGame();
    }
  }

  resetGame = () => {
    this.setState({ score: 0, cards: this.getInitialCharacterSet() });
  };

  render() {
    return (
      <div>
        <Navbar
          score={this.state.score}
          highScore={this.state.highScore}
          message={this.state.message}
        />
        <Jumbotron />
        <Container>
          <Row>
            {this.shuffle(characters).map(character => (
              <GameCard
                image={character.image}
                key={character.id}
                id={character.id}
                name={character.name}
                isClicked={this.isClicked}
              />
            ))}
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default App;
