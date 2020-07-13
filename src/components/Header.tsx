import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'; 
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import firebase from 'firebase/app';
import 'firebase/auth';

// const theme: Theme = createMuiTheme({
//     spacing: 2,
// });
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        flexGrow: 1,
        color: "#388e3c",
        backgroundColor: "#81c784",
    },
    flex: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(2),
    }, 
    margin: {
        marginLeft: 15,
    },
    color: {
        color: "#378E3C"
    }
  })
);


const Header = () => {
    const classes = useStyles();
    const [state, setState] = useState({ isLogin: false, username: '', profilePicUrl: '', id: ''});

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => { if(user) {
                setState({ isLogin: true, username: user.displayName!, profilePicUrl: user.photoURL!, id: user.uid});
                firebase.firestore().collection(user.uid).doc('mydata').get().then(function(doc) {
                    if (doc.exists) {
                        return;
                    } else {
                            firebase.firestore().collection(user.uid).doc('mydata').set({
                                id: user.uid,
                                name: user.displayName,
                                url: user.photoURL,
                            })
                        }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });;
            }else {
                setState({ isLogin: false, username: '', profilePicUrl: '', id: ''});
            } 
        });
    })

    const googleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider(); 
        firebase.auth().signInWithRedirect(provider);
    }

    const googleSignOut = async() => { 
        await firebase.auth().signOut();
        window.location.reload();
    }

    const copyId = () => {
        const myId = document.getElementById('myId')!;
        const range = document.createRange();
        range.selectNodeContents(myId);
        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        selection.removeAllRanges();
    }

    const renderLoginComponent = (classes: Record<"color" | "flex" | "margin" | "button" | "root", string>) => {
        return (
            <AppBar position="static" color="inherit" className={classes.color}>
                <Toolbar>
                    <Typography variant="subtitle1" color="inherit" className={classes.flex}>
                        Chat App
                    </Typography>
                    <Button color="inherit" className={classes.button} onClick={googleLogin}>
                        Login with Google
                    </Button>
                </Toolbar>
            </AppBar>
        ); 
    }

    const renderLoginedComponent = (classes: Record<"flex" | "button" | "root"　| "margin", string>) => {
        return (
            <div className={classes.root}>
                <AppBar position="static" color="inherit">
                    <Toolbar>
                        <Typography variant="subtitle1" color="inherit" className={classes.flex}>
                            Chat App
                        </Typography>
                        <Button color="inherit" className={classes.button} onClick={googleSignOut}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <AppBar position="static" color="inherit" >
                    <Toolbar> 
                        <Avatar alt="profile image" src={`${state.profilePicUrl}`} />
                        <div style={{width: '10%', height: '100%', textAlign: 'center', margin: 'auto 10px'}}>{state.username}</div>
                        <Button variant="contained" className={classes.margin} onClick={() => {copyId()}} style={{ color: '#388e3c', backgroundColor: 'white'}}>Click here to copy my ID!</Button>
                        <div id='myId' style={{ width: '0', height: '0', margin: '0', padding: '0', opacity: '0'}}>{state.id}</div>
                    </Toolbar>
                </AppBar>
            </div>  
        ); 
    }

    return (
        <div>
            {state.isLogin? renderLoginedComponent(classes) : renderLoginComponent(classes)}
        </div>
    );
}

export default Header;