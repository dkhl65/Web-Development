function errmsg(message,url,line){
amsg="A JavaScript error has occured. Here are the details:\n";
amsg+="Error Message: "+message+"\n";
amsg+="URL: "+url+"\n";
amsg+="Line Number: "+line+"\n"+"\n";
amsg+='To install this error handler in your webpages, copy the following into the header:' + "\n" + '<script language="javascript" src="Other/Error Handler.js"></script>'
alert(amsg);
return true;
}
window.onerror=errmsg;