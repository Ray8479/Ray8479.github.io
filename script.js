const characters = [
    { name: 'Navia', image: 'images/Navia.png' },
    { name: 'Kaveh', image: 'images/Kaveh.png' },
    { name: 'Tighnari', image: 'images/Tighnari.png' },
    { name: 'Bennett', image: 'images/Bennett.png' },
    { name: 'Chongyun', image: 'images/Chongyun.png' }
];

let currentCharacterIndex = characters.findIndex(character => character.name === 'Chongyun');

function selectCharacter() {
    const characterImage = document.getElementById('characterImage');
    const characterName = document.getElementById('characterName');

    const currentCharacter = characters[currentCharacterIndex];
    characterImage.src = currentCharacter.image;
    characterImage.alt = `${currentCharacter.name} Image`;
    characterName.textContent = currentCharacter.name;

    // 重置图片位置
    characterImage.style.transform = 'translateX(0)';

    updateIndicators();
}

/*function loadEvents() {
    const events = ['Windborne Bard Event', 'Unreconciled Stars', 'Ganyu Banner'];
    const eventList = document.getElementById('eventList');

    eventList.innerHTML = '';

    events.forEach(event => {
        const li = document.createElement('li');
        li.innerText = event;
        eventList.appendChild(li);
    });
}*/

function showFeedbackDialog() {
    const feedbackInput = document.getElementById('feedbackInput').value;
    
    if (feedbackInput.trim() !== '') {
        const confirmation = confirm(`Do you want to submit the following feedback?\n\n${feedbackInput}`);

        if (confirmation) {
            alert('Feedback submitted successfully!');
        } else {
            alert('Feedback submission canceled.');
        }
    } else {
        alert('Please provide feedback before submitting.');
    }
}

function subscribe() {
    const emailInput = document.getElementById('emailInput').value;
    const errorText = document.getElementById('errorText');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput)) {
        alert(`Subscribed with email: ${emailInput}`);
        errorText.innerText = '';
    } else {
        errorText.innerText = 'Invalid email format';
    }
}

/*function showQRCode() {
    const qrCode = document.getElementById('downloadQR');
    if (qrCode.style.display === 'none') {
        qrCode.style.display = 'block';
    } else {
        qrCode.style.display = 'none';
    }
}

function hideQRCode() {
    const qrCode = document.getElementById('downloadQR');
    qrCode.style.display = 'none';
}*/

function setActiveLink(event) {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');
}

const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => link.addEventListener('click', setActiveLink));

function focusFeedbackInput() {
    const feedbackInput = document.getElementById('feedbackInput');
    feedbackInput.focus();
}

const feedbackLink = document.querySelector('nav ul li a[href="#feedback"]');
feedbackLink.addEventListener('click', function(event) {
    event.preventDefault();
    focusFeedbackInput();
    setActiveLink(event);
});

feedbackInput.addEventListener('keypress', function(event) {
        if (feedbackInput.value.length === 0 || feedbackInput.value.slice(-1) === '.') {
            event.preventDefault();
            feedbackInput.value += event.key.toUpperCase();
        }
    });

function focusEmailInput() {
    const emailInput = document.getElementById('emailInput');
    emailInput.focus();
}

const subscribeLink = document.querySelector('nav ul li a[href="#subscribe"]');
subscribeLink.addEventListener('click', function(event) {
    event.preventDefault();
    focusEmailInput();
    setActiveLink(event);
});

function showDownloadPopup() {
    const downloadPopup = document.getElementById('downloadPopup');
    downloadPopup.style.display = 'block';

    // 为 "Got it" 按钮添加点击事件监听器
    const gotItButton = document.getElementById('gotItButton');
    gotItButton.addEventListener('click', hideDownloadPopup);
}

function hideDownloadPopup() {
    const downloadPopup = document.getElementById('downloadPopup');
    downloadPopup.style.display = 'none';
}

// 在页面加载时显示新手指导浮窗
window.addEventListener('load', showDownloadPopup);



//



const characterImageContainer = document.getElementById('characterImageContainer');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;

characterImageWrapper.addEventListener('mousedown', dragStart);
characterImageWrapper.addEventListener('touchstart', dragStart);
characterImageWrapper.addEventListener('mouseup', dragEnd);
characterImageWrapper.addEventListener('touchend', dragEnd);
characterImageWrapper.addEventListener('mousemove', drag);
characterImageWrapper.addEventListener('touchmove', drag);

function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
}

function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentCharacterIndex < characters.length - 1) {
        currentCharacterIndex += 1;
    }

    if (movedBy > 100 && currentCharacterIndex > 0) {
        currentCharacterIndex -= 1;
    }

    setPositionByIndex();
}

function drag(event) {
    if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
    }
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
    setCharacterPosition();
    if (isDragging) requestAnimationFrame(animation);
}

function setCharacterPosition() {
    characterImageContainer.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
    currentTranslate = currentCharacterIndex * -characterImageContainer.clientWidth;
    prevTranslate = currentTranslate;
    setCharacterPosition();
    selectCharacter();
}

function searchCharacter() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const matchingCharacter = characters.find(character => character.name.toLowerCase() === searchInput);

    if (matchingCharacter) {
        currentCharacterIndex = characters.findIndex(character => character.name === matchingCharacter.name);
        selectCharacter();
    } else {
        alert('Character not found!');
    }
}

function createCharacterIndicators() {
    const characterIndicators = document.getElementById('characterIndicators');
    characterIndicators.innerHTML = '';

    characters.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (index === currentCharacterIndex) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            currentCharacterIndex = index;
            selectCharacter();
            updateIndicators();
        });
        characterIndicators.appendChild(indicator);
    });
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentCharacterIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function selectPreviousCharacter() {
    currentCharacterIndex = (currentCharacterIndex - 1 + characters.length) % characters.length;
    selectCharacter();
}

function selectNextCharacter() {
    currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
    selectCharacter();
}

function handleKeyPress(event) {
    if (event.key === 'ArrowLeft') {
        selectPreviousCharacter();
    } else if (event.key === 'ArrowRight') {
        selectNextCharacter();
    }
}

window.addEventListener('load', function () {
    createCharacterIndicators();
    selectCharacter();
    window.addEventListener('keydown', handleKeyPress);
});