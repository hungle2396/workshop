import "./App.css";
import Home from "./pages/Home/Home";
import ToolSelection from "./pages/ToolSelection/ToolSelection";
import { useState, useRef } from "react";

function App() {
    const [colorHex, setColorHex] = useState("#000000");
    const [fontSize, setFontSize] = useState(0);
    const [toggle, setToggle] = useState(false);
    const [val, setVal] = useState([]);
    const [idx, setIdx] = useState(null);
    const sketchRef = useRef(null);

    const handleToggle = () => {
        setToggle((preToggle) => !preToggle);
    };

    return (
        <div className="app">
            <Home
                color={colorHex}
                fontSize={fontSize}
                sketchRef={sketchRef}
                val={val}
                setVal={setVal}
                idx={idx}
                setIdx={setIdx}
                toggle={toggle}
            />
            <button className="orange--button" onClick={handleToggle}>
                {toggle ? "Use Book" : "Interact!"}
            </button>
            {toggle && (
                <ToolSelection
                    setColor={setColorHex}
                    setFont={setFontSize}
                    colorHex={colorHex}
                    sketchRef={sketchRef}
                    val={val}
                    setVal={setVal}
                    idx={idx}
                />
            )}
        </div>
    );
}

export default App;
