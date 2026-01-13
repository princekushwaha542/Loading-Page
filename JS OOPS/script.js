function makeBiscuit(name,flavor,company,weight,price,unit){
    this.name = name;
    this.flavor = flavor;
    this.company = company;
    this.weight = weight;
    this.price = price;
    this.unit = unit;

};
let biscuit1 = new makeBiscuit("Treat","Chocolate","Britannia","50gm","10","4");
console.log(biscuit1);
let h1 = document.querySelector("h1");
h1.innerText = "Object Orianted JavaScript";
function MakePencil(name,color,company,weight,price,unit){
    this.name = name;
    this.color = color;
    this.company = company;
    this.weight = weight;
    this.price = price;
    this.unit = unit;
};
MakePencil.prototype.use =function(){
        h1.style.color = this.color;
  };
let pencil1 = new MakePencil("natraj","black","natraj","100gm",45,10);
console.log(pencil1);
let pencil2 = new MakePencil("doms","red","doms","100gm","45","10");
console.log(pencil2);
pencil1.use();


// log Larg value and small value or   short this Array

let data = [10, 4, 1, 99, 34];
let larg = data[0];
let small =data[0];
for(let i=0;i<data.length-1;i++){
  if(data[i]>larg){
    larg = data[i];
  }
  if(data[i]<small){
    small = data[i];
  }

}
console.log(larg, small);

// shortiing Array

data = [10, 4, 1, 99, 34];

for (let i = 0; i < data.length - 1; i++) {
  if (data[i] > data[i + 1]) {
    let temp = data[i];
    data[i] = data[i + 1];
    data[i + 1] = temp;
    i = -1; 
  }
}

console.log(data); 

