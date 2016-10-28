(function() {
  'use strict';

  const stdin = document.getElementById('stdin');
  let lastKey;

  program.scrollBottom();
  setTimeout(() => {
    program.prompt([
      'Hello—I\'m Prompt.'
    ]);
    setTimeout(() => {
      program.prompt([
        'I don\'t do anything yet, so you can send me messages and I won\'t reply to you!'
      ]);
    }, 1500);
  }, 1000);

  function finalMsg () {
    const e = event;
    const code = e.keyCode || e.which;
    if (lastKey !== 13) {
      if (code === 13) { // Enter keycode
        setTimeout(() => {
          if (program.history.length === 1) {
            setTimeout(() => {
              program.prompt([
                'Actually, I do keep scrolling when you return things, but that\'s it.'
              ]);
            }, 600);
          } else if (program.history.length === 2) {
            setTimeout(() => {
              program.prompt([
                'Have fun typing to no one.'
              ]);
            }, 600);
          }
        }, 50);
      }
    }
    lastKey = code;
  }

  stdin.addEventListener('keyup', finalMsg );

}());
