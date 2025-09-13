function generateQuiz(quizId) {
    const quizContainer = document.getElementById(`${quizId}-form`);
    const questions = quizData[quizId];
    let html = '';
    questions.forEach((item, index) => {
        html += `<div class="mb-4 quiz-question" id="${quizId}-q${index}">`;
        html += `<p class="font-semibold">${index + 1}. ${item.q}</p>`;
        item.o.forEach((option, oIndex) => {
            html += `<label class="block mt-2"><input type="radio" name="${quizId}-q${index}" value="${oIndex}" class="mr-2">${option}</label>`;
        });
        html += `<p class="text-sm mt-1 feedback hidden"></p></div>`;
    });
    quizContainer.innerHTML = html;
}
function checkQuiz(quizId) {
    const questions = quizData[quizId];
    questions.forEach((item, index) => {
        const questionDiv = document.getElementById(`${quizId}-q${index}`);
        const feedbackP = questionDiv.querySelector('.feedback');
        const selected = document.querySelector(`input[name="${quizId}-q${index}"]:checked`);
        questionDiv.querySelectorAll('label').forEach(l => l.classList.remove('text-green-600', 'text-red-600'));
        if (selected) {
            const selectedValue = parseInt(selected.value);
            if (selectedValue === item.a) {
                feedbackP.textContent = '¡Correcto!';
                feedbackP.className = 'text-sm mt-1 feedback text-green-600';
                selected.parentElement.classList.add('text-green-600');
            } else {
                feedbackP.textContent = `Incorrecto. La respuesta correcta es: ${item.o[item.a]}`;
                feedbackP.className = 'text-sm mt-1 feedback text-red-600';
                selected.parentElement.classList.add('text-red-600');
            }
        } else {
            feedbackP.textContent = 'No has seleccionado una respuesta.';
            feedbackP.className = 'text-sm mt-1 feedback text-yellow-600';
        }
        feedbackP.classList.remove('hidden');
    });
}
function openModal(modalId) { document.getElementById(modalId).style.display = 'block'; }
function closeModal(modalId) { document.getElementById(modalId).style.display = 'none'; }
function showModule(hash) {
    const modules = document.querySelectorAll('.module-content');
    const navLinks = document.querySelectorAll('.nav-link');
    modules.forEach(module => {
        if ('#' + module.id === hash) module.classList.remove('hidden');
        else module.classList.add('hidden');
    });
    navLinks.forEach(link => {
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}
