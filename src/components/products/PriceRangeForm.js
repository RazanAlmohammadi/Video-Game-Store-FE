import React from 'react';
import TextField from "@mui/material/TextField";

export default function PriceRangeForm(prop) {
    const { setMinPrice, setMaxPrice } = prop;

    function onChangeHandlerMinPrice(event) {
        setMinPrice(event.target.value);
    }

    function onChangeHandlerMaxPrice(event) {
        setMaxPrice(event.target.value);
    }

    const styles = {
        
        header: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '15px',
        },
        textField: {
            width: '250px',
            marginBottom: '15px',
        },
    };

    return (
        <div style={styles.container}>
            <p style={styles.header}>Unleash your shopping adventure – Set your price range below:</p>
            <TextField
                id="standard-basic-min"
                label="Min price"
                variant="standard"
                helperText="Start from your budget"
                type="number"
                onChange={onChangeHandlerMinPrice}
                style={styles.textField}
            />
            <TextField
                id="standard-basic-max"
                label="Max price"
                variant="standard"
                helperText="Don’t exceed your limit"
                type="number"
                onChange={onChangeHandlerMaxPrice}
                style={styles.textField}
            />
        </div>
    );
}
