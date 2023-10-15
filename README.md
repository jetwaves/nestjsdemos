# Mastermind game

## how to use

```
    docker-compose up
```

RESTful APIs are created at endpoint **/game**

## some more details

1. it is an api implementation of Mastermind game
1. the project is provided with a migration script, the table structures will be initialized at the when docker-compose is up.

## Game rules

Mastermind is a classic code-breaking game typically playedbetween two players, one as the "codemaker" and the other as the "codebreaker."
The goal of the game is for the codebreaker to decipher the secret code created by the codemaker within a limited number of attempts.

- The codemaker creates a secret code using four colored pegs among six.
- The codebreaker makes a guess with their own set of pegs.
- The codemaker provides feedback: black peg for a correct color in the correct
  spot, white peg for a correct color in the wrong spot.
- The codebreaker continues to guess until the code is cracked or run out of
  attempts (number of tries is limited to 10).
- The codebreaker wins if feedback shows four black peg before the 11th try.

## apis/ features

A RESTful API is implements as following:

1. POST method will be used to initiate a new game with a random code of four colors among
   six. - The result will be the id of the game.
1. PUT /{id} method will be used to propose a solution for a given game.
   - The result will be the history of proposals and their feedbacks.
   - The game is won when feedbacks shows four black pegs before the 11th try.
   - When the game is won or lost, it is no longer possible to provide any solution.
1. GET method will be used to retrieve all games (identified by their id) and the number of tries
   and the latest feedback
1. GET /{id} method will be used to retrieve the history of proposals for a given game and their
   feedbacks.
