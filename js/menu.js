(() => {
  'use strict';
  const p = prompt;

  const stdin = document.getElementById('stdin');
  const logicState = {
    lastKey: '',
    almostNumber: 0
  };

  p.scrollBottom();
  timedPrompt([
    'Hello—I\'m Prompt.'
  ], 1000);
  timedPrompt([
    'I don\'t do anything yet, so you can send me messages and I won\'t reply to you!'
  ], 2500);

  function almostNumber (str) {
    const arr = str.split('');
    let verdict = 0;
    for (let i = 0; i < arr.length; i++) {
      let char = arr[i].trim();
      if (!isNaN(char) && !isNaN(+char) && char !== '') { // is a number and not empty
        verdict++;
      }
    }
    return verdict === 0 ? false : true;
  }

  function finalMsg () {
    const e = event;
    const code = e.keyCode || e.which;
    if (logicState.lastKey !== 13) {
      if (code === 13) { // Enter keycode
        setTimeout(() => {
          if (p.history.length === 1) {
            timedPrompt([
              'Actually, I do keep scrolling when you return things, but that\'s it.'
            ]);
          } else if (p.history.length === 2) {
            timedPrompt([
              'Have fun typing to no one.'
            ]);
          } else if (p.history.length === 5) {
            timedPrompt([
              'You seem to be determined. I\'ll show you one more thing I can do—I\'ll tell you if what you enter is a number or not a number.'
            ]);
            timedPrompt([
              'And I won\'t do anything else.'
            ], 2400);
          } else if (p.history.length === 106) {
            timedPrompt([
              'That\'s 100 number tests! 🌟🎉👏'
            ]);
            if (isNaN(p.history[p.history.length - 1])) {
              if (logicState.almostNumber === 0 && almostNumber(p.history[p.history.length - 1])) {
                timedPrompt([
                  'Clever, but you can\'t fool me. Not a number.'
                ]);
                logicState.almostNumber++;
              } else {
                timedPrompt([
                  'But that\'s still not a number.'
                ]);
              }
            } else {
              timedPrompt([
                'But that\'s still just a number.'
              ]);
            }
          } else if (p.history.length >= 6) {
            if (isNaN(p.history[p.history.length - 1])) {
              if (logicState.almostNumber === 0 && almostNumber(p.history[p.history.length - 1])) {
                timedPrompt([
                  'Clever, but you can\'t fool me. Not a number.'
                ]);
                logicState.almostNumber++;
              } else {
                timedPrompt([
                  'Not a number'
                ]);
              }
            } else {
              timedPrompt([
                'Number'
              ]);
            }
          }
        }, 20);
      }
    }
    logicState.lastKey = code;
  }

  function timedPrompt(msg, delay) {
    const cond = () => {
      return delay ? delay : 600;
    };
    setTimeout(() => {
      p.prompt(msg);
    }, cond());
  }

  stdin.addEventListener('keyup', finalMsg );

})();
