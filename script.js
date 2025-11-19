const langSwitcher = document.getElementById('lang-switcher');
const themeSwitcher = document.getElementById('theme-switcher');
const contentDe = document.getElementById('content-de');
const contentEn = document.getElementById('content-en');
const htmlEl = document.documentElement;

let hiddenDatasets = {
    'categoriesChartDe': [false, false, false, false],
    'categoriesChartEn': [false, false, false, false]
};

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

// Bewertung der Anbieter nach verschiedenen Kriterien (Skala 1-10)
const providerRatingsDe = {
    'ChatGPT': { 
        userexperience: 9, 
        modell_schlauheit: 9, 
        upload_möglichkeiten: 7, 
        gesamt: 7.8
    },
    'Claude': { 
        userexperience: 9, 
        modell_schlauheit: 10, 
        upload_möglichkeiten: 8, 
        gesamt: 8.2
    },
    'Gemini': { 
        userexperience: 7, 
        modell_schlauheit: 7, 
        upload_möglichkeiten: 8, 
        gesamt: 7.4
    },
    'Perplexity': { 
        userexperience: 8, 
        modell_schlauheit: 6, 
        upload_möglichkeiten: 6, 
        gesamt: 7.2
    },
    'Qwen': { 
        userexperience: 6, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 5, 
        gesamt: 7.2
    },
    'MiniMax': { 
        userexperience: 7, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 7, 
        gesamt: 7.8
    },
    'Grok': { 
        userexperience: 8, 
        modell_schlauheit: 7, 
        upload_möglichkeiten: 5, 
        gesamt: 6.8
    },
    'Scira': { 
        userexperience: 7, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 7, 
        gesamt: 7.0
    },
    'Groq': { 
        userexperience: 8, 
        modell_schlauheit: 9, 
        upload_möglichkeiten: 6, 
        gesamt: 7.6
    },
    'Groq console': { 
        userexperience: 5, 
        modell_schlauheit: 9, 
        upload_möglichkeiten: 8, 
        gesamt: 6.8
    },
    'DeepSeek': { 
        userexperience: 6, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 5, 
        gesamt: 7.2
    },
    'Mistral': { 
        userexperience: 7, 
        modell_schlauheit: 7, 
        upload_möglichkeiten: 6, 
        gesamt: 7.2
    },
    'Kimi': { 
        userexperience: 7, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 6, 
        gesamt: 7.6
    },
    'ChatGLM': { 
        userexperience: 5, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 5, 
        gesamt: 6.6
    },
    'Hugging Face': { 
        userexperience: 6, 
        modell_schlauheit: 7, 
        upload_möglichkeiten: 9, 
        gesamt: 7.4
    },
    'Cohere': { 
        userexperience: 7, 
        modell_schlauheit: 7, 
        upload_möglichkeiten: 8, 
        gesamt: 6.8
    }
};

const providerRatingsEn = {
    'ChatGPT': { 
        userexperience: 9, 
        modell_schlauheit: 9, 
        upload_möglichkeiten: 7, 
        gesamt: 7.8
    },
    'Claude': { 
        userexperience: 9, 
        modell_schlauheit: 10, 
        upload_möglichkeiten: 8, 
        gesamt: 8.2
    },
    'Gemini': { 
        userexperience: 7, 
        modell_schlauheit: 7, 
        upload_möglichkeiten: 8, 
        gesamt: 7.4
    },
    'Perplexity': { 
        userexperience: 8, 
        modell_schlauheit: 6, 
        upload_möglichkeiten: 6, 
        gesamt: 7.2
    },
    'Qwen': { 
        userexperience: 6, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 5, 
        gesamt: 7.2
    },
    'MiniMax': { 
        userexperience: 7, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 7, 
        gesamt: 7.8
    },
    'Grok': { 
        userexperience: 8, 
        modell_schlauheit: 7, 
        upload_möglichkeiten: 5, 
        gesamt: 6.8
    },
    'Scira': { 
        userexperience: 7, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 7, 
        gesamt: 7.0
    },
    'Groq': { 
        userexperience: 8, 
        modell_schlauheit: 9, 
        upload_möglichkeiten: 6, 
        gesamt: 7.6
    },
    'Groq console': { 
        userexperience: 5, 
        modell_schlauheit: 9, 
        upload_möglichkeiten: 8, 
        gesamt: 6.8
    },
    'DeepSeek': { 
        userexperience: 6, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 5, 
        gesamt: 7.2
    },
    'Mistral': { 
        userexperience: 7, 
        modell_schlauheit: 7, 
        upload_möglichkeiten: 6, 
        gesamt: 7.2
    },
    'Kimi': { 
        userexperience: 7, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 6, 
        gesamt: 7.6
    },
    'ChatGLM': { 
        userexperience: 5, 
        modell_schlauheit: 8, 
        upload_möglichkeiten: 5, 
        gesamt: 6.6
    },
    'Hugging Face': { 
        userexperience: 6, 
        modell_schlauheit: 7, 
        upload_möglichkeiten: 9, 
        gesamt: 7.4
    },
    'Cohere': { 
        userexperience: 7, 
        modell_schlauheit: 7, 
        upload_möglichkeiten: 8, 
        gesamt: 6.8
    }
};

const criteriaLabelsDe = {
    userexperience: 'Benutzerfreundlichkeit',
    modell_schlauheit: 'Modell-Intelligenz',
    upload_möglichkeiten: 'Upload-Möglichkeiten',
    gesamt: 'Gesamtbewertung'
};

const criteriaLabelsEn = {
    userexperience: 'User Experience',
    modell_schlauheit: 'Model Intelligence',
    upload_möglichkeiten: 'Upload Options',
    gesamt: 'Overall Rating'
};

const chartColors = [
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)',
    'rgba(199, 199, 199, 0.8)',
    'rgba(83, 102, 255, 0.8)',
    'rgba(255, 99, 255, 0.8)',
    'rgba(99, 255, 132, 0.8)',
    'rgba(255, 206, 192, 0.8)',
    'rgba(75, 75, 192, 0.8)',
    'rgba(153, 153, 255, 0.8)',
    'rgba(255, 102, 159, 0.8)',
    'rgba(83, 255, 102, 0.8)',
    'rgba(255, 159, 99, 0.8)'
];

function createRatingChart(canvasId, data, labels) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    const providers = Object.keys(data);
    const criteria = ['userexperience', 'modell_schlauheit', 'upload_möglichkeiten', 'gesamt'];
    
    // Standard: alphabetische Sortierung
    const sortedProviders = providers.sort();
    
    const datasets = criteria.map((criterion, index) => ({
        label: labels[criterion],
        data: sortedProviders.map(provider => data[provider][criterion]),
        backgroundColor: chartColors[index],
        borderColor: chartColors[index].replace('0.8', '1'),
        borderWidth: 1
    }));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedProviders,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    onClick: (e, legendItem, legend) => {
                        const index = legendItem.datasetIndex;
                        const ci = legend.chart;
                        const canvasId = ci.canvas.id;
                        if (ci.isDatasetVisible(index)) {
                            ci.hide(index);
                            legendItem.hidden = true;
                            hiddenDatasets[canvasId][index] = true;
                        } else {
                            ci.show(index);
                            legendItem.hidden = false;
                            hiddenDatasets[canvasId][index] = false;
                        }
                    },
                    labels: {
                        boxWidth: 20,
                        padding: 25,
                        generateLabels: (chart) => {
                            const datasets = chart.data.datasets;
                            return datasets.map((dataset, i) => ({
                                text: dataset.label,
                                fillStyle: dataset.backgroundColor,
                                strokeStyle: dataset.borderColor,
                                lineWidth: dataset.borderWidth,
                                hidden: !chart.isDatasetVisible(i),
                                datasetIndex: i,
                                // Add a class to the legend item's text
                                fontColor: !chart.isDatasetVisible(i) ? '#a9a9a9' : '#666',
                            }));
                        }
                    }
                },
                title: {
                    display: true,
                    text: canvasId.includes('De') ? 
                        'Bewertung der KI-Anbieter nach verschiedenen Kriterien' : 
                        'AI Provider Rating by Various Criteria'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '/10';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Bewertung (1-10)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'KI-Anbieter'
                    }
                }
            }
        }
    });
}

// Sortierungsvariablen
let currentSortCategoryDe = 'gesamt';
let sortDirectionDe = 'desc';
let currentSortCategoryEn = 'gesamt';
let sortDirectionEn = 'desc';

function updateChartSort(canvasId, data, labels, sortCategory, sortDirection, lang) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    const chart = Chart.getChart(ctx);
    
    if (chart) {
        chart.destroy();
    }
    
    const providers = Object.keys(data);
    let sortedProviders;
    
    // Sortierung nach gewählter Kategorie
    if (sortCategory === 'gesamt') {
        sortedProviders = providers.sort((a, b) => {
            const comparison = data[b].gesamt - data[a].gesamt;
            return sortDirection === 'desc' ? comparison : -comparison;
        });
    } else if (sortCategory === 'userexperience') {
        sortedProviders = providers.sort((a, b) => {
            const comparison = data[b].userexperience - data[a].userexperience;
            return sortDirection === 'desc' ? comparison : -comparison;
        });
    } else if (sortCategory === 'modell_schlauheit') {
        sortedProviders = providers.sort((a, b) => {
            const comparison = data[b].modell_schlauheit - data[a].modell_schlauheit;
            return sortDirection === 'desc' ? comparison : -comparison;
        });
    } else if (sortCategory === 'upload_möglichkeiten') {
        sortedProviders = providers.sort((a, b) => {
            const comparison = data[b].upload_möglichkeiten - data[a].upload_möglichkeiten;
            return sortDirection === 'desc' ? comparison : -comparison;
        });
    }
    
    const criteria = ['userexperience', 'modell_schlauheit', 'upload_möglichkeiten', 'gesamt'];
    
    const datasets = criteria.map((criterion, index) => ({
        label: labels[criterion],
        data: sortedProviders.map(provider => data[provider][criterion]),
        backgroundColor: chartColors[index],
        borderColor: chartColors[index].replace('0.8', '1'),
        borderWidth: 1,
        hidden: hiddenDatasets[canvasId][index]
    }));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sortedProviders,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    onClick: (e, legendItem, legend) => {
                        const index = legendItem.datasetIndex;
                        const ci = legend.chart;
                        const canvasId = ci.canvas.id;
                        if (ci.isDatasetVisible(index)) {
                            ci.hide(index);
                            legendItem.hidden = true;
                            hiddenDatasets[canvasId][index] = true;
                        } else {
                            ci.show(index);
                            legendItem.hidden = false;
                            hiddenDatasets[canvasId][index] = false;
                        }
                    },
                    labels: {
                        boxWidth: 20,
                        padding: 25,
                        generateLabels: (chart) => {
                            const datasets = chart.data.datasets;
                            return datasets.map((dataset, i) => ({
                                text: dataset.label,
                                fillStyle: dataset.backgroundColor,
                                strokeStyle: dataset.borderColor,
                                lineWidth: dataset.borderWidth,
                                hidden: !chart.isDatasetVisible(i),
                                datasetIndex: i,
                                // Add a class to the legend item's text
                                fontColor: !chart.isDatasetVisible(i) ? '#a9a9a9' : '#666',
                            }));
                        }
                    }
                },
                title: {
                    display: true,
                    text: lang === 'de' ? 
                        'Bewertung der KI-Anbieter nach verschiedenen Kriterien' : 
                        'AI Provider Rating by Various Criteria'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '/10';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 1
                    },
                    title: {
                        display: true,
                        text: 'Bewertung (1-10)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'KI-Anbieter'
                    }
                }
            }
        }
    });
}

// Erstelle die Charts nach dem Laden der Seite
document.addEventListener('DOMContentLoaded', () => {
    createRatingChart('categoriesChartDe', providerRatingsDe, criteriaLabelsDe);
    createRatingChart('categoriesChartEn', providerRatingsEn, criteriaLabelsEn);
    
    // Event-Listener für deutsche Sortierung
    const sortCategoryDe = document.getElementById('sort-category-de');
    const sortDirectionBtnDe = document.getElementById('sort-direction-de');
    
    if (sortCategoryDe) {
        sortCategoryDe.addEventListener('change', (e) => {
            currentSortCategoryDe = e.target.value;
            updateChartSort('categoriesChartDe', providerRatingsDe, criteriaLabelsDe, currentSortCategoryDe, sortDirectionDe, 'de');
        });
    }
    
    if (sortDirectionBtnDe) {
        sortDirectionBtnDe.addEventListener('click', () => {
            sortDirectionDe = sortDirectionDe === 'desc' ? 'asc' : 'desc';
            sortDirectionBtnDe.textContent = sortDirectionDe === 'desc' ? 'Absteigend ↓' : 'Aufsteigend ↑';
            updateChartSort('categoriesChartDe', providerRatingsDe, criteriaLabelsDe, currentSortCategoryDe, sortDirectionDe, 'de');
        });
    }
    
    // Event-Listener für englische Sortierung
    const sortCategoryEn = document.getElementById('sort-category-en');
    const sortDirectionBtnEn = document.getElementById('sort-direction-en');
    
    if (sortCategoryEn) {
        sortCategoryEn.addEventListener('change', (e) => {
            currentSortCategoryEn = e.target.value;
            updateChartSort('categoriesChartEn', providerRatingsEn, criteriaLabelsEn, currentSortCategoryEn, sortDirectionEn, 'en');
        });
    }
    
    if (sortDirectionBtnEn) {
        sortDirectionBtnEn.addEventListener('click', () => {
            sortDirectionEn = sortDirectionEn === 'desc' ? 'asc' : 'desc';
            sortDirectionBtnEn.textContent = sortDirectionEn === 'desc' ? 'Descending ↓' : 'Ascending ↑';
            updateChartSort('categoriesChartEn', providerRatingsEn, criteriaLabelsEn, currentSortCategoryEn, sortDirectionEn, 'en');
        });
    }
});

// Glossary
document.querySelectorAll('.glossary-term').forEach(button => {
    button.addEventListener('click', () => {
        const glossaryItem = button.parentElement;
        glossaryItem.classList.toggle('active');
    });
});

function filterGlossary(searchTerm, lang) {
    const glossaryItems = document.querySelectorAll(`#content-${lang} .glossary-item`);
    glossaryItems.forEach(item => {
        const term = item.querySelector('.glossary-term');
        const definition = item.querySelector('.glossary-definition');
        const termText = term.textContent.toLowerCase();
        const definitionText = definition.textContent.toLowerCase();

        // Remove previous highlights
        term.innerHTML = term.textContent;
        definition.innerHTML = definition.textContent;

        if (searchTerm === '') {
            item.style.display = 'block';
            item.classList.remove('active');
            return;
        }

        if (termText.includes(searchTerm) || definitionText.includes(searchTerm)) {
            item.style.display = 'block';
            item.classList.add('active');

            // Highlight search term
            const regex = new RegExp(searchTerm, 'gi');
            term.innerHTML = term.textContent.replace(regex, `<span class="highlight">$&</span>`);
            definition.innerHTML = definition.textContent.replace(regex, `<span class="highlight">$&</span>`);
        } else {
            item.style.display = 'none';
            item.classList.remove('active');
        }
    });
}

document.getElementById('glossary-search-de').addEventListener('input', (e) => {
    filterGlossary(e.target.value.toLowerCase(), 'de');
});

document.getElementById('glossary-search-en').addEventListener('input', (e) => {
    filterGlossary(e.target.value.toLowerCase(), 'en');
});
