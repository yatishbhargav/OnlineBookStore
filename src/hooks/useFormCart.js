import React,{useState} from 'react'

export default function useFormCart(getFreshModelObject) {
    const [cartValues,setCartValues]=useState(getFreshModelObject());
    const [cartErrors,setCartErrors]=useState({});

    const handleCartInputChange = e => {
        const {name,value}=e.target;
        setCartValues({
            ...cartValues,
            [name]:value
        });
    }

    const resetCartFormControls = () =>{
        setCartValues(getFreshModelObject());
        setCartErrors({})
    }

    return {
        cartValues,
        setCartValues,
        cartErrors,
        setCartErrors,
        handleCartInputChange,
        resetCartFormControls
    }
}
