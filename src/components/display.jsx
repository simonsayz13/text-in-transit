import { useEffect, useState } from "react";

const sanitiseUTags = (text) => {
  if (text.includes("[U]")) {
    text = text.replace(/\[U\]/g, "");
    text = text.replace(/\[\/U\]/g, "");
  }
  return text;
};

const sanitiseBTags = (text) => {
  if (text.includes("[B]")) {
    text = text.replace(/\[B\]/g, "");
    text = text.replace(/\[\/B\]/g, "");
  }
  return text;
};

const santitiseCTags = (text) => {
  while (text.includes("[C:")) {
    let colourTag = text.substr(text.indexOf("[C:"), 11);
    text = text.replace(colourTag, "");
    text = text.replace("[/C]", "");
  }
  return text;
};

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
  const [defaultColourDict, setDefaultColourDict] = useState({});

  useEffect(() => {
    // eslint-disable-next-line
    text = sanitiseBTags(text);
    text = sanitiseUTags(text);
    let textWithoutTags = santitiseCTags(text);
    let colourStack = ["#000000"];

    // Parse colour tags
    if (text.includes("[/C]")) {
      // console.log(text);
      for (let i = 0; i < textWithoutTags.length; i++) {
        if (text.substr(i, 3) === "[C:") {
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
        } else if (text.substr(i, 4) === "[/C]") {
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
    text = santitiseCTags(originalText);
    text = sanitiseUTags(text);

    // Parse bold tags
    if (text.includes("[B]")) {
      let boldFlag = false;
      let tempArray = []
      for (let i = 0; i < textWithoutTags.length + 4; i++) {
        if (text.substr(i, 3) === "[B]") {
          boldFlag = true;
          text = text.slice(0, i) + text.slice(i + 3);
          i-=1
        } else if (text.substr(i, 4) === "[/B]") {
          boldFlag = false;
          text = text.slice(0, i) + text.slice(i + 4);
          i-=1
        } else {
          if (boldFlag && !tempArray.includes(i + Number(width))) {
            tempArray.push(i + Number(width))
            setBoldArray((oldArray) => [...oldArray, i + Number(width)]);
            setDefaultBoldArray((oldArray) => [
              ...oldArray,
              i + Number(width),
            ]);
          }
        }
      }
    }
    // eslint-disable-next-line
    text = sanitiseBTags(originalText);
    text = santitiseCTags(text);

    // Parse underline tags
    if (text.includes("[U]")) {
      let underlineFlag = false;
      let tempArray = []
      for (let i = 0; i < textWithoutTags.length + 4; i++) {
        if (text.substr(i, 3) === "[U]") {
          underlineFlag = true;
          text = text.slice(0, i) + text.slice(i + 3);
          i-=1
        } else if (text.substr(i, 4) === "[/U]") {
          underlineFlag = false;
          text = text.slice(0, i) + text.slice(i + 4);
          i-=1
        } else {
          if (underlineFlag && !tempArray.includes(i + Number(width))) {
            tempArray.push(i + Number(width))
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
  console.log(boldArray);
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
