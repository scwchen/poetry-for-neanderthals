import { useState, useEffect } from 'react';
import reactDom from 'react-dom';
// import axios from 'axios';
function App() {
  const [words, setWords] = useState([]);
  const [topic, setTopic] = useState('');
  // const [toSubmit, setToSubmit] = useState(false);

  const axios = require('axios');


  const handleTopicSubmit = () => {
    if (topic.length !== 0) {
      axios({
        url: "https://api.datamuse.com/words",
        method: 'GET',
        dataResponse: 'json',
        params: {
          topics: topic,
          qe: 'topics',
          md: 'f',
          max: '200'
        }
      }).then(res => {
        const tempWords = [...res.data];

        tempWords.forEach((wordObj) => {
          // delete score it is irrelevant information at this time
          delete wordObj.score;
          
          // removing extraneous tags and converting frequency into a number(float)
          wordObj.tags = 
          wordObj.tags.filter((tag) => {
            return tag.includes('f:');
          })
          .map((newTag)=>{
            return newTag = parseFloat(newTag.substring(2));
          });

        });

        console.log(
          tempWords.filter((wordObj)=>{
            return wordObj.tags[0] > 5;
          })
        )

        // console.log(tempWords);
      });
    }
  }

  return (
    <div className="App">
      <h1>Prose for Idiots</h1>
      <p>How does it work?</p>
      <p>Flip a card and you will see a word or words you will have to describe.</p>
      <p>But here's the rub...</p>
      <p>You will only be able to use one-syllable words</p>
      <p>Can you do it?</p>
      <p>You got to speak words good to win!</p>

      <form className="input-form" >
        <label htmlFor="topic">Enter Topic:</label>
        <input type="text" className="topic-input" name="topic" id="topic" onChange={(e) => setTopic(e.target.value)} value={topic}></input>
        <button type="button" onClick={topic.length > 1 ? handleTopicSubmit : null}>Get Words</button>
      </form>

    </div >
  );
}

export default App;
