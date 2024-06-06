import './App.css';
import { useState } from 'react';


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';


/**Toggles features to be picked */

function Toggle({feature, checked, onChange}) {
  return (
    <div>
      <Checkbox checked={checked} onChange={onChange} size="small"/>
      {feature}
    </div>
  )
}

function passwordGenerator(checked, length) {

  /**Storing Unicode for characters to be chosen for password */
  const capitalLetters = Array(26).fill().map((x,i)=>i+65);
  const smallLetters = Array(26).fill().map((x,i)=>i+97);
  const numbers = Array(10).fill().map((x,i)=>i+48);
  const specialCharacters = [33,64,35,36,37,94,38,42];

  /**Storing all unicode for possible characters */
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
  

  /**
   * For mandatory characters
   * create length array 
   * examine checked array
   * if true => random number out of length array
   * remove the number from length array
   * else if false => -1
   * 
   * Character Array Generation
   * for loop mandatory.length
   * if in array => check position => add corresponding charcter
   * if not in mandatory array => random character logic
   */

  let mandatoryArray = [];
  let lengthArray = Array(length).fill().map((x,i)=>i);

  for (let i = 0; i < checked.length; i++) {
    if (checked[i]) {
      const mandatoryIndex = Math.floor(Math.random() * lengthArray.length);
      mandatoryArray = mandatoryArray.concat(lengthArray[mandatoryIndex]);
      lengthArray.splice(mandatoryIndex, 1);
    }
    else {
      mandatoryArray = mandatoryArray.concat(-1);
    }
  }

  let characterArray = [];
  for (let i = 0; i < length; i++) {
    let code = null
    for (let j = 0; j < 4; j++) {
      if (mandatoryArray[j] === i) {
        if (j===0) {
          code = capitalLetters[Math.floor(Math.random() * capitalLetters.length)];
        }
        else if (j===1) {
          code = smallLetters[Math.floor(Math.random() * smallLetters.length)];
        }
        else if (j===2) {
          code = numbers[Math.floor(Math.random() * numbers.length)];
        }
        else {
          code = specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
        }
      }
    }
    if (code === null) {
      code = codeArray[Math.floor(Math.random() * codeArray.length)];
    }
    const character = String.fromCharCode(code);
    characterArray = characterArray.concat(character);
  }

  console.log(characterArray, mandatoryArray);
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
        <Button onClick={handleClick} variant="outlined">Generate</Button>
      </div>
      <div className="settings">
        <Slider className="slider" min={5} max={128} step={1} value={length} onChange={handleLengthChange} size="small" valueLabelDisplay='auto'/>
        Password Length: {length}
        <Toggle feature="A-Z" checked={checked[0]} onChange={() => handleCheck(0)}/>
        <Toggle feature="a-z" checked={checked[1]} onChange={() => handleCheck(1)}/>
        <Toggle feature="0-9" checked={checked[2]} onChange={() => handleCheck(2)}/>
        <Toggle feature="!@#$%^&*" checked={checked[3]} onChange={() => handleCheck(3)}/>
      </div>
    </div>
  );
}



export default App;
