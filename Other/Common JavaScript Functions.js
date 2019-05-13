function average(a,b,c,d,e){
result=(a+b+c+d+e)/5;
return result;
}
function imagesrc(a,b){
return document.images[a].src=b;
}
function dynamicdiv(a,b){
thediv=document.getElementById(a);
thediv.innerHTML=b;
}
function greet(){
date=new Date();
month=date.getMonth();
Date=date.getDate();
if (month==0 && Date==1) alert("Happy New Year!");
if (month==11 && Date==25) alert("Merry Christmas!");
if (month==1 && Date==14) alert("Happy Valentine's Day!");
if (month==9 && Date==31) alert("Happy Hallowe'en");
}
function featsense(feat){
if (feat) return true;
else return false;
}