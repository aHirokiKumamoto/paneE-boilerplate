window.onload = function() {
  var button = document.getElementById('button');
  button.addEventListener('click', function() {
    if (button.className === 'button') {
      button.className = 'button button--active';
    } else {
      button.className = 'button';
    }
  });
};
