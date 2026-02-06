var username='tom';
var userage=10;
console.log(`username:${username}`);
console.log(`userage:${userage}`);

greetuser(username);

function greetuser(name){
var greet = `i hope you are doing fine`;
console.log(`hello ${name},${greet}`);
var currentyear =2030;
const year = birthyear(currentyear,userage);
return`your birth year is ${year}`;
}
function birthyear(year,age){
  console.log("calculating the birth year");
  return year - age
  
}
const byear=greetuser(username);
console.log(birthyear);
