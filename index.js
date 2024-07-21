console.log("started")

// pf2a1a3nhagx33a1wph264
window.pf2a1a3nhagx33a1wph264 = google;

window.toggleVisibility = function toggleVisibility(id) {
  document.getElementById(id).hidden = !document.getElementById(id).hidden;
}

window.randomID = function randomID(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

window.toggleLightDark = function toggleLightDark() {
  var body = document.body;
  body.classList.toggle("dark-mode");
}

window.signout = function signout() {
  pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(url){
    window.open(url,'_top');
  }).getScriptURL();
}

window.searchChat = function searchChat() {
  var searchTerm = document.getElementById("keyword").value;
  pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(data) {
    document.getElementById("chatSearchOutput").innerHTML = data;
  }).searchChatWithTerm(searchTerm);
}

window.showChatSearch = function showChatSearch() {

  var before = document.getElementById("chatSearchDiv").hidden;
  document.getElementById("chatSearchDiv").hidden = !before;
  var after = !before;
  if(after == true) {
    document.getElementById("showChatSearch").innerHTML = " Account Search ";
  } else {
    document.getElementById("showChatSearch").innerHTML = " Back To Chat ";
  }

  var before2 = document.getElementById("first-main-container").hidden;
  document.getElementById("first-main-container").hidden = !before2;

  var before3 = document.getElementById("second-main-container").hidden;
  document.getElementById("second-main-container").hidden = !before3;

  var before4 = document.getElementById("third-main-container").hidden;
  document.getElementById("third-main-container").hidden = !before4;
}

  window.showUsernameChanger = function showUsernameChanger() {
    document.getElementById("newUsernameInput").hidden = !document.getElementById("newUsernameInput").hidden;
    document.getElementById("submitNewUsernameB").hidden = !document.getElementById("submitNewUsernameB").hidden;
  }

  window.showPasswordChanger = function showPasswordChanger() {
    document.getElementById("newPasswordInput").hidden = !document.getElementById("newPasswordInput").hidden;
    document.getElementById("submitNewPasswordB").hidden = !document.getElementById("submitNewPasswordB").hidden;
  }

  window.changeUsername = function changeUsername() {
    document.getElementById("submitNewUsernameB").hidden = true;
    var currentUsername = document.getElementById("lastUsername").innerHTML;
    var newUsername = document.getElementById("newUsernameInput").value;
    if(String(newUsername) == String(currentUsername) || String(newUsername) == "") {
      // do nothing
    } else {
      pf2a1a3nhagx33a1wph264.script.run.changeUsernameRequest(String(currentUsername), String(newUsername));
      checkIfUsernameWasChanged(String(currentUsername), String(newUsername));
    }
  }

  window.checkIfUsernameWasChanged = function checkIfUsernameWasChanged(currentUsername, newUsername) {
    setTimeout(() => {
      pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(response) {
        if(String(response) == "true") {
          alert("Changed Your Username To: " + String(newUsername) + ".");
          document.getElementById("lastUsername").innerHTML = String(newUsername);
          setToNewPointCount(String(newUsername));
          document.getElementById("accountDetailsUsername").innerHTML = "Your Username: " + String(newUsername) + " (You just changed your name from: " + String(currentUsername) + " to: " + String(newUsername) + ")";
        } else {
          alert("Didnt Find Username Change In Database!")
          pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(response2) {
            if(response2 == true) {
              alert("Found The Problem: Account Taken!");
            } else {
              alert("Unknown Error!");
            }
          }).isUserTaken(String(newUsername));
        }
      }).didUsernameChange(String(currentUsername), String(newUsername));
    }, 6000);   
  }

  window.changePassword = function changePassword() {
    var currentUsername = document.getElementById("lastUsername").innerHTML;
    var newPassword = document.getElementById("newPasswordInput").value;
    pf2a1a3nhagx33a1wph264.script.run.submitPasswordChangeRequest(String(currentUsername), String(newPassword))
    alert("Password change request submitted, sorry but due to security it cant be instantly changed")
    // if it wasnt like this then anyone would be able to do pf2a1a3nhagx33a1wph264.script.run.submitPasswordChangeRequest(Owner/Mod, New Password) and have access to someone elses acc
  }

  window.confirmDeleteAccount = function confirmDeleteAccount() {
    document.getElementById("deleteAccountConfirmation").hidden = false;
  }

  window.requestAccountDeletion = function requestAccountDeletion() {
    if (confirm('Sorry, Second Confirmation Just In Case. Are you sure?')) {
      alert("Requesting Account Deletion...");
      requestAccountDeletion(document.getElementById("lastUsername"));
      signout();
    } else {
      alert("Cancelling");
      document.getElementById("deleteAccountConfirmation").hidden = true;
    }
  }

  window.showAccountDetails = function showAccountDetails() {
    document.getElementById("accountDetailsUsername").innerHTML = "Your Username: &#123;Username&#125;";
    document.getElementById("accountDetailsRank").innerHTML = "Your Rank: &#123;UserRank&#125;";
    var before = document.getElementById("accountDetailsDiv").hidden;
    document.getElementById("accountDetailsDiv").hidden = !before;
    var after = !before;
    if(after == true) {
      // show account details
      document.getElementById("showAccountDetailsB").innerHTML = " Account Manage ";
      document.getElementById("chat").hidden = true;
      document.getElementById("send").hidden = true;
      document.getElementById("first-main-container").hidden = true;
    } else {
      // hide account details
      document.getElementById("first-main-container").hidden = false;
      document.getElementById("chat").hidden = false;
      document.getElementById("send").hidden = false;      
      document.getElementById("showAccountDetailsB").innerHTML = " Back To Chat "; 
      document.getElementById("accountDetailsUsername").innerHTML = "Your Username: " + document.getElementById("lastUsername").innerText;
      pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(data) {
        if(String(data) == "Developer") {
          document.getElementById("accountDetailsRank").innerHTML = "Your Rank: <b>&#60;</b>" + data + "<b>&#62;</b>";
        } else {
          document.getElementById("accountDetailsRank").innerHTML = "Your Rank: " + data;
        }
      }).getUsersRank(String(document.getElementById("lastUsername").innerText));
    }

  }

  var blockDT = true;
  if(blockDT == true) {
    window.oncontextmenu = function () {
    return false;
    }
    document.onkeydown = function (e) { 
      if (window.event.keyCode == 123 ||  e.button==2) { 
        return false;
      }
    }
  }

  window.deleteElementsById = function deleteElementsById(id) {
    var allElements = document.querySelectorAll('[id^="' + id + '"]');
    //console.log(allElements)
    //console.log(allElements)
    //console.log(id)
    //console.log("deleted elements with the id: " + id)
    for (let z = 0; z < allElements.length; z++) {
      document.getElementById(id).parentElement.removeChild(allElements[z]);
    }
  }

  window.setRoom = function setRoom(roomInt) {
    
    //document.getElementById("dropdowncontent").style.display = "none";

    document.getElementById("Room1A").innerText = "(1) Main Chat Room";
    document.getElementById("Room2A").innerText = "(2) Chat Room";
    document.getElementById("Room3A").innerText = "(3) Chat Room";

    if(roomInt == 1) {
      document.getElementById("roomName").innerHTML = "Room1";
      document.getElementById("Room1A").innerText = "1. Main Chat Room (This Room)";
    } else {
      if(roomInt == 2) {
        document.getElementById("roomName").innerHTML = "Room2";
        document.getElementById("Room2A").innerText = "2. Chat Room (This Room)";
      } else {
        if(roomInt == 3) {
          document.getElementById("roomName").innerHTML = "Room3";
          document.getElementById("Room3A").innerText = "3. Chat Room (This Room)";
        } 
      }
    }
    updateChat(); 
  }

  //.

  window.onbuttonclick = function onbuttonclick() { // send chat
    document.getElementById("sendButton").hidden = true; 
    var username = document.getElementById("lastUsername").innerHTML;
    var chat = document.getElementById("input").value;

    // client side commands

    var doUpdate = true;

    if(chat == "!warnings") {
      document.getElementById("chat").innerHTML = document.getElementById("chat").innerHTML + "<br>" + "since your wondering: you can get 2 warnings and be fine but on your third one you get (almost) insta banned (every min auto banner checks)" + "<br>" + "this will disapear when you update the chat" + "<br>";
      doUpdate = false;
    } 

    if(String(chat).includes("!whois")) {
      var user = chat.split(" ")[1];
    //console.log(user)
      showChatSearch();
      document.getElementById("keyword").value = user;
      searchChat();
    }
    //-----------------------
    var roomInt = document.getElementById("roomName").innerHTML;
    pf2a1a3nhagx33a1wph264.script.run.send(String(username), String(chat), "", roomInt);
    if(doUpdate) {

      if(roomInt != "Room1" && roomInt != "Room2" && roomInt != "Room3") {
        alert("ERROR: INVALID ROOM NUMBER");
        document.getElementById("roomName").innerHTML = "Room1";
        document.getElementById("Room1A").innerText = "1. Main Chat Room (This Room)";
      }

      setTimeout(() => { updateChat("UpdateChat", document.getElementById("roomName").innerHTML); }, 2700);
      updatePointCount();
      setTimeout(() => { document.getElementById("sendButton").hidden = false; }, 5000);
    } else {
      document.getElementById("sendButton").hidden = false;
    }
  }
  
  window.hideAllBesidesChat = function hideAllBesidesChat() {
    document.getElementById("buttons").hidden = true;
    document.getElementById("first-main-container").hidden = true;
    document.getElementById("send").hidden = true;
    document.getElementById("guest-footer").hidden = true;
    document.body.innerHTML = "<h1>--- Chat Made By Kaleb1583 ---</h1>" + document.body.innerHTML;
    // append h1 to start of body instead of body html + "chat......"
  }

  setInterval(function(){ 
    if(document.getElementById("second-main-container").hidden == false) {
      hasChatUpdated();
    }
  }, 15000);

  window.hasChatUpdated = function hasChatUpdated() {
    pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(data) {
      var roomInt = document.getElementById("roomName").innerHTML;
      if(roomInt != "Room1" && roomInt != "Room2" && roomInt != "Room3") {
        alert("ERROR: INVALID ROOM NUMBER");
        document.getElementById("roomName").innerHTML = "Room1";
        document.getElementById("Room1A").innerText = "1. Main Chat Room (This Room)";
      }

      // this gets the chat and put it in a div exactly like the actual chat but this is used to compare it to see if it got updated.
      var data = data.split(",");
      document.getElementById("chatUpdateCheck").innerHTML = ""; // clears the chat

      for(i=0; i < data.length; i++) {
        document.getElementById("chatUpdateCheck").innerHTML = document.getElementById("chatUpdateCheck").innerHTML + data[i] + "<br>"; 
      }
      //console.log(document.getElementById("roomName").innerHTML)
    }).getChats("UpdateChat", document.getElementById("roomName").innerHTML);

    var currentChat = document.getElementById("chat").innerHTML;
    var newestChat = document.getElementById("chatUpdateCheck").innerHTML;

    if(currentChat == newestChat) {
      //console.log("Chats Match")
      document.getElementById("chatOutdated").innerText = "";
      return false;
    } else {
    //console.log("Current Chat Outdated!")
      document.getElementById("chatOutdated").innerText = "Somebody has sent a chat, update chat to see.";
      return true;
    }
  }

  window.updateChat = function updateChat() { // update chat
    document.getElementById("chatOutdated").innerText = "";

    var user = document.getElementById("lastUsername").innerText;
    var selectedRoomNumber = document.getElementById("roomName").innerHTML;

    var roomInt = document.getElementById("roomName").innerHTML;
    if(roomInt != "Room1" && roomInt != "Room2" && roomInt != "Room3") {
      document.getElementById("roomName").innerHTML = "Room1";
      document.getElementById("Room1A").innerText = "1. Main Chat Room (This Room)";
    }

    //console.log(user)
    //console.log(selectedRoomNumber)
    var randomMessages = ["Chat Made with: .gs & .html & .js By: Kaleb1583"];

    var randomInt = Math.floor(Math.random() * randomMessages.length);
    var randomMessage = randomMessages[randomInt];


    var loadingMessage = '<div class="loader"></div> <br><br> <b> ' + String(randomMessage) + ' </b>';

    document.getElementById("chat").innerHTML = loadingMessage;
    

    pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(data) {
      //console.log(data)
      if(data == "BANNED") {
        var banMessage = "<h1 style='display: flex;  justify-content: center;  align-items: center;  text-align: center; min-height: 100vh;'>You Were Banned.</h1>";
        var username = document.getElementById("lastUsername").innerText;
        // BAN
        document.body.innerHTML = banMessage + "<p>Username:" + username + "</p> ";


      } else {
        var data = data.split(",");
        document.getElementById("chat").innerHTML = ""; // clears the chat

        for(i=0; i < data.length; i++) {
          document.getElementById("chat").innerHTML = document.getElementById("chat").innerHTML + data[i] + "<br>"; 
        }

        var objDiv = document.getElementById("chat");
        objDiv.scrollTop = objDiv.scrollHeight;

        if(document.getElementById("chat").innerHTML == "<br>") { 
          document.getElementById("chat").innerHTML = "<b>Chat was recently cleared. Say something!</b><br>";
        } 

        pf2a1a3nhagx33a1wph264.script.run.giveOnePoint(String(document.getElementById("lastUsername").innerText));
        updatePointCount();

      //console.log(data)

        if(data[0][0] == "<" && data[0][1] == "h" && data[0][2] == "1" && data[0][3] == ">") {
          // is offline = true
          //alert("")
          hideAllBesidesChat();
        }
      }
      
    }).getChats(user, selectedRoomNumber);
  }

  updateChat(); 

  window.showCreateAccount = function showCreateAccount() {
    document.getElementById("welcome").hidden = !document.getElementById("welcome").hidden;
    //document.getElementById("chatSearchDiv").hidden = !document.getElementById("chatSearchDiv").hidden;
    if(document.getElementById("createAccountForm").hidden == false) {
      // hide account creator / signup element 
      document.getElementById("send").hidden = false;
      document.getElementById("signup").innerText = "Sign Up"; 
      document.getElementById("createAccountForm").hidden = true;
      document.getElementById("signinForm").hidden = true;
      document.getElementById("chat").hidden = false;
      document.getElementById("send").hidden = false;
    } else {
      // show account creator / signup element
      document.getElementById("send").hidden = true;
      document.getElementById("signin").innerText = "Sign In"; // this makes it so there cant be two back buttons 
      document.getElementById("signup").innerText = "Back";
      document.getElementById("createAccountForm").hidden = false;
      document.getElementById("signinForm").hidden = true;
      document.getElementById("chat").hidden = true;
      document.getElementById("send").hidden = true;
    }
  }

  window.showLogin = function showLogin() { 
    document.getElementById("welcome").hidden = !document.getElementById("welcome").hidden;
    if(document.getElementById("signinForm").hidden == false) {
      // hide login element
      document.getElementById("send").hidden = true;
      document.getElementById("signin").innerText = "Sign In";
      document.getElementById("signinForm").hidden = true;
      document.getElementById("createAccountForm").hidden = true;
      document.getElementById("chat").hidden = false;
      document.getElementById("send").hidden = false;
    } else {
      // show login element
      document.getElementById("send").hidden = true;
      document.getElementById("signup").innerText = "Sign Up"; // this makes it so there cant be two back buttons 
      document.getElementById("signin").innerText = "Back";
      document.getElementById("signinForm").hidden = false;
      document.getElementById("createAccountForm").hidden = true;
      document.getElementById("chat").hidden = true;
      document.getElementById("send").hidden = true;
    }
  }

  window.setToNewPointCount = function setToNewPointCount(username) {
    //document.getElementById("welcome").innerHTML = "Welcome: {Username}! You Have: {PointCount} Points."; //bookmark
    pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(returnvalue) { 
        
      var welcome = document.getElementById("welcome").innerHTML;
      var returnValue = Number(returnvalue);
      document.getElementById("welcome").innerHTML = "Welcome: " + username + "! You Have: " + String(returnValue) + " Points.";
      document.getElementById("lastUsername").innerHTML = username;


    }).getPointCount(String(username));
  }

  window.updatePointCount = function updatePointCount() {
    var username = document.getElementById("lastUsername").innerHTML;
    setToNewPointCount(String(username));
    setTimeout(() => { updatePointCount(); }, 60000); 
  }

  window.refresh = function refresh() {
    console.clear();

    const style = [
      'color: green',
      'background: yellow',
      'font-size: 30px',
      'border: 1px solid red',
      'text-shadow: 2px 2px black',
      'padding: 10px',
    ].join(';'); 

  //console.log("%c your not supposed to be here!", style)

    setTimeout(() => { refresh(); }, 1000); 
  }

  window.login = function login() {
    var username = document.getElementById("loginusername").value;
    var password = document.getElementById("loginpassword").value;
    pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(isTaken) { 
      if(isTaken == false) {
        alert("there is no account with this username.")
        pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(response) {
          if(response == true) {
            alert("this account is banned.")
          }
        }).isBanned(username);
      } 
    }).isUserTaken(username);

    pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(response) {
      if(String(response) == "true") {
        document.getElementById("welcome").innerHTML = "Welcome: {Username}! You Have: {PointCount} Points."; //bookmark
        document.getElementById("lastUsername").innerHTML = "Signed In As: " + document.getElementById("loginusername").value;
        showLogin(); 
        document.getElementById("guest-footer").hidden = true;
        //var roomName = document.getElementById("roomName").innerHTML;
        //pf2a1a3nhagx33a1wph264.script.run.send("<b>Chat</b>", " " + document.getElementById("loginusername").value + " joined!", roomName);
        setTimeout(() => { updateChat(); }, 2500);
        document.getElementById("signup").hidden = true;
        document.getElementById("signin").hidden = true;
        pf2a1a3nhagx33a1wph264.script.run.giveOnePoint(String(username)); 
        document.getElementById("showAccountDetailsB").hidden = false; // allow user to see settings bc they went from guest to signed in
        document.getElementById("signoutB").hidden = false; // because user signed in give them the option to signout
        document.getElementById("privateDMsB").hidden = false;
      } else {
        //alert("Failed to login. :(")

        var username = document.getElementById("loginusername").value;
        var password = document.getElementById("loginpassword").value;
        // check if the failed login is bc of a wrong password
        pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(response) {
          if(response == false) {
            alert("Failed To Login, Reason: Wrong Password!")
          }
        }).isPasswordRight(username, password);
      }
    }).trylogin(username, password);
  }

  window.checkIfItWasCreated = function checkIfItWasCreated(username) {
    pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(bool) { 

      if(bool == true) {
        document.getElementById("isAccountCreatedBoolean").innerHTML = "true";
        alert("Account Was Created!")
        var username = document.getElementById("createusername").value;
        var password = document.getElementById("createpassword").value;
        showLogin();
        document.getElementById("loginusername").value = username;
        document.getElementById("loginpassword").value = password;
        document.getElementById("createAccButton").hidden = true;
        login();
      } 

      if(bool == null) { 
        alert("Account Taken Or Password is less than 8 characters")
      }

    }).checkIfAccountWasCreated(username);
  }

  window.createAccount = function createAccount() {
    var username = document.getElementById("createusername").value;
    var password = document.getElementById("createpassword").value;
    if(String(password).includes(String(username))) {
      alert("Please dont put your username in your password!!!")
      alert("increase you cyber awareness for your sake.")
    } else {
      pf2a1a3nhagx33a1wph264.script.run.createAccount(username, password);
      setTimeout(() => { checkIfItWasCreated(username); }, 6000); 
    }
  }

  var interval = setInterval(function() {
    var wasAccJustCreated = String(document.getElementById("isAccountCreatedBoolean"));
    if(document.getElementById("createAccountForm").hidden == false && wasAccJustCreated == false) { // if user is in
      loopToCheckIfUserIsTaken();
    }
  }, 5000);

  window.loopToCheckIfUserIsTaken = function loopToCheckIfUserIsTaken()  {
    var username = document.getElementById("createusername").value;
    pf2a1a3nhagx33a1wph264.script.run.withSuccessHandler(function(isTaken) { 
      if(isTaken == true) {
        document.getElementById("isTakenIsTrueShow").innerHTML = "<b>Username Is Taken!</b>";
      //console.log("TAKEN!")
      } 
    }).isUserTaken(String(username));
  }

// (for anti tampering)

google = "";
document.getElementById("getJSDiv").remove();

  //---------------
  
  // end of index.js file
console.log("finished running index.js")
