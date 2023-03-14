# Challenge summary
The challenge is to build a fixed-width, right-to-left text scroller capable of taking a string parameter and screen width as inputs.

# Solution
Text in transit is as a single-page application written in JavaScript with [React](https://reactjs.org/) framework.

### Functionalities
 - A working text scroller demonstrated as a web app. ✅
 - Supports sections of bold and underlined text. ✅
 - Supports sections of coloured text. ✅
 - Supports scrolling 'speed' input. ✅
 - Supports nested formatting. ✅

Deployment: https://text-in-transit.vercel.app/

# Installation

1) Install all dependencies using the following command while on the project's root directory.
```bash
npm i
```

2) Start development build of the application.
```bash
npm start
```

3) Enter the following URL in any JavaScript enabled web browser applications to access the application: http://localhost:3000/

# Usage

1) Set the following parameters as prompt in the UI.

    * <span style="color:orange">**Text**</span> (Text to be display)
      * **Bold** tags - [B]Example[/B]
      * **Underline** tags - [U]Example Text[/U]
      * **Colour** tags (HTML colour as 6 Hex-digits) - [C:#FF0000]Example Text[/C]

      <span style="color:red">Note that tags are not case sentive<span>
    * <span style="color:orange">**Width**</span> (Amount of character displayed at once)
    * <span style="color:orange">**Speed**</span>  (Scrolling speed >= 1) 

2) Press <span style="color:green">**Start**</span> and watch it scroll
3) Press <span style="color:red">**Stop**</span> to adjust text, width or speed.

default **Text**:
```
"[C:#BD11bd][B][b][u]A[/U]a[/b][/B]a[C:#00FF00]b[C:#0000FF]c[/C][/C][/C][u][B]c[/B][U]A[/u][/U]"
```
Default **Width**:
```
10
```
Default **Speed**: 
```
10
```