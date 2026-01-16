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


// POST request
fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers:{
        "Content-type": "application/json"
    },
    body: JSON.stringify({
        title:"hello",
        body: "this is post request",
        userId:`1`
    })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err));