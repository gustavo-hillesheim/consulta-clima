const extendedMonths = {
  1: "janeiro",
  2: "fevereiro",
  3: "março",
  4: "abril",
  5: "maio",
  6: "junho",
  7: "julho",
  8: "agosto",
  9: "setembro",
  10: "outubro",
  11: "novembro",
  12: "dezembro",
};

const extendedWeekdays = {
  0: "Domingo",
  1: "Segunda",
  2: "Terça",
  3: "Quarta",
  4: "Quinta",
  5: "Sexta",
  6: "Sábado",
};

const weatherConditionsDescription = {
  200: "tempestade com chuva fraca",
  201: "tempestade com chuva",
  202: "tempestade com chuva forte",
  210: "tempestade fraca",
  211: "tempestade",
  212: "tempestade forte",
  221: "tempestade irregular",
  230: "tempestade com garoa leve",
  231: "tempestade com garoa",
  232: "tempestade com garoa forte",

  300: "garoa fraca",
  301: "garoa",
  302: "garoa forte",
  310: "chuva com garoa fraca",
  311: "chuva com garoa",
  312: "chuva com garoa forte",
  313: "aguaceiro e garoa",
  314: "aguaceiro forte e garoa",
  321: "chuvisco",

  500: "chuva",
  501: "chuva moderada",
  502: "chuva forte",
  503: "chuva muito forte",
  504: "chuva extrema",
  511: "chuva congelante",
  520: "aguaceiro fraco",
  521: "aguaceiro",
  522: "aguaceiro forte",
  531: "aguaceiro irregular",

  600: "neve fraca",
  601: "neve",
  602: "neve forte",
  611: "granizo",
  612: "chuva fraca e granizo",
  613: "chuva e granizo",
  615: "chuva fraca e neve",
  616: "chuva e neve",
  620: "chuva de neve fraca",
  621: "chuva de neve",
  622: "chuva de neve forte",

  701: "névoa",
  711: "fumaça",
  721: "neblina",
  731: "redemoinhos de poeira",
  741: "nevoeiro",
  751: "areia",
  761: "poeira",
  762: "cinzas vulcânicas",
  771: "rajadas",
  781: "tornados",

  800: "céu limpo",
  801: "poucas nuvens",
  802: "nuvens dispersas",
  803: "nuvens quebradas",
  804: "nublado",
};

const statesInitials = {
  ac: "Acre",
  al: "Alagoas",
  ap: "Amapá",
  am: "Amazonas",
  ba: "Bahia",
  ce: "Ceará",
  df: "Distrito Federal",
  es: "Espírito Santo",
  go: "Goiás",
  ma: "Maranhão",
  mt: "Mato Grosso",
  ms: "Mato Grosso do Sul",
  pa: "Pará",
  pb: "Paraíba",
  pr: "Paraná",
  pe: "Pernambuco",
  pi: "Piauí",
  rj: "Rio de Janeiro",
  rn: "Rio Grando do Norte",
  rs: "Rio Grande do Sul",
  ro: "Rondônia",
  rr: "Roraima",
  sc: "Santa Catarina",
  sp: "São Paulo",
  se: "Sergipe",
  to: "Tocantins",
};

function extendDate(date) {
  const [day, month] = date.split("/");
  return `${day} de ${extendedMonths[month]}`;
}

function formatDate(date) {
  const [day, month] = date.split("/");
  const paddedDay = day.padStart(2, "0");
  const paddedMonth = month.padStart(2, "0");
  return `${paddedDay}/${paddedMonth}`;
}

function extendWeekday(weekday) {
  return `${extendedWeekdays[weekday] || "Dia da semana desconhecido"}`;
}

function shortWeekday(weekday) {
  return extendWeekday(weekday).substr(0, 3);
}

function weatherCondition(conditionId) {
  return `${weatherConditionsDescription[conditionId] ||
    "Condição desconhecida"}`;
}

function shortState(state) {
  if (!state) {
    return "NA";
  }
  const foundInitial = Object.keys(statesInitials).find((initial) => {
    const currentState = statesInitials[initial];
    return state.toLowerCase() === currentState.toLowerCase();
  });
  return (foundInitial || "NA").toUpperCase();
}

function extendState(stateInitial) {
  const foundState = Object.keys(statesInitials).find(
    (initial) => initial.toLowerCase() === stateInitial.toLowerCase()
  );
  return foundState || "Desconhecido";
}

module.exports = {
  extendDate,
  formatDate,
  extendWeekday,
  weatherCondition,
  shortWeekday,
  shortState,
  extendState,
};
