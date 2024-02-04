const monster = createBigMonster();
const char = createKnight("Bruno");
const log1 = createLog(document.querySelector(".log_area"));

const stage = createStage(
  monster,
  char,
  document.querySelector('#monster'),
  document.querySelector('#char'),
  log1
  );

stage.start();
