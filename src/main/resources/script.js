const oppgaver = [];
const oppgave1 = {
    sporsmol: "Hvilken type skjoldbruskkjertelkreft har dårligst prognose?",
    alternativer: {
        a: "Medullært thyreoideakarsinom (MTC)",
        b: "Anaplastisk thyreoideakarsinom (ATC)",
        c: "Papillært thyreoideakarsinom (PTC)",
        d: "Follikulært thyreoideakarsinom (FTC)"
    },
    riktigIndex: 'b',
    feedback: {
        a: "Galt. MTC har en 10-årsoverlevelse på ca. 80%.",
        b: "Riktig. ATC har dårligst prognose, 5-årsoverlevelsen er <20%.",
        c: "Galt. PTC har best prognose, 10-årsoverlevelsen er >90%.",
        d: "Galt. FTC har en 10-årsoverlevelse på ca. 85%."
    }
};
const oppgave2 = {
    sporsmol: "Hvilket legemiddel hemmer produksjonen av thyreoideahormoner og normaliserer stoffskiftet etter noen uker?",
    alternativer: {
        a: "Karbimazol",
        b: "Kaliumjodid",
        c: "Levotyroksin",
        d: "Propranolol"
    },
    riktigIndex: 'a',
    feedback: {
        a: "Riktig. Tyreostatika som karbimazol og PTU hemmer hormonproduksjonen ved å hemme enzymet tyreoperoksidase, men påvirker ikke sekresjonen av allerede produsert T4 og T3. Det tar derfor noen uker før hormonlagrene er tømt og stoffskiftet normaliseres.",
        b: "Galt. Kaliumjodid hemmer både hormonsyntese og -sekresjon i thyreoidea، men effekten inntrer mye raskere (i løpet av timer).",
        c: "Galt. Levotyroksin tilsvarer thyreoideahormonet tyroksin (T4).",
        d: "Galt. Propranolol er en ikke-selektiv betablokker som lindrer symptomer assosiert med økt betaadrenerg stimulering (hjertebank، takykardi، tremor، angst)، men den virker ikke inn på hormonsyntesen."
    }
};

oppgaver.push(oppgave1);
oppgaver.push(oppgave2);

const velkomst = document.getElementById('velkomst');
const quizContainer = document.getElementById('quizContainer');
const quiz = document.getElementById('quiz');
const sjekkSvareneKnapp = document.getElementById('sjekkSvarene');
const provIgjenKnapp = document.getElementById('provIgjen');
const resultat = document.getElementById('resultat');


function startQuiz() {
    velkomst.style.display = 'none';
    quizContainer.style.display = 'block';
    skrivUtOppgaver();
};
function skrivUtOppgaver() {
    let output = "";
    oppgaver.forEach((oppgave, oppgaveIndex) => {
        output += "<div class='sporsmaal'>";
        output += "<h4>" + oppgave.sporsmol + "</h4>";
        Object.keys(oppgave.alternativer).forEach((key) => {
            const alternativ = oppgave.alternativer[key];
            output += '<label>';
            output += '<input type="radio" class="radio" name="sporsmaal-' + oppgaveIndex + '" value="' + key + '">';
            output += alternativ;
            output += '</label><br>';
        });
        output += "</div>";
    });
    quiz.innerHTML = output;
}

function sjekkSvar() {
    let score = 0;
    oppgaver.forEach((oppgave, oppgaveIndex) => {
        const valgtSvar = document.querySelector('input[name="sporsmaal-' + oppgaveIndex + '"]:checked');
        const sporsmaalDiv = quiz.children[oppgaveIndex];

        if (valgtSvar) {
            const feedback = document.createElement('p');
            if (valgtSvar.value === oppgave.riktigIndex) {
                score++;
                feedback.innerText = oppgave.feedback[valgtSvar.value];
                feedback.classList.add('riktig');
            } else {
                feedback.innerText = oppgave.feedback[valgtSvar.value];
                feedback.classList.add('galt');
            }
            sporsmaalDiv.appendChild(feedback);
        } else {
            const feedback = document.createElement('p');
            feedback.innerText = 'Ingen svar valgt';
            feedback.style.color = 'orange';
            sporsmaalDiv.appendChild(feedback);
        }

        // Deaktiver alle radio-knapper for dette spørsmålet
        const inputs = sporsmaalDiv.querySelectorAll('input[type="radio"]');
        inputs.forEach(input => input.disabled = true);
    });

    resultat.innerText = `Du fikk ${score} av ${oppgaver.length} riktige.`;
    sjekkSvareneKnapp.style.display = 'none';
    provIgjenKnapp.style.display = 'block';
}
sjekkSvareneKnapp.addEventListener('click', sjekkSvar);
provIgjenKnapp.addEventListener('click', () => {
    skrivUtOppgaver();
    resultat.innerHTML = '';
    sjekkSvareneKnapp.style.display = 'block';
    provIgjenKnapp.style.display = 'none';
});
