import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = ()=>{
        //console.log("Uppercase was clicked -" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase", "success");
    }
    const handleLoClick = ()=>{
        let lowText = text.toLowerCase();
        setText(lowText)
        props.showAlert("Converted to lowercase", "success");
    } 
    const handleClear = ()=>{
        let clearText = '';
        setText(clearText)
        props.showAlert("Text cleared", "success");
    }
    const handleOnChange = (event)=>{
        //console.log("On Change");
        setText(event.target.value)
    }
    const handleCopy = () => {
        var text = document.getElementById("myBox");
        text.select();
        navigator.clipboard.writeText(text.value);
        props.showAlert("Copied to Clipboard", "success");
    }
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "))
        props.showAlert("Extra spaces removed", "success");
    }

    const handleStrike = () => {
        setIsDone(prevValue => {
            return !prevValue;
        })

    }

    const handleAlter = () => {
        const altCase = require("alternating-case");
        setText(altCase(text))
    }

    const handleCapFirst = () => {
        function capFirst(sentence) {
            let words = sentence.split(" ").map(word => {
                return word[0].toUpperCase() + word.slice(1);
            })
            return words.join(" ");
        }
        setText(capFirst(text))
    }

    const [text, setText] = useState('');
    const [isDone, setIsDone] = useState(false);
    return (
        <>
            <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}>
                <h1 >{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'grey':'white', color: props.mode==='dark'?'white':'#042743', textDecoration: isDone? "line-through" : "none"}} id="myBox" rows="8"></textarea>
                </div>
                <button className="btn btn-primary" onClick={handleUpClick}>Convert to Uppercase</button>
                <button className="btn btn-primary mx-3" onClick={handleLoClick}>Convert to Lowercase</button>
                <button className="btn btn-primary" onClick={handleClear}>Clear Text</button>
                <button className="btn btn-primary mx-3" onClick={handleCopy}>Copy Text</button>
                <button className="btn btn-primary" onClick={handleExtraSpaces}>Remove extra spaces</button>
                <button className="btn btn-primary mx-3" onClick={handleStrike}>Strike through</button>
                <button className="btn btn-primary" onClick={handleAlter}>Alternate Text</button>
                <button className="btn btn-primary mx-3" onClick={handleCapFirst}>Capitalize First Letter</button>
            </div>
            <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
                <h1>Your text summary</h1>
                <p>{text.split(" ").length} words and {text.length} characters</p>
                <p>It will take {0.008 * text.split(" ").length} minutes to read.</p>
                <h2>Preview</h2>
                <p>{text.length>0?text:"Enter something in the textbox above to preview it here"}</p>
            </div>
        </>
  )
}
