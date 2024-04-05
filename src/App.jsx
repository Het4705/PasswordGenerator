import { useState, useCallback, useEffect, useRef } from "react"



function App() {
  const [length, setLength] = useState(8)
  const [numeric, setNumeric] = useState(false)
  const [specialSymbol, setSpecialSymbol] = useState(false)
  const [password, setPassword] = useState("")
  const [copy, setCopy] = useState(false)
  const passwordRef = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);
    window.navigator.clipboard.writeText(password)
    setCopy(true)
  }, [password]) // dependency is password as we need to callback on change of password

  //  function and dependencies 
  // on change of dependency it will call back else on rerendering the cached values 
  // returned initially by function will be returned

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numeric) str += "0123456789"
    if (specialSymbol) str += "!@#$%^&*()_-:;><,.[]{}"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numeric, specialSymbol, setPassword])
  //  function and dependencies

  //! we cant't call like this as react don't allow
  // passwordGenerator() 

  useEffect(() => {
    if (copy) {
      const timer = setTimeout(() => {
        setCopy(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copy]);

  useEffect(() => {
    passwordGenerator()
  }, [length, numeric, specialSymbol, setPassword, passwordGenerator])
  return (
    <>
  

        <div className="h-[100vh] w-[100vw]  flex flex-col justify-center items-center">
          <div id="main" className=" border-y-slate-600 border-t-[0.5px]  shadow-slate-900 shadow-2xl h-[50%] w-full flex flex-col justify-start items-center max-w-md  shadow-md rounded-lg ">
            <h1 className="text-2xl p-2 m-2 mb-3  text-[#f4fff1]" id="heading" >Password Generator </h1>
            <div className="flex classBg h-[15%] shadow bg-t w-[90%] p-3 rounded-lg overflow-hidden mb-4 ">
              <input
                className=" rounded-sm p-2  h-8 w-[100%]"
                type="text"
                placeholder="Password"
                value={password}
                readOnly
                ref={passwordRef}
              />
              <button onClick={copyPasswordToClipboard} className="ml-3 h-8 hover:shadow-sm hover:bg-slate-300 hover:bg-gradient-to-r from-sky-500 to-indigo-500 bg-white p-1 flex justify-center items-center rounded-sm">COPY</button>
            </div>

            <div className="flex  w-full justify-around items-center">
              <div className="flex p-2 rounded-lg justify-center text-sm gap-x-2 w-[40%] classBg text-blue-400 ">
                <div className="flex  items-center  " >
                  <input
                    type="range"
                    min={6}
                    max={100}
                    value={length}
                    className="cursor-pointer mr-1 bg-transparent"
                    onChange={(e) => {
                      setLength(e.target.value)
                      console.log(length)
                    }}
                  />
                  <p className="text-white">len:{length}</p>
                </div>

              </div>
              <div className="flex p-2 rounded-lg justify-center text-sm gap-x-2  classBg text-white ">
                <input
                  type="checkbox"
                  defaultChecked={numeric}
                  id="numeric"
                  onChange={() => {
                    setNumeric(!numeric)
                  }}
                />
                <label htmlFor="numeric">
                  Numbers
                </label>
              </div>

              <div className="flex p-2 rounded-lg justify-center text-sm gap-x-2  classBg text-white ">
                <input
                  type="checkbox"
                  defaultChecked={specialSymbol}
                  id="numeric"
                  onChange={() => {
                    setSpecialSymbol(!specialSymbol)
                  }}
                />
                <label htmlFor="specialSymbols">
                  Symbols
                </label>
              </div>


            </div>
            <div className="mt-20 classBg text-[#fff] font-mono p-2 w-[90%] rounded-3xl flex flex-col justify-center items-center ">
              <a href="https://youtube.com/playlist?list=PLu71SKxNbfoDqgPchmvIsL4hTnJIrtige&feature=shared">
                <h1>Chai Aur React | Hitesh Sir</h1>
              </a>
            </div>
            {/* this is how to add conditional statement */}
            {(specialSymbol && !copy) && <p className="text-[#eee]">SpecialSymbols are added to password</p>}

            {(numeric && !copy) && <p className="text-[#eee]">Numerics are added to password</p>}
            {copy && <p className="text-[#eee]">Copied To Clipboard</p>}

          </div>

          <h1 className="text-white mt-8 text-yellow-300">React<em className="text-cyan-300"> Hooks</em></h1>
        </div>

    </>
  )
}


export default App
