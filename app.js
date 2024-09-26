// Configuração do GitHub
const GITHUB_TOKEN = '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';
const REPO_OWNER = 'LeandroBiazzo';
const REPO_NAME = 'Reserva-Definitivo';
const FILE_PATH = 'agendamentos.json';

// Resto do código JavaScript permanece o mesmo que você forneceu
// Apenas substitua todo o conteúdo do <script> no HTML pelo código abaixo

const form = document.getElementById('agendamentoForm');
const listaAgendamentos = document.getElementById('listaAgendamentos');
const agendarButton = document.getElementById('agendarButton');
const verMesBtn = document.getElementById('verMes');
const planner = document.getElementById('planner');
const plannerBody = document.getElementById('plannerBody');
const voltarBtn = document.getElementById('voltar');

const finalidadeSelect = document.getElementById('finalidade');
const solicitanteSelect = document.getElementById('solicitante');
const nomeSolicitanteInput = document.getElementById('nomeSolicitante');

const tccFields = document.getElementById('tccFields');
const manutencaoFields = document.getElementById('manutencaoFields');

const temaTcc = document.getElementById('temaTcc');
const bancaTcc = document.getElementById('bancaTcc');
const orientadorTcc = document.getElementById('orientadorTcc');
const motivoManutencao = document.getElementById('motivoManutencao');

let agendamentos = [];
let editIndex = -1;

const professores = ['BRUNA MARCELE', 'DANIELLE BACARELLI', 'DIANA COSTA', 'DOUGLAS CARAGELASCO', 'JOÃO FLÁVIO', 'LÍVIA BIAZZO', 'MARIANA MIRANDA', 'MARILIA FILIPONI', 'MARTA LUPPI', 'MICHELE BARROS', 'PAULA GUIMARÃES', 'PAULO GRISKA', 'PAULO ANSELMO', 'RAFAEL NEVES'];

// Funções para interagir com o GitHub
async function getAgendamentos() {
  try {
    const response = await axios.get(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });
    const content = atob(response.data.content);
    return { data: JSON.parse(content), sha: response.data.sha };
  } catch (error) {
    console.error('Erro ao obter agendamentos:', error);
    return { data: [], sha: null };
  }
}

async function saveAgendamentos(agendamentos, sha) {
  try {
    const content = btoa(JSON.stringify(agendamentos, null, 2));
    await axios.put(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      message: 'Atualizar agendamentos',
      content: content,
      sha: sha
    }, {
      headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
    });
  } catch (error) {
    console.error('Erro ao salvar agendamentos:', error);
    throw error;
  }
}

// Função para carregar agendamentos
async function carregarAgendamentos() {
  try {
    const { data, sha } = await getAgendamentos();
    agendamentos = data;
    atualizarListaAgendamentos();
  } catch (error) {
    console.error('Erro ao carregar agendamentos:', error);
  }
}

// O resto do seu código JavaScript permanece o mesmo
// ...

// Inicialização
carregarAgendamentos();
