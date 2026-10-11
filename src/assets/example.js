// Inserts a deliberately flawed HTML example into the mini-test field.
const btn = document.getElementById('mc-example');
const field = document.getElementById('snippet');
if (btn && field) {
  btn.addEventListener('click', () => {
    field.value = JSON.parse(document.getElementById('mc-example-src').textContent);
    field.focus();
  });
}
