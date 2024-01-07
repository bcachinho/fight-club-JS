class Character {
  _life = 1;
  max_life = 1;
  attack = 0;
  defence = 0;

  constructor(name){
    this.name = name;
  }

  get life(){
    return this._life;
  }

  set life(newLife){
    this._life =  newLife < 0 ? 0 : newLife;
  }
}

class Knight extends Character{
  constructor(name){
    super(name);
    this.life = 100;
    this.attack = 10;
    this.defence = 8;
    this.max_life = this.life;
  }
}

class Sorcerer extends Character{
  constructor(name){
    super(name);
    this.life = 80;
    this.attack = 14;
    this.defence = 3;
    this.max_life = this.life;
  }
}

class LittleMonster extends Character{
  constructor(){
    super("Ltl Monster");
    this.life = 80;
    this.attack = 4;
    this.defence = 4;
    this.max_life = this.life;
  }
}

class BigMonster extends Character{
  constructor(){
    super("Big Monster");
    this.life = 120;
    this.attack = 16;
    this.defence = 6;
    this.max_life = this.life;
  }
}

class Stage{
  constructor(fighter01, fighter02, fighter01El, fighter02El){
    this.fighter01 = fighter01;
    this.fighter02 = fighter02;
    this.fighter01El = fighter01El;
    this.fighter02El = fighter02El;
  }

  start(){
    this.update();
    this.fighter01El.querySelector(".attack_button").addEventListener("click", ()=> this.doAttack(this.fighter01, this.fighter02));
    this.fighter02El.querySelector(".attack_button").addEventListener("click", ()=> this.doAttack(this.fighter02, this.fighter01));
  }

  update(){
    this.fighter01El.querySelector(".name").innerHTML = `${this.fighter01.name} - ${this.fighter01.life} HP`;
    this.f1LifePCT = this.fighter01.life / this.fighter01.max_life * 100;
    this.fighter01El.querySelector(".bar").style.width = `${this.f1LifePCT}%`;
    if (this.f1LifePCT > 50){
      this.fighter01El.querySelector(".bar").style.backgroundColor = 'green';
    } else {
      this.fighter01El.querySelector(".bar").style.backgroundColor = 'red';
    }

    this.fighter02El.querySelector(".name").innerHTML = `${this.fighter02.name} - ${this.fighter02.life} HP`;
    this.f2LifePCT = this.fighter02.life / this.fighter02.max_life * 100;
    this.fighter02El.querySelector(".bar").style.width = `${this.f2LifePCT}%`;
    if (this.f2LifePCT > 50){
      this.fighter02El.querySelector(".bar").style.backgroundColor = 'green';
    } else {
      this.fighter02El.querySelector(".bar").style.backgroundColor = 'red';
    }
  }

  doAttack(attacking, attacked){
    let attackDiced = (Math.floor(Math.random() *7) + 1) * attacking.attack;
    let defenceDiced = (Math.floor(Math.random() *7) + 1) * attacked.defence;
    const logArea = document.querySelector(".log_area");
    const logAreaParagraph01 = document.createElement("p");
    const text01 = document.createTextNode(`${attacking.name} is attacking ${attacked.name}`);
    logAreaParagraph01.appendChild(text01);
    const logAreaParagraph02 = document.createElement("p");
    const text02 = document.createTextNode(`${attacking.name}'s attack strength was ${attackDiced} against ${attacked.name}'s defense strength of ${defenceDiced}`);
    logAreaParagraph02.appendChild(text02);
    const logAreaParagraph03 = document.createElement("p");
    const text03 = document.createTextNode(`${attacking.name} managed to attack ${attacked.name}`);
    logAreaParagraph03.appendChild(text03);
    const logAreaParagraph04 = document.createElement("p");
    const text04 = document.createTextNode(`${attacked.name} managed to defend himself from ${attacking.name}`);
    logAreaParagraph04.appendChild(text04);
    const logAreaLine = document.createElement("hr");
    if (attacking.life <= 0 || attacked.life <= 0){
      logArea.innerHTML = '<p>The game is over</p>';
      return;
    };
    logArea.appendChild(logAreaParagraph01);
    logArea.appendChild(logAreaParagraph02);
    logArea.appendChild(logAreaLine);
    if (attackDiced > defenceDiced){
      logArea.appendChild(logAreaParagraph03);
      logArea.appendChild(logAreaLine);
      attacked.life = attacked.life - (attackDiced - defenceDiced);
    } else{
      logArea.appendChild(logAreaParagraph04);
      logArea.appendChild(logAreaLine);
      attacking.life = attacking.life - (defenceDiced - attackDiced);
    }
    this.update();
    // console.log(`${attacking.name} está atacando ${attacked.name}`);
  }
}