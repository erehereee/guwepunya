const button = document.getElementById('hamburger-button');

const energyList = document.getElementById('energy-list');
const energyListItem = document.getElementById('energy-list-item');

const phaseButton = document.getElementById('change-button');

const infoUser = document.querySelector('.user');

const popUp = document.querySelector('.pop-up-wrap');

const socket = io();

socket.on('connect', () => {
    console.log(`You Connected with socket id : ${socket.id}`);
    socket.emit('minta', 'Minta Data');
    socket.on('data', message => console.log(message))
});



button.addEventListener('click', function() {
    const buttonClass = document.querySelector('.container .sidebar');
    buttonClass.classList.toggle('hide');
});

energyList.addEventListener('mouseleave', function() {
    energyList.classList.add('hide');
    energyListItem.classList.add('hide');
});
energyList.addEventListener('click', function() {
    energyList.classList.toggle('hide');
    energyListItem.classList.toggle('hide');
});

// infoUser.addEventListener('mouseleave', function() {
//     popUp.classList.add('hide');
// });

infoUser.addEventListener('click', () => {
    popUp.classList.toggle('hide');
});

