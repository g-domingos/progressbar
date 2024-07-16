export function getLastDayOfMonthInEpoch(month: number) {
  let year = new Date().getFullYear();

  //Cria uma data para o primeiro dia do próximo mes
  let nextMonth = new Date(year, month + 1, 1);

  //Subtrai um dia do primeiro dia do próximo mes. Vai retornar o ultimo dia do mes atual.
  nextMonth.setDate(nextMonth.getDate() - 1);

  nextMonth.setHours(23, 59, 59, 59);

  return nextMonth.getTime();
}

export function getFirstDayOfMonthInEpoch(month: number) {
  const year = new Date().getFullYear();

  const firstDay = new Date(year, month, 1).getTime();

  return firstDay;
}

/**
 * @description Retorna um valor em epoch, de X dias atras.
 *
 * @example getEpochFromDaysAgo(30) = Irá retornar a data em epoch de 30 dias atras
 *
 * @param days number
 */
export function getEpochFromDaysAgo(days: number, type?: "START" | "END") {
  const DAY_EPOCH = 60 * 60 * 24 * 1000;

  let today: number = 0;

  if (!type || type === "START") {
    today = new Date().setHours(0, 0, 0, 0);
  } else if (type === "END") {
    today = new Date().setHours(23, 58, 58, 0);
  }


  return today - days * DAY_EPOCH;
}

export const MONTHS_NAMES: any = {
  "0": "Janeiro",
  "1": "Fevereiro",
  "2": "Março",
  "3": "Abril",
  "4": "Maio",
  "5": "Junho",
  "6": "Julho",
  "7": "Agosto",
  "8": "Setembro",
  "9": "Outubro",
  "10": "Novembro",
  "11": "Dezembro",
  "-1": "Dezembro",
  "12": "Janeiro",
};

export function formatEpochToDateDDMMYYY(epoch: number) {
  const dateFromEpoch = new Date(epoch).toISOString();


  const [date, hour] = dateFromEpoch.split("T");

  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
}
