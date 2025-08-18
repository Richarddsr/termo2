document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todas as caixas de entrada de texto da página
    const inputs = document.querySelectorAll('input[type="text"]');
    // Controla qual linha está ativa no momento (começa com a linha 0)
    let currentRow = 0;
    // Define o número total de linhas (6) e colunas (5) na grade
    const rowCount = 6;
    const colCount = 5;
    
    // Lista de cores aceitas e seus valores CSS
const colorMap = {
    "BRANCO": "#fff",
    "PRETO": "#2c2c2cff",
    "VERMELHO": "#ff0000",
    "AZUL": "#0000ff",
    "VERDE": "#4d944dff",
    "AMARELO": "#ffff00",
    "ROSA": "#ff69b4",
    "LARANJA": "#ffa500",
    "CINZA": "#d8d8d8ff",
    "ROXO": "#800080",
    "MARROM": "#8b4513",
    "FUNDE" : "#bf87e4ff",
    "PORNO" : "#db6e7cff"
};

    
    /**
     * Função para obter todas as caixas de entrada de uma linha específica
     * @param {number} rowIndex - Índice da linha (0 a 5)
     * @returns {Array} - Array com as caixas de entrada da linha
     */
    function getRowInputs(rowIndex) {
        // Calcula os índices de início e fim da linha na coleção de inputs
        const startIndex = rowIndex * colCount;
        const endIndex = startIndex + colCount;
        // Retorna um array com os inputs da linha especificada
        return Array.from(inputs).slice(startIndex, endIndex);
    }
    
    /**
     * Função para ativar ou desativar uma linha inteira
     * @param {number} rowIndex - Índice da linha a ser modificada
     * @param {boolean} enabled - Se verdadeiro, ativa a linha; se falso, desativa
     */
    function setRowStatus(rowIndex, enabled) {
        // Obtém todas as caixas de entrada da linha
        const rowInputs = getRowInputs(rowIndex);
        // Para cada caixa de entrada na linha
        rowInputs.forEach(input => {
            // Ativa ou desativa a caixa de entrada
            input.disabled = !enabled;
            if (!enabled) {
                // Adiciona classe 'locked' para estilização visual quando bloqueada
                input.classList.add('locked');
            } else {
                // Remove classe 'locked' quando desbloqueada
                input.classList.remove('locked');
            }
        });
    }
    
    /**
     * Verifica se todos os campos de uma linha estão preenchidos
     * @param {number} rowIndex - Índice da linha a verificar
     * @returns {boolean} - Verdadeiro se todos os campos estiverem preenchidos
     */
    function isRowComplete(rowIndex) {
        // Obtém todas as caixas de entrada da linha
        const rowInputs = getRowInputs(rowIndex);
        // Verifica se todos os inputs têm algum valor (não estão vazios)
        return rowInputs.every(input => input.value.trim() !== '');
    }
    
    /**
     * Obtém a palavra formada pelos caracteres de uma linha
     * @param {number} rowIndex - Índice da linha
     * @returns {string} - Palavra formada pelos caracteres da linha em maiúsculas
     */
    function getWordFromRow(rowIndex) {
        // Obtém todas as caixas de entrada da linha
        const rowInputs = getRowInputs(rowIndex);
        // Mapeia os valores de cada input, converte para maiúsculas e junta-os em uma única string
        return rowInputs.map(input => input.value.toUpperCase()).join('');
    }
    
    /**
     * Verifica a palavra da linha atual e passa para a próxima linha se estiver completa
     * @param {number} rowIndex - Índice da linha a verificar
     * @returns {boolean} - Verdadeiro se a verificação foi bem-sucedida
     */
    function verifyWord(rowIndex) {
        if (!isRowComplete(rowIndex)) {
            alert('Por favor, preencha todos os campos desta linha. burrão!');
            return false;
        }

        if(/\d/.test(getWordFromRow(rowIndex))) {
            alert('Por favor, não use números na palavra. Seu burro!');
            return false;
        }

        const word = getWordFromRow(rowIndex);
        console.log(`Palavra verificada: ${word}`);
        const targetWord = "SEMEN";

        // Se for SEMEN, vitória e fundo branco
        if (word === targetWord) {
            const rowInputs = getRowInputs(rowIndex);
            rowInputs.forEach((input, index) => {
                input.style.backgroundColor = "#6aaa64";
                input.style.color = "white";
            });
            setTimeout(() => {
                document.body.style.backgroundColor = "#fff";
                alert('Parabéns! Você acertou a palavra.');
            }, 100);
            return true;
        }

        // Se for FUNDE, mostra aviso especial
        if (word === "FUNDE") {
            const rowInputs = getRowInputs(rowIndex);
            rowInputs.forEach((input, index) => {
                input.style.backgroundColor = "#bf87e4ff";
                input.style.color = "white";
            });
            setTimeout(() => {
                document.body.style.backgroundColor = "#bf87e4ff";
                alert('essa palavra aqui é proibida! burrão, tenta dnv');
            }, 100);
            return true;
        }

        // Se for PORNO, muda o texto do subtítulo
        if (word === "PORNO") {
            const rowInputs = getRowInputs(rowIndex);
            rowInputs.forEach((input, index) => {
                input.style.backgroundColor = "#db6e7cff";
                input.style.color = "white";
            });
            setTimeout(() => {
                document.body.style.backgroundColor = "#db6e7cff";
                const subtitle = document.getElementById('subtitle');
                if (subtitle) {
                    subtitle.textContent = "calma paizão, assim n da";
                }
            }, 100);
            return true;
        }

        // Se for RAiOS, muda o texto do subtítulo e fundo amarelo
        if (word === "RAIOS") {
            const rowInputs = getRowInputs(rowIndex);
            rowInputs.forEach((input, index) => {
                input.style.backgroundColor = "#ffff00";
                input.style.color = "black";
            });
            setTimeout(() => {
                document.body.style.backgroundColor = "#ffff00";
                const subtitle = document.getElementById('subtitle');
                if (subtitle) {
                    subtitle.textContent = "0 criativade...";
                }
            }, 100);
            return true;
        }

        // Se for uma cor válida, muda o fundo
        if (colorMap[word]) {
            document.body.style.backgroundColor = colorMap[word];
        }

        // Mostra as cores das letras normalmente
        const rowInputs = getRowInputs(rowIndex);
        rowInputs.forEach((input, index) => {
            const letter = input.value.toUpperCase();
            if (letter === targetWord[index]) {
                input.style.backgroundColor = "#6aaa64";
                input.style.color = "white";
            } else if (targetWord.includes(letter)) {
                input.style.backgroundColor = "#c9b458";
                input.style.color = "white";
            } else {
                input.style.backgroundColor = "#787c7e";
                input.style.color = "white";
            }
        });

        setRowStatus(rowIndex, false);

        if (rowIndex < rowCount - 1) {
            currentRow = rowIndex + 1;
            setRowStatus(currentRow, true);
            getRowInputs(currentRow)[0].focus();
            return true;
        } else {
            setTimeout(() => {
                alert(`Você completou todas as linhas! A palavra era ${targetWord}.`);
            }, 100);
            return false;
        }
    }
    
    // Inicialização: desativa todas as linhas exceto a primeira
    for (let i = 0; i < rowCount; i++) {
        setRowStatus(i, i === currentRow);
    }
    
    // Coloca o foco na primeira caixa de entrada quando a página carrega
    if (inputs.length > 0) {
        inputs[0].focus();
    }
    
    // Adiciona event listeners a todas as caixas de entrada
    inputs.forEach((input, index) => {
        // Calcula a linha e coluna de cada input com base em seu índice
        const row = Math.floor(index / colCount);
        const col = index % colCount;
        
        // Evento de entrada: move para o próximo campo quando um caractere é digitado
        input.addEventListener('input', function() {
            // Se um caractere foi digitado e não estamos na última coluna
            if (this.value.length === 1 && col < colCount - 1) {
                // Move o foco para o próximo campo na mesma linha
                getRowInputs(row)[col + 1].focus();
            }
        });
        
        // Evento de tecla pressionada: navegação e verificação de palavra
        input.addEventListener('keydown', function(e) {
            // Só processa se este input estiver na linha ativa atual
            if (row !== currentRow) return;
            
            // Trata diferentes teclas pressionadas
            switch(e.key) {
                case 'ArrowRight': // Seta para direita
                    // Move o foco para o próximo campo na mesma linha
                    if (col < colCount - 1) getRowInputs(row)[col + 1].focus();
                    break;
                case 'ArrowLeft': // Seta para esquerda
                    // Move o foco para o campo anterior na mesma linha
                    if (col > 0) getRowInputs(row)[col - 1].focus();
                    break;
                case 'Backspace': // Tecla de apagar
                    // Se o campo atual está vazio e não é o primeiro da linha
                    if (this.value === '' && col > 0) {
                        e.preventDefault(); // Previne o comportamento padrão
                        // Obtém o input anterior
                        const prevInput = getRowInputs(row)[col - 1];
                        // Move o foco para ele
                        prevInput.focus();
                        // Limpa seu valor
                        prevInput.value = '';
                    }
                    break;
                case 'Enter': // Tecla Enter
                    e.preventDefault(); // Previne o comportamento padrão
                    // Verifica a palavra da linha atual
                    verifyWord(currentRow);
                    break;
            }
        });
    });
});