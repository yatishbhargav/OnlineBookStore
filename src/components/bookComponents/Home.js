import { IconButton, InputBase, Table,
        TableBody,TableHead,TableRow, 
        makeStyles, Paper,Grid, TableCell, Button} from '@material-ui/core';
import React,{useEffect, useState} from 'react'
import Form from '../../layouts/Form'
import Select from '../../controls/Select'
import {createAPIEndpoint,ENDPOINTS} from '../../api/index'
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import AddCircleTwoToneIcon from '@material-ui/icons/AddCircleTwoTone';
import ShoppingCartTwoToneIcon from '@material-ui/icons/ShoppingCartTwoTone';
import { useHistory } from 'react-router';

const useStyles=makeStyles(theme=>({
    select:{
        paddingTop:theme.spacing(5),
        paddingLeft:theme.spacing(50)
    },
    table:{
        paddingTop:theme.spacing(20),
        paddingLeft:theme.spacing(25)
    },
    searchPaper:{
        padding:'2px 4px',
        display:'flex',
        alignItems:'center'
    },
    searchInput:{
        marginLeft:theme.spacing(1.5),
        flex:1
    },
    listRoot:{
        marginTop:theme.spacing(1),
        maxHeight:450,
        overflow:'auto',
        '& li:hover':{
            cursor:'pointer',
            backgroundColor:'#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root':{
            display:'block',
            color:'#000'
        },
        '& .MuiButtonBase-root':{
            display:'none'
        },
        '& .MuiButtonBase-root:hover':{
            backgroundColor:'transparent'
        }
    }
}))
export default function Home(props) {

    const classes=useStyles();
    const {
        catValues,setCatValues,
        catErrors,setCatErrors,
        handleCatInputChange,resetCatFormControls}=props;
    const [categoryList,setCategoryList]=useState([]);
    const [books,setBooks]=useState([]);
    const [searchKey,setSearchKey]=useState('');
    const [searchList,setSearchList]=useState([]);
    let history=useHistory();

    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.CATEGORY).fetchAll()
        .then(res=>{
            let categoryList=res.data.map(item=>({
                id:item.categoryID,
                title:item.categoryName
            }));
            categoryList=[{id:0,title:'Select'}].concat(categoryList);
            setCategoryList(categoryList);
        })
    },[]);

    useEffect(()=>{
        if(catValues.categoryID!=0){
            createAPIEndpoint(ENDPOINTS.BOOK).fetchById(catValues.categoryID)
            .then(res=>{
                setBooks(res.data);
                setSearchList(res.data);
            })
            .catch(err=>console.log(err))
        }
        else{
            setBooks([]);
            setSearchList([]);
        }
    },[catValues.categoryID])

    useEffect(()=>{
        let x=[...books];
        x=x.filter(y=>{
            return y.bookName.toLowerCase().includes(searchKey.toLowerCase())
        });
        setSearchList(x);
    },[searchKey]);

    const handleClick=()=>{
        history.push("/cart");
    }

    return (
        <Form>
            <Grid container>
                <Grid item xs={8} className={classes.select}>
                    <Select
                        label="Category"
                        name="categoryID"
                        value={catValues.categoryID}
                        onChange={handleCatInputChange}
                        options={categoryList}
                        error={catErrors.categoryID}
                    />
                </Grid>
                <Grid item xs={10} className={classes.table}>
                    <>
                    <Paper className={classes.searchPaper}>
                        <InputBase 
                            placeholder="Search Books"
                            value={searchKey}
                            onChange={e=>setSearchKey(e.target.value)}
                            className={classes.searchInput}
                        />
                        <IconButton>
                            <SearchTwoToneIcon/>
                        </IconButton>
                    </Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>BookID.</TableCell>
                                <TableCell>BookName</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>AuthorName</TableCell>
                                <TableCell>PublisherName</TableCell>
                                <TableCell>BookPrice</TableCell>
                                <TableCell><ShoppingCartTwoToneIcon color='primary' /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                searchList.map((item,idx)=>(
                                    <TableRow key={idx}>
                                        <TableCell>{item.bookID}</TableCell>
                                        <TableCell>{item.bookName}</TableCell>
                                        <TableCell>{item.description}</TableCell>
                                        <TableCell>{item.authorName}</TableCell>
                                        <TableCell>{item.publisherName}</TableCell>
                                        <TableCell>{item.bookPrice}</TableCell>
                                        <TableCell>
                                            <IconButton>
                                                <AddCircleTwoToneIcon color="secondary" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <IconButton onClick={handleClick}>
                        <Button
                            size='large'
                            endIcon={<ShoppingCartTwoToneIcon />}
                        >Cart</Button>
                    </IconButton>
                    </>
                </Grid>
            </Grid>
        </Form>
    )
}