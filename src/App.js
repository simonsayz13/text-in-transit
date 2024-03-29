import Display from "./components/display";
import { useState } from "react";

function App() {
  const [text, setText] = useState(
    // "[C:#FF0000]RED[/C] and [C:#0000FF][b]Blue[/b][/C]"
    "[C:#BD11bd][B][b][u]A[/U]a[/b][/B]a[C:#00FF00]b[C:#0000FF]c[/C][/C][/C][u][B]c[/B][U]A[/u][/U]"
    // "[U][U]AB[/U][/U]C[U]D[/U]"
    // "[C:#FF0000]R[C:#00FF00][U][U]G[/U][/U][C:#0000FF]B[/C][/C][/C]"
    // "[C:#FF0000]R[C:#0000FF]B[/C][/C][C:#00FF00]G[/C]"
    // "[C:#FF0000]All of this [C:#e834eb]text[/C] is Red, but [C:#0000FF][B][U]THIS[/U][/B] text is [U][U]Blue.[/C][/C][/U][/U]"
    // "[C:#FF0000]red text [C:#00FF00]and[/C] [C:#0000FF]blue text[/C][/C]"
    // "[C:#FF0000]All of this text is Red, but [C:#0000FF][B][U]THIS[/U][/B] text is Blue.[/C][/C] [C:#00FF00]And [U]this[/U] is [B]Green[/B].[/C]"
    // "[C:#FF0000][B]B[/B][/C][C:#00FF00][U]B[/U][/C]"
    // "[C:#FF0000]All of this text is Red, but [C:#0000FF][B][U]THIS[/U][/B] text is Blue.[/C][/C]"
    // "[C:#FF0000]Red[/C] - [C:#00FF00]Green[/C]"
    // "[C:#FF0000][B]depart[/B][/C] [C:#00FF00]on [U]time[/U][/C]"
    // "[U][B]He[/B]l[B]l[/B]o[/U] Sam"
    // "[B]He[/B]ell[B]o[/B]"
  );

  const [width, setWidth] = useState(15);
  const [speed, setSpeed] = useState(10);
  const [start, setStart] = useState(false);
  const [inputIsDisabled, setInputIsDisabled] = useState(false);
  return (
    <div className="justify-center flex-col">
      <p className=" text-center text-4xl font-bold my-4">Text In Transit</p>
      <div className="flex md:flex-row mx-8 flex-col justify-center gap-x-4 my-4">
        <label className="font-bold flex flex-col text-center text-2xl">
          Text
          <input
            type="Text"
            className="border-2 rounded"
            placeholder={text}
            onChange={(textInput) => {
              setText(textInput.target.value);
            }}
            disabled={inputIsDisabled}
          />
        </label>
        <label className="font-bold flex flex-col text-center text-2xl">
          Width
          <input
            type="Text"
            className="border-2 rounded"
            placeholder="10"
            onChange={(widthInput) => {
              setWidth(widthInput.target.value);
            }}
            disabled={inputIsDisabled}
          />
        </label>

        <label className="font-bold flex flex-col text-center text-2xl">
          Speed {`(> 0)`}
          <input
            type="Text"
            className="border-2 rounded"
            placeholder="10"
            onChange={(speedInput) => {
              setSpeed(speedInput.target.value);
            }}
            disabled={inputIsDisabled}
          />
        </label>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex justify-center my-2 mx-2">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setStart(true);
              setInputIsDisabled(true);
            }}
          >
            Start
          </button>
        </div>
        <div className="flex justify-center my-2 mx-2">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              setStart(false);
              setInputIsDisabled(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>
      {start ? (
        <div className="flex justify-center my-4">
          <Display text={text} speed={speed} width={width} />
        </div>
      ) : (
        <></>
        // <div className="justify-center my-4 mx-56">
        //   <div className={`flex h-28 border-2 bg-white`}></div>
        // </div>
      )}
    </div>
  );
}

export default App;
