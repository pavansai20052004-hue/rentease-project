const students=['tina','raj','bobby','seema','alex','sita'];
// for in loop
// for(let i  in students){
//     console.log(`roll no. ${Number(i)+1}:${students[i]}`);
    
// }

//for of loop

// for (let student of students){
//   console.log(student);
  
// }

// break and continue

// const inputs =[11,32,12,45,65,94,7,78,10,100,131,67,81,92,53];
// const evenNumbers =[]
// for(let i of inputs){
//   if (i%2 !=0){
//     continue
//   }
//   evenNumbers.push(i);
//   console.log(evenNumbers);
//   if(evenNumbers.length===5){

  
//     break;
//   }
//   console.log(evenNumbers);
  
// } 

var username='tom';
var userage=10;
console.log(`username:${username}`);
console.log(`userage:${userage}`);
function greetuser(name){
var greet = `i hope you are doing fine`;
console.log(`hello ${name},${greet}`);
var currentyear =2030;
const year =currentyear-userage;
return`your birth year is ${year}`;
}
const birthyear=greetuser(username);
console.log(birthyear);
