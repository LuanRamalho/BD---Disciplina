// Carrega os dados e exibe na tabela
window.addEventListener('load', function() {
    carregarDisciplinas();
});

function carregarDisciplinas() {
    let disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || [];
    let tableBody = document.querySelector('#resultTable tbody');
    tableBody.innerHTML = '';  // Limpar tabela

    disciplinas.forEach(function(disciplina, index) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" value="${disciplina.disciplina}" class="edit-mode" disabled></td>
            <td><input type="number" value="${disciplina.av1}" class="edit-mode" disabled></td>
            <td><input type="number" value="${disciplina.av2}" class="edit-mode" disabled></td>
            <td><input type="number" value="${disciplina.av3}" class="edit-mode" disabled></td>
            <td><input type="number" value="${disciplina.av4}" class="edit-mode" disabled></td>
            <td>${disciplina.media}</td>
            <td>${disciplina.situacao}</td>
            <td>
                <button class="edit" onclick="editarDisciplina(${index}, this)">Editar</button>
                <button class="delete" onclick="excluirDisciplina(${index})">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Função para buscar disciplinas
function buscarDisciplina() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let rows = document.querySelectorAll('#resultTable tbody tr');

    rows.forEach(function(row) {
        let disciplina = row.querySelector('td input[type="text"]').value.toLowerCase();
        if (disciplina.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Função para excluir disciplina
function excluirDisciplina(index) {
    let disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || [];
    disciplinas.splice(index, 1);  // Remove a disciplina do array
    localStorage.setItem('disciplinas', JSON.stringify(disciplinas));
    carregarDisciplinas();  // Recarrega a tabela
}

// Função para editar disciplina
function editarDisciplina(index, button) {
    let row = button.parentNode.parentNode;
    let inputs = row.querySelectorAll('input.edit-mode');
    let disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || [];

    if (button.textContent === 'Editar') {
        // Habilitar modo de edição
        inputs.forEach(input => input.disabled = false);
        button.textContent = 'Salvar';
        button.style.backgroundColor = '#28a745';  // Muda a cor do botão para indicar salvar
    } else {
        // Salvar as alterações
        let disciplinaAtualizada = {
            disciplina: inputs[0].value,
            av1: parseFloat(inputs[1].value),
            av2: parseFloat(inputs[2].value),
            av3: parseFloat(inputs[3].value),
            av4: parseFloat(inputs[4].value)
        };
        disciplinaAtualizada.media = ((disciplinaAtualizada.av1 + disciplinaAtualizada.av2 + disciplinaAtualizada.av3 + disciplinaAtualizada.av4) / 4).toFixed(1);
        disciplinaAtualizada.situacao = disciplinaAtualizada.media >= 7 ? 'APROVADO' : 'REPROVADO';

        disciplinas[index] = disciplinaAtualizada;  // Atualiza a disciplina no array
        localStorage.setItem('disciplinas', JSON.stringify(disciplinas));
        carregarDisciplinas();  // Recarrega a tabela

        button.textContent = 'Editar';
        button.style.backgroundColor = '#ffc107';  // Volta a cor do botão para "Editar"
    }
}
