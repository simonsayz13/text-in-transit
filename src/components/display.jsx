import { useEffect, useState } from "react";

const Display = ({ speed, width, text }) => {
  const [boldArray, setBoldArray] = useState([]);
  const [defaultBoldArray, setDefaultBoldArray] = useState([]);
  const [underlineArray, setUnderlineArray] = useState([]);
  const [defaultUnderlineArray, setDefaultUnderlineArray] = useState([]);
  const [colourDict, setColourDict] = useState({});
  const [defaultColourDict, setDefaultColourDict] = useState({});
  const [currentChar, setCurrentChar] = useState(0);
  const [cleanText, setCleanText] = useState("");
  const [displayArray, setDisplayArray] = useState(
    new Array(Number(width)).fill("\xa0")
  );
  const originalText = text;

  useEffect(() => {
    // eslint-disable-next-line
    text = text.replace(/\[\/*(([uU])|([bB]))\]/g, "");

    //Sanitise C tags
    let textWithoutTags = text.replace(/\[\/*[cC](:#[a-zA-Z0-9]{6})*\]/g, "");
    let colourStack = ["#000000"];

    // Parse colour tags
    if (/\[\/*[cC](:#[a-zA-Z0-9]{6})*\]/g.test(text)) {
      // console.log(text);
      for (let i = 0; i < textWithoutTags.length; i++) {
        if (/\[[cC](:#[a-zA-Z0-9]{6})*\]/g.test(text.substr(i, 11))) {
          colourStack.push(text.substr(i + 3, 7));
          text = text.slice(0, i) + text.slice(i + 11);
          const colour = colourStack[colourStack.length - 1];
          setColourDict((oldDict) => ({
            ...oldDict,
            [i + Number(width)]: colour,
          }));
          setDefaultColourDict((oldDict) => ({
            ...oldDict,
            [i + Number(width)]: colour,
          }));
        } else if (/\[\/[cC]\]/g.test(text.substr(i, 4))) {
          colourStack.pop();
          text = text.slice(0, i) + text.slice(i + 4);
          i -= 1;
        } else {
          const colour = colourStack[colourStack.length - 1];
          setColourDict((oldDict) => ({
            ...oldDict,
            [i + Number(width)]: colour,
          }));
          setDefaultColourDict((oldDict) => ({
            ...oldDict,
            [i + Number(width)]: colour,
          }));
        }
      }
    }

    // eslint-disable-next-line
    text = originalText.replace(
      /\[\/*(([cC](:#[a-zA-Z0-9]{6})*)|([uU]))\]/g,
      ""
    );

    // Parse bold tags
    if (/\[[bB]\]/g.test(text)) {
      let tempBoldStack = []
      let tempArray = [];
      for (let i = 0; i < textWithoutTags.length + 4; i++) {
        if (/\[[bB]\]/g.test(text.substr(i, 3))) {
          tempBoldStack.push('b')
          text = text.slice(0, i) + text.slice(i + 3);
          i -= 1;
        } else if (/\[\/[bB]\]/g.test(text.substr(i, 4))) {
          tempBoldStack.pop()
          text = text.slice(0, i) + text.slice(i + 4);
          i -= 1;
        } else {
          if (tempBoldStack.includes('b') && !tempArray.includes(i + Number(width))) {
            tempArray.push(i + Number(width));
            setBoldArray((oldArray) => [...oldArray, i + Number(width)]);
            setDefaultBoldArray((oldArray) => [...oldArray, i + Number(width)]);
          }
        }
      }
    }
    // eslint-disable-next-line
    text = originalText.replace(
      /\[\/*(([cC](:#[a-zA-Z0-9]{6})*)|([bB]))\]/g,
      ""
    );

    // Parse underline tags
    if (/\[[uU]\]/g.test(text)) {
      let tempUnderlineStack = [];
      let tempArray = [];
      for (let i = 0; i < textWithoutTags.length + 4; i++) {
        if (/\[[uU]\]/g.test(text.substr(i, 3))) {
          tempUnderlineStack.push('u')
          text = text.slice(0, i) + text.slice(i + 3);
          i -= 1;
        } else if (/\[\/[uU]\]/g.test(text.substr(i, 4))) {
          tempUnderlineStack.pop()
          text = text.slice(0, i) + text.slice(i + 4);
          i -= 1;
        } else {
          if (tempUnderlineStack.includes('u') && !tempArray.includes(i + Number(width))) {
            tempArray.push(i + Number(width));
            setUnderlineArray((oldArray) => [...oldArray, i + Number(width)]);
            setDefaultUnderlineArray((oldArray) => [
              ...oldArray,
              i + Number(width),
            ]);
          }
        }
      }
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
          let newDict = {};
          for (const [key, value] of Object.entries(colourDict)) {
            newDict[key - 1] = value;
          }
          setColourDict(newDict);
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
  // console.log(underlineArray);
  return (
    <div className={`h-28 flex justify-end border-2 w-auto`}>
      {displayArray.map((value, index) => {
        let boldFont = "";
        let underline = "";
        let colour = "#000000";
        boldArray.includes(index) ? (boldFont = "font-bold") : (boldFont = "");
        underlineArray.includes(index)
          ? (underline = "underline")
          : (underline = "");
        colourDict[index] !== undefined
          ? (colour = colourDict[index])
          : (colour = "#000000");
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
