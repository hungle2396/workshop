import React, { useState } from "react";
import "./ToolSelection.css";
import { ToolsData } from "../../data/ToolsData";

const ToolSelection = ({
    setColor,
    setFont,
    colorHex,
    sketchRef,
    val,
    setVal,
    idx,
}) => {
    const [activeTool, setActiveTool] = useState("");

    const active = (toolName) => {
        if (toolName === activeTool && toolName === "Text")
            return "active--text";
        else if (toolName === activeTool) {
            return "active";
        } else {
            return "";
        }
    };

    const handleToolClick = (tool) => {
        setActiveTool(tool.name === activeTool ? "" : tool.name);
        setFont(tool.name === activeTool ? 0 : tool.fontSize);

        // If it's eraser mode
        if (tool.name === "Eraser") {
            if (sketchRef.current) {
                // Set erase mode using the sketchRef
                sketchRef.current.eraseMode(true);
            }
            // The other tools mode (marker, pen, pencil, etc)
        } else {
            if (sketchRef.current) {
                // Set erase mode to false using the sketchRef
                sketchRef.current.eraseMode(false);
            }
        }
    };

    const handleEraseAll = () => {
        // Show a confirmation dialog
        const userConfirmed = window.confirm(
            "Do you want to erase everything?"
        );

        if (userConfirmed && sketchRef.current) {
            sketchRef.current.clearCanvas();
        }
    };

    const handleAdd = () => {
        const abc = [...val, []];
        setVal(abc);
    };

    const handleDelete = () => {
        const deletVal = [...val];
        deletVal.splice(idx, 1);
        setVal(deletVal);
    };

    const colorChoicesRender = (colors) => {
        return colors.map((color) => {
            return (
                <button
                    className="color--button"
                    style={{ backgroundColor: color }}
                    onClick={() => setColor(color)}
                />
            );
        });
    };

    const colorsRender = ToolsData.map((tool) => {
        return (
            <div
                key={tool.name}
                className={`color--container ${
                    activeTool !== tool.name ? "hidden" : ""
                }`}
            >
                <div className="color--left--container">
                    <h3>Color choice:</h3>

                    <input
                        className="color--picked"
                        type="color"
                        value={colorHex}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>

                <div className="color--right--container">
                    {colorChoicesRender(tool.colors)}
                </div>
            </div>
        );
    });

    const toolsRender = ToolsData.map((tool) => {
        return (
            <div
                key={tool.name}
                className={`tool-container 
                ${active(tool.name)}
                ${tool.name === "Text" ? "negative--bottom" : ""}`}
            >
                <img
                    src={tool.image}
                    alt={tool.name}
                    className="image"
                    onClick={() => handleToolClick(tool)}
                />
            </div>
        );
    });

    if (activeTool !== "")
        return (
            <div className="toolbar">
                {colorsRender}

                <div className="tools--container">
                    <div className="tools">{toolsRender}</div>

                    {activeTool === "Eraser" && (
                        <div className="eraser--container">
                            <button
                                className="eraser--button"
                                onClick={handleEraseAll}
                            >
                                Erase All
                            </button>
                        </div>
                    )}

                    {activeTool === "Text" && (
                        <div className="text--container">
                            <button
                                className="text--button text--orange"
                                onClick={() => handleAdd()}
                            >
                                Add Text
                            </button>
                            <button
                                className="text--button text--green"
                                onClick={() => handleDelete()}
                            >
                                Delete Text
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    else {
        return (
            <div className="toolbar">
                <div className={`color--container`}>
                    <div className="color--left--container">
                        <h3 class>Color choice:</h3>

                        <input
                            className="color--picked"
                            type="color"
                            value={colorHex}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>

                    <div className="color--right--container">
                        {colorChoicesRender([
                            "#e98427",
                            "#438342",
                            "#6f219e",
                            "#e9bb18",
                            "#59371d",
                            "#1c1a1a",
                            "#fff2e5",
                        ])}
                    </div>
                </div>

                <div className="tools--container">
                    <div className="tools">{toolsRender}</div>
                </div>
            </div>
        );
    }
};

export default ToolSelection;
