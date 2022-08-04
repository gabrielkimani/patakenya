import React, { Component, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Talk from "talkjs";
import { detailsUser } from "../redux/actions/userActions";
import MiniLoader from "../utils/MiniLoader";


function Chats() {
    const dispatch = useDispatch();
  const [inbox, setInbox] = React.useState(undefined);
  const talkjsContainer = React.createRef();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loadingUser, userError, user } = userDetails;



  React.useEffect(() => {
    const currentUser = userInfo ? userInfo : {};


    Talk.ready.then(() => {
      var me = new Talk.User({
        id: currentUser?._id,
        name: currentUser?.name,
        email: currentUser?.email,
        photoUrl: currentUser?.logo,
        // welcomeMessage: "Hey there! How are you? :-)",
        role: "default",
      });
      window.talkSession = new Talk.Session({
        appId: "tJMA5dsD",
        me: me,
      });

      var other = new Talk.User({
        id: currentUser?._id,
        name: currentUser?.name,
        email: currentUser?.email,
        photoUrl: currentUser?.logo,
        // welcomeMessage: "",
        role: "default",
      });


      

      var conversation = window.talkSession.getOrCreateConversation(
        Talk.oneOnOneId(me,other)
      );
     conversation.setParticipant(me);
       conversation.setParticipant(other);

      var inbox = window.talkSession.createInbox({ selected: conversation });
      inbox.mount(talkjsContainer.current);
    });

  }, [user]);

  return (
        <Fragment>
         <div className="w-[80%] mx-auto">

       
            <div  
            style={{ height: "600px" , width: "100%" }}
            className="inbox-container mt-4 mb-4 shadow-md rounded p-6"
            ref={(c) => (talkjsContainer.current = c)}
          >
            <MiniLoader />
          </div>
        
          </div>
    </Fragment>
  );
}

export default Chats;
