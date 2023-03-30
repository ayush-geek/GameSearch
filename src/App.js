
import { useState, useEffect } from 'react';
import './App.css';


function App() {

  const [gameTitle, setGameTitle] = useState("");
  const [searchedGames, setSearchedGames] = useState([]);
  const [gameDeals, setGameDeals] = useState([]);
  const searchGame = () => {
    fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
      .then((res) =>
        res.json()
      )
      .then((data) => {
        setSearchedGames(data);

      })
  };

  useEffect(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=20&pageSize=3`)
      .then((res) =>
        res.json()
      )
      .then((data) => {
        setGameDeals(data);
        console.log(data);

      })
  }, []);

  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search For a Game</h1>
        <input type="text" placeholder='GTA...'
          onChange={(event) => {
            setGameTitle(event.target.value)
          }} />
        <button onClick={searchGame}>Seach Game Title</button>

        <div className="games">
          {
            searchedGames.map((val, key) => {
              return <div className='game' key={key}>
                {val.external}
                <img src={val.thumb} />
                {val.cheapest}
              </div>
            })
          }

        </div>
      </div>
      <div className="dealsSection">
        <h1>Latest Deals</h1>
        <div className="games">
          {
            gameDeals.map((val, key) => {
              return <div className='game' id="deals" key={key}>
                <h3>{val.title}</h3>
               <p>Normal Price: {val.normalPrice}</p>
               <p>Sale Price: {val.salePrice}</p>
               <h3>YOU SAVE {val.savings.substr(0,2)}%</h3>
              </div>
            })
          }

        </div>
      </div>
    </div>
  );
}

export default App;
