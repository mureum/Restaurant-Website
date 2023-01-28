var data ;
function callWaiter() {
    data = new FormData();
    data.append("number", document.getElementById("table").value);
    data.append("text", document.getElementById("problem").value);
    if(data.get("number")==""){
        window.alert("Please enter your table number!", );
    }
    else{
        window.alert("Your request has been sent.");   
        waiterCallInfo();
    }   
}

function waiterCallInfo(){
    //callWaiter()
    console.log(data.get("text"));
}