import { Grid,makeStyles } from '@material-ui/core'
import Form from '../../layouts/Form';
import {Button, Input} from '../../controls/index'
import React from 'react'
import {createAPIEndpoint,ENDPOINTS} from '../../api/index'

const useStyles=makeStyles(theme=>({
    root:{
        paddingTop:theme.spacing(5),
        paddingLeft:theme.spacing(50)
    }
}))

export default function Registration(props) {
    const classes=useStyles();
    const {values,setValues,errors,setErrors,handleInputChange,resetFormControls}=props;

    const validateForm=()=>{
        var temp={};
        let fn=values.firstName.length;
        let ln=values.lastName.length;
        temp.firstName=fn!=0?fn<6?"FirstName is too short":
        fn>10?"FirstName is too Long":"":"It is a required Field";
        temp.lastName=ln!=0?ln<6?"LastName is too short":
        ln>10?"LastName is too Long":"":"It is a required Field";
        temp.mobileNumber=values.mobileNumber.length==10?"":"Enter Valid Mobile Number";
        temp.emailID=values.emailID.length>8?"":"It is a required Feild";
        let pass=values.password.length;
        temp.password=pass!=0?pass<6?"Password is too weak":""
        :"It is a required Field";
        setErrors({...temp});
        return Object.values(temp).every(x=>x==="");
    }

    const handleSubmit=e=>{
        e.preventDefault();
        if(validateForm()){
            createAPIEndpoint(ENDPOINTS.CUSTOMER).create(values)
            .then(res=>{
                resetFormControls();
                setValues({
                    ...values,
                    success:"Account is created Successfully!!!"
                })
            })
            .catch(err=>{
                if(err.request.status==409){
                    setErrors({
                        ...errors,
                        existingCustomer:"You Already have an account please login"
                    })
                }
            })
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container className={classes.root}>
                <Grid item xs={6}>
                    <Input
                        label='FirstName'
                        name='firstName'
                        value={values.firstName}
                        onChange={handleInputChange}
                        error={errors.firstName}
                    />
                    <Input
                        label='LastName'
                        name='lastName'
                        value={values.lastName}
                        onChange={handleInputChange}
                        error={errors.lastName}
                    />
                    <Input
                        label='MobileNumber'
                        name='mobileNumber'
                        value={values.mobileNumber}
                        onChange={handleInputChange}
                        error={errors.mobileNumber}
                    />
                    <Input
                        label='EmailID'
                        name='emailID'
                        value={values.emailID}
                        onChange={handleInputChange}
                        error={errors.emailID}
                    />
                    <Input
                        label='Password'
                        type='password'
                        name='password'
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <div>
                        <Button
                            type='submit'
                        >SignUp</Button>
                        <a href='/login'>Already have an Account</a>
                    </div>
                    <h3>{errors.existingCustomer}</h3>
                    <h3>{values.success}</h3>          
                </Grid>
            </Grid>
        </Form> 
    )
}
