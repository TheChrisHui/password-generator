import './App.css';
import { useState } from 'react';

/**Toggles features to be picked */

function Toggle({feature, checked, onChange}) {
  return (
    <div>
      {feature}
      <input type="checkbox" checked={checked} onChange={onChange}></input>
    </div>
  )
}

function passwordGenerator(checked, length) {
  /**Storing Unicode for characters to be chosen for password */
  const capitalLetters = Array(26).fill().map((x,i)=>i+65);
  const smallLetters = Array(26).fill().map((x,i)=>i+97);
  const numbers = Array(10).fill().map((x,i)=>i+48);
  const specialCharacters = [33,64,35,36,37,94,38,42];

  let codeArray = []

  if (checked[0]) {
    codeArray = codeArray.concat(capitalLetters);
  }

  if (checked[1]) {
    codeArray = codeArray.concat(smallLetters);
  }

  if (checked[2]) {
    codeArray = codeArray.concat(numbers);
  }

  if (checked[3]) {
    codeArray = codeArray.concat(specialCharacters);
  }
  
  let characterArray = []
  for (let i = 0; i < length; i++) {
    const code = codeArray[Math.floor(Math.random() * codeArray.length)];
    const character = String.fromCharCode(code);
    characterArray = characterArray.concat(character);
  }
  

  return characterArray;
}

function App() {

  /**Obtains checkbox value */
  const [checked, setChecked] = useState([true,true,true,false]);
  function handleCheck(i) {
    const newChecked = checked.slice();
    newChecked[i] = !newChecked[i];
    setChecked(newChecked);
  }

  /**Allows the length to be updated when displayed */
  const [length, setLength] = useState(14);
  function handleLengthChange(event) {
    setLength(event.target.value);
  }

  /**Updates the password */
  const [password, setPassword] = useState(passwordGenerator(checked, length));
  function handleClick() {
    setPassword(passwordGenerator(checked, length));
  }

  return (
    <div>
      <div>
        Password: {password}
        <br />
        <button onClick={handleClick}>Generate</button>
      </div>
      <div>
        <input type="range" min="5" max="128" step="1" value={length} onChange={handleLengthChange}></input>
        {length}
        <Toggle feature="A-Z" checked={checked[0]} onChange={() => handleCheck(0)}/>
        <Toggle feature="a-z" checked={checked[1]} onChange={() => handleCheck(1)}/>
        <Toggle feature="0-9" checked={checked[2]} onChange={() => handleCheck(2)}/>
        <Toggle feature="!@#$%^&*" checked={checked[3]} onChange={() => handleCheck(3)}/>
      </div>
    </div>
  );
}



export default App;
