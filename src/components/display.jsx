import { useEffect, useState } from "react";

// ("\xa0 ")
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
  const originalText = text

  useEffect(() => {
    while (text.includes("[B]")) {
      while (text.includes("[U]")) {
        text = text.replace("[U]","")
        text = text.replace("[/U]","")
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
    // eslint-disable-next-line
    text = originalText
    while (text.includes("[U]")) {
      while (text.includes("[B]")) {
        text = text.replace("[B]","")
        text = text.replace("[/B]","")
      }
      for (let i = text.indexOf("[U]"); i < text.indexOf("[/U]") - 3; i++) {
        setUnderlineArray((oldArray) => [...oldArray, i + Number(width)]);
        setDefaultUnderlineArray((oldArray) => [...oldArray, i + Number(width)]);
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
        }, 1000 / Number(speed));
      } else {
        setBoldArray(defaultBoldArray);
        setUnderlineArray(defaultUnderlineArray)
        setDisplayArray(new Array(Number(width)).fill("\xa0"));
        setCurrentChar(0);
      }
    }
    // eslint-disable-next-line
  }, [displayArray]);

  // console.log('bold:',boldArray)
  // console.log('under:',underlineArray)
  return (
    <div className={`h-28 flex justify-end border-2`}>
      {displayArray.map((value, index) => {
        if (boldArray.includes(index) && underlineArray.includes(index)) {
          return (
            <p
              className={`text-8xl text-center font-mono font-bold underline`}
              key={index}
            >{`${value}`}</p>
          );
        }
        else if (boldArray.includes(index)) {
          return (
            <p
              className={`text-8xl text-center font-mono font-bold`}
              key={index}
            >{`${value}`}</p>
          );
        } else if (underlineArray.includes(index)) {
          return (
            <p
              className={`text-8xl text-center font-mono underline`}
              key={index}
            >{`${value}`}</p>
          );
        } else {
          return (
            <p
              className={`text-8xl text-center font-mono`}
              key={index}
            >{`${value}`}</p>
          );
        }
      })}
    </div>
  );
};

export default Display;
