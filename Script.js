(function() {
    // BOOTING SIMULATION
    const bootScreen = document.getElementById('boot-screen');
    const mainPage = document.getElementById('main-page');
    const loadFill = document.getElementById('loadFill');
    const loadCounter = document.getElementById('loadCounter');
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        if (progress > 100) progress = 100;
        loadFill.style.width = progress + '%';
        loadCounter.innerText = progress + '%';
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                bootScreen.classList.add('hidden');
                mainPage.classList.add('visible');
            }, 500);
        }
    }, 50);

    // SCROLL FADE (Intersection Observer)
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.2 });
    sections.forEach(s => observer.observe(s));

    // SMOOTH SCROLL NAV
    document.querySelectorAll('.nav-right a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // BOOK OPEN/CLOSE
    const bookWrapper = document.getElementById('bookWrapper');
    const closeBtn = document.getElementById('closeBookBtn');
    if (bookWrapper) {
        bookWrapper.querySelector('.book-cover').addEventListener('click', () => {
            bookWrapper.classList.add('open');
        });
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            bookWrapper.classList.remove('open');
        });
    }

    // SKILLS INTERACTION (no icons, plain text)
    const skillTopics = document.querySelectorAll('.skill-topic');
    const skillsRight = document.getElementById('skillsRight');
    const skillsData = {
        prog: ['Python', 'C', 'C++', 'JAVA'],
        db: ['SQL'],
        tools: ['VScode', 'Google Colab', 'Jupyter Notebook']
    };

    function renderSkills(category) {
        if (!skillsRight) return;
        skillsRight.innerHTML = '';
        skillsData[category].forEach(s => {
            const div = document.createElement('div');
            div.className = 'skill-item';
            div.textContent = s;
            skillsRight.appendChild(div);
        });
    }

    skillTopics.forEach(topic => {
        topic.addEventListener('click', () => {
            skillTopics.forEach(t => t.classList.remove('active'));
            topic.classList.add('active');
            renderSkills(topic.dataset.skill);
        });
    });
    // default
    renderSkills('prog');

    // PROJECT CAROUSEL
    const track = document.getElementById('projectTrack');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    if (track && leftArrow && rightArrow) {
        let index = 0;
        leftArrow.addEventListener('click', () => {
            index = (index - 1 + 2) % 2;
            track.style.transform = `translateX(-${index * 100}%)`;
        });
        rightArrow.addEventListener('click', () => {
            index = (index + 1) % 2;
            track.style.transform = `translateX(-${index * 100}%)`;
        });
    }

    // CHATBOT
    const chatIcon = document.getElementById('chatIcon');
    const chatWindow = document.getElementById('chatWindow');
    const chatMsgs = document.getElementById('chatMsgs');
    const chatInput = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendChat');

    if (chatIcon && chatWindow) {
        chatIcon.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
        });

        const botReplies = {
            'skills': 'Programming: Python, C, C++, JAVA. Database: SQL. Tools: VScode, Colab, Jupyter.',
            'projects': 'Two projects: Cyber Threat Detection (ML) and Hostel Facial Recognition system.',
            'education': 'B.E CSE, Government College of Engineering, Salem. CGPA 8.8. Schooling: 88%.',
            'internship': 'Software Developer Intern at Insourse Design Tech, June 2025.',
            'contact': 'Email: kavidharaniramanathan@gmail.com, Tamilnadu, India.'
        };

        function addMessage(text, sender) {
            const msg = document.createElement('div');
            msg.className = `chat-msg ${sender}`;
            msg.innerText = text;
            chatMsgs.appendChild(msg);
            chatMsgs.scrollTop = chatMsgs.scrollHeight;
        }

        sendBtn.addEventListener('click', () => {
            const q = chatInput.value.trim().toLowerCase();
            if (!q) return;
            addMessage(q, 'user');
            chatInput.value = '';
            let reply = "You can ask about my skills, projects, education, internship, or contact.";
            for (let key in botReplies) {
                if (q.includes(key)) {
                    reply = botReplies[key];
                    break;
                }
            }
            setTimeout(() => addMessage(reply, 'bot'), 400);
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendBtn.click();
        });
    }

    // fallback for missing images
    document.querySelectorAll('img').forEach(img => {
        img.onerror = () => {
            img.style.background = '#5f4b32';
            img.style.height = '100%';
            img.style.display = 'block';
        };
    });
})();