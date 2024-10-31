import React from "react";
import TextField from "@mui/material/TextField";
import './Form.css'; 

export default function Form({ setUserInput }) {
    function onChangeHandler(event) {
        setUserInput(event.target.value);
    }

    return (
        <div className="search-form">
            <h2>Find Your Perfect Product</h2>
            <form>
                <p>Type in the product name and let us help you find exactly what you’re looking for.</p>
                <TextField
                    id="standard-basic"
                    label="Enter product name..."
                    variant="standard"
                    onChange={onChangeHandler}
                    className="input-field"
                />
            </form>
        </div>
    );
}
