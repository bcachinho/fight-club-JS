let char = new Knight("Bruno");
let monster = new BigMonster();

const stage = new Stage(
  monster,
  char,
  document.querySelector('#monster'),
  document.querySelector('#char')
);

stage.start()
