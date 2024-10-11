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
            <td><div contenteditable="false" class="editable">${disciplina.disciplina}</div></td>
            <td><div contenteditable="false" class="editable">${disciplina.av1}</div></td>
            <td><div contenteditable="false" class="editable">${disciplina.av2}</div></td>
            <td><div contenteditable="false" class="editable">${disciplina.av3}</div></td>
            <td><div contenteditable="false" class="editable">${disciplina.av4}</div></td>
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
    let cells = row.querySelectorAll('div.editable');
    let disciplinas = JSON.parse(localStorage.getItem('disciplinas')) || [];

    if (button.textContent === 'Editar') {
        // Habilitar modo de edição
        cells.forEach(cell => {
            cell.contentEditable = true; // Permitir edição
            cell.style.backgroundColor = '#f8f9fa'; // Altera a cor para indicar edição
        });
        button.textContent = 'Salvar';
        button.style.backgroundColor = '#28a745';  // Muda a cor do botão para indicar salvar
    } else {
        // Salvar as alterações
        let disciplinaAtualizada = {
            disciplina: cells[0].textContent,
            av1: parseFloat(cells[1].textContent),
            av2: parseFloat(cells[2].textContent),
            av3: parseFloat(cells[3].textContent),
            av4: parseFloat(cells[4].textContent)
        };
        disciplinaAtualizada.media = ((disciplinaAtualizada.av1 + disciplinaAtualizada.av2 + disciplinaAtualizada.av3 + disciplinaAtualizada.av4) / 4).toFixed(1);
        disciplinaAtualizada.situacao = disciplinaAtualizada.media >= 7 ? 'APROVADO' : 'REPROVADO';

        disciplinas[index] = disciplinaAtualizada;  // Atualiza a disciplina no array
        localStorage.setItem('disciplinas', JSON.stringify(disciplinas));
        carregarDisciplinas();  // Recarrega a tabela

        // Desabilitar modo de edição
        cells.forEach(cell => {
            cell.contentEditable = false; // Desabilitar edição
            cell.style.backgroundColor = ''; // Restaura a cor original
        });
        
        button.textContent = 'Editar';
        button.style.backgroundColor = '#ffc107';  // Volta a cor do botão para "Editar"
    }
}
