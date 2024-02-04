// class Character {
//   _life = 1;
//   max_life = 1;
//   attack = 0;
//   defence = 0;

//   constructor(name){
//     this.name = name;
//   }

//   get life(){
//     return this._life;
//   }

//   set life(newLife){
//     this._life =  newLife < 0 ? 0 : newLife;
//   }
// }

const defaultCharacter = {
    name: '',
    life: 1,
    max_life: 1,
    attack: 0,
    defence: 0,
};

// class Knight extends Character{
//   constructor(name){
//     super(name);
//     this.life = 100;
//     this.attack = 10;
//     this.defence = 8;
//     this.max_life = this.life;
//   }
// }

const createKnight = (name) => {
  return {
    ...defaultCharacter,
    name,
    life: 100,
    max_life: 100,
    attack: 10,
    defence: 8
  };
};

// class Sorcerer extends Character{
//   constructor(name){
//     super(name);
//     this.life = 80;
//     this.attack = 14;
//     this.defence = 3;
//     this.max_life = this.life;
//   }
// }

const createSorcerer = (name) => {
  return {
    ...defaultCharacter,
    name,
    life: 80,
    max_life: 80,
    attack: 14,
    defence: 3
  };
};


// class LittleMonster extends Character{
//   constructor(){
//     super("Ltl Monster");
//     this.life = 80;
//     this.attack = 4;
//     this.defence = 4;
//     this.max_life = this.life;
//   }
// }

const createLitteMonster = () => {
  return {
    ...defaultCharacter,
    name: "Little Monster",
    life: 80,
    max_life: 80,
    attack: 4,
    defence: 4
  };
};

// class BigMonster extends Character{
//   constructor(){
//     super("Big Monster");
//     this.life = 120;
//     this.attack = 16;
//     this.defence = 6;
//     this.max_life = this.life;
//   }
// }

const createBigMonster = () => {
  return {
    ...defaultCharacter,
    name: "Big Monster",
    life: 120,
    max_life: 120,
    attack: 16,
    defence: 8
  };
};

const log = createLog = (logEl) => {
  list = [];
  return {
    logEl,
    addMessage(msg){
      list.push(msg);
      this.render();
    },
    render(){
      this.logEl.innerHTML = "";
      for (let i in list){
        this.logEl.innerHTML += `<li>${list[i]}</li><hr>`;
      }
    }
  }
};

const createStage = (fighter01, fighter02, fighter01El, fighter02El, log) =>{
  return {
    fighter01,
    fighter02,
    fighter01El,
    fighter02El,
    log,
    start(){
      this.update();
      this.fighter01El.querySelector(".attack_button").addEventListener("click", ()=> this.doAttack(this.fighter01, this.fighter02));
      this.fighter02El.querySelector(".attack_button").addEventListener("click", ()=> this.doAttack(this.fighter02, this.fighter01));
    },
    update(){
      let f1LifePCT = (this.fighter01.life / this.fighter01.max_life) * 100;
      let f2LifePCT = (this.fighter02.life / this.fighter02.max_life) * 100;
      this.fighter01El.querySelector(".name").innerHTML = `${this.fighter01.name} - ${this.fighter01.life} HP`;
      this.fighter01El.querySelector(".bar").style.width = `${f1LifePCT}%`;
      if (f1LifePCT > 50){
        this.fighter01El.querySelector(".bar").style.backgroundColor = 'green';
      } else {
        this.fighter01El.querySelector(".bar").style.backgroundColor = 'red';
      }

      this.fighter02El.querySelector(".name").innerHTML = `${this.fighter02.name} - ${this.fighter02.life} HP`;
      this.fighter02El.querySelector(".bar").style.width = `${f2LifePCT}%`;
      if (f2LifePCT > 50){
        this.fighter02El.querySelector(".bar").style.backgroundColor = 'green';
      } else {
        this.fighter02El.querySelector(".bar").style.backgroundColor = 'red';
      }
    },
    doAttack(attacking, attacked){
      let attackDiced = (Math.floor(Math.random() *7) + 1) * attacking.attack;
      let defenceDiced = (Math.floor(Math.random() *7) + 1) * attacked.defence;
      if (attacking.life <= 0 || attacked.life <= 0){
        // logArea.innerHTML = '<p>The game is over</p>';
        this.log.addMessage('The game is over');
        return;
      }
      this.log.addMessage(`${attacking.name} is attacking ${attacked.name}`);
      this.log.addMessage(`${attacking.name}'s attack strength was ${attackDiced} against ${attacked.name}'s defense strength of ${defenceDiced}`);
      // logArea.appendChild(logAreaParagraph01);
      // logArea.appendChild(logAreaParagraph02);
      // logArea.appendChild(logAreaLine);
      if (attackDiced > defenceDiced){
        // logArea.appendChild(logAreaParagraph03);
        this.log.addMessage(`${attacking.name} managed to attack ${attacked.name}`);
        // logArea.appendChild(logAreaLine);
        attacked.life = attacked.life - (attackDiced - defenceDiced);
      } else{
        // logArea.appendChild(logAreaParagraph04);
        this.log.addMessage(`${attacked.name} managed to defend himself from ${attacking.name}`);
        // logArea.appendChild(logAreaLine);
        attacking.life = attacking.life - (defenceDiced - attackDiced);
      }
      this.update();
      // console.log(`${attacking.name} está atacando ${attacked.name}`);
    }
  };
};
