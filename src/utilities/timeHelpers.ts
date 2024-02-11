export const processHours = (hora1: string, hora2: string, isSubtract: boolean = true): string => {
  const [horas1, minutos1, segundos1] = hora1.split(':').map(Number);
  const [horas2, minutos2, segundos2] = hora2.split(':').map(Number);

  const totalSegundos1 = horas1 * 3600 + minutos1 * 60 + segundos1;
  const totalSegundos2 = horas2 * 3600 + minutos2 * 60 + segundos2;

  const totalSegundos = isSubtract
    ? totalSegundos1 - totalSegundos2
    : totalSegundos1 + totalSegundos2;

  const nuevasHoras = Math.floor(totalSegundos / 3600);
  const nuevosMinutos = Math.floor((totalSegundos % 3600) / 60);
  const nuevosSegundos = totalSegundos % 60;

  return `${String(abs(nuevasHoras)).padStart(2, '0')}:${String(abs(nuevosMinutos)).padStart(
    2,
    '0'
  )}:${String(abs(nuevosSegundos)).padStart(2, '0')}`;
};

export const convertHourToSeconds = (hour: string): number => {
  const [horas, minutos, segundos] = hour.split(':').map(Number);
  return horas * 3600 + minutos * 60 + segundos;
};

// Función auxiliar para obtener el valor absoluto
export const abs = (value: number): number => {
  return value < 0 ? -value : value;
};

export const timeToSeconds = (hora1: string): number => {
  const [horas1, minutos1, segundos1] = hora1.split(':').map(Number);
  return horas1 * 3600 + minutos1 * 60 + segundos1;
};
