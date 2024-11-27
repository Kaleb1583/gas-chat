//-----

// using google sheets isnt probably a good idea but im lazy
// ss/spreadsheet & db/database & acc/account
// to make your own chat change these spreadsheet ids with your spreadsheet ids (looks like below and is found in ss url)

const chatRoom1ID = "1JoMMxw2kbyX22jKkO8Zp41ycWmOM3ftp7SldjH_4qpc";
const chatRoom2ID =  "1Ocv3vEfvi_Tp3pzqNJCH383YRLz22Ah0_yT_X7HUVq8";
const chatRoom3ID = "1r67AZ39N1kNAWth6D4uvlF0TBfKmP03lvFf3mPu988k"; 

const accountDatabaseSpreadSheet = "1QFN75ulLnpN4Q8ZC95X1mp5NjpdcxYP6BXXgDegHM-4"; 
const accountNameChangeDatabaseSpreadSheet = "1tiiL2ICBIGwcFKZpasOHLkWmbOAcB-Rt1LH_IKuBNto"; 
const passwordChangeDatabaseSpreadSheet = "10MnBh6OSX_snC6T3feeSmtIjbI-v9jC1GOQ8CTBWbHo";
const pointDatabaseSpreadSheet = "1DnXjv2Me0gcakI2wSIAThjXXWHkGH3p-hOQS73KhKVM";
const userWarningDatabaseSpreadSheet = "1pdyzZf8NXuzrBkzag8T7uuxGRTdKYeBgz92tCEhiC44";
const userSubmittedProblems = "1P-8kAq1-C8Lt4sdqfb5aqOCD9_l1jKzxkF9I_zGqlTY";

const externaljs = "https://raw.githubusercontent.com/Kaleb1583/gas-chat/main/index.js"; 
// change this to your own modified version of my js if you made your own and want to use it

//-----


function getIP() { // i 
  var response = UrlFetchApp.fetch('https://checkip.amazonaws.com/').getContentText();
  console.log(response)
}

// change this to your own modified version of js if you want
function getJS() { 
  var response = UrlFetchApp.fetch('https://raw.githubusercontent.com/Kaleb1583/gas-chat/main/index.js').getContentText();
  return String(response);
}

function getScriptURL() {
  return ScriptApp.getService().getUrl();
}

function didUsernameChange(oldUsername, newUsername) {
  var accnamechangedb = SpreadsheetApp.openById(accountNameChangeDatabaseSpreadSheet);
  var nameChangeList = accnamechangedb.getDataRange().getValues();
  var nameChangeFound = false;
  for(n=0; n < nameChangeList.length; n++) {
    var selectedNameChangeData = String(nameChangeList[n]).split("|");
    var selectedNameChangeOldUsername = selectedNameChangeData[0];
    var selectedNameChangeNewUsername = selectedNameChangeData[1];

    if(String(selectedNameChangeOldUsername) == String(oldUsername)) { // bookmark trying to fix error
      nameChangeFound = true;
    }

  }

  return String(nameChangeFound);
}

function changeUsernameRequest(oldUsername, newUsername) {
  var accdb = SpreadsheetApp.openById(accountDatabaseSpreadSheet);
  var accnamechangedb = SpreadsheetApp.openById(accountNameChangeDatabaseSpreadSheet);
  var accounts = accdb.getDataRange().getValues();
  
  for(r=0; r < accounts.length; r++) {
    var selectedAccountData = String(accounts[r]).split("|");
    var selectedUser = selectedAccountData[0];
    var selectedUsersPassword = selectedAccountData[1];
    var selectedUsersID = selectedAccountData[2];
    var selectedUsersRank = selectedAccountData[3];
    if(String(selectedUser) == String(oldUsername)) {
      var accountNumber = "A" + String((r+1));
      var newData = String(newUsername) + "|" + String(selectedUsersPassword) + "|" + String(selectedUsersID) + "|" + String(selectedUsersRank);
      accdb.getRange(String(accountNumber)).setValue(String(newData));
      accnamechangedb.appendRow([String(oldUsername) + "|" + String(newUsername)])
      
    }
  }
}


function submitPasswordChangeRequest(username, password) {
  var passwordRequestsDB = SpreadsheetApp.openById(passwordChangeDatabaseSpreadSheet);
  passwordRequestsDB.appendRow([username, password, String(false)]);
}


function verifyUser(username, password) {
  var accdb = SpreadsheetApp.openById(accountDatabaseSpreadSheet);
  var accounts = accdb.getDataRange().getValues();
  
  var isTheUser = false;

  for(u=0; u < accounts.length; u++) {
    var selectedAccountData = String(accounts[u]).split("|");
    var user = selectedAccountData[0];
    if(String(user) == String(username)) {
      var selectedUsersUsername = selectedAccountData[0];
      var selectedUsersPassword = selectedAccountData[1];
      if(String(username) == String(selectedUsersUsername)) { 
        if(String(password) == String(selectedUsersPassword)) {
          isTheUser = true;
        }
      }
    }

    if(isTheUser) {
      return true; // isTheUser is true, meaning the username and password is right so its actually the user (but someone could have their password so its not for sure)
    } else if(!isTheUser){
      return false;
    } else {
      return String("ERROR");
    }
  }


} 


function requestAccountDeletion(username) {
  var accdb = SpreadsheetApp.openById(accountDatabaseSpreadSheet);
  var accounts = accdb.getDataRange().getValues();
  
  for(u=0; u < accounts.length; u++) {
    var selectedAccountData = String(accounts[u]).split("|");
    var user = selectedAccountData[0];
    if(String(user) == String(username)) {
      accdb.deleteRow((u+1))
    }
  }

  //----

  var pointDB = SpreadsheetApp.openById(pointDatabaseSpreadSheet);
  var data = pointDB.getDataRange().getValues();

  for(w=0; w < data.length; w++) {
    var selectedAcc = data[w];
    var selectedAccUsername = selectedAcc[0];
    if(String(selectedAccUsername) == String(username)) {
      pointDB.deleteRow((w+1));
    }
  } 
}

function checkToAutoBan() {
  var accdb = SpreadsheetApp.openById(accountDatabaseSpreadSheet);
  var accounts = accdb.getDataRange().getValues();

  for(d=0; d < accounts.length; d++) {
    var selectedAccountData = String(accounts[d]).split("|");
    var user = selectedAccountData[0];

    var warningDB = SpreadsheetApp.openById(userWarningDatabaseSpreadSheet);
    var warnings = warningDB.getDataRange().getValues();
    var warningCount = 0;
    for(s=0; s < warnings.length; s++) {
      if(String(warnings[s]).includes(user)) {
        warningCount = warningCount+1;
      }
    }

    if(warningDB == "") {

    } else {
      if(warningCount > 2) {
        send("<b>Chat</b>", "(Auto-Banner) banned the user: '" + user + "' due to pushing the limit for warnings. (!warnings for info)", "BOT")
        bA(String(user))
      }
    }
  }
}

function addProblemSubmission(problemFound) {
  var problemDB = SpreadsheetApp.openById(userWarningDatabaseSpreadSheet);
  if(String(problemDB).length >= 8) {
    problemDB.appendRow([problemFound]);
  }
}

function getProblemSubmissions() {
  var problemDB = SpreadsheetApp.openById(userWarningDatabaseSpreadSheet);
  var problems = problemDB.getDataRange().getValues();
  var problemList = "";
  for(t=0; t < problems.length; t++) {
    if((t+1) == problems.length) { // gets rid of comma at last problem  exproblem, exproblem2,  -> exproblem, exproblem2
      problemList = problemList + problems[t];
    } else {
      problemList = problemList + problems[t] + ",";
    }
  }
  return String(problemList);
}

const ranks = ["Guest", "New Chatter", "Chatter", "Mod", "Owner"];

function getUsersRank(username) {
  var accdb = SpreadsheetApp.openById(accountDatabaseSpreadSheet);
  var accounts = accdb.getDataRange().getValues();
  var searchUsername = username;
  var doesAccMatch = false; // auto set it to false if it is found then it will be set to true and this is using a little down in a if statement
  var rank = "";
  for(f=0; f < accounts.length; f++) {
    selectedAccountData = String(accounts[f]).split("|");
    selectedAccountName = selectedAccountData[0];
    selectedAccountPassword = selectedAccountData[1];
    selectedAccountID = selectedAccountData[2];
    selectedAccountRank = selectedAccountData[3];
    if(String(username) == String(selectedAccountName)) {
      doesAccMatch = true;
      rank = selectedAccountRank;
    }
  }

  if(rank == "") {
    //rank = "No Rank";
    rank = "";
  }

  if(rank == "undefined" && username == "<b>Chat</b>") {
    rank = "";
  }

  return String(rank);
}

function isPasswordRight(username, password) {
  var accdb = SpreadsheetApp.openById(accountDatabaseSpreadSheet);
  var accounts = accdb.getDataRange().getValues();
  for(o=0; o < accounts.length; o++) {
    selectedAccount = accounts[o];
    selectedAccountStuff = String(accounts[o]).split("|");
    var selectedAccountUsername = selectedAccountStuff[0];
    var selectedAccountPassword = selectedAccountStuff[1];
    
    if(selectedAccountUsername == username) {
      if(selectedAccountPassword == password) {
        return true;
      }
    }
  }
  return false;
}

function addAccountToPointDB(username) {
  var pointDB = SpreadsheetApp.openById(pointDatabaseSpreadSheet);
  var zero = 0;
  pointDB.appendRow([username, zero]);
}


function searchChatWithTerm(term) {

  var accountsSentMessages = "";

  var ss = SpreadsheetApp.openById(chatRoom1ID);
  var chats = ss.getDataRange().getValues();
  

  if(isUserTaken(term)) {
    var pointDB = SpreadsheetApp.openById(pointDatabaseSpreadSheet);
    var usernameandpointsvalues = pointDB.getDataRange().getValues();
    for(i=0; i < usernameandpointsvalues.length; i++) {
      var username = usernameandpointsvalues[i][0];
      var points = usernameandpointsvalues[i][1];
      if(String(username).includes(String(term))) {
        if(String(username).includes("Guest")) {
          accountsSentMessages = "<h2> Search Type: User / Account (Guest) </h2>\n<h2>" + "All of the guests have sent: " + String(points) + "chats. " + "</h2> <br> <b><p> --- All Chats Sent By Guests Are Below --- </p> </b>";
        } else {
          accountsSentMessages = "<h2>Search Type: User / Account </h2>\n<h2>" + String(username) + " has " + String(points) + " points.</h2> <br> <b><p> --- " + String(username) + "'s Chats Are Below --- </p> </b>";
        }
      } 
    }
  } else {
    accountsSentMessages = "<h2>Search Type: Keyword </h2><br>";
  }

  for(p=0; p < chats.length; p++) {
    if(String(chats[p]).includes(term)) {
      accountsSentMessages = accountsSentMessages + "<br>" + chats[p] + "<br>";
    }
  }

  if(accountsSentMessages == "") {
    accountsSentMessages = "<h2><b> No results :( </b></h2>";
  }

  var accountsSentMessages = accountsSentMessages + "<br>------------ no more chats left to see :( --------------------";
  
  var warningDB = SpreadsheetApp.openById(userWarningDatabaseSpreadSheet);
  var warnings = warningDB.getDataRange().getValues();
  var warninglist = "";
  var warningCount = 0;
  for(q=0; q < warnings.length; q++) {
    if(String(warnings[q]).includes(term)) {
      var nameReasonTime = String(warnings[q]).split(",");
      var name = nameReasonTime[0];
      var reason = nameReasonTime[1];
      var time = nameReasonTime[2];
      var time = time.split("00:00")[0]; // remove useless data ( 00:00:00 GMT-0600 (Central Standard Time) )
      warninglist = warninglist + "<br>" + "Name:" + name + "<br>Reason: " + reason + "<br>Time: " + time + "<br>-";
      warningCount = warningCount+1;
    }
  }

  if(warningDB == "") {
    
  } else {
    accountsSentMessages = accountsSentMessages + "<p><b>User: " + term + "'s Warnings:" + "</b></p><br><b>Warning Count: " + warningCount + " <br>" + warninglist;
  }
  return String(accountsSentMessages);
}

// (bA = ban account)

function bA(username) {
  var accdb = SpreadsheetApp.openById(accountDatabaseSpreadSheet);
  var accounts = accdb.getDataRange().getValues();
  for(v=0; v < accounts.length; v++) {
    selectedAccount = accounts[v];
    selectedAccountStuff = String(accounts[v]).split("|");
    var selectedAccountUsername = selectedAccountStuff[0];
    if(selectedAccountUsername == username) {
      accdb.deleteRow((v+1))
      var bannedusersdb = SpreadsheetApp.openById("1f-MaaSr2QNtDhjDW6zZXO-XA0bFM5WibyFzWCHMkar8");
      bannedusersdb.appendRow([username]);
    }
  }
}

function isBanned(username) {
  var accdb = SpreadsheetApp.openById(accountDatabaseSpreadSheet);
  var accounts = accdb.getDataRange().getValues();
  for(b=0; b < accounts.length; b++) {
    if(accounts[b] == username) {
      return true;
    }
  }

}

function getPointCount(username) {
  var pointDB = SpreadsheetApp.openById(pointDatabaseSpreadSheet);
  var usernameandpointsvalues = pointDB.getDataRange().getValues();
  for(g=0; g < usernameandpointsvalues.length; g++) {
    var currentusername = usernameandpointsvalues[g][0];
    var currentuserpointcount = usernameandpointsvalues[g][1];
    if(String(currentusername) == String(username)) {
      var returnValue = currentuserpointcount;
      return returnValue;
    }
  }
}

function giveOnePoint(username) {
  var pointDB = SpreadsheetApp.openById(pointDatabaseSpreadSheet);
  var usernameandpointsvalues = pointDB.getDataRange().getValues();
  for(h=0; h < usernameandpointsvalues.length; h++) {
    if(usernameandpointsvalues[h][0] == String(username)) {
      var pointRange = "B" + String((h+1));
      var beforePointValue = Number(pointDB.getRange(pointRange).getValue());
      pointDB.getRange(pointRange).setValue((beforePointValue+1));
      var afterPointValue = Number(pointDB.getRange(pointRange).getValue());
    }
  }
}

function doCommand(cmd, user) {
  if(cmd != undefined) {
    if(user != undefined) {

      var cmd = cmd;
      var argCount = 0;

      
      if(String(cmd).split(" ").length == 2) {
        argCount = 2;
      } 

      if(String(cmd).split(" ").length == 3) {
        argCount = 3;
      }

      var cmdSplit = String(cmd).split(" ");

      var command = cmdSplit[0];

      if(cmdSplit[1] != undefined) {
        var cmdUserInput = cmdSplit[1];
      }

      if(argCount == 3) {
        if(cmdSplit[2] == "-p" || cmdSplit[2] == "-P") {
          var isPublic = true;
        } else {
          var isPublic = false;
        }
      }


      // ping command start
      if(command == "!ping") {
        var botName = "<span style='color:#196EFF;'>B</span><span style='color:#6552B6;'>o</span><span style='color:#B2376D;'>t: </span>";
        
        displayName = String(user)

        userRank = getUsersRank(displayName);

        if(userRank != "") {
          displayName = userRank + displayName;
        }

        send(botName, "Pong! " + "<b>(Re: " + String(displayName) + ")</b>", "BOT");

      } // ping command end

      // solve
      if(command == "!solve") {

        var username = String(user);

        math = math.replaceAll("times", "*");
        math = math.replaceAll("plus", "+");
        math = math.replaceAll("subtract", "-");

        math = math.replaceAll("console", "");
        math = math.replaceAll("<", "");
        math = math.replaceAll(">", "");
        math = math.replaceAll("script", "");
        math = math.replaceAll("javascript", "");
        math = math.replaceAll("alert", "");
        math = math.replaceAll("'", ""); // remove ' single
        math = math.replaceAll('"', ''); // remove " double
        var result = eval(math);
        var botName = "<span style='color:#196EFF;'>B</span><span style='color:#6552B6;'>o</span><span style='color:#B2376D;'>t: </span>";
        send(botName, "Hi " + String(user) + ", the answer to " + "{ " + String(math) + " } " + "is: " + "{ " + String(result) + " }", "BOT")
      }
    }

    
  }
}
// send(String(username), String(chat), "", roomInt);
function send(user, chat, isCodeRunning, roomNumber) {
  //----
  // send function
  //----
  if(user) {
    if(chat) {
      if(roomNumber == "Room One") {
        ss = SpreadsheetApp.openById(String(chatRoom1ID));
      } else {
        if(roomNumber == "Room Two") {
          ss = SpreadsheetApp.openById(String(chatRoom2ID));
        } else {
          if(roomNumber == "Room Three") {
            ss = SpreadsheetApp.openById(String(chatRoom3ID));
          }
        }
      }
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; // 0-11 -> 1-12  (hours)
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      var date = month + "/" + day + "/" + year;
      
      function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + '' + ampm;
        return strTime;
      }

      var hm = formatAMPM(new Date);
      var beforecleanchat = chat;
      var ishackerwannabe = /<script>/.test(beforecleanchat);
      //bookmark
      if(user == "<b>Chat</b>" || isCodeRunning == "CHAT" || isCodeRunning == "BOT") {  // this is so the bot and special ranks can use special characters
        var cleanchat = chat; // no filter for the 'bot' or 'chat' or 'au'
      } else {
        var cleanchat = filter(gscleanusername(chat)); // filter for normal users
      }

    
      if(String(cleanchat).startsWith("!")) {
        doCommand(String(cleanchat), String(user))
      } else {
        //bookmark
        var rank = getUsersRank(String(user));
        if(isCodeRunning == "CHAT" || isCodeRunning == "BOT") {
          var chat = "(" + hm + " " + date + ") " + user + ": " + cleanchat; 
        } else {
          var chat = "(" + hm + " " + date + ") " + rank + " - "+ user + ": " + cleanchat; 
        }
        
        
        if(ishackerwannabe) {
          if(user == "Guest") {
            //var chat = "A guest tried to use script tags 🤦";
          } else {
            var chat = user + " tried to use script tags...";
            var bannedusersSS = SpreadsheetApp.openById("1f-MaaSr2QNtDhjDW6zZXO-XA0bFM5WibyFzWCHMkar8");
            bA(user);
          }
        }

        ss.appendRow([chat]);

        var username = String(user);

        giveOnePoint(username);
  
        var data = ss.getDataRange().getValues();
        var chatCount = data.length;
        var chatCountString = String(chatCount);
        var chatCountNumber = Number(chatCount);
        var chatCountBefore = (chatCountNumber - 1);

        if(String(rank) == "Owner" || String(rank) == "</>" || String(rank) == "Developer") {
          
        } else {
          botChatCheck(String(chat), String(username));
        }
      }

    } else {
      // no user or chat provided
    }
  }
}


function botChatCheck(chat, user) {
  var cusswords = BL.getBL();

  var nonoWordsDetectedCount = 0;
  var nonoWordsDetected = "";

  for(j=0; j < cusswords.length; j++) {
    if(String(chat).includes(String(cusswords[j]))) {
      nonoWordsDetectedCount++;
      nonoWordsDetected = nonoWordsDetected + cusswords[j] + "|";
    }
  }

  if(nonoWordsDetectedCount != 0) {
    warnUser(String(user))
  }

}


function warnUser(user, isPublic) {
  // WARN USER
  var warningDB = SpreadsheetApp.openById(userWarningDatabaseSpreadSheet);
  var warnings = warningDB.getDataRange().getValues();
  for(a=0; a < warnings.length; a++) {
    var selectedUser = warnings[a][0];
    var selectedUsersWarningsCount = warnings[a][0];
    if(String(selectedUser) == String(user)) {
      var warningsCountRange = "B" + String((a+1));
      var warningsBeforeCountValue = Number(warningDB.getRange(warningsCountRange).getValue());
      warningDB.getRange(warningsCountRange).setValue((warningsBeforeCountValue+1));
      var warningsAfterCountValue = Number(warningDB.getRange(warningsCountRange).getValue());
      if(isPublic == undefined) {

      } else {
        // is public
        var botName = "<span style='color:#196EFF;'>B</span><span style='color:#6552B6;'>o</span><span style='color:#B2376D;'>t: </span>";
        send(botName, "'" + String(user) + "' Was Warned!", "BOT");
      }
    }
  }
}

function filter(chat) {
  var cusswords = BL.getBL();
  
  var nonoWordsDetectedCount = 0;
  var nonoWordsDetected = "";

  for(j=0; j < cusswords.length; j++) {
    if(String(chat).includes(String(cusswords[j]))) {
      nonoWordsDetectedCount++;
      nonoWordsDetected = nonoWordsDetected + cusswords[j] + "|";
    }
  }

  if(nonoWordsDetectedCount != 0) {
    warnUser(String(user))
  }

}


function warnUser(user, isPublic) {
  // WARN USER
  var warningDB = SpreadsheetApp.openById(userWarningDatabaseSpreadSheet);
  var warnings = warningDB.getDataRange().getValues();
  for(a=0; a < warnings.length; a++) {
    var selectedUser = warnings[a][0];
    var selectedUsersWarningsCount = warnings[a][0];
    if(String(selectedUser) == String(user)) {
      var warningsCountRange = "B" + String((a+1));
      var warningsBeforeCountValue = Number(warningDB.getRange(warningsCountRange).getValue());
      warningDB.getRange(warningsCountRange).setValue((warningsBeforeCountValue+1));
      var warningsAfterCountValue = Number(warningDB.getRange(warningsCountRange).getValue());
      if(isPublic == undefined) {

      } else {
        // is public
        var botName = "<span style='color:#196EFF;'>B</span><span style='color:#6552B6;'>o</span><span style='color:#B2376D;'>t: </span>";
        send(botName, "'" + String(user) + "' Was Warned!", "BOT");
      }
    }
  }
}

function filter(chat) {
  var cusswords = BL.getBL();
  var chat; // define the chat var which is the function parameter

  for(c=0; c < cusswords.length; c++) {
    var length = String(cusswords[c]).length;
    var characters = "";
    for(a2=0; a2 < length; a2++) {
      characters = String(characters) + String("*");
    }
    chat = chat.replace(String(cusswords[c]), String(characters));
  }

  return chat;
}

function bc(chat, admin) {
  try { 
    if(admin == true) {
      var ss = SpreadsheetApp.openById("1JoMMxw2kbyX22jKkO8Zp41ycWmOM3ftp7SldjH_4qpc");
      var chat = "(Admin) - " + String(chat);
      ss.appendRow([chat]);
    } else {
      var ss = SpreadsheetApp.openById("1JoMMxw2kbyX22jKkO8Zp41ycWmOM3ftp7SldjH_4qpc");
      ss.appendRow([chat]);
    }
  } catch(err) {

  }
}

function turnOnChat() {
  var ss = SpreadsheetApp.openById("1l6smRyvcllYQxZEAER2whxQ0vLpsiOUWLz6VfrPmoW4");
  ss.getRange("B2").setValue("1");
}

function turnOffChat() {
  var ss = SpreadsheetApp.openById("1l6smRyvcllYQxZEAER2whxQ0vLpsiOUWLz6VfrPmoW4");
  ss.getRange("B2").setValue("0");
}


function getChats(user, roomNumber) {
  // user is prob lastusername.innerHMTL
  // roomNumber is prob roomname.innerHMTL

  var ss = "";
  
  if(roomNumber == "Room One") {
    ss = SpreadsheetApp.openById(String(chatRoom1ID));
  } else {
    if(roomNumber == "Room Two") {
      ss = SpreadsheetApp.openById(String(chatRoom2ID));
    } else {
      if(roomNumber == "Room Three") {
        ss = SpreadsheetApp.openById(String(chatRoom3ID));
      } else {
        data = "Get Chat Function Error: Chat Room Number Invalid!";
        ss = null;
      }
    }
  }


  if(ss == null) {
    return "Error! Chat Not Found.";
  }

  if(user == "UpdateChat") {

  } else {
    if(isBanned(String(user))) {
      data = "BANNED";
    } 
  }

  //-------------------------------------------------------------------------------
  // CHAT ON OFF
  var ss = SpreadsheetApp.openById("1l6smRyvcllYQxZEAER2whxQ0vLpsiOUWLz6VfrPmoW4");
  // ss = spreadsheet sss = spreadsheet split (split data)
  var ssdata = ss.getDataRange().getValues();
  var sssdata = String(ssdata).split(",");
  var isOn = sssdata[4];
  if(isOn == 0) {
    isOn = false;
  } else {
    isOn = true;
  }
  var isTheChatOn = isOn;
  var scheduledTimeOn = true;
  var scheduledTime = "5:00pm December 7th";
  var scheduledDate = "12-09-23";
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  time = new Date(String(mm)+"-"+String(dd)+"-"+String(yyyy));
  time2 = new Date(String(scheduledDate));
  var seconds = Math.floor((time2 - (time))/1000);
  var minutes = Math.floor(seconds/60);
  var hours = Math.floor(minutes/60);
  var days = Math.floor(hours/24);
  hours = hours-(days*24);
  minutes = minutes-(days*24*60)-(hours*60);
  seconds = seconds-(days*24*60*60)-(hours*60*60)-(minutes*60);

  var timeCalcs = "The date " + String(mm) + "-" + String(dd) + "-" + String(yyyy) + " Is: <br><br>" + days + " days away" + "<br>" + "& " + hours + " hours away" + "<br>" + "& " + minutes + " away" + "<br>" + "&  " + seconds + " away" + "<br><br>away from today. (" + scheduledDate + ")";
  if(isTheChatOn == false) {
    if(scheduledTimeOn == true) {
      data = "<h1>Chat Offline<h1><h2><b>Chat will be back on at: { " + scheduledTime + " }</b><br>" + timeCalcs + "</h2>";
      data = data + "<br><button onclick='updateChat()'>Update Chat</button><p>(check if chats on or update time)</p>";
      data = data + '<p hidden>OFFLINE</p>';
    } else {
      data = "<h1>Chat Offline!</h1>";
      data = data + '<p hidden>OFFLINE</p>';
    }
  }
  //-------------------------------------------------------------------------------

  return data.toString();
}

function makeid(length) {
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

function isUserTaken(username) {
  var ss = SpreadsheetApp.openById("1QFN75ulLnpN4Q8ZC95X1mp5NjpdcxYP6BXXgDegHM-4");
  var data = ss.getDataRange().getValues();
  var datass = String(data).split(",");
  var accfound = false;
  var accCount = ss.getLastRow();
  for(g=0; g < accCount; g++) {
    selectedUser = datass[g].split("|");
    var selectedAccountsUsername = selectedUser[0];
    if(selectedAccountsUsername == username) {
      var accfound = true;
    }  
  }
  return accfound;
}

function checkIfAccountWasCreated(username) {
  var accnamesss = SpreadsheetApp.openById("1fe0HJx6fTq65fmnPAhG1G6BkKfJCz3ZAm2c-lTXlVvM");
  var data = accnamesss.getDataRange().getValues();
  var datasplit = String(data).split(",");
  for(z=0; z < datasplit.length; z++) {
    if(datasplit[z] == username) {
      return true;
    }
  }
}

function createAccount(username, password) {
  var ss = SpreadsheetApp.openById("1QFN75ulLnpN4Q8ZC95X1mp5NjpdcxYP6BXXgDegHM-4");
  var data = ss.getDataRange().getValues();
  var datass = String(data).split(",");
  var alreadyused = false; // set false as default then check if taken if not leave be else change to true
  for(l=0; l < datass.length; l++) {
    usernameandpasswords = datass[l].split("|");
    if(username == usernameandpasswords[0]) {
      var alreadyused = true;
    }
  }
  if(alreadyused == false) {
    if(String(password).length  >= 8) {
      var ss = SpreadsheetApp.openById("1QFN75ulLnpN4Q8ZC95X1mp5NjpdcxYP6BXXgDegHM-4");
      username = gscleanusername(username);
      var specialID = makeid(16);
      ss.appendRow([username + "|" + password + "|" + specialID + "|" + "New Chatter"]);

      var newaccss = SpreadsheetApp.openById("1fe0HJx6fTq65fmnPAhG1G6BkKfJCz3ZAm2c-lTXlVvM");
      newaccss.appendRow([username]); // appends username to another spreadsheet so other code and check if the username is in the ss if its not then the account wasnt created.
      addAccountToPointDB(username);
    }
  }
}

function gscleanusername(username) {
  var username = String(username);
  username = username.replaceAll("<b>","");
  username = username.replaceAll("<B>","");
  username = username.replaceAll("</b>",""); 
  username = username.replaceAll("</B>","");
  username = username.replaceAll(/script/ig, ""); 
  username = username.replaceAll(/eval/ig, ""); 
  username = username.replaceAll("<","");
  username = username.replaceAll(">", "");
  username = username.replaceAll('/', "");
  username = username.replaceAll(/h1/ig, "");
  username = username.replaceAll(/h2/ig, "");
  username = username.replaceAll(/h3/ig, ""); 
  username = username.replaceAll(/h4/ig, "");
  username = username.replaceAll(/h5/ig, "");
  username = username.replaceAll(/h6/ig, "");
  username = username.replaceAll(";", ""); 
  username = username.replaceAll(/^[!@#\$%\^\&*\)\(+=._-]+$/g, ""); 
  username = username.replaceAll("(", ""); 
  username = username.replaceAll(")", "");
  username = username.replaceAll("console.log", ""); 
  username = username.replaceAll("'", ""); 
  username = username.replaceAll('"', '');
  username = username.replaceAll("$", "");
  username = username.replaceAll("@", "");
  username = username.replaceAll("?", "");
  username = username.replaceAll("#", "");
  username = username.replaceAll("{", "");
  username = username.replaceAll("}", "");
  username = username.replaceAll(":", "");
  // username = username.replaceAll("!", ""); using ! for commands for bot
  username = username.replaceAll("&", "");
  username = username.replaceAll("_", " "); 
  username = username.replaceAll("-", " "); 
  username = username.replaceAll("%", "");
  //username = username.replaceAll("*", ""); need this to show where bad words were said
  username = username.replaceAll("~", "");
  username = username.replaceAll("`", "");
  username = username.replaceAll("[", "");
  username = username.replaceAll("]", "");
  username = username.replaceAll("|", "");
  username = username.replaceAll("", "");
  //username = username.replaceAll(",", ""); 
  return username; 
}

function trylogin(username, password) {
  var ss = SpreadsheetApp.openById("1QFN75ulLnpN4Q8ZC95X1mp5NjpdcxYP6BXXgDegHM-4");
  var data = ss.getDataRange().getValues();
  var datass = String(data).split(",");
  var accfound = false;
  var accCount = ss.getLastRow();
  for(m=0; m < accCount; m++) {
    selectedUser = datass[m].split("|");
    var selectedAccountsUsername = selectedUser[0];
    var selectedAccountsPassword = selectedUser[1];
    if(selectedAccountsUsername == username && selectedAccountsPassword == password) {
      var accfound = true;
    }  
  }
  return accfound;
}


function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index').addMetaTag('viewport', 'width=device-width, initial-scale=1').setTitle('Chat').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

