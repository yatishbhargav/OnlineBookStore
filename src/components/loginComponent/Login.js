import { Grid, makeStyles } from '@material-ui/core'
import Form from '../../layouts/Form';
import {Input,Button} from '../../controls/index'
import React from 'react'
import {createAPIEndpoint,ENDPOINTS} from '../../api/index'
import { useHistory } from 'react-router';

const useStyles=makeStyles(theme=>({
    root:{
        paddingTop:theme.spacing(5),
        paddingLeft:theme.spacing(50)
    }
}));

export default function Login(props) {
    const classes=useStyles();
    const {values,errors,setErrors,handleInputChange}=props;
    let history=useHistory();

    const validateForm=()=>{
        var temp={}
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
            createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchById(values.emailID)
            .then(res=>{
                const pass=res.data.password;
                if(values.password===pass){
                    createAPIEndpoint(ENDPOINTS.USER).create({
                        emailID:values.emailID,
                        password:values.password
                    }).then(res=>{
                        console.log(res);
                        history.push("/home");
                    })
                    .catch(err=>console.log(err))
                }else{
                    setErrors({
                        ...errors,
                        loginError:"Invalid Email or Password"
                    })
                }
            })
            .catch(err=>{
                console.log(err);
                setErrors({
                    ...errors,
                    loginError:"User does not exist--Create an Account"
                })
            })
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container className={classes.root}>
                <Grid item xs={6}>
                    <Input
                        label='EmailID'
                        name='emailID'
                        value={values.emailID}
                        onChange={handleInputChange}
                        error={errors.emailID}
                    />
                    <Input
                        label='Password'
                        name='password'
                        type='password'
                        value={values.password}
                        onChange={handleInputChange}
                        error={errors.password}
                    />
                    <div>
                        <Button 
                            type='submit'
                        >Login</Button>
                        <a href='/registration'>Create an Account</a>
                    </div>
                    <h3>{errors.loginError}</h3>
                </Grid>
            </Grid>
        </Form> 
    )
}
