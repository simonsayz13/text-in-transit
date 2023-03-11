import Display from "./components/display";
import { useState } from "react";

function App() {
  const [text, setText] = useState(
    // "[C:#FF0000][B]A[/B][/C][C:#00FF00][U]B[/U][/C]"
    "[C:#FF0000]All of this text is Red, but [C:#0000FF][B][U]THIS[/U][/B] text is Blue.[/C][/C]"
    // "[C:#FF0000]Red[/C] - [C:#00FF00]Green[/C]"
    // "[C:#FF0000][B]depart[/B][/C] [C:#00FF00]on [U]time[/U][/C]"
    // "[U][B]He[/B]l[B]l[/B]o[/U] Sam"
    // "[B]He[/B]ell[B]o[/B]"
    // "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );

  const [width, setWidth] = useState(15);
  const [speed, setSpeed] = useState(5);
  const [start, setStart] = useState(false);

  return (
    <div className="justify-center flex-col">
      <p className=" text-center text-4xl font-bold my-4">Text In Transit</p>
      <div className="flex flex-row justify-center gap-x-4 my-4">
        <label className="font-bold flex flex-col text-center text-2xl">
          Text
          <input
            type="Text"
            className="border-2"
            placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
            onChange={(textInput) => {
              setText(textInput.target.value);
            }}
          />
        </label>
        <label className="font-bold flex flex-col text-center text-2xl">
          Width
          <input
            type="Text"
            className="border-2"
            placeholder="10"
            onChange={(widthInput) => {
              setWidth(widthInput.target.value);
            }}
          />
        </label>

        <label className="font-bold flex flex-col text-center text-2xl">
          Speed (1 - 100)
          <input
            type="Text"
            className="border-2"
            placeholder="10"
            onChange={(speedInput) => {
              setSpeed(speedInput.target.value);
            }}
          />
        </label>
      </div>
      <div className="flex flex-row justify-center">
        <div className="flex justify-center my-4 mx-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              setStart(true);
            }}
          >
            Start
          </button>
        </div>
        <div className="flex justify-center my-4 mx-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={() => {
              setStart(false);
            }}
          >
            Stop
          </button>
        </div>
      </div>
      {start ? (
        <div className="flex justify-center my-4">
          <Display text={text} speed={speed} width={width} />
        </div>
      ) : (
        <div className="flex justify-center my-4">
          {/* <div className={` w-1/3 h-28 border-2 bg-white`}></div> */}
        </div>
      )}
    </div>
  );
}

export default App;
