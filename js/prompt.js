const prompt = (() => {
  'use strict';

  const stdin = document.getElementById('stdin');
  const stdout = document.getElementById('stdout');
  const history = []; // history of inputs

  // --- Functions ---

  // Focus the input when the slash (/) key is pressed
  function focusInput () {
    if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      const e = event;
      const code = e.keyCode || e.which;
      if (code === 191) { // slash (/) keycode
        stdin.focus(); // focus input
      }
    }
  }

  // Get data from the user on return
  function getInput () {
    let parsed = parseInput(stdin.value);
    if (parsed !== null && typeof parsed !== 'undefined' && parsed !== '') { // exists and not empty
      const e = event;
      const code = e.keyCode || e.which;
      if (code === 13) { // Enter keycode
        savePrintInput(parsed);
        return parsed;
      }
    }
  }

  // Parse as number if applicable
  function parseInput (str) {
    const trimmed = str.trim(); // remove whitespace
    let parsed;
    if (trimmed !== null && typeof trimmed !== 'undefined' && trimmed !== '') { // exists and not empty
      if (isNaN(str) && isNaN(+str)) { // if not a number
        parsed = str; // store
      } else {
        parsed = +str; // parse as number and store
      }
    } else {
      parsed = trimmed; // store
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

  // Such a clear name that it needs no explanation
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

  stdin.addEventListener('focus', () => { // remove input placeholder when focused
    if (stdin.placeholder) {
      stdin.removeAttribute('placeholder');
    }
  });
  stdin.addEventListener('blur', () => { // restore input placeholder when focus is lost
    stdin.placeholder = '>';
  });
  stdin.addEventListener('keyup', getInput);
  document.getElementById('stdout-clear').firstChild.addEventListener('click', scrollBottom);
  document.addEventListener('keyup', focusInput);

  // --- Expose ---

  return {
    history: history,
    parseInput: parseInput,
    prompt: prompt,
    scrollBottom: scrollBottom
  };

})();
