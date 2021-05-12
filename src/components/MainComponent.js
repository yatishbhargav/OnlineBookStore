import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import useForm from '../hooks/useForm';
import useFormCart from '../hooks/useFormCart';
import useFormCategory from '../hooks/useFormCategory';
import Home from './bookComponents/Home';
import Login from './loginComponent/Login'
import Registration from './loginComponent/Registration'

const getFreshModelOfCustomer=()=>({
    firstName:'',
    lastName:'',
    mobileNumber:0,
    emailID:'',
    password:'',
});

const generateOrderNumber=()=> Math.floor(100000+Math.random()*900000).toString();

const getFreshModelOfCart=()=>({
    cartID:0,
    orderNumber:generateOrderNumber(),
    emailID:'',
    pMethod:'none',
    gTotal:0,
    orderDetails:[]
});

const getFreshModelOfCategory=()=>({
    categoryID:0,
    categoryName:''
});

export default function MainComponent() {
    
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    }=useForm(getFreshModelOfCustomer);

    const {
        cartValues,
        setCartValues,
        cartErrors,
        setCartErrors,
        handleCartInputChange,
        resetCartFormControls
    }=useFormCart(getFreshModelOfCart);

    const {
        catValues,
        setCatValues,
        catErrors,
        setCatErrors,
        handleCatInputChange,
        resetCatFormControls
    }=useFormCategory(getFreshModelOfCategory);

    return (
        <Switch>
            <Route path="/registration">
                <Registration {...{
                    values,setValues,
                    errors,setErrors,
                    handleInputChange,
                    resetFormControls
                }} />
            </Route>
            <Route path="/login">
                <Login {...{
                    values,setValues,
                    errors,setErrors,
                    handleInputChange,
                    resetFormControls
                }} />
            </Route>
            <Route path="/home">
                <Home {...{
                    catValues,setCatValues,
                    catErrors,setCatErrors,
                    handleCatInputChange,
                    resetCatFormControls
                }} />
            </Route>
            <Redirect to="/registration" />
        </Switch>
    )
}
