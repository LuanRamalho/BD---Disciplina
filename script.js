document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let disciplina = document.getElementById('disciplina').value;
    let av1 = parseFloat(document.getElementById('av1').value);
    let av2 = parseFloat(document.getElementById('av2').value);
    let av3 = parseFloat(document.getElementById('av3').value);
    let av4 = parseFloat(document.getElementById('av4').value);

    let media = (av1 + av2 + av3 + av4) / 4;
    let situacao = media >= 7 ? 'APROVADO' : 'REPROVADO';

    let disciplinaData = {
        disciplina: disciplina,
        av1: av1,
        av2: av2,
        av3: av3,
        av4: av4,
        media: media.toFixed(1),
        situacao: situacao
    };

    // Armazena no banco de dados (localStorage)
    let disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || [];
    disciplinas.push(disciplinaData);
    localStorage.setItem('disciplinas', JSON.stringify(disciplinas));

    alert('Disciplina cadastrada com sucesso!');

    // Limpar o formulário
    document.getElementById('gradeForm').reset();
});
