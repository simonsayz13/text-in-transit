import { useEffect, useState } from "react";

const Display = ({ speed, width, text }) => {
  const [boldArray, setBoldArray] = useState([]);
  const [defaultBoldArray, setDefaultBoldArray] = useState([]);
  const [underlineArray, setUnderlineArray] = useState([]);
  const [defaultUnderlineArray, setDefaultUnderlineArray] = useState([]);
  const [currentChar, setCurrentChar] = useState(0);
  const [cleanText, setCleanText] = useState("");
  const [displayArray, setDisplayArray] = useState(
    new Array(Number(width)).fill("\xa0")
  );
  const originalText = text;
  const [colourDict, setColourDict] = useState({});
  const [defaultColourDict, setDefaultColourDict] = useState({})

  useEffect(() => {

    while (text.includes("[/C]")) {
      while (text.includes("[U]")) {
        text = text.replace("[U]", "");
        text = text.replace("[/U]", "");
      }

      while (text.includes("[B]")) {
        text = text.replace("[B]", "");
        text = text.replace("[/B]", "");
      }

      for (let i = text.indexOf("[C:"); i < text.indexOf("[/C]") - 11; i++) {
        const colour = text.substr(text.indexOf("[C:")+3, 7)
        setColourDict((oldDict) => ({
          ...oldDict,
          [i+Number(width)]: colour,
        }));
        setDefaultColourDict((oldDict) => ({
          ...oldDict,
          [i+Number(width)]: colour,
        }));
      }
      
      text =
        text.slice(0, text.indexOf("[C:")) +
        text.slice(text.indexOf("[C:") + 11);

      text =
        text.slice(0, text.indexOf("[/C]")) +
        text.slice(text.indexOf("[/C]") + 4);
      // let colourTag = text.substr(text.indexOf('[C:'), 11)
      // let colour = text.substr(text.indexOf('[C:')+3, 7)
      // console.log(colourTag)
      // console.log(colour)
    }

    if (originalText.includes("[B]")) {
      text = originalText;
    }

    while (text.includes("[B]")) {

      while (text.includes("[C:")){
        let colourTag = text.substr(text.indexOf('[C:'), 11)
        text = text.replace(colourTag, "")
        text = text.replace("[/C]", "")
      }

      while (text.includes("[U]")) {
        text = text.replace("[U]", "");
        text = text.replace("[/U]", "");
      }
      for (let i = text.indexOf("[B]"); i < text.indexOf("[/B]") - 3; i++) {
        setBoldArray((oldArray) => [...oldArray, i + Number(width)]);
        setDefaultBoldArray((oldArray) => [...oldArray, i + Number(width)]);
      }
      text =
        text.slice(0, text.indexOf("[B]")) +
        text.slice(text.indexOf("[B]") + 3);
      text =
        text.slice(0, text.indexOf("[/B]")) +
        text.slice(text.indexOf("[/B]") + 4);
    }

    if (originalText.includes("U")) {
      // eslint-disable-next-line
      text = originalText;
    }

    while (text.includes("[U]")) {
      while (text.includes("[B]")) {
        text = text.replace("[B]", "");
        text = text.replace("[/B]", "");
      }
      while (text.includes("[C:")){
        let colourTag = text.substr(text.indexOf('[C:'), 11)
        text = text.replace(colourTag, "")
        text = text.replace("[/C]", "")
      }
      for (let i = text.indexOf("[U]"); i < text.indexOf("[/U]") - 3; i++) {
        setUnderlineArray((oldArray) => [...oldArray, i + Number(width)]);
        setDefaultUnderlineArray((oldArray) => [
          ...oldArray,
          i + Number(width),
        ]);
      }
      text =
        text.slice(0, text.indexOf("[U]")) +
        text.slice(text.indexOf("[U]") + 3);
      text =
        text.slice(0, text.indexOf("[/U]")) +
        text.slice(text.indexOf("[/U]") + 4);
    }

    setCleanText(text);
    // Start initiate the arrray.
    setDisplayArray(new Array(Number(width)).fill("\xa0"));
  }, []);

  useEffect(() => {
    // console.log(colourDict)
    if (cleanText !== "") {
      if (currentChar < cleanText.length + Number(width)) {
        setTimeout(() => {
          const ArrayCopy = [...displayArray];
          ArrayCopy.shift();
          cleanText.split("")[currentChar] === " " ||
          cleanText.split("")[currentChar] === undefined
            ? ArrayCopy.push("\xa0")
            : ArrayCopy.push(cleanText.split("")[currentChar]);
          setCurrentChar(currentChar + 1);
          setDisplayArray(ArrayCopy);
          setBoldArray((oldArray) =>
            oldArray.map(function (v) {
              return v - 1;
            })
          );
          setUnderlineArray((oldArray) =>
            oldArray.map(function (v) {
              return v - 1;
            })
          );
          let newDict = {}
          for (const [key, value] of Object.entries(colourDict)) {
            newDict[key-1] = value
          }
          setColourDict(newDict)

        }, 1000 / Number(speed));
      } else {
        setBoldArray(defaultBoldArray);
        setUnderlineArray(defaultUnderlineArray);
        setColourDict(defaultColourDict);
        setDisplayArray(new Array(Number(width)).fill("\xa0"));
        setCurrentChar(0);
      }
    }
    // eslint-disable-next-line
  }, [displayArray]);
  return (
    <div className={`h-28 flex justify-end border-2`}>
      {displayArray.map((value, index) => {
        let boldFont = "";
        let underline = "";
        let colour = "black";
        boldArray.includes(index) ? (boldFont = "font-bold") : (boldFont = "");
        underlineArray.includes(index)
          ? (underline = "underline")
          : (underline = "");
        colourDict[index] !== undefined
          ? (colour = colourDict[index])
          : (colour = "");
        return (
          <p
            className={`text-8xl text-center font-mono ${boldFont} ${underline}`}
            style={{ color: `${colour}` }}
            key={index}
          >{`${value}`}</p>
        );
      })}
    </div>
  );
};

export default Display;
