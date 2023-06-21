import "../global.choice.style.css";

import { svgMap } from "../../../config/constraints";
import { useRef } from "react";
import { useState } from "react";
import { current } from "@reduxjs/toolkit";
import { useEffect } from "react";

export default function FillChoice({
    index,
    handlerFillChoice,
    handlerUpdate,
    value
}) {

    function adjustTextareaHeight() {
        var textarea = document.getElementById(`answer-text-area-${index}`);
        textarea.style.height = "auto"; // Reset height to allow scrollHeight calculation
        textarea.style.height = textarea.scrollHeight + "px"; // Set the height to the scroll height
    }

    return (
        <div className="item">
            <textarea
                key={`${index}-area-choice-${index}`}
                type="text"
                onInput={adjustTextareaHeight}
                value={value}
                onChange={(e)=> {
                    handlerFillChoice(e.target.value)
                }}
                onAbort={handlerUpdate}
                id={`answer-text-area-${index}`}
                placeholder="Answer here... "
            ></textarea>
        </div>
    );
}
