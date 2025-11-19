const langSwitcher = document.getElementById('lang-switcher');
const themeSwitcher = document.getElementById('theme-switcher');
const contentDe = document.getElementById('content-de');
const contentEn = document.getElementById('content-en');
const htmlEl = document.documentElement;

// Language Switcher
function setLanguage(lang) {
    if (lang === 'en') {
        contentDe.style.display = 'none';
        contentEn.style.display = 'block';
        htmlEl.setAttribute('lang', 'en');
        langSwitcher.textContent = 'DE';
    } else {
        contentDe.style.display = 'block';
        contentEn.style.display = 'none';
        htmlEl.setAttribute('lang', 'de');
        langSwitcher.textContent = 'EN';
    }
}

function getLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang');
}

let currentLang = getLangFromUrl() || 'de';
setLanguage(currentLang);

langSwitcher.addEventListener('click', () => {
    const newLang = htmlEl.getAttribute('lang') === 'de' ? 'en' : 'de';
    const params = new URLSearchParams(window.location.search);
    params.set('lang', newLang);
    window.location.search = params.toString();
});

// Theme Switcher
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitcher.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        themeSwitcher.checked = false;
    }
}

themeSwitcher.addEventListener('change', () => {
    const currentTheme = themeSwitcher.checked ? 'dark' : 'light';
    setTheme(currentTheme);
    localStorage.setItem('theme', currentTheme);
});

// Set default theme to dark and check local storage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});


const categoriesDe = {
    'Kontextverständnis': ['Claude', 'MiniMax'],
    'Research': ['Perplexity', 'Scira'],
    'Reasoning': ['Grok', 'ChatGPT'],
    'Visuelles Verständnis': ['Qwen'],
    'Anpassbarkeit': ['Groq console'],
    'Open-Source': ['Hugging&nbsp;Face'],
    'Unternehmensanwendungen': ['Cohere']
};

const categoriesEn = {
    'Context understanding': ['Claude', 'MiniMax'],
    'Research': ['Perplexity', 'Scira'],
    'Reasoning': ['Grok', 'ChatGPT'],
    'Visual understanding': ['Qwen'],
    'Customizability': ['Groq console'],
    'Open-Source': ['Hugging&nbsp;Face'],
    'Enterprise Applications': ['Cohere']
};

const chartColors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(199, 199, 199, 0.6)'
];

function createChart(canvasId, chartTitle, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: chartTitle,
                data: Object.values(data).map(arr => arr.length),
                backgroundColor: chartColors,
                borderColor: chartColors.map(color => color.replace('0.6', '1')),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            const category = context.label;
                            const providers = data[category];
                            label += providers.join(', ');
                            return label;
                        }
                    }
                }
            }
        }
    });
}

createChart('categoriesChartDe', 'Anzahl der Top-Anbieter pro Kategorie', categoriesDe);
createChart('categoriesChartEn', 'Number of Top Providers per Category', categoriesEn);
