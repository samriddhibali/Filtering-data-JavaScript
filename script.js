const getTableRow = (item) => {
    const trTag = document.createElement("tr");
    trTag.setAttribute("id", "trTagId")
    const tdTag1 = document.createElement("td");
    tdTag1.innerHTML = item.userId;
    const tdTag2 = document.createElement("td");
    tdTag2.innerHTML = item.id;
    const tdTag3 = document.createElement("td");
    tdTag3.innerHTML = item.title;
    const tdTag4 = document.createElement("td");
    tdTag4.innerHTML = item.body;
    trTag.appendChild(tdTag1);
    trTag.appendChild(tdTag2);
    trTag.appendChild(tdTag3);
    trTag.appendChild(tdTag4);
    document.getElementById("filterdTable").appendChild(trTag)
}

const toGetData = () => {
    let request = new XMLHttpRequest();
    request.open( "GET", 'http://jsonplaceholder.typicode.com/posts/', true );
    request.onload = () => {
        let data = JSON.parse(request.response);
        data.map((item) =>{ 
            if(sessionStorage.getItem("fieldValue") != "none" &&
                item[sessionStorage.getItem("fieldValue")] == sessionStorage.getItem("inputValue"))
               getTableRow(item);
            else if(sessionStorage.getItem("fieldValue") == "none" &&
            sessionStorage.getItem("inputValue") === '') 
                getTableRow(item);
        })
    }   
    request.send();
}

const changeInputValue = (value) => {
    sessionStorage.setItem("inputValue", value);
    if(sessionStorage.getItem("fieldValue") && sessionStorage.getItem("inputValue"))
        toGetData();
}

const changeSelectValue = (value) => {
    sessionStorage.setItem("fieldValue", value);
    if(sessionStorage.getItem("fieldValue") && sessionStorage.getItem("inputValue"))
        toGetData();
}

window.onload = () => {
    toGetData();
    document.getElementById("inputTagId").value = sessionStorage.getItem("inputValue");
    for (let i = 0; i<5; i++){
        const a = document.getElementsByTagName("option")[i];
        a.selected = sessionStorage.getItem("fieldValue") === a.value;
    }
}