import React, {useState} from 'react'
import { toast, ToastContainer } from 'react-toastify'
import './App.css';
import {numbers, upperCaseLetters, lowerCaseLetters, specialCharacters} from './characters'
import 'react-toastify/dist/ReactToastify.css'
import {COPY_SUCCESS} from './message'


function App() {
  const [Password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)

  const handleGeneratePassword = (e) => {
    if (
      !includeUppercase &&
      !includeLowercase &&
      !includeNumbers &&
      !includeSymbols 
    ) {
      notify('Выберите одну или несколько параметров!', true)
    }
    let characterList = ''

    if(includeLowercase){
      characterList = characterList + lowerCaseLetters
    }

    if(includeUppercase){
      characterList = characterList + upperCaseLetters
    }
    
    if(includeNumbers){
      characterList = characterList + numbers
    }

    if(includeSymbols){
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }
  const createPassword = (characterList) => {
    let password = ''
    const characterListLength = characterList.length
    
    for (let i=0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
    }
    return password
  }

  const copyToClipboard = () => {
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = Password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove() 
  }
  const notify = (message, hasError = false) => {
    if (hasError) {
    toast.error(message, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  } else {
    toast(message, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    } 
  }
  const handleCopyPassword = (e) => {
    copyToClipboard()
    notify(COPY_SUCCESS)
  }

  return ( <div className='App'>
    <div className='container'>
      <div className='generator'>
        <h2 className="generator__header">
        Генератор паролей
          </h2>

      <div className="generator__password">
        <h3>{Password}</h3>
        <button onClick={handleCopyPassword}  className="copy__btn">
        <i className="far fa-clipboard"></i>
        </button>
       </div>

      <div className="form-group">
         <label htmlFor="password-strength">Длина пароля (от 12 до 20)</label>
         <input
         defaultValue={passwordLength}
         onChange={(e) => setPasswordLength(e.target.value)}
           type="number" 
           id="password-strength" 
           name="password-strength" 
           max="20" 
           min="12"
         />
        </div>

      <div className="form-group">
         <label htmlFor="uppercase-letters">Включить заглавные буквы</label>
         <input
         checked={includeUppercase}
         onChange={(e) => setIncludeUppercase(e.target.checked)}
           type="checkbox" 
           id="uppercase-letters" 
           name="uppercase-letters" 
         />
        </div>

      <div className="form-group">
         <label htmlFor="lowercase-letters">Включить строчные буквы</label>
         <input
         checked={includeLowercase}
         onChange={(e) => setIncludeLowercase(e.target.checked)}
           type="checkbox" 
           id="lowercase-letters" 
           name="lowercase-letters" 
         />
        </div>
      
      <div className="form-group">
         <label htmlFor="include-numbers">Включить числа</label>
         <input
         checked={includeNumbers}
         onChange={(e) => setIncludeNumbers(e.target.checked)}
           type="checkbox" 
           id="include-numbers" 
           name="include-numbers" 
         />
        </div>

      <div className="form-group">
         <label htmlFor="include-symbols">Включить символы</label>
         <input
         checked={includeSymbols}
         onChange={(e) => setIncludeSymbols(e.target.checked)}
           type="checkbox" 
           id="include-symbols" 
           name="include-symbols" 
         />
        </div>

      <button onClick={handleGeneratePassword} className='generator__btn'> 
      Создать пароль
      </button>
      <ToastContainer
          position="top-center"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          />
      </div>
    </div>
  </div>
 )
}

export default App;
