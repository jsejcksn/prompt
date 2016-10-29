const prompt = (() => {
  'use strict';

  const stdin = document.getElementById('stdin');
  const stdout = document.getElementById('stdout');
  const history = []; // history of inputs

  // --- Functions ---

  // Get data from the user on return
  function getInput () {
    const trimmed = stdin.value.trim(); // remove whitespace
    if (trimmed !== null && typeof trimmed !== 'undefined' && trimmed !== '') { // exists
      const e = event;
      const code = e.keyCode || e.which;
      if (code === 13) { // Enter keycode
        let parsed = parseInput(trimmed);
        savePrintInput(parsed);
        return parsed;
      }
    }
  }

  // Parse as number if applicable
  function parseInput (str) {
    let parsed;
    if (isNaN(str) && isNaN(+str)) {
      parsed = str;
    } else {
      parsed = +str;
    }
    return parsed;
  }

  // Display information to user, including echoing input
  function prompt (msg, isInput) { // 'msg' is an array of strings
    const condClass = () => {
      return isInput ? ' class="msg input"' : ' class="msg output"'; // add userinput class if applicable
    };
    const el = document.createElement('div'); // create div
    for (let i = 0; i < msg.length; i++) {
      el.insertAdjacentHTML('beforeend', '<p' + condClass() + '>' + msg[i] + '</p>'); // create paragraph for each message message in array
    }
    stdout.insertAdjacentElement('beforeend', el); // insert div
    scrollBottom();
  }

  function savePrintInput (input) {
    history.push(input); // save to history
    let arrInput = [input]; // set what we just saved as new msg for prompt
    prompt(arrInput, true);  // I used true; you can alternatively pass any string you want, but just don't use false
    stdin.value = ''; // clear input for next response
  }

  // Scroll to bottom of output/page
  function scrollBottom () {
    window.scrollTo(0, document.body.scrollHeight);
  }

  // --- Event listeners ---

  stdin.addEventListener('focus', () => {
    if (stdin.placeholder) {
      stdin.removeAttribute('placeholder');
    }
  });
  stdin.addEventListener('blur', () => {
    stdin.placeholder = '>';
  });
  stdin.addEventListener('keyup', getInput);
  document.getElementById('stdout-clear').firstChild.addEventListener('click', scrollBottom);

  // --- Expose ---

  return {
    history: history,
    prompt: prompt,
    scrollBottom: scrollBottom
  };

})();
