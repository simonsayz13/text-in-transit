import { useEffect, useState } from "react";

// ("\xa0 ")
const Display = ({ speed, width, text }) => {
  const [displayArray, setDisplayArray] = useState(
    new Array(Number(width)).fill("\xa0")
  );
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentChar < (text.length + width))  {
      setTimeout(() => {
        const ArrayCopy = [...displayArray];
        ArrayCopy.shift();
        ((text.split("")[currentChar]===' ')||(text.split("")[currentChar]===undefined)) ? ArrayCopy.push("\xa0") : ArrayCopy.push(text.split("")[currentChar]);
        // console.log(ArrayCopy);
        setCurrentChar(currentChar + 1);
        setDisplayArray(ArrayCopy);
        // console.log(currentChar)
      }, 1000/Number(speed));
    } else {
      setDisplayArray(new Array(Number(width)).fill("\xa0"))
      setCurrentChar(0)
    }
    // eslint-disable-next-line
  }, [displayArray]);

  return (
    <div className={` w-92 h-28 flex justify-end border-2`}>
      {displayArray.map((value, index) => {
        return <p className="text-8xl text-center" key={index}>{`${value}`}</p>;
      })}
    </div>
  );
};

export default Display;
