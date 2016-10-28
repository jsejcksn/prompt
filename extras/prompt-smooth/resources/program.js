const program = (function() {
  'use strict';

  const stdin = document.getElementById('stdin');
  const stdout = document.getElementById('stdout');
  const history = []; // history of inputs

  smoothScroll.init({
    speed: 300, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutCubic' // Easing pattern to use
  });
  scrollBottom();
  setTimeout(() => {
    prompt(['What\'s happening today?', 'Can\'t wait to chill soon.', 'What\'s your favorite number?']);
  }, 2000);

  // --- Functions ---

  // Get data from the user on return
  function getInput () {
    let e = event;
    let code = e.keyCode || e.which;
    if (code === 13) { // Enter keycode
      let x = stdin.value.trim(); // remove whitespace
      if (x !== null && typeof x !== 'undefined' && x !== '') { // exists
        isNaN(x) ? history.push(x) : history.push(parseFloat(x)); // save to history (as number if applicable)
        let arr = [history[history.length - 1]]; // set what we just saved as new msg for prompt
        prompt(arr, true);  // I used true; you can alternatively pass any string you want, but just don't use false
        stdin.value = ''; // clear input for next response
      }
    }
  }

  // Display information to user, including echoing input
  function prompt (msg, isInput) { // 'msg' is an array of strings
    let condClass = () => {
      return isInput ? ' class="userinput"' : ''; // add userinput class if applicable
    };
    let el = document.createElement('div'); // create div
    for (var i = 0; i < msg.length; i++) {
      el.insertAdjacentHTML('beforeend', '<p' + condClass() + '>' + msg[i] + '</p>'); // create paragraph for each message message in array
    }
    stdout.insertAdjacentElement('beforeend', el); // insert div
    scrollBottom();
  }

  // Scroll to bottom of output/page
  function scrollBottom () {
    // window.scrollTo(0, document.body.scrollHeight);
    smoothScroll.animateScroll(document.body.scrollHeight);
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
    getInput: getInput,
    history: history,
    prompt: prompt
  };

}());
