/*let x = 10;
let y = 20;

if(x> 5 && y > 25)
{
    console.log("a");
}
else{
    console.log("b")
}
    
//2
let isAdmin =true;
let isLoggedin=false;
if(isAdmin || isLogegdin)
{
    console.log("Access granted");
}
else{
    console.log("access denied");
}
 

//03
let temp=35;
if(!(temp<30))  
{
   console.log("Hot");
}
else{
    console.log("pleasant");
}


//4
let score=78;
let grade=score>=90?'a':score>=75 ?"b":score>=60?"c":"fail";
console.log(grade);



//5
let a=true;
let b=false;
let c=a&&b?"allow":"deny";
console.log(c);


//6
let x=3;
let y=++;
console.log(x,y);

//7
let x=3;
let y=++x;
console.log(x,y);


//9
let a=3;
console.log(--a);
console.log(a);

//10

let a=3;
console.log(a--);
console.log(a);

//11
let n=5;
let result=n++ + ++n;
console.log(result);


//12

let a=5;
if(--a ===5)
{
    console.log("matched");
}
else{
    console.log("not matched");
}

//13
let a=5;
if(a-- ===5)
{
    console.log("matched");
}
else{
    console.log("not matched");
}*/
// function trt(user, computer){
//     if(user==="rock" && computer==="scissor")return "prince";
//     if(user==="scissor" && computer==="rock")return "computer";
// }

// console.log(trt("scissor","rock"));
let arr = [1,2,3,2,4,1,5,1];
let obj={};
let unique= [];
for(let i=0;i<arr.length;i++){
    if(!obj[arr[i]]){
        obj[arr[i]]=true;
        unique.push(arr[i]);
    }
   console.log(obj);
}