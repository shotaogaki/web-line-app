import React, {useEffect, useState}from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { makeStyles } from '@material-ui/core/styles';
import ChatIcon from '@material-ui/icons/Chat';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import Toolbar from '@material-ui/core/Toolbar';
import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/storage";

const styles = makeStyles({
    mainContainer: {
        width: '100%', 
        backgroundColor: '#f8f8f8', 
        marginTop: '15px', 
        display: 'flex', 
        justifyContent: 'flex-start'
    },
    friendsList: {
        padding: '0px', 
        margin: '0px', 
        height: '80vh', 
        width: '35%', 
        borderRight: 'solid 1px #e0e0e0'
    },
    friendsListHeader: {
        fontWeight: 'bold', 
        color: '#388e3c', 
        padding: '20px 10px 10px 10px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        borderBottom: 'solid 1px #e0e0e0'
    },
    friendsListHeaderSpan: {
        padding: 'auto 0px', lineHeight: '42px'
    },
    friendsListHeaderBtn: {
        color: '#388e3c'
    },
    friendsSearch: {
        padding: '10px 10px', 
        marginTop: '8px',
        display: 'flex', 
        justifyContent: 'flex-start',
        border: 'solid 1px #e0e0e0',
        borderRadius: '5px'
    },
    hide: {
        height: '0',
        width: '0!important',
        opacity: '0',
        padding: '0!important',
        margin: '0!important',
        minHeight: 'initial!important',
        display: 'none'
    },
    friendsSearchInput: {
        padding: '10px 10px', 
        width: '90%', 
        outline: 'none', 
        border: 'none', 
        backgroundColor: '#f8f8f8'
    },
    friendsCard: {
        padding: "10px"
    },
    friendsTalk: {
        height: '80vh', 
        padding: '0px', 
        margin: '0', 
        width: '75%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        flexDirection: 'column'
    },
    friendsTalkHeader: {
        fontWeight: 'bold', 
        height: '46px',
        width: '100%',
        color: '#388e3c', 
        padding: '20px 10px 10px 10px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        borderBottom: 'solid 1px #e0e0e0'
    },
    friendsTalkHeaderSpan: {
        textAlign: 'center',
        margin: 'auto 0'
    },
    friendsTalkHeaderBtn: {
        color: '#388e3c'
    },
    friendsTalkView: {
        borderBottom: 'solid 1px #e0e0e0', 
        height: '90%',
        overflow: 'scroll'
    },
    friendsTalkText: {
        fontWeight: 'bold', 
        padding: '20px 10px 10px 10px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        height: '5%'
    },
    friendsTalkTextBtn: {
        color: '#388e3c'
    },
    friendsTalkTextForm: {
        width: '100%',
    },
    friendsTalkTextInput: {
        width: '100%', 
        height: '100%', 
        outline: 'none', 
        border: 'none', 
        backgroundColor: '#f8f8f8', 
        fontSize: '18px', 
        resize: 'none'
    },
    ChooseTalk: {
        textAlign: 'center',
        margin: 'auto',
        width: '75%',
        padding: '0'
    },
    ChooseTalkIcon: {
        width: '50px',
        height: '50px',
        color: '#388e3c'
    },
    ChooseTalkText: {
        color: '#388e3c',
        fontSize: '24px'
    },
    friendsAdd: {
        justifyContent: 'space-between'
    },
    friendsAddName: {
        width: '50%', 
        height: '100%', 
        textAlign: 'center', 
        margin: 'auto 5px', 
        fontSize: '16px'
    },
    friendsAddBtn: {
        padding: '5px', 
        minWidth: 'initial'
    },
    appColorGrn: {
        color: '#388e3c'
    },
    noFriends: {
        justifyContent: 'space-between'
    },
    imgExpand: {
        width: '1000px',
        height: 'auto',
    },
    login: {
        textAlign: 'center',
        margin: 'auto',
        width: '100%',
        padding: '0',
        paddingTop: '350px'
    },
    loginIcon: {
        width: '150px',
        height: '150px',
        color: '#388e3c'
    },
    loginText: {
        color: '#388e3c',
        fontSize: '34px',
        fontWeight: 'bold'
    }
});

export default function Main() {
    const [MyData, setMydata] = useState({id: "", url: "", name: ""});
    const [FriendData, setFrienddata] = useState({id: "", url: "", name: ""});
    const classes = styles();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => { if(user) {
            console.log(user.uid);
            setMydata({ id: user.uid!, url: user.photoURL!, name: user.displayName! });
        }});
    },[])

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => { if(user) {
            loadAddedUser(user.uid);
            observeMessages(user.uid);
        }});
    })

    const observeMessages = (id:string) => {
        const target = document.querySelector('.jss24') as Element;
        const isRoomOpened = target.classList.contains('jss12')
        firebase.firestore().collection(id)
        .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(doc.exists){
                    if(doc.id !== 'mydata'){
                     if(isRoomOpened){ 
                         loadMessages(MyData.id);
                     }
                    }
                }
            });
        },function(error) {
            console.log(error);
        });
    }

    const toggleClsName = (targetClsName:string) => {
        const target = document.querySelector(`.${targetClsName}`) as Element;
        target.classList.toggle('jss12');
    }

    const toggleClsNameWithIf = (targetClsName:string) => {
        const target = document.querySelector(`.${targetClsName}`) as Element;
        if(target.classList.contains('jss12')){
            target.classList.toggle('jss12');
        }
    }
    const toggleClsNameWithIfReverse = (targetClsName:string) => {
        const target = document.querySelector(`.${targetClsName}`) as Element;
        if(!target.classList.contains('jss12')){
            target.classList.toggle('jss12');
        }
    }
    
    const toggleFriendsSearch = () => {
        toggleClsName('jss11');
        toggleClsNameWithIfReverse('jss27');
        toggleClsNameWithIfReverse('jss31');
        const IdInput = document.querySelector('.jss13') as HTMLInputElement;
        IdInput.value= '';
    }

    const toggleTalkView = async () => {
        toggleClsName('jss15');
        toggleClsName('jss24');
    }

    const handleId = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const IdInput = document.querySelector('.jss13') as HTMLInputElement;
        const Id = String(IdInput.value);
       
        if(!(Id==='') ){
            if(Id === MyData.id){
                toggleClsNameWithIf('jss31')
                toggleClsNameWithIfReverse('jss27');
                IdInput.value= '';
                return;
            }
            firebase.firestore().collection(Id).doc('mydata').get().then(function(doc) {
                if (doc.exists) {
                    const docdata = doc.data()!;
                    toggleClsNameWithIfReverse('jss31');
                    const friendsAdd = document.querySelector('.jss27') as HTMLInputElement;
                    if(friendsAdd.classList.contains('jss12')){
                        friendsAdd.classList.toggle('jss12');
                        displaySearchUser(docdata.id, docdata.url, docdata.name);
                    }else{
                        displaySearchUser(docdata.id, docdata.url, docdata.name);
                    }
                } else {
                    toggleClsNameWithIf('jss31')
                    toggleClsNameWithIfReverse('jss27');
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });;

            IdInput.value= '';
            
        }else{
            alert('IDを入力してください');
        }
    }

    const displaySearchUser: (id: string, url: string, name: string) => void = (id,url,name) => {
        let friendsAddAvt = document.querySelector('#friendsAddAvt') as Element;
        const friendsAddName = document.querySelector('.jss28') as Element;
        friendsAddName.setAttribute('id', id);
        friendsAddName.innerHTML = name;
        const imgTag = document.createElement('img');
        friendsAddAvt.innerHTML = '';
        friendsAddAvt.appendChild(imgTag);
        imgTag.setAttribute('src', url);
        imgTag.setAttribute('id', 'friendIcon');
        imgTag.setAttribute('style', 'width: 40px; height: 40px;');
    }

    const handleaddFriendBtn = () => {
        const friendsAddName = document.querySelector('.jss28') as Element;
        toggleClsName('jss27');
        const FriendId: string = (friendsAddName.getAttribute('id') as string);
        const FriendName = friendsAddName.innerHTML;
        const FriendIcon = document.querySelector('#friendIcon') as Element;
        const FriendPhotoUrl: string = FriendIcon.getAttribute('src') as string;
        if(MyData.id === FriendId) {
            return;
        }else{
            firebase.firestore().collection(MyData.id).doc(FriendId).get().then(function(doc) {
                if (doc.exists) {
                    return;
                }else {
                    firebase.firestore().collection(MyData.id).doc(FriendId).set({
                        frienddata:{
                            id: FriendId,
                            name: FriendName,
                            url: FriendPhotoUrl,
                        },
                        messages:[],
                    })
                }
            }).then(() => {
                loadAddedUser(MyData.id);
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });;

            firebase.firestore().collection(FriendId).doc(MyData.id).get().then(function(doc) {
                if (doc.exists) {
                    return;
                }else {
                    firebase.firestore().collection(FriendId).doc(MyData.id).set({
                        frienddata:{
                            id: MyData.id,
                            name: MyData.name,
                            url: MyData.url,
                        },
                        messages:[],
                    })
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });;
        };
    }

    const loadAddedUser = (Id: string) => {
        firebase.firestore().collection(Id).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if(doc.exists) {
                    if(doc.id !== 'mydata'){
                        const isdisplayed = document.querySelector(`#${doc.id}-added`);
                        if(!isdisplayed){
                            displayAddedUser(doc.data().frienddata);
                        }
                    }
                }
            });
        });
    }

    const displayAddedUser = (fridata:{id:string, url:string, name:string}) => {
        const target = document.querySelector('.jss14') as Element;      
            const template =
                `<button id='${fridata.id}-added' class="MuiButtonBase-root MuiButton-root MuiButton-contained jss4" style='width: 100%; background-color: white; justify-content: normal; margin-left: 0; margin-bottom: 5px;' >`+
                    `<img  src="${fridata.url}" style="width: 40px; height: 40px; border-radius: 50%;"/>`+
                    `<p style='margin-left: 20px'>${fridata.name}</p>`+
                `</button>`;
                
            const child = document.createElement('div');   
            child.innerHTML = template;
            target.appendChild(child);
            const friendsCardBtn = document.querySelector(`#${fridata.id}-added`) as HTMLButtonElement;
            const friendCardEvent = (e:MouseEvent) => {
                const targetDiv = document.querySelector('.jss19') as Element;
                targetDiv.innerHTML = ''; 
                const target = document.querySelector('.jss24') as Element;
                const isRoomOpened = target.classList.contains('jss12');
                setFrienddata({id: fridata.id, url: fridata.url, name: fridata.name});
                if(isRoomOpened){
                    displayFriendInfoInTalkRoom(fridata);
                    // loadMessages(MyData.id);
                }else {
                    toggleTalkView();
                    displayFriendInfoInTalkRoom(fridata);
                    // loadMessages(MyData.id);
                }
            };
            friendsCardBtn.addEventListener('mouseup', (e) => friendCardEvent(e));
    }

    const displayFriendInfoInTalkRoom = (fridata:{id:string, url:string, name:string}) => {

        const talkRoomNameSpan = document.querySelector('.jss17') as Element;
        talkRoomNameSpan.innerHTML = fridata.name;
    }

    const handleMessages = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const messageInp = document.querySelector('.jss23') as HTMLInputElement; 
        saveMessagesToMine({type:'message', message:messageInp.value});
        saveMessagesToFriend({type:'message', message:messageInp.value});
        messageInp.value = '';
    }

    const loadMessages = (id:string) => { 
        firebase.firestore().collection(id).doc(FriendData.id).get().then(function(doc) {
            if (doc.exists) {
                const docdata = doc.data()!;
                if(docdata.hasOwnProperty('messages')) {
                    const target = document.querySelector('.jss19') as Element;
                    target.innerHTML = ''; 
                    return docdata.messages;
                }
            }
        }).then((messages) => {
            if(messages){
                messages.forEach((e:{id:string,message:string,type:string}) => {
                    if(e.id === id) {
                        displayMyMessages(e.message,e.type);
                    }else {
                        displayFriendsMessages(e.message,e.type);
                    }
                })
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });;   
    }

    const displayMyMessages = (message:string,type:string) => {
        if(type === 'message') {
            const template =
                '<div style="display: flex; flex-direction: row-reverse; justify-content: end; padding: 20px;">' +
                    '<div style="margin:0 5px 0 0; display: flex; flex-direction: row-reverse; width:100%;">'+
                        '<div style="    border: 5px solid transparent; border-left: 22px solid #99FF99; width: 2px; height: 2px; margin: 10px 0;"></div>'+
                        '<div class="message" style="font-size: 20px; font-weight: bold; max-width: 75%; word-break: break-word; background-color: #99FF99; padding: 15px;border-radius: 15px;"></div>' +
                    '</div>' +
                '</div>';
            const createdTime = String(Date.now());
            let div = document.getElementById(MyData.id+createdTime) as HTMLDivElement;

            if (!div) {
                let container = document.createElement('div');
                container.innerHTML = template;
                div = container.firstChild as HTMLDivElement;
                div.setAttribute('id', MyData.id+createdTime);
                const MsgDiv = document.getElementById('messages')!;
                MsgDiv.appendChild(div);
            }

            let messageElement = div.querySelector('.message')!;

            if (message) {
                messageElement.textContent = `${message}`;
                messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
            }
        }else if(type === 'image') {
            const template =
                '<div style="display: flex; flex-direction: row-reverse; justify-content: end; padding: 20px;">' +
                    '<img class="pic" style=" width: 400px; height:auto; "/>'+
                '</div>';
            const createdTime = String(Date.now());
            let div = document.getElementById(MyData.id+createdTime) as HTMLDivElement;

            if (!div) {
                let container = document.createElement('div');
                container.innerHTML = template;
                div = container.firstChild as HTMLDivElement;
                div.setAttribute('id', MyData.id+createdTime);
                const MsgDiv = document.getElementById('messages')!;
                MsgDiv.appendChild(div);
            }
            let imageElement = div.querySelector('.pic')!;

            if(message) {
                imageElement.setAttribute('src', message);
            }
        }
        
        let element = document.getElementById('messages')!;
        let bottom = element.scrollHeight - element.clientHeight;
        element.scroll(0, bottom);
       
    }

    const displayFriendsMessages = (message:string,type:string) => {
        if(type === 'message') {
            const template =
                '<div style="display: flex; flex-direction: row; padding: 20px;">' +
                    '<div class="MuiAvatar-root MuiAvatar-circle">'+
                        '<img class="pic MuiAvatar-img" />'+
                    '</div>' +
                    '<div style="margin:0 0 0 5px; display: flex; flex-direction: row;">'+
                        '<div style="    border: 5px solid transparent; border-right: 22px solid #99FF99; width: 2px; height: 2px; margin: 10px 0;"></div>'+
                        '<div class="message" style="font-size: 20px; font-weight: bold; max-width: 75%; word-break: break-word; background-color: #99FF99; padding: 15px;border-radius:15px;"></div>' +
                    '</div>' +
                '</div>';
            const createdTime = String(Date.now());
            let div = document.getElementById(FriendData.id+createdTime) as HTMLDivElement;
    
            if (!div) {
                let container = document.createElement('div');
                container.innerHTML = template;
                div = container.firstChild as HTMLDivElement;
                div.setAttribute('id', FriendData.id+createdTime);
                const MsgDiv = document.getElementById('messages')!;
                MsgDiv.appendChild(div);
            }
    
            if (FriendData.url) {
                const PicDiv = div.querySelector('.pic')!;
                PicDiv.setAttribute('src',`${FriendData.url}`);
            }
            let messageElement = div.querySelector('.message')!;
    
            if (message) {
                messageElement.textContent = `${message}`;
                messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
            }
    
        }else if(type === 'image') {
            const template =
                '<div style="display: flex; flex-direction: row; padding: 20px;">'+
                    '<img class="pic" style=" width: 400px; height:auto; "/>'+
                '</div>';
            const createdTime = String(Date.now());
            let div = document.getElementById(MyData.id+createdTime) as HTMLDivElement;

            if (!div) {
                let container = document.createElement('div');
                container.innerHTML = template;
                div = container.firstChild as HTMLDivElement;
                div.setAttribute('id', MyData.id+createdTime);
                const MsgDiv = document.getElementById('messages')!;
                MsgDiv.appendChild(div);
            }
            let imageElement = div.querySelector('.pic')!;
            
            if(message) {
                imageElement.setAttribute('src', message);
            }
        }

        let element = document.getElementById('messages')!;
        let bottom = element.scrollHeight - element.clientHeight;
        element.scroll(0, bottom);
       
    }


    const saveMessagesToMine = (data:{type:string, message:string}) =>{
        firebase.firestore().collection(MyData.id).doc(FriendData.id).get().then(function(doc) {
            if (doc.exists) {
                const docdata = doc.data()!;
                const messages:{type:string, id:string, message:string}[] = docdata['messages'];
                if(messages){
                    messages.push({id: MyData.id, message:data.message, type: data.type});
                    firebase.firestore().collection(MyData.id).doc(FriendData.id).update({
                        messages: messages
                    })
                }else {
                    firebase.firestore().collection(MyData.id).doc(FriendData.id).update({
                        messages: [
                            {id: MyData.id, message: data.message, type:data.type}
                        ]
                    })
                }
            }
        }).then(() => {
            console.log('savemine');
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });;
    }
    
    const saveMessagesToFriend = (data:{type:string, message:string}) =>{
        firebase.firestore().collection(FriendData.id).doc(MyData.id).get().then(function(doc) {
            if (doc.exists) {
                const docdata = doc.data()!;
                const messages:{type:string, id:string, message:string}[] = docdata['messages'];
                if(messages){
                    messages.push({id: MyData.id, message:data.message, type: data.type});
                    firebase.firestore().collection(FriendData.id).doc(MyData.id).update({
                        messages: messages
                    })
                }else {
                    firebase.firestore().collection(FriendData.id).doc(MyData.id).update({
                        messages: [
                            {id: MyData.id, message: data.message, type:data.type}
                        ]
                    })
                }
            }
        }).then(() => {
            console.log('savefriends')
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });;
    }

    const imgInputOnclick = () => {
        const target = document.getElementById('imgInp') as HTMLInputElement;
        target.click();
    }

    const uploadImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = document.getElementById('imgInp') as HTMLInputElement;
        const tgt: EventTarget & HTMLInputElement = e.target;
        const files = tgt.files!;
        const file = files[0];
        console.log('送信処理',files[0]);
        firebase.storage().ref(`/images/${files[0].name}+${String(Date.now())}`).put(files[0]).then(() => {
            firebase.storage()
              .ref("images")
              .child(file.name)
              .getDownloadURL()
              .then((fireBaseUrl:string) => {
                saveMessagesToMine({type:'image', message:fireBaseUrl});
            saveMessagesToFriend({type:'image', message:fireBaseUrl});
              });
        })

        target.value = '';
    }

  return (
        <div>
            <div className={classes.mainContainer} id='mainContainer'>
                <Container className={classes.friendsList}>
                    <Typography component='div' className={classes.friendsListHeader}>
                        <span className={classes.friendsListHeaderSpan}>友だち一覧</span>
                        <Button onClick={() => {toggleFriendsSearch()}} className={ classes.friendsListHeaderBtn } ><PersonAddIcon/></Button>
                    </Typography>
                    <form className={classes.friendsSearch+' '+classes.hide} onSubmit={(e) => handleId(e)}>
                        <i className='fas fa-search' style={{ color: '#388e3c', width: '10%', textAlign: 'center', lineHeight: '35px' }} ></i>
                        <input type='text' placeholder='友達のIDで検索' className={classes.friendsSearchInput}/>
                    </form>
                    <Toolbar className={classes.friendsAdd+' '+classes.hide}> 
                        <Avatar alt="profile image" id='friendsAddAvt'/>
                        <div className={classes.friendsAddName+ ' ' +classes.appColorGrn}></div>
                        <Button className={classes.friendsAddBtn} onClick={() => {handleaddFriendBtn()}}><AddIcon className={classes.appColorGrn}/></Button>
                        <Button className={classes.friendsAddBtn} onClick={() => {toggleClsName('jss27')}}><CloseIcon className={classes.appColorGrn}/></Button>
                    </Toolbar>
                    <Toolbar className={classes.noFriends+' '+classes.hide}> 
                        <div　className={classes.appColorGrn}>ユーザーが存在しません</div>
                        <Button　className={classes.appColorGrn} onClick={() => {toggleClsName('jss31')}}>ok</Button>
                    </Toolbar>

                    <div className={classes.friendsCard}>
                    </div>
                </Container>
                <Container className={classes.friendsTalk+' '+classes.hide}>
                    <Typography component='div' className={classes.friendsTalkHeader}>
                        <span className={classes.friendsTalkHeaderSpan}></span>
                        <Button className={classes.friendsTalkHeaderBtn} onClick={() => {toggleTalkView();setFrienddata({id: "", url: "", name: ""});}}><CloseIcon/></Button>
                    </Typography>
                    <div className={classes.friendsTalkView} id='messages'>textarea</div>
                    <Typography component='div' className={classes.friendsTalkText}>
                        <Button className={classes.friendsTalkTextBtn} onClick={() => {imgInputOnclick();}}>
                            <input type="file" id='imgInp' style={{display:'none'}} accept={'image/*'} onChange={(e)=>{uploadImg(e)}}/>
                            <AddPhotoAlternateIcon/>
                        </Button>
                        <form className={classes.friendsTalkTextForm} onSubmit={(e) => {handleMessages(e)}}>
                            <input placeholder='メッセージを入力' className={classes.friendsTalkTextInput} />
                        </form>
                    </Typography>
                </Container>
                <Container className={classes.ChooseTalk}>
                    <div>
                        <ChatIcon className={classes.ChooseTalkIcon}/>
                        <p className={classes.ChooseTalkText}>友達をクリックしてトークをはじめよう！</p>
                    </div>
                </Container>
            </div>
            <Container className={classes.login+' '+classes.hide} id='login'>
                    <div>
                        <ChatIcon className={classes.loginIcon}/>
                        <p className={classes.loginText}>ログインしてはじめよう！</p>
                    </div>
            </Container>

        </div>
  );
}
