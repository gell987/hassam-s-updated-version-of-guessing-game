#!/usr/bin/env node
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import { createSpinner } from 'nanospinner';
import figlet from 'figlet';

let real_random_num;
let fake1;
let fake2;
let fake3;
let fake4;
let answer_user;

const sleep = (ms=2000)=> new Promise((r)=> setTimeout(r,ms))
async function greet(){
  console.clear()
    const rainboxTitle=chalkAnimation.rainbow(
        "Hassam's number guessing game(PIAIC, PIAIC202061)\n"
    );
    await sleep();
    
    console.log(`
    ${chalk.blue(`
    you need to guess the number from 10-100
    you will only get 3 chances if u fail the game will end or else
    it will say congrats u have won`)}
`)
}




function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async function random_num_gen(){
  real_random_num = getRandomInt(10, 100);
  fake1 = getRandomInt(10, 100);
  fake2 = getRandomInt(10, 100);
  fake3 = getRandomInt(10, 100);
  fake4 = getRandomInt(10, 100);
}

async function guess_choices(){
  const answers = await inquirer.prompt({
     name: 'guess',
     type:'list',
     message: 'which number is the correct one: ',
     choices:[
      fake1,
      real_random_num,
      fake2,
      fake3,
      fake4,
     ] 
  })
  answer_user =answers.guess
  return handleanswer(answer_user)
}


async function handleanswer(isCorrect){
  const spinner= createSpinner("Checking answer.....").start()
  await sleep();
  if(isCorrect===real_random_num){
    spinner.success({text:`good work champ u did it first try :DD`})
    winner()
  }
  else{
    spinner.error({text:`try again plz`})
    second_guess()


    
  }

}


async function second_guess(){
  const answers = await inquirer.prompt({
     name: 'guess',
     type:'list',
     message: 'which number is the correct one: ',
     choices:[
      fake1,
      fake3,
      real_random_num,
      fake2,
      fake4,
     ] 
  })
  answer_user =answers.guess
  return handleanswer_2(answer_user)
}


async function handleanswer_2(isCorrect){
  const spinner= createSpinner("Checking answer.....").start()
  await sleep();
  if(isCorrect===real_random_num){
    spinner.success({text:`good work champ u did it second try :)`})
    winner()
  }
  else{
    spinner.error({text:`try again plz`})
    third_guess()


    
  }

}

async function handleanswer_3(isCorrect){
  const spinner= createSpinner("Checking answer.....").start()
  await sleep();
  if(isCorrect===real_random_num){
    spinner.success({text:`good work champ u did it third try :)`})
    winner()
  }
  else{
    spinner.error({text:`try again plz`})
    process.exit()


    
  }

}
async function third_guess(){
  const answers = await inquirer.prompt({
     name: 'guess',
     type:'list',
     message: 'which number is the correct one: ',
     choices:[
      fake1,
      fake3,
      fake4,
      fake2,
      real_random_num,
     ] 
  })
  answer_user =answers.guess
  return handleanswer_3(answer_user)
}



async function winner(){
  console.clear()
  const msg = `Congrats!!! Player You Won!!!!!!`
  figlet(msg,(err,data)=>{
    console.log(gradient.pastel.multiline(data))
  })


}


await greet();
await random_num_gen();
await guess_choices();