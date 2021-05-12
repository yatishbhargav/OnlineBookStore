import React,{useState} from 'react'

export default function useFormCategory(getFreshModelObject) {
    const [catValues,setCatValues]=useState(getFreshModelObject());
    const [catErrors,setCatErrors]=useState({});

    const handleCatInputChange = e => {
        const {name,value}=e.target;
        setCatValues({
            ...catValues,
            [name]:value
        });
    }

    const resetCatFormControls = () =>{
        setCatValues(getFreshModelObject());
        setCatErrors({})
    }

    return {
        catValues,
        setCatValues,
        catErrors,
        setCatErrors,
        handleCatInputChange,
        resetCatFormControls
    }
}
