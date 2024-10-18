
let habits = ['Wash dishes'];
let doneToday = 0;
let doneTotal = 0;
renderHTML();

document.querySelector('.add-habit-button').addEventListener('click', () => {
    addHabit();
});

document.querySelector('.habits-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addHabit();
    }
});

function addHabit() {
    const habitsElem = document.querySelector('.habits-input');
    if (habitsElem.value !== '') {
        habits.push(habitsElem.value);
        habitsElem.value = '';

        renderHTML();
        saveHabbits();
    }
}

function saveHabbits() {
    localStorage.setItem('habbits', JSON.stringify(habits));
}

function renderHTML() {
    let habitsHTML = '';
    habits.forEach((habit) => {
        const html = `<p>
    <input type="checkbox">
    <span>${habit}</span>
    </p>`;
        habitsHTML += html;
    });
    document.querySelector('.habit-container')
        .innerHTML = habitsHTML;

    updateContainers();
}

function updateContainers() {
    const checked = document.querySelectorAll('.habit-container input[type="checkbox"]');
    doneToday = 0;
    doneTotal = 0;

    checked.forEach(checkbox => {
        if (checkbox.checked) {
            doneToday++;
            doneTotal++;
        }
    });

    document.querySelector('.done-today').innerHTML = `Done today : ${doneToday}`;
    document.querySelector('.done-in-total').innerHTML = `Done in total : ${doneTotal}`;
}

document.querySelector('.habit-container').addEventListener('change', updateContainers);

function doneTodayReset() {
    setInterval(() => {
        const now = new Date();
        console.log(now.getSeconds());

        if (now.getSeconds() === 0 && now.getMilliseconds() < 100) {
            doneToday = 0;
            updateContainers();
        }
    }, 1000);
}
