const helpBtn = document.getElementById('help-btn');
const helpPopup = document.getElementById('help-popup');
const closeBtn = document.getElementById('close-btn');

helpBtn.addEventListener('click', function() {
    helpPopup.style.display = 'block';
});

closeBtn.addEventListener('click', function() {
    helpPopup.style.display = 'none';
});
