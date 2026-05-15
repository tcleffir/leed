// Dados dos Pre-Requisitos LEED v5 O+M - Existing Buildings
export const prerequisitesV5 = [
  {
    id: "ip-p1", codigo: "IPp1", titulo: "Avaliação de Resiliência Climatica",
    categoria: "IP", categoriaNome: "Processo Integrativo, Planejamento e Avaliações", cor: "#2FA98C", icone: "cloud-lightning",
    sobre: "Identifica e documenta os principais riscos climáticos atuais e futuros que podem afetar o edificio, avalia impactos nos sistemas críticos e define ações para reduzir vulnerabilidades.",
    requisitos: [
      "Identificar e documentar pelo menos 2 riscos climáticos prioritarios",
      "Avaliar impactos potenciais nos sistemas críticos do edificio (energia, HVAC, água, TI, seguranca)",
      "Documentar ações e planos para reduzir impacto e tempo de recuperacao",
      "Usar o Template de Avaliação de Resiliência Climatica da USGBC (ou equivalente)"
    ],
    perguntas: [
      {
        id: "ip_p1_riscos", tipo: "multiselect", minSelecionados: 2,
        pergunta: "Riscos climáticos identificados para o edificio (selecione ao menos 2)",
        opções: [
          { valor: "calor_extremo", label: "Ondas de calor / calor extremo" },
          { valor: "chuvas_intensas", label: "Chuvas intensas / alagamentos" },
          { valor: "secas", label: "Secas prolongadas" },
          { valor: "falta_energia", label: "Falhas no fornecimento de energia elétrica" },
          { valor: "aumento_temp", label: "Aumento de temperatura media" },
          { valor: "tempestades", label: "Eventos extremos (tempestades, ventos fortes)" },
          { valor: "enchentes", label: "Enchentes / elevacao do nível da água" },
          { valor: "outro", label: "Outro (descrever nas observações)" }
        ]
      },
      {
        id: "ip_p1_sistemas", tipo: "multiselect", minSelecionados: 0,
        pergunta: "Sistemas críticos com impacto avaliado para os riscos identificados:",
        opções: [
          { valor: "energia", label: "Fornecimento e geração de energia" },
          { valor: "hvac", label: "Sistema de climatização (HVAC)" },
          { valor: "água", label: "Abastecimento de água e esgoto" },
          { valor: "elevadores", label: "Elevadores e transporte vertical" },
          { valor: "ti_telecom", label: "TI e telecomúnicações" },
          { valor: "seguranca", label: "Sistemas de seguranca e CCTV" },
          { valor: "sprinkler", label: "Sistema de combate a incendio" }
        ]
      },
      {
        id: "ip_p1_ações", tipo: "radio",
        pergunta: "Existem ações ou planos documentados para redução dos impactos climáticos?",
        opções: [
          { valor: "sim_formal", label: "Sim, plano formalizado e documentado", pontos: 3 },
          { valor: "sim_parcial", label: "Parcialmente documentado / em elaboração", pontos: 1 },
          { valor: "não", label: "Não existem ações documentadas", pontos: 0 }
        ]
      }
    ],
    documentos: [
      { id: "ip_p1_doc1", nome: "Template de Avaliação de Resiliência Climatica (USGBC ou equivalente)" },
      { id: "ip_p1_doc2", nome: "Plano de Resiliência / Gestão de Riscos Climáticos" }
    ],
    observacaoPlaceholder: "Ex: Os principais riscos identificados são ondas de calor e falta de energia. Temos gerador de emergencia para sistemas críticos..."
  },
  {
    id: "ip-p2", codigo: "IPp2", titulo: "Avaliação de Impacto Humano",
    categoria: "IP", categoriaNome: "Processo Integrativo, Planejamento e Avaliações", cor: "#2FA98C", icone: "users",
    sobre: "Garante que o projeto seja guiado por compreensao do contexto social da comunidade local, forca de trabalho e cadeia de suprimentos, abordando iniquidades sociais nas operações do edificio.",
    requisitos: [
      "Realizar levantamento do local e avaliação de impacto humano",
      "Abordar: demograficos, infraestrutura local, saúde humana, experiência dos ocupantes e condições de trabalho",
      "Usar o Template de Avaliação de Impacto Humano da USGBC (ou equivalente)"
    ],
    perguntas: [
      {
        id: "ip_p2_avaliação", tipo: "radio",
        pergunta: "Foi realizada uma Avaliação de Impacto Humano para o edificio?",
        opções: [
          { valor: "sim", label: "Sim, avaliação completa realizada e documentada", pontos: 3 },
          { valor: "parcial", label: "Parcialmente realizada / em elaboração", pontos: 1 },
          { valor: "não", label: "Não foi realizada", pontos: 0 }
        ]
      },
      {
        id: "ip_p2_cobertura", tipo: "multiselect", minSelecionados: 0,
        pergunta: "A avaliação aborda quais dimensoes? (selecione as existentes)",
        opções: [
          { valor: "demograficos", label: "Dados demograficos da comunidade local" },
          { valor: "infraestrutura", label: "Infraestrutura local e uso do solo" },
          { valor: "saúde_humana", label: "Saúde humana e servicos sociais" },
          { valor: "exp_ocupantes", label: "Experiência dos ocupantes (conforto, acessibilidade)" },
          { valor: "condições_trabalho", label: "Condições de trabalho de funcionarios de baixa renda" }
        ]
      }
    ],
    documentos: [
      { id: "ip_p2_doc1", nome: "Template de Avaliação de Impacto Humano (USGBC ou equivalente)" }
    ],
    observacaoPlaceholder: "Ex: O edificio está localizado em regiao com alta densidade populacional. Temos programa de acessibilidade implementado..."
  },
  {
    id: "ip-p3", codigo: "IPp3", titulo: "Avaliação e Política de Operações",
    categoria: "IP", categoriaNome: "Processo Integrativo, Planejamento e Avaliações", cor: "#2FA98C", icone: "clipboard",
    sobre: "Apoia operações sustentaveis e de alto desempenho. Exige avaliação das práticas operacionais atuais e elaboração de política de operações sustentaveis que cubra os elementos operacionais principais.",
    requisitos: [
      "Avaliar as práticas operacionais existentes em cada area",
      "Criar e implementar política de operações sustentaveis",
      "A política deve cobrir: site, compras, obras, necessidades de ocupantes e limpeza verde",
      "Comúnicar a política ao gestor do edificio e a todos os ocupantes"
    ],
    perguntas: [
      {
        id: "ip_p3_avaliação", tipo: "radio",
        pergunta: "A avaliação das práticas operacionais atuais foi realizada?",
        opções: [
          { valor: "sim", label: "Sim, avaliação completa com baseline e metas definidas", pontos: 3 },
          { valor: "parcial", label: "Parcialmente realizada", pontos: 1 },
          { valor: "não", label: "Não foi realizada", pontos: 0 }
        ]
      },
      {
        id: "ip_p3_política", tipo: "radio",
        pergunta: "Existe Política de Operações Sustentaveis formalmente documentada e implementada?",
        opções: [
          { valor: "sim", label: "Sim, política formal implementada e comúnicada", pontos: 3 },
          { valor: "em_elaboração", label: "Em elaboração", pontos: 1 },
          { valor: "não", label: "Não existe política formal", pontos: 0 }
        ]
      },
      {
        id: "ip_p3_cobertura", tipo: "multiselect", minSelecionados: 0,
        pergunta: "A política de operações sustentaveis cobre quais elementos?",
        opções: [
          { valor: "operações_site", label: "Operações do site (manutenção, limpeza externa, irrigacao)" },
          { valor: "compras", label: "Práticas de compras sustentaveis" },
          { valor: "obras", label: "Construcoes e reformas (resíduos, QAI)" },
          { valor: "ocupantes", label: "Necessidades e experiência dos ocupantes" },
          { valor: "limpeza_verde", label: "Limpeza verde (produtos, procedimentos, treinamento)" }
        ]
      }
    ],
    documentos: [
      { id: "ip_p3_doc1", nome: "Avaliação de Operações (baseline e metas por elemento)" },
      { id: "ip_p3_doc2", nome: "Política de Operações Sustentaveis" }
    ],
    observacaoPlaceholder: "Ex: Realizamos avaliação interna em 2024. A política de operações está sendo elaborada e deve ser concluida até junho/2025..."
  },
  {
    id: "ip-p4", codigo: "IPp4", titulo: "Requisitos Atuais da Edificacao e Plano O+M",
    categoria: "IP", categoriaNome: "Processo Integrativo, Planejamento e Avaliações", cor: "#2FA98C", icone: "file-text",
    sobre: "Promove continuidade das informações para garantir que estratégias de operação eficientes sejam mantidas. Exige CFR e Plano O+M atualizados com todos os sistemas documentados.",
    requisitos: [
      "Manter CFR (Current Facilities Requirements) atualizado",
      "Manter Plano O+M com sequência de operações, setpoints e manutenção preventiva",
      "Incluir informações de ventilacao conforme ASHRAE 62.1-2022, Tabela 8-1",
      "Documentar todos os sistemas principais: HVAC, iluminação, sistemas elétricos"
    ],
    perguntas: [
      {
        id: "ip_p4_cfr_om", tipo: "radio",
        pergunta: "O edificio possui CFR e Plano O+M elaborados e atualizados?",
        opções: [
          { valor: "sim", label: "Sim, ambos atualizados e vigentes", pontos: 3 },
          { valor: "parcial", label: "Parcialmente elaborados ou desatualizados", pontos: 1 },
          { valor: "não", label: "Não possui", pontos: 0 }
        ]
      },
      {
        id: "ip_p4_conteudo", tipo: "multiselect", minSelecionados: 0,
        pergunta: "Quais itens estão documentados no CFR / Plano O+M?",
        opções: [
          { valor: "seq_op", label: "Sequência atual de operações do edificio" },
          { valor: "cronograma", label: "Cronograma de ocupação do projeto" },
          { valor: "runtime", label: "Horarios de operação dos equipamentos" },
          { valor: "setpoints_hvac", label: "Setpoints de todos os equipamentos de HVAC" },
          { valor: "setpoints_luz", label: "Setpoints de níveis de iluminação" },
          { valor: "ashrae_manutenção", label: "Manutenção de ventilacao conforme ASHRAE 62.1, Tabela 8-1" },
          { valor: "variações", label: "Variações sazonais e por dia/horario" },
          { valor: "narrativa", label: "Narrativa dos sistemas mecânicos e elétricos" },
          { valor: "manutenção_preventiva", label: "Plano de manutenção preventiva" }
        ]
      }
    ],
    documentos: [
      { id: "ip_p4_doc1", nome: "CFR - Current Facilities Requirements" },
      { id: "ip_p4_doc2", nome: "Plano O+M (Operação e Manutenção)" },
      { id: "ip_p4_doc3", nome: "PMOC - Plano de Manutenção, Operação e Controle" }
    ],
    observacaoPlaceholder: "Ex: O PMOC foi elaborado em 2023 pela empresa X. O CFR está em elaboração..."
  },
  {
    id: "we-p1-v5", codigo: "WEp1", titulo: "Medição e Reporte de Água",
    categoria: "WE", categoriaNome: "Eficiência Hídrica", cor: "#2CC295", icone: "droplet",
    sobre: "Conserva os recursos hídricos e apoia a gestão da água instalando medição permanente de todo o consumo de água potável e de fontes alternativas, com reporte anual a USGBC.",
    requisitos: [
      "Instalar (ou usar existentes) medidores de água permanentes para toda a água potável e alternativa",
      "Fontes alternativas de água devem ser medidas separadamente",
      "Medir e reportar consumo total por 12 meses",
      "Comprometer-se a compartilhar dados anuais com a USGBC após certificação"
    ],
    perguntas: [
      {
        id: "we_p1v5_medidores", tipo: "radio",
        pergunta: "Medidores de água permanentes estão instalados para todo o consumo do edificio?",
        opções: [
          { valor: "sim", label: "Sim, medição total do edificio e areas", pontos: 3 },
          { valor: "parcial", label: "Parcialmente (algumas areas sem medição)", pontos: 1 },
          { valor: "não", label: "Não possui medidores próprios", pontos: 0 }
        ]
      },
      {
        id: "we_p1v5_alternativa", tipo: "radio",
        pergunta: "Fontes alternativas de água (água pluvial, reuso, condensado) são utilizadas e medidas separadamente?",
        opções: [
          { valor: "sim", label: "Sim, utilizadas e medidas separadamente", pontos: 3 },
          { valor: "nao_usa", label: "Não utiliza fontes alternativas de água", pontos: 3 },
          { valor: "usa_nao_mede", label: "Usa, mas não mede separadamente", pontos: 0 }
        ]
      },
      {
        id: "we_p1v5_dados", tipo: "radio",
        pergunta: "Dados de consumo de água dos últimos 12 meses estão disponíveis?",
        opções: [
          { valor: "sim", label: "Sim, 12 meses completos disponíveis", pontos: 3 },
          { valor: "parcial", label: "Parcialmente disponível", pontos: 1 },
          { valor: "não", label: "Não estão disponíveis", pontos: 0 }
        ]
      },
      {
        id: "we_p1v5_rateio", tipo: "radio",
        pergunta: "Como o consumo de água e medido / cobrado nos tenants?",
        opções: [
          { valor: "individual", label: "Medição individual por unidade/tenant" },
          { valor: "rateio", label: "Rateio centralizado" },
          { valor: "misto", label: "Misto" },
          { valor: "nao_sei", label: "Não sei informar" }
        ]
      }
    ],
    documentos: [
      { id: "we_p1v5_doc1", nome: "Contas de água - todas as fontes (12 meses)" },
      { id: "we_p1v5_doc2", nome: "Evidencia de acesso ao dado pelo gestor/tenant" }
    ],
    observacaoPlaceholder: "Ex: Hidrometro central da concessionaria. Consumo medio mensal de 1.200m3. Não utilizamos fontes alternativas..."
  },
  {
    id: "ea-p1-v5", codigo: "EAp1", titulo: "Projecao de Carbono do Uso de Energia",
    categoria: "EA", categoriaNome: "Energia e Atmosfera", cor: "#F5A623", icone: "bar-chart-2",
    sobre: "Apoia o gerenciamento de emissões de carbono operacional do edificio, exigindo projecao do perfil de emissões de carbono e avaliação de conformidade com leis de desempenho de edificios (BPS).",
    requisitos: [
      "Calcular projecao de emissões de carbono operacional do edificio",
      "Para edificios sujeitos a BPS: calcular projecao de taxas/multas por 25 anos no cenario BAU",
      "O proprietario ou representante deve atestar ter revisado a projecao"
    ],
    perguntas: [
      {
        id: "ea_p1v5_projecao", tipo: "radio",
        pergunta: "Foi realizada projecao de emissões de carbono operacional do edificio?",
        opções: [
          { valor: "sim", label: "Sim, projecao calculada e documentada", pontos: 3 },
          { valor: "planejado", label: "Em planejamento", pontos: 1 },
          { valor: "não", label: "Não foi realizada", pontos: 0 }
        ]
      },
      {
        id: "ea_p1v5_bps", tipo: "radio",
        pergunta: "O edificio está sujeito a alguma lei de desempenho de edificios (Building Performance Standard)?",
        opções: [
          { valor: "sim", label: "Sim (ex: legislacao municipal ou estadual de eficiência)" },
          { valor: "não", label: "Não está sujeito a BPS" },
          { valor: "nao_sei", label: "Não sei informar" }
        ]
      },
      {
        id: "ea_p1v5_breakdown", tipo: "radio",
        pergunta: "Existe breakdown estimado de consumo por uso final (HVAC, iluminação, equipamentos)?",
        opções: [
          { valor: "sim", label: "Sim, breakdown disponível", pontos: 3 },
          { valor: "parcial", label: "Estimado parcialmente", pontos: 1 },
          { valor: "não", label: "Não existe breakdown", pontos: 0 }
        ]
      }
    ],
    documentos: [
      { id: "ea_p1v5_doc1", nome: "Relatorio de Projecao de Carbono Operacional" },
      { id: "ea_p1v5_doc2", nome: "Contas de energia por fonte (para cálculo)" }
    ],
    observacaoPlaceholder: "Ex: O edificio ainda não tem projecao de carbono calculada. Temos as contas de energia disponíveis..."
  },
  {
    id: "ea-p2-v5", codigo: "EAp2", titulo: "Monitoramento e Reporte de Energia",
    categoria: "EA", categoriaNome: "Energia e Atmosfera", cor: "#F5A623", icone: "zap",
    sobre: "Apoia práticas de gestão energética e identificação de oportunidades de redução de emissões por meio de monitoramento e reporte sistemático do consumo de energia por fonte.",
    requisitos: [
      "Ter medidores permanentes de energia para cada fonte (eletricidade, gas, água gelada, vapor, etc.)",
      "Calibrar medidores conforme recomendacao do fabricante",
      "Reportar dados mensais de consumo por fonte para periodo de 12 meses",
      "Comprometer-se ao reporte anual continuo após certificação"
    ],
    perguntas: [
      {
        id: "ea_p2v5_medidores", tipo: "radio",
        pergunta: "Medidores permanentes de energia estão instalados para cada fonte de energia?",
        opções: [
          { valor: "sim", label: "Sim, todas as fontes são medidas (eletricidade, gas, etc.)", pontos: 3 },
          { valor: "parcial", label: "Parcialmente (apenas algumas fontes)", pontos: 1 },
          { valor: "não", label: "Não possui medição própria", pontos: 0 }
        ]
      },
      {
        id: "ea_p2v5_dados", tipo: "radio",
        pergunta: "Dados mensais de consumo por fonte dos últimos 12 meses estão disponíveis?",
        opções: [
          { valor: "sim", label: "Sim, 12 meses completos por fonte de energia", pontos: 3 },
          { valor: "parcial", label: "Parcialmente disponível", pontos: 1 },
          { valor: "não", label: "Não estão disponíveis", pontos: 0 }
        ]
      },
      {
        id: "ea_p2v5_medição_tipo", tipo: "radio",
        pergunta: "Como o consumo de energia e medido e cobrado dos tenants?",
        opções: [
          { valor: "individual", label: "Medição individual por unidade/tenant" },
          { valor: "rateio", label: "Rateio centralizado por area ou ocupantes" },
          { valor: "misto", label: "Misto" },
          { valor: "nao_sei", label: "Não sei informar" }
        ]
      }
    ],
    documentos: [
      { id: "ea_p2v5_doc1", nome: "Contas de energia por fonte (12 meses mensais)" }
    ],
    observacaoPlaceholder: "Ex: Consumo elétrico medido pela concessionaria. Gas natural não utilizado. Geração solar de 200kWh/mes..."
  },
  {
    id: "ea-p3-v5", codigo: "EAp3", titulo: "Desempenho Mínimo de Energia",
    categoria: "EA", categoriaNome: "Energia e Atmosfera", cor: "#F5A623", icone: "award",
    sobre: "Promove resiliência e redução de emissões de GEE exigindo nível mínimo de eficiência energética. Para tipos de edificio com ENERGY STAR disponível, e necessaria pontuação mínima de 60.",
    requisitos: [
      "Para tipos elegiveis ao ENERGY STAR (EUA/Canada): atingir pontuação mínima de 60",
      "Para outros tipos: seguir metas de EUI por tipo de edificio e zona climatica (ASHRAE 100-2024)",
      "Para tipos sem dados de referencia: demonstrar redução de pelo menos 8% em relacao ao baseline histórico"
    ],
    perguntas: [
      {
        id: "ea_p3v5_path", tipo: "radio",
        pergunta: "Qual via de conformidade se aplica ao edificio?",
        opções: [
          { valor: "energy_star", label: "Opcao 1 - Pontuação ENERGY STAR (edificio elegivel)" },
          { valor: "eui", label: "Opcao 2 - Metas de EUI (Uso de Energia por Area)" },
          { valor: "baseline", label: "Opcao 3 - Redução em relacao ao baseline histórico" }
        ]
      },
      {
        id: "ea_p3v5_energy_star", tipo: "radio",
        pergunta: "Se aplicavel: qual e a pontuação ENERGY STAR atual do edificio?",
        opções: [
          { valor: "acima_60", label: "60 ou mais (atende ao prerequisito)", pontos: 3 },
          { valor: "40_59", label: "Entre 40 e 59 (abaixo do mínimo)", pontos: 1 },
          { valor: "abaixo_40", label: "Abaixo de 40 (crítico)", pontos: 0 },
          { valor: "nao_calculado", label: "Ainda não calculado", pontos: 0 }
        ]
      },
      {
        id: "ea_p3v5_benchmark", tipo: "radio",
        pergunta: "O edificio possui benchmark de desempenho energético (ESPM, GreenMind, etc.)?",
        opções: [
          { valor: "sim", label: "Sim, benchmarking realizado e monitorado", pontos: 3 },
          { valor: "em_andamento", label: "Em andamento / planejamento", pontos: 1 },
          { valor: "não", label: "Não possui benchmarking", pontos: 0 }
        ]
      }
    ],
    documentos: [
      { id: "ea_p3v5_doc1", nome: "Relatorio ENERGY STAR Portfolio Manager" },
      { id: "ea_p3v5_doc2", nome: "Contas de energia (12 meses para cálculo)" }
    ],
    observacaoPlaceholder: "Ex: O edificio e um escritorio comercial. Já temos conta no ENERGY STAR Portfolio Manager com pontuação 65..."
  },
  {
    id: "ea-p4-v5", codigo: "EAp4", titulo: "Gestão Fundamental de Refrigerantes",
    categoria: "EA", categoriaNome: "Energia e Atmosfera", cor: "#F5A623", icone: "thermometer",
    sobre: "Exige política de gestão de vazamento de refrigerantes, inventario completo de todos os equipamentos e rastreamento de recargas para limitar potencial de aquecimento global (GWP).",
    requisitos: [
      "Implementar política de gestão de vazamento de refrigerantes",
      "Realizar inventario completo de todos os equipamentos com refrigerante",
      "Rastrear recargas de refrigerante e relatar GWP total dos vazamentos",
      "A política deve abordar descarte adequado de equipamentos"
    ],
    perguntas: [
      {
        id: "ea_p4v5_política", tipo: "radio",
        pergunta: "Existe política de gestão de vazamento de refrigerantes?",
        opções: [
          { valor: "sim", label: "Sim, política formal implementada", pontos: 3 },
          { valor: "em_elaboração", label: "Em elaboração", pontos: 1 },
          { valor: "não", label: "Não existe política", pontos: 0 }
        ]
      },
      {
        id: "ea_p4v5_inventario", tipo: "radio",
        pergunta: "Foi realizado inventario completo dos refrigerantes no edificio?",
        opções: [
          { valor: "sim", label: "Sim, inventario completo com tipo, carga e GWP de cada equipamento", pontos: 3 },
          { valor: "parcial", label: "Parcialmente documentado", pontos: 1 },
          { valor: "não", label: "Não existe inventario", pontos: 0 }
        ]
      },
      {
        id: "ea_p4v5_gwp", tipo: "radio",
        pergunta: "Equipamentos HVAC com refrigerantes de alto GWP estão presentes?",
        opções: [
          { valor: "sim_plano", label: "Sim, com plano de substituição para baixo GWP", pontos: 2 },
          { valor: "sim_sem_plano", label: "Sim, sem plano de substituição", pontos: 0 },
          { valor: "não", label: "Não, todos equipamentos usam refrigerantes de baixo GWP", pontos: 3 }
        ]
      }
    ],
    documentos: [
      { id: "ea_p4v5_doc1", nome: "Política de Gestão de Refrigerantes" },
      { id: "ea_p4v5_doc2", nome: "Inventario de Refrigerantes (tipo, carga, GWP por equipamento)" }
    ],
    observacaoPlaceholder: "Ex: Chillers utilizam R-134a (GWP 1430). Plano de substituição para R-1234ze previsto para 2027..."
  },
  {
    id: "eq-p1-v5", codigo: "EQp1", titulo: "Verificação de Ventilacao e Filtracao",
    categoria: "EQ", categoriaNome: "Qualidade Ambiental Interna", cor: "#3498DB", icone: "wind",
    sobre: "Verifica a quantidade de ar externo entregue pelos sistemas de ventilacao em comparacao com as normas de QAI, investigando a qualidade do ar externo local e inspecionando sistemas de filtracao.",
    requisitos: [
      "Incluir manutenção de ventilacao conforme ASHRAE 62.1-2022, Tabela 8-1 no Plano O+M",
      "Investigar a qualidade do ar externo local e regional",
      "Medir a quantidade de ar externo entregue por cada sistema de ventilacao",
      "Verificar a eficiência dos filtros (MERV ou classe equivalente)"
    ],
    perguntas: [
      {
        id: "eq_p1v5_ar_externo", tipo: "radio",
        pergunta: "A qualidade do ar externo local foi investigada (poluentes, odores, fontes externas)?",
        opções: [
          { valor: "sim", label: "Sim, investigacao realizada e documentada", pontos: 3 },
          { valor: "parcial", label: "Investigacao parcial / informal", pontos: 1 },
          { valor: "não", label: "Não foi investigada", pontos: 0 }
        ]
      },
      {
        id: "eq_p1v5_medição", tipo: "radio",
        pergunta: "Medições de vazão de ar externo por sistema de ventilacao foram realizadas (últimos 5 anos)?",
        opções: [
          { valor: "sim_conforme", label: "Sim, dentro dos últimos 5 anos e conformes com norma", pontos: 3 },
          { valor: "sim_nao_conforme", label: "Sim, mas com espaços abaixo do mínimo", pontos: 1 },
          { valor: "não", label: "Não foram realizadas medições", pontos: 0 }
        ]
      },
      {
        id: "eq_p1v5_filtros", tipo: "radio",
        pergunta: "Qual e a eficiência dos filtros de ar (MERV rating)?",
        opções: [
          { valor: "merv13_mais", label: "MERV 13 ou superior (alto desempenho)" },
          { valor: "merv8_12", label: "MERV 8 a 12 (medio desempenho)" },
          { valor: "abaixo_8", label: "MERV abaixo de 8 (baixo desempenho)" },
          { valor: "nao_sei", label: "Não sei informar" }
        ]
      }
    ],
    documentos: [
      { id: "eq_p1v5_doc1", nome: "PMOC com tarefas de manutenção ASHRAE 62.1-2022 (Tabela 8-1)" },
      { id: "eq_p1v5_doc2", nome: "Relatorio de investigacao da qualidade do ar externo" },
      { id: "eq_p1v5_doc3", nome: "Relatorio de medição de vazão de ar externo e filtracao" }
    ],
    observacaoPlaceholder: "Ex: Edificio proximo a via de alto fluxo. Filtros G4 instalados, prevendo upgrade para F7 em 2025..."
  },
  {
    id: "eq-p2-v5", codigo: "EQp2", titulo: "Não Fumar",
    categoria: "EQ", categoriaNome: "Qualidade Ambiental Interna", cor: "#3498DB", icone: "slash",
    sobre: "Previne ou minimiza a exposição dos ocupantes, superficies internas e sistemas de ventilacao a fumaca de tabaco e dispositivos eletrônicos de fumaco.",
    requisitos: [
      "Proibir o fumo dentro do edificio (inclui cigarro eletrônico e cannabis)",
      "Proibir o fumo a menos de 7,5m de entradas, captações de ar e janelas operaveis",
      "Comúnicar política a ocupantes e ter mecanismos de fiscalização ou sinalização proibitiva"
    ],
    perguntas: [
      {
        id: "eq_p2v5_interno", tipo: "radio",
        pergunta: "O fumo e proibido em todo o interior do edificio (incluindo cigarro eletrônico)?",
        opções: [
          { valor: "sim", label: "Sim, proibição total com política formal", pontos: 3 },
          { valor: "parcial", label: "Parcialmente (algumas areas ainda permitem)", pontos: 0 },
          { valor: "não", label: "Não há restrição formal", pontos: 0 }
        ]
      },
      {
        id: "eq_p2v5_externo", tipo: "radio",
        pergunta: "Area de fumantes externa (se houver) está a pelo menos 7,5m de entradas e captações de ar?",
        opções: [
          { valor: "sim", label: "Sim, area adequadamente afastada (>= 7,5m)", pontos: 3 },
          { valor: "nao_ha", label: "Não há area de fumantes / fumo proibido no local", pontos: 3 },
          { valor: "não", label: "Area proxima de entradas ou captações (< 7,5m)", pontos: 0 }
        ]
      },
      {
        id: "eq_p2v5_comúnicação", tipo: "radio",
        pergunta: "A política de não fumar e comúnicada e fiscalizada?",
        opções: [
          { valor: "sim", label: "Sim, comúnicada por escrito com sinalização e fiscalização", pontos: 3 },
          { valor: "parcial", label: "Parcialmente comúnicada (sem fiscalização formal)", pontos: 1 },
          { valor: "não", label: "Não há comúnicação formal", pontos: 0 }
        ]
      }
    ],
    documentos: [
      { id: "eq_p2v5_doc1", nome: "Política de Não Fumar (abrangendo cigarros, eletrônicos e cannabis)" },
      { id: "eq_p2v5_doc2", nome: "Evidências de sinalização no edificio" }
    ],
    observacaoPlaceholder: "Ex: Política de não fumar desde 2018. Area de fumantes na saida lateral a 10m da entrada principal..."
  }
];

export default prerequisitesV5;
