// Dados dos Pre-Requisitos LEED v4.1 O+M - Existing Buildings
export const prerequisitesV41 = [
  {
    id: "lt-p1", codigo: "LTp1", titulo: "Desempenho de Transporte",
    categoria: "LT", categoriaNome: "Localização e Transporte", cor: "#2FA98C", icone: "bus",
    sobre: "Avalia como os ocupantes se deslocam, medindo as emissões de CO2e por viagem. Estimula meios de transporte de baixo carbono e reduz o uso de veiculos individuais.",
    requisitos: [
      "Realizar pesquisa de transporte com os ocupantes regulares do edificio",
      "Calcular a pontuação de desempenho de transporte via plataforma USGBC",
      "Obter pontuação mínima de 40/100"
    ],
    perguntas: [
      {
        id: "lt_p1_survey", tipo: "radio",
        pergunta: "Pesquisa de transporte foi ou será realizada com os ocupantes?",
        opções: [
          { valor: "sim", label: "Sim, realizada nos últimos 12 meses", pontos: 3 },
          { valor: "planejado", label: "Em planejamento para os proximos meses", pontos: 1 },
          { valor: "não", label: "Não foi realizada", pontos: 0 }
        ]
      },
      {
        id: "lt_p1_meios", tipo: "multiselect", minSelecionados: 1,
        pergunta: "Quais meios de transporte os ocupantes utilizam? (selecione todos)",
        opções: [
          { valor: "metro_trem", label: "Metro ou trem" },
          { valor: "ônibus", label: "Ônibus" },
          { valor: "bicicleta", label: "Bicicleta" },
          { valor: "caminhada", label: "A pe / caminhada" },
          { valor: "carona", label: "Carona (2+ pessoas)" },
          { valor: "ve_elétrico", label: "Veiculo elétrico ou hibrido" },
          { valor: "carro_solo", label: "Carro individual (combustão)" },
          { valor: "teletrabalho", label: "Teletrabalho parcial" }
        ]
      },
      {
        id: "lt_p1_iniciativas", tipo: "multiselect", minSelecionados: 0,
        pergunta: "O edificio oferece incentivos ou infraestrutura para transporte sustentavel?",
        opções: [
          { valor: "bicicletario", label: "Bicicletario / vestiarios" },
          { valor: "vaga_carona", label: "Vagas preferenciais para carona" },
          { valor: "subsidio", label: "Subsidio de transporte público" },
          { valor: "ev_charging", label: "Recarga para veiculos elétricos" },
          { valor: "home_office", label: "Política de home office" },
          { valor: "nenhum", label: "Nenhum no momento" }
        ]
      }
    ],
    documentos: [
      { id: "lt_doc1", nome: "Relatorio de pesquisa de transporte (USGBC)" },
      { id: "lt_doc2", nome: "Pontuação de desempenho de transporte calculada" },
      { id: "lt_doc3", nome: "Descricao dos meios de transporte disponíveis" }
    ],
    observacaoPlaceholder: "Ex: O edificio possui 3 linhas de metro nas proximidades. Planejamos instalar bicicletario em 2025..."
  },
  {
    id: "we-p1", codigo: "WEp1", titulo: "Desempenho Hídrico",
    categoria: "WE", categoriaNome: "Eficiência Hídrica", cor: "#2CC295", icone: "droplet",
    sobre: "Mede e avalia o consumo total de água potável do edificio durante 12 meses, calculando uma pontuação de desempenho hídrico. Pontuação mínima de 40/100 exigida.",
    requisitos: [
      "Ter medidores de água permanentes instalados",
      "Medir consumo de água potável mensalmente por 12 meses",
      "Calcular pontuação de desempenho hídrico e obter mínimo de 40/100"
    ],
    perguntas: [
      {
        id: "we_p1_medidores", tipo: "radio",
        pergunta: "O edificio possui medidores de água permanentes instalados?",
        opções: [
          { valor: "sim_total", label: "Sim, medidor de consumo total do edificio", pontos: 3 },
          { valor: "sim_parcial", label: "Parcialmente (apenas algumas areas)", pontos: 1 },
          { valor: "não", label: "Não possui medidores", pontos: 0 }
        ]
      },
      {
        id: "we_p1_dados", tipo: "radio",
        pergunta: "Dados de consumo de água dos últimos 12 meses estão disponíveis?",
        opções: [
          { valor: "sim", label: "Sim, 12 meses completos de contas/relatorios", pontos: 3 },
          { valor: "parcial", label: "Parcialmente (menos de 12 meses)", pontos: 1 },
          { valor: "não", label: "Não estão disponíveis", pontos: 0 }
        ]
      },
      {
        id: "we_p1_rateio", tipo: "radio",
        pergunta: "Como o consumo de água e medido / cobrado?",
        opções: [
          { valor: "individual", label: "Medição individual por unidade/tenant" },
          { valor: "rateio", label: "Rateio centralizado por area ou ocupantes" },
          { valor: "misto", label: "Misto (parte individual, parte rateio)" },
          { valor: "nao_sei", label: "Não sei informar" }
        ]
      }
    ],
    documentos: [
      { id: "we_doc1", nome: "Contas de água (12 meses consecutivos)" },
      { id: "we_doc2", nome: "Pontuação de desempenho hídrico calculada" },
      { id: "we_doc3", nome: "Descricao dos sistemas de medição de água" }
    ],
    observacaoPlaceholder: "Ex: Temos hidrometro central. Consumo medio mensal de 1.200m3..."
  },
  {
    id: "ea-p1", codigo: "EAp1", titulo: "Melhores Práticas de Gestão de Eficiência Energética",
    categoria: "EA", categoriaNome: "Energia e Atmosfera", cor: "#F5A623", icone: "zap",
    sobre: "Exige auditoria energética ASHRAE Nível 1 e a manutenção de um Plano CFR e Plano O+M atualizados, incluindo PMOC vigente para os sistemas de climatização.",
    requisitos: [
      "Realizar auditoria energética ASHRAE Nível 1 (ou equivalente EN 16247-2)",
      "Elaborar e manter CFR e Plano O+M atualizados",
      "PMOC vigente para sistemas de HVAC"
    ],
    perguntas: [
      {
        id: "ea_p1_auditoria", tipo: "radio",
        pergunta: "Foi realizada auditoria energética do edificio?",
        opções: [
          { valor: "ashrae1", label: "Sim - Auditoria ASHRAE Nível 1 (ou equivalente)", pontos: 3 },
          { valor: "básica", label: "Sim - Levantamento básico/informal", pontos: 1 },
          { valor: "não", label: "Não foi realizada auditoria", pontos: 0 }
        ]
      },
      {
        id: "ea_p1_cfr_om", tipo: "radio",
        pergunta: "O edificio possui CFR e Plano O+M elaborados e atualizados?",
        opções: [
          { valor: "sim_atualizados", label: "Sim, ambos elaborados e atualizados", pontos: 3 },
          { valor: "parcial", label: "Parcialmente elaborados ou desatualizados", pontos: 1 },
          { valor: "não", label: "Não possui nenhum dos dois", pontos: 0 }
        ]
      },
      {
        id: "ea_p1_pmoc", tipo: "radio",
        pergunta: "Existe PMOC vigente para os sistemas de HVAC?",
        opções: [
          { valor: "sim_vigente", label: "Sim, PMOC vigente e sendo seguido", pontos: 3 },
          { valor: "sim_desatualizado", label: "Existe mas desatualizado", pontos: 1 },
          { valor: "não", label: "Não existe PMOC", pontos: 0 }
        ]
      },
      {
        id: "ea_p1_conteudo", tipo: "multiselect", minSelecionados: 0,
        pergunta: "Quais itens estão documentados no CFR/Plano O+M?",
        opções: [
          { valor: "seq_op", label: "Sequência de operações dos sistemas" },
          { valor: "cronograma", label: "Cronograma de ocupação" },
          { valor: "runtime", label: "Horarios de operação dos equipamentos" },
          { valor: "setpoints_hvac", label: "Setpoints de HVAC" },
          { valor: "setpoints_luz", label: "Setpoints de iluminação" },
          { valor: "pm_plano", label: "Plano de manutenção preventiva" },
          { valor: "narrativa", label: "Narrativa dos sistemas mecânicos/elétricos" }
        ]
      }
    ],
    documentos: [
      { id: "ea_p1_doc1", nome: "PMOC - Plano de Manutenção, Operação e Controle" },
      { id: "ea_p1_doc2", nome: "CFR - Current Facility Requirements" },
      { id: "ea_p1_doc3", nome: "Plano O+M (Operação e Manutenção)" },
      { id: "ea_p1_doc4", nome: "Relatorio de Auditoria Energética (ASHRAE Nível 1)" }
    ],
    observacaoPlaceholder: "Ex: Temos PMOC elaborado em 2022. O CFR está sendo atualizado..."
  },
  {
    id: "ea-p2", codigo: "EAp2", titulo: "Gestão Fundamental de Refrigerantes",
    categoria: "EA", categoriaNome: "Energia e Atmosfera", cor: "#F5A623", icone: "thermometer",
    sobre: "Proibe refrigerantes CFC nos sistemas de HVAC ou exige plano de substituição. Visa reduzir destruicao da camada de ozônio e potencial de aquecimento global (GWP).",
    requisitos: [
      "Não utilizar refrigerantes CFC em equipamentos novos",
      "Para CFC existentes: laudo de inviabilidade econômica ou plano de substituição em até 10 anos",
      "Manter taxa anual de vazamento abaixo de 5%"
    ],
    perguntas: [
      {
        id: "ea_p2_cfc", tipo: "radio",
        pergunta: "Os equipamentos de HVAC/refrigeração utilizam refrigerantes CFC?",
        opções: [
          { valor: "não", label: "Não (R-22 substituido ou nunca utilizou CFC)", pontos: 3 },
          { valor: "sim_plano", label: "Sim, com plano de substituição em andamento", pontos: 2 },
          { valor: "sim_sem_plano", label: "Sim, sem plano de substituição formal", pontos: 0 }
        ]
      },
      {
        id: "ea_p2_vazamento", tipo: "radio",
        pergunta: "A taxa anual de vazamento de refrigerantes e monitorada?",
        opções: [
          { valor: "sim_ok", label: "Sim, está abaixo de 5% ao ano", pontos: 3 },
          { valor: "sim_alto", label: "Sim, mas acima de 5% ao ano", pontos: 1 },
          { valor: "não", label: "Não e monitorada", pontos: 0 }
        ]
      },
      {
        id: "ea_p2_inventario", tipo: "radio",
        pergunta: "Existe inventario dos refrigerantes utilizados no edificio?",
        opções: [
          { valor: "sim", label: "Sim, inventario completo (tipo e carga de cada equipamento)", pontos: 3 },
          { valor: "parcial", label: "Parcialmente documentado", pontos: 1 },
          { valor: "não", label: "Não existe inventario", pontos: 0 }
        ]
      }
    ],
    documentos: [
      { id: "ea_p2_doc1", nome: "Inventario de Refrigerantes" },
      { id: "ea_p2_doc2", nome: "Calculadora de Gestão de Refrigerantes" },
      { id: "ea_p2_doc3", nome: "Plano de substituição de CFC (se aplicavel)" }
    ],
    observacaoPlaceholder: "Ex: Edificio possui 12 fan-coils com R-410A. Chillers substituidos em 2020 usam R-134a..."
  },
  {
    id: "ea-p3", codigo: "EAp3", titulo: "Desempenho Energético",
    categoria: "EA", categoriaNome: "Energia e Atmosfera", cor: "#F5A623", icone: "trending-up",
    sobre: "Mede e avalia o desempenho energético real por pontuação composta (emissões GEE + energia de fonte). Exige medição de 12 meses e pontuação mínima de 40/100.",
    requisitos: [
      "Ter medidores de energia permanentes por fonte",
      "Medir consumo energético mensalmente por 12 meses",
      "Calcular pontuação de desempenho energético",
      "Obter pontuação mínima de 40/100"
    ],
    perguntas: [
      {
        id: "ea_p3_medidores", tipo: "radio",
        pergunta: "O edificio possui medidores de energia permanentes por fonte?",
        opções: [
          { valor: "sim", label: "Sim, todas as fontes de energia são medidas", pontos: 3 },
          { valor: "parcial", label: "Parcialmente (apenas eletricidade, por exemplo)", pontos: 1 },
          { valor: "não", label: "Não possui medição própria", pontos: 0 }
        ]
      },
      {
        id: "ea_p3_dados", tipo: "radio",
        pergunta: "Dados de consumo energético dos últimos 12 meses estão disponíveis?",
        opções: [
          { valor: "sim", label: "Sim, 12 meses completos por fonte", pontos: 3 },
          { valor: "parcial", label: "Parcialmente disponível", pontos: 1 },
          { valor: "não", label: "Não estão disponíveis", pontos: 0 }
        ]
      },
      {
        id: "ea_p3_energy_star", tipo: "radio",
        pergunta: "A pontuação ENERGY STAR já foi calculada para o edificio?",
        opções: [
          { valor: "sim_boa", label: "Sim, pontuação acima de 40", pontos: 3 },
          { valor: "sim_baixa", label: "Sim, pontuação abaixo de 40", pontos: 1 },
          { valor: "não", label: "Não foi calculada", pontos: 0 }
        ]
      },
      {
        id: "ea_p3_medição_tipo", tipo: "radio",
        pergunta: "Como o consumo de energia e medido?",
        opções: [
          { valor: "individual", label: "Medição individual por unidade/tenant" },
          { valor: "rateio", label: "Centralizado com rateio" },
          { valor: "misto", label: "Misto" },
          { valor: "nao_sei", label: "Não sei informar" }
        ]
      }
    ],
    documentos: [
      { id: "ea_p3_doc1", nome: "Contas de energia por fonte (12 meses consecutivos)" },
      { id: "ea_p3_doc2", nome: "Pontuação de desempenho energético calculada" },
      { id: "ea_p3_doc3", nome: "Relatorio ENERGY STAR Portfolio Manager (se disponível)" }
    ],
    observacaoPlaceholder: "Ex: Consumo elétrico total aprox. 2.500 MWh/ano. Não utilizamos gas natural..."
  },
  {
    id: "mr-p1", codigo: "MRp1", titulo: "Política de Compras",
    categoria: "MR", categoriaNome: "Materiais e Recursos", cor: "#9B59B6", icone: "shopping-bag",
    sobre: "Exige política formal de compras ambientalmente preferencial (EPP) para produtos adquiridos durante a operação: consumiveis, eletrônicos, alimentos e materiais de manutenção.",
    requisitos: [
      "Ter política de compras sustentaveis formalmente documentada",
      "Cobrir consumiveis regulares, equipamentos eletrônicos e alimentos/bebidas",
      "Política dentro do controle do gestor predial"
    ],
    perguntas: [
      {
        id: "mr_p1_política", tipo: "radio",
        pergunta: "Existe uma Política de Compras sustentaveis formalmente documentada?",
        opções: [
          { valor: "sim_formal", label: "Sim, política formal aprovada e implementada", pontos: 3 },
          { valor: "em_elaboração", label: "Em elaboração", pontos: 1 },
          { valor: "não", label: "Não existe política formal", pontos: 0 }
        ]
      },
      {
        id: "mr_p1_cobertura", tipo: "multiselect", minSelecionados: 0,
        pergunta: "A política de compras abrange quais categorias?",
        opções: [
          { valor: "consumiveis", label: "Consumiveis regulares (papel, toner, descartaveis)" },
          { valor: "eletrônicos", label: "Equipamentos eletrônicos e lâmpadas" },
          { valor: "alimentos", label: "Alimentos e bebidas" },
          { valor: "limpeza", label: "Produtos de limpeza" },
          { valor: "materiais", label: "Materiais de construcao/manutenção" },
          { valor: "moveis", label: "Moveis e mobiliario" }
        ]
      }
    ],
    documentos: [
      { id: "mr_p1_doc1", nome: "Política de Compras Sustentaveis (EPP)" }
    ],
    observacaoPlaceholder: "Ex: Temos política que exige certificações para produtos de limpeza mas ainda não cobre eletrônicos..."
  },
  {
    id: "mr-p2", codigo: "MRp2", titulo: "Política de Manutenção e Reformas",
    categoria: "MR", categoriaNome: "Materiais e Recursos", cor: "#9B59B6", icone: "tool",
    sobre: "Exige política formal com diretrizes para atividades de manutenção e reforma: compras sustentaveis, gestão de resíduos e qualidade do ar interno durante obras.",
    requisitos: [
      "Ter política de manutenção e reforma documentada",
      "Cobrir compras, gestão de resíduos e QAI durante obras",
      "Separar resíduos de reforma dos resíduos regulares"
    ],
    perguntas: [
      {
        id: "mr_p2_política", tipo: "radio",
        pergunta: "Existe Política de Manutenção e Reformas formalmente documentada?",
        opções: [
          { valor: "sim_formal", label: "Sim, política formal aprovada e implementada", pontos: 3 },
          { valor: "em_elaboração", label: "Em elaboração", pontos: 1 },
          { valor: "não", label: "Não existe política formal", pontos: 0 }
        ]
      },
      {
        id: "mr_p2_cobertura", tipo: "multiselect", minSelecionados: 0,
        pergunta: "A política de manutenção e reformas abrange:",
        opções: [
          { valor: "compras", label: "Criterios de compras sustentaveis" },
          { valor: "resíduos_reforma", label: "Gestão e desvio de resíduos de reforma" },
          { valor: "separação", label: "Separação de resíduos de reforma dos regulares" },
          { valor: "qai_obras", label: "Qualidade do ar interno durante obras (IAQ)" },
          { valor: "moveis", label: "Descarte de moveis e equipamentos" }
        ]
      }
    ],
    documentos: [
      { id: "mr_p2_doc1", nome: "Política de Manutenção e Reformas" }
    ],
    observacaoPlaceholder: "Ex: Temos procedimento interno para obras mas sem política formal documentada..."
  },
  {
    id: "mr-p3", codigo: "MRp3", titulo: "Desempenho de Resíduos",
    categoria: "MR", categoriaNome: "Materiais e Recursos", cor: "#9B59B6", icone: "trash-2",
    sobre: "Mede geração e desvio de resíduos sólidos em 12 meses, calculando pontuação de desempenho. Pontuação mínima de 40/100 exigida para compliance.",
    requisitos: [
      "Ter areas de armazenamento de reciclaveis (papel, plástico, vidro, metal, papelão)",
      "Descarte seguro de baterias e lâmpadas",
      "Rastrear peso total de resíduos gerados e desviados por 12 meses",
      "Obter pontuação mínima de 40/100"
    ],
    perguntas: [
      {
        id: "mr_p3_areas", tipo: "radio",
        pergunta: "O edificio possui areas de armazenamento para reciclaveis?",
        opções: [
          { valor: "sim_completo", label: "Sim, para papel, plástico, vidro, metal e papelão", pontos: 3 },
          { valor: "parcial", label: "Parcialmente (apenas alguns materiais)", pontos: 1 },
          { valor: "não", label: "Não possui areas de reciclagem", pontos: 0 }
        ]
      },
      {
        id: "mr_p3_lâmpadas", tipo: "radio",
        pergunta: "Lâmpadas e baterias são descartadas de forma adequada (logística reversa)?",
        opções: [
          { valor: "sim", label: "Sim, com destinacao adequada", pontos: 3 },
          { valor: "parcial", label: "Parcialmente (apenas um dos tipos)", pontos: 1 },
          { valor: "não", label: "Não há procedimento específico", pontos: 0 }
        ]
      },
      {
        id: "mr_p3_rastreamento", tipo: "radio",
        pergunta: "Os resíduos são rastreados e pesados periódicamente?",
        opções: [
          { valor: "sim_peso", label: "Sim, rastreados em peso por 12 meses", pontos: 3 },
          { valor: "estimado", label: "Estimado por volume (sem pesagem real)", pontos: 1 },
          { valor: "não", label: "Não há rastreamento sistemático", pontos: 0 }
        ]
      }
    ],
    documentos: [
      { id: "mr_p3_doc1", nome: "Relatorio de Resíduos (12 meses - peso gerado e desviado)" },
      { id: "mr_p3_doc2", nome: "Pontuação de desempenho de resíduos calculada" }
    ],
    observacaoPlaceholder: "Ex: Coleta seletiva terceirizada. Relatorio mensal emitido pela empresa de limpeza..."
  },
  {
    id: "eq-p1", codigo: "EQp1", titulo: "Qualidade Mínima do Ar Interno",
    categoria: "EQ", categoriaNome: "Qualidade Ambiental Interna", cor: "#3498DB", icone: "wind",
    sobre: "Estabelece padrões mínimos de ventilacao baseados na ASHRAE 62.1. Exige manutenção dos sistemas e medição periódica das vazoes de ar externo por AHU.",
    requisitos: [
      "Manter sistemas de ventilacao conforme ASHRAE 62.1-2016, Tabela 8.2",
      "Medir quantidade de ar externo por sistema de ventilacao",
      "Garantir vazoes dentro de 10% das exigidas pela norma"
    ],
    perguntas: [
      {
        id: "eq_p1_manutenção", tipo: "radio",
        pergunta: "Os sistemas de ventilacao são mantidos conforme ASHRAE 62.1 / PMOC?",
        opções: [
          { valor: "sim", label: "Sim, manutenção conforme norma e PMOC vigente", pontos: 3 },
          { valor: "parcial", label: "Parcialmente - algumas manutencoes em atraso", pontos: 1 },
          { valor: "não", label: "Não há plano de manutenção estruturado", pontos: 0 }
        ]
      },
      {
        id: "eq_p1_medição", tipo: "radio",
        pergunta: "Medições de vazão de ar externo foram realizadas nos últimos 5 anos?",
        opções: [
          { valor: "sim_conforme", label: "Sim, dentro dos últimos 5 anos e conforme norma", pontos: 3 },
          { valor: "sim_fora", label: "Sim, mas fora da conformidade", pontos: 1 },
          { valor: "não", label: "Não foram realizadas medições", pontos: 0 }
        ]
      },
      {
        id: "eq_p1_filtros", tipo: "radio",
        pergunta: "Qual e a eficiência dos filtros de ar nos sistemas de ventilacao?",
        opções: [
          { valor: "merv13", label: "MERV 13 ou superior" },
          { valor: "merv8_12", label: "MERV 8 a 12" },
          { valor: "abaixo8", label: "MERV abaixo de 8" },
          { valor: "nao_sei", label: "Não sei informar" }
        ]
      }
    ],
    documentos: [
      { id: "eq_p1_doc1", nome: "PMOC - Plano de Manutenção, Operação e Controle (HVAC)" },
      { id: "eq_p1_doc2", nome: "Relatorio de medição de vazão de ar externo" }
    ],
    observacaoPlaceholder: "Ex: Sistema de climatização revisado em 2023. Medições de ar externo realizadas pela empresa X..."
  },
  {
    id: "eq-p2", codigo: "EQp2", titulo: "Controle de Fumaca de Tabaco",
    categoria: "EQ", categoriaNome: "Qualidade Ambiental Interna", cor: "#3498DB", icone: "slash",
    sobre: "Proibe o fumo no interior e restringe areas de fumantes externas a pelo menos 7,5m de entradas, janelas operaveis e captações de ar externo.",
    requisitos: [
      "Proibir o fumo dentro do edificio",
      "Areas de fumantes a mínimo de 7,5m de entradas e captações de ar",
      "Comúnicar política de não fumar a todos os ocupantes"
    ],
    perguntas: [
      {
        id: "eq_p2_interno", tipo: "radio",
        pergunta: "O fumo e proibido em todo o interior do edificio?",
        opções: [
          { valor: "sim", label: "Sim, proibição total com política formal", pontos: 3 },
          { valor: "parcial", label: "Parcialmente (algumas areas ainda permitem)", pontos: 0 },
          { valor: "não", label: "Não há restrição formal", pontos: 0 }
        ]
      },
      {
        id: "eq_p2_externo", tipo: "radio",
        pergunta: "Area de fumantes externa (se houver) está a pelo menos 7,5m de entradas e captações?",
        opções: [
          { valor: "sim", label: "Sim, area adequadamente afastada", pontos: 3 },
          { valor: "nao_ha", label: "Não há area de fumantes no local", pontos: 3 },
          { valor: "não", label: "Area proxima de entradas ou captações de ar", pontos: 0 }
        ]
      },
      {
        id: "eq_p2_comúnicação", tipo: "radio",
        pergunta: "A política de não fumar e comúnicada e fiscalizada?",
        opções: [
          { valor: "sim", label: "Sim, comúnicada por escrito e com sinalização", pontos: 3 },
          { valor: "parcial", label: "Parcialmente comúnicada", pontos: 1 },
          { valor: "não", label: "Não há comúnicação formal", pontos: 0 }
        ]
      }
    ],
    documentos: [
      { id: "eq_p2_doc1", nome: "Política de Não Fumar (No Smoking Policy)" },
      { id: "eq_p2_doc2", nome: "Evidências de sinalização no edificio" }
    ],
    observacaoPlaceholder: "Ex: Política de não fumar desde 2018. Area de fumantes na saida lateral a 10m da entrada..."
  },
  {
    id: "eq-p3", codigo: "EQp3", titulo: "Política de Limpeza Verde",
    categoria: "EQ", categoriaNome: "Qualidade Ambiental Interna", cor: "#3498DB", icone: "star",
    sobre: "Exige práticas de limpeza verde com política formal cobrindo produtos certificados, equipamentos, procedimentos operacionais e treinamento da equipe de limpeza.",
    requisitos: [
      "Política de limpeza verde documentada (in-house ou servico certificado)",
      "Cobrir produtos, equipamentos, procedimentos e treinamento",
      "Usar produtos com certificações ambientais (Green Seal, EcoLogo, etc.)"
    ],
    perguntas: [
      {
        id: "eq_p3_política", tipo: "radio",
        pergunta: "O edificio possui política ou práticas de Limpeza Verde documentadas?",
        opções: [
          { valor: "sim_inhouse", label: "Sim - política interna própria documentada", pontos: 3 },
          { valor: "sim_cert", label: "Sim - empresa certificada (Green Seal GS-42 ou CIMS-GB)", pontos: 3 },
          { valor: "em_elaboração", label: "Em elaboração", pontos: 1 },
          { valor: "não", label: "Não existe política", pontos: 0 }
        ]
      },
      {
        id: "eq_p3_cobertura", tipo: "multiselect", minSelecionados: 0,
        pergunta: "A política de limpeza verde cobre:",
        opções: [
          { valor: "produtos", label: "Criterios para produtos de limpeza certificados" },
          { valor: "equipamentos", label: "Equipamentos de limpeza de baixo impacto" },
          { valor: "procedimentos", label: "Procedimentos operacionais de limpeza" },
          { valor: "treinamento", label: "Treinamento da equipe de limpeza" },
          { valor: "seguranca", label: "Seguranca química e descarte de produtos" }
        ]
      }
    ],
    documentos: [
      { id: "eq_p3_doc1", nome: "Política de Limpeza Verde" },
      { id: "eq_p3_doc2", nome: "Lista de produtos de limpeza com certificações" }
    ],
    observacaoPlaceholder: "Ex: Limpeza terceirizada pela empresa X usando produtos certificados Green Seal..."
  },
  {
    id: "eq-p4", codigo: "EQp4", titulo: "Desempenho de Qualidade Ambiental Interna",
    categoria: "EQ", categoriaNome: "Qualidade Ambiental Interna", cor: "#3498DB", icone: "activity",
    sobre: "Avalia a experiência dos ocupantes via pesquisa de satisfacao e medição de qualidade do ar (CO2 e TVOC). Pontuação de experiência humana mínima de 40/100 exigida.",
    requisitos: [
      "Pesquisa de satisfacao dos ocupantes anualmente",
      "Avaliação de qualidade do ar: medição de CO2 e/ou TVOC",
      "Pontuação de experiência humana mínima de 40/100",
      "Medições na zona de respiracao durante horas ocupadas"
    ],
    perguntas: [
      {
        id: "eq_p4_pesquisa", tipo: "radio",
        pergunta: "Pesquisa de satisfacao dos ocupantes foi ou será realizada?",
        opções: [
          { valor: "sim", label: "Sim, realizada nos últimos 12 meses", pontos: 3 },
          { valor: "planejado", label: "Em planejamento", pontos: 1 },
          { valor: "não", label: "Não foi realizada", pontos: 0 }
        ]
      },
      {
        id: "eq_p4_co2", tipo: "radio",
        pergunta: "Medições de CO2 nos espaços ocupados foram realizadas?",
        opções: [
          { valor: "sim_ok", label: "Sim (resultado abaixo de 1.000 ppm)", pontos: 3 },
          { valor: "sim_alto", label: "Sim, mas acima de 1.000 ppm em alguns espaços", pontos: 1 },
          { valor: "planejado", label: "Em planejamento", pontos: 1 },
          { valor: "não", label: "Não foram realizadas", pontos: 0 }
        ]
      },
      {
        id: "eq_p4_tvoc", tipo: "radio",
        pergunta: "Medições de TVOC foram realizadas?",
        opções: [
          { valor: "sim_ok", label: "Sim (resultado abaixo de 500 ug/m3)", pontos: 3 },
          { valor: "sim_alto", label: "Sim, mas acima de 500 ug/m3", pontos: 1 },
          { valor: "planejado", label: "Em planejamento", pontos: 1 },
          { valor: "não", label: "Não foram realizadas", pontos: 0 }
        ]
      }
    ],
    documentos: [
      { id: "eq_p4_doc1", nome: "Relatorio de pesquisa de satisfacao dos ocupantes" },
      { id: "eq_p4_doc2", nome: "Relatorio de medição de CO2 (ppm por espaço)" },
      { id: "eq_p4_doc3", nome: "Relatorio de medição de TVOC (ug/m3 por espaço)" }
    ],
    observacaoPlaceholder: "Ex: Medição de CO2 em 2023 com sensor portatil. Resultado medio 850 ppm. TVOC ainda não medido..."
  }
];

export default prerequisitesV41;
