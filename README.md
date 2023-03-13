# Challenge summary
The challenge is to build a fixed-width, right-to-left text scroller capable of taking a string parameter and screen width as inputs.

# Solution
Text in transit is as a single-page application with JavaScript and [React](https://reactjs.org/) framework.

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

1) Set the following parameters as prompt in the UI. ()

- **Text** (Text to be display)
- **Width** (Amount of character displayed at once)
- **Speed**  (Scrolling speed >= 1) 

default **Text**:
```
"[C:#FF0000]All of this text is Red, but [C:#0000FF][B][U]THIS[/U][/B] text is Blue.[/C][/C] [C:#00FF00]And [U]this[/U] is [B]Green[/B].[/C]"
```
Default **Width**:
```
10
```
Default **Speed**: 
```
10
```

2) Press **Start** and watch it scroll
3) Press **Stop** to adjust text, width or speed.
