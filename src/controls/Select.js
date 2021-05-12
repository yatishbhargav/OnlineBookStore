import React from 'react'
import {FormControl, InputLabel, Select as MultiSelect, MenuItem,
FormHelperText} from '@material-ui/core'

export default function Select(props) {
    const {name,label,value,variant,onChange,options,error=null}=props;
    return (
        <FormControl
            variant={variant || "outlined"}
            {...(error && {error:true})}
        >
            <InputLabel>{label}</InputLabel>
            <MultiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}
            >
                {
                    options.map(
                        item=>(<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MultiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}
