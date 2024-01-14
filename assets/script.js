let log = new Log(document.querySelector(".log_area"));
let char = new Knight("Bruno");
let monster = new BigMonster();

const stage = new Stage(
  monster,
  char,
  document.querySelector('#monster'),
  document.querySelector('#char'),
  log
);

stage.start()
