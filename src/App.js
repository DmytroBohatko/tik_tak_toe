import React, {Component} from 'react';

class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentValue: " ",
        }
    }

    handleClick = () => {
        if (this.props.value === " " && this.props.gameIsOn === true) {
            this.setState({
                    currentValue: this.props.activePlayer,
                },
                () => {
                    this.props.onPlayerChange(this.state.currentValue, this.props.id);
                });
        }
    };

    render() {
        return (
            <div className="square" key={this.props.id} onClick={this.handleClick}>
                {this.props.value}
            </div>
        )
    }
}

function Board(props) {
    let board = [];
    for (let i = 1; i < 10; i++) {
        let tempVal = " ";
        for (let j = 0; j < props.history.length; j++) {
            if (props.history[j].id === i) {
                tempVal = props.history[j].value;
            }
        }
        board.push(<Square
            onPlayerChange={props.onPlayerChange}
            activePlayer={props.activePlayer}
            key={i}
            id={i}
            gameIsOn={props.gameIsOn}
            value={tempVal}
        />)
    }

    return (
        <div className="board">
            {board}
        </div>
    )
}

function History(props) {

    let buttons = [];
    for (let i = 1; i < props.history.length + 1; i++) {
        buttons.push(<button key={i} onClick={() => props.handleReverse(i)}>GO TO MOVE #{i}</button>)
    }

    return (
        <div>
            {buttons}
        </div>
    )
}


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePlayer: "X",
            gameIsOn: true,
            history: [],
            winner: ""
        }
    }


    handlePlayerChange = (player, id) => {
        this.setState(
            {
                history: [...this.state.history, {id: id, value: player}]
            },
            () => {
                let result = [];
                if (this.state.activePlayer !== "X") {
                    this.state.history.map((move) => {
                        if (move.value === "O") {
                            result.push(move.id);
                        }
                    });
                }
                if (this.state.activePlayer === "X") {
                    this.state.history.map((move) => {
                        if (move.value === "X") {
                            result.push(move.id);
                        }
                    });
                }
                if (this.checkResults1(result) === true ||
                    this.checkResults2(result) === true ||
                    this.checkResults3(result) === true ||
                    this.checkResults4(result) === true ||
                    this.checkResults5(result) === true ||
                    this.checkResults6(result) === true ||
                    this.checkResults7(result) === true ||
                    this.checkResults8(result) === true) {
                    this.setState({
                        gameIsOn: !this.state.gameIsOn,
                        winner: this.state.activePlayer
                    });
                } else {
                    this.setState({activePlayer: player === "X" ? "O" : "X"})
                }
            }
        );
    };

    handleClean = () => {
        this.setState({
                history: [],
                gameIsOn: this.state.winner !== "" ? !this.state.gameIsOn : true,
                activePlayer: "X"
            },
            () => {
                this.setState({
                    winner: ""
                })
            })
    };

    handleReverse = (i) => {
        if  (this.state.history.length !== i){
            this.state.history.length = i;
            this.setState({
                gameIsOn: true,
                winner:""
            });
        }
    };


    checkResults1 = (result) => {
        let winningNumbers1 = [1, 2, 3];

        for (let i = 0; i < 3; i++) {
            if (result.indexOf(winningNumbers1[i]) === -1) return false
        }
        return true
    };
    checkResults2 = (result) => {
        let winningNumbers2 = [4, 5, 6];

        for (let i = 0; i < 3; i++) {
            if (result.indexOf(winningNumbers2[i]) === -1) return false
        }
        return true
    };
    checkResults3 = (result) => {
        let winningNumbers3 = [7, 8, 9];

        for (let i = 0; i < 3; i++) {
            if (result.indexOf(winningNumbers3[i]) === -1) return false
        }
        return true
    };
    checkResults4 = (result) => {
        let winningNumbers4 = [1, 4, 7];

        for (let i = 0; i < 3; i++) {
            if (result.indexOf(winningNumbers4[i]) === -1) return false
        }
        return true
    };
    checkResults5 = (result) => {
        let winningNumbers5 = [2, 5, 8];

        for (let i = 0; i < 3; i++) {
            if (result.indexOf(winningNumbers5[i]) === -1) return false
        }
        return true
    };
    checkResults6 = (result) => {
        let winningNumbers6 = [3, 6, 9];

        for (let i = 0; i < 3; i++) {
            if (result.indexOf(winningNumbers6[i]) === -1) return false
        }
        return true
    };
    checkResults7 = (result) => {
        let winningNumbers7 = [1, 5, 9];

        for (let i = 0; i < 3; i++) {
            if (result.indexOf(winningNumbers7[i]) === -1) return false
        }
        return true
    };
    checkResults8 = (result) => {
        let winningNumbers8 = [3, 5, 7];

        for (let i = 0; i < 3; i++) {
            if (result.indexOf(winningNumbers8[i]) === -1) return false
        }
        return true
    };


    render() {
        return (
            <div style={{textAlign: "center"}}>

                <span>Now is {this.state.activePlayer} turn</span>
                <div className="app">
                    <div className="game-start">
                        <button onClick={this.handleClean}>CLEAN HISTORY</button>
                        <History
                            history={this.state.history}
                            handleReverse={this.handleReverse}
                        />
                    </div>

                    <Board
                        activePlayer={this.state.activePlayer}
                        onPlayerChange={this.handlePlayerChange}
                        gameIsOn={this.state.gameIsOn}
                        history={this.state.history}
                    />
                </div>

                {this.state.winner && <span>{this.state.winner} win this game</span>}

            </div>

        );
    }
}


export default App;
