/**
 * Membros do Time de Produto — fonte única.
 * Consumida pelo carrossel do Hub e pela command palette (busca global).
 * As fotos continuam vindo de src/assets/team.ts (mapa id → URL).
 */

export interface MembroTime {
  id: string;
  name: string;
  role: string;
  bio: string;
}

export const teamMembers: MembroTime[] = [
  { id: "raul",     name: "Raul Sena",           role: "Fundador e CEO",         bio: "Fundou a AUVP com a missão de democratizar os investimentos no Brasil." },
  { id: "beatriz",  name: "Beatriz Henriques",    role: "Diretora de Produto",    bio: "Lidera a estratégia de produto e a visão de longo prazo da plataforma." },
  { id: "lilian",   name: "Lilian Araújo",        role: "Especialista em CX",     bio: "Cuida da jornada, da retenção e da fidelização dos membros de ponta a ponta." },
  { id: "daniel",   name: "Daniel Machado",       role: "Coordenador de Produto", bio: "Coordena sprints e a entrega contínua de valor ao usuário final." },
  { id: "debora",   name: "Debora Sanders",       role: "Analista de CX",         bio: "Garante a melhor experiência possível para cada cliente AUVP." },
  { id: "ariadne",  name: "Ariadne Carneiro",     role: "Gerente de Produto",     bio: "Conduz discovery, roadmap e priorização das iniciativas do produto." },
  { id: "armando",  name: "Armando Neto",         role: "Designer de Produto",    bio: "Cria interfaces funcionais e refinadas para a plataforma." },
  { id: "eria",     name: "Éria Alencar",         role: "Designer de Produto",    bio: "Cuida de identidade visual, marca e componentes do design system." },
  { id: "mateus",   name: "Mateus Graff",         role: "Redator",                bio: "Define o tom e a voz da AUVP em todos os canais e produtos." },
  { id: "jeniffer", name: "Jeniffer Nascimento",  role: "Analista de Produto",    bio: "Analisa dados e métricas para embasar decisões de produto." },
  { id: "elane",    name: "Elane Rodrigues",      role: "Analista de Produto",    bio: "Conduz pesquisas com usuários e validação de hipóteses." },
  { id: "ana",      name: "Ana Beatriz Melo",     role: "Analista de Produto Jr. I", bio: "Apoia as iniciativas de produto e os processos internos do time." },
];
