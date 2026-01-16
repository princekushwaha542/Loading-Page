// GET request
fetch("https://randomuser.me/api/")
.then((rowdata) =>{
    return rowdata.json();
})
.then((data) =>{
    console.log(data);
})
.catch((err) =>{
    console.log(err);
});