import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword, required, value }) => (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
            name={name}
            size="small"
            onChange={handleChange}
            variant="outlined"
            required={required}
            fullWidth
            label={label}
            autoFocus={autoFocus}
            type={type}
            value={value}
            autoComplete="off"
            InputProps={name === 'password' ? {
            endAdornment: (
                <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                    {type === 'password' ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                </InputAdornment>
            ),
            } : null}
        />
    </Grid>
);

export default Input;