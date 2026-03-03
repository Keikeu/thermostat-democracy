import { Unit, Vote } from "./types";

export const NUMBER_OF_LABELS = 4;

export function isInRange(temperature: number, range: [number, number]) {
  if (temperature >= range[0] && temperature <= range[1]) {
    return true;
  }
  return false;
}

export function roundToHalf(n: number) {
  return Math.round(n * 2) / 2;
}

export function formatTemp(value: number): string {
  return `${value.toFixed(1)}°`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(0)}%`;
}

export function formatBias(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}°`;
}

export function calculateDiscomfortScore(
  votes: Vote[],
  temperature: number,
): number {
  let discomfortScoreSum = 0;

  votes.forEach((vote) => {
    let discomfortScore = 0;

    if (temperature === vote.ideal_temp) {
      discomfortScore = 0;
    } else if (isInRange(temperature, vote.comfort_range)) {
      // Scale from 0 (at ideal) to 1 (at edge of comfort range)
      const distanceFromIdeal = Math.abs(temperature - vote.ideal_temp);
      const edgeOfRange =
        temperature < vote.ideal_temp
          ? vote.ideal_temp - vote.comfort_range[0]
          : vote.comfort_range[1] - vote.ideal_temp;
      discomfortScore = distanceFromIdeal / edgeOfRange;
    } else if (temperature < vote.comfort_range[0]) {
      discomfortScore = Math.abs(vote.comfort_range[0] - temperature) + 1;
    } else if (temperature > vote.comfort_range[1]) {
      discomfortScore = Math.abs(vote.comfort_range[1] - temperature) + 1;
    }

    discomfortScoreSum += discomfortScore;
  });

  return Number((discomfortScoreSum / votes.length).toFixed(2));
}

export function getDiscomfortScoreMap(
  votes: Vote[],
  unit: Unit,
): Map<number, number> {
  const min = getMin(unit);
  const max = getMax(unit);

  const scoresMap = new Map<number, number>();

  for (let i = min; i <= max; i += 0.5) {
    scoresMap.set(i, calculateDiscomfortScore(votes, i));
  }

  return scoresMap;
}

export function calculateSweetSpot(votes: Vote[], unit: Unit): number {
  const discomfortScoreMap = getDiscomfortScoreMap(votes, unit);

  const minScore = Math.min(...discomfortScoreMap.values());

  const sweetSpots = [...discomfortScoreMap.entries()]
    .filter(([, score]) => score <= minScore + 1e-10)
    .map(([temp]) => temp);

  if (sweetSpots.length === 0) {
    return 0;
  } else if (sweetSpots.length === 1) {
    return sweetSpots[0];
  } else {
    const averageIdeal = calculateAverageIdeal(votes);
    const sweetSpot = sweetSpots.reduce((best, candidate) =>
      Math.abs(candidate - averageIdeal) < Math.abs(best - averageIdeal)
        ? candidate
        : best,
    );
    return sweetSpot;
  }
}

export function calculateAverageIdeal(votes: Vote[]): number {
  return votes.reduce((sum, v) => sum + v.ideal_temp, 0) / votes.length;
}

export function calculateMedianIdeal(votes: Vote[]): number {
  const sorted = [...votes].map((v) => v.ideal_temp).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

export function calculateModeIdeal(votes: Vote[]): number {
  if (votes.length === 0) return 0;

  const counts = new Map<number, number>();
  votes.forEach((v) =>
    counts.set(v.ideal_temp, (counts.get(v.ideal_temp) ?? 0) + 1),
  );

  return [...counts.entries()].reduce((best, candidate) =>
    candidate[1] > best[1] ? candidate : best,
  )[0];
}

export function calculateAverageRangeSize(votes: Vote[]): string {
  return formatTemp(
    votes.reduce(
      (sum, v) => sum + (v.comfort_range[1] - v.comfort_range[0]),
      0,
    ) / votes.length,
  );
}

export function calculateSweetSpotIdealFor(
  votes: Vote[],
  sweetSpot: number,
): string {
  let count = 0;

  votes.forEach((v) => {
    if (v.ideal_temp === sweetSpot) count++;
  });

  return formatPercent((count * 100) / votes.length);
}

export function calculateSweetSpotComfortableFor(
  votes: Vote[],
  sweetSpot: number,
): string {
  let count = 0;

  votes.forEach((v) => {
    if (isInRange(sweetSpot, v.comfort_range)) count++;
  });

  return formatPercent((count * 100) / votes.length);
}

export function calculateCurrentTempInComfortRange(
  votes: Vote[],
  currentTemp: number,
): string {
  const inRange = votes.filter(
    (v) =>
      currentTemp >= v.comfort_range[0] && currentTemp <= v.comfort_range[1],
  );
  return formatPercent((inRange.length * 100) / votes.length);
}

export function calculateSweetSpotInComfortRange(
  votes: Vote[],
  sweetSpot: number,
): string {
  const inRange = votes.filter(
    (v) => sweetSpot >= v.comfort_range[0] && sweetSpot <= v.comfort_range[1],
  );
  return formatPercent((inRange.length * 100) / votes.length);
}

function getVotesWithCurrentTemp(
  votes: Vote[],
): (Vote & { current_temp: number })[] {
  return votes.filter(
    (v): v is Vote & { current_temp: number } => v.current_temp !== null,
  );
}

export function calculateAverageGuess(votes: Vote[]): string {
  const votesWithCurrentTemp = getVotesWithCurrentTemp(votes);
  return formatTemp(
    votesWithCurrentTemp.reduce((sum, v) => sum + v.current_temp, 0) /
      votesWithCurrentTemp.length,
  );
}

export function calculateAveragePerceptionBias(
  votes: Vote[],
  currentTemp: number,
): string {
  const votesWithCurrentTemp = getVotesWithCurrentTemp(votes);
  return formatBias(
    votesWithCurrentTemp.reduce(
      (sum, v) => sum + (v.current_temp - currentTemp),
      0,
    ) / votesWithCurrentTemp.length,
  );
}

export function calculateGotItRight(
  votes: Vote[],
  currentTemp: number,
): string {
  const votesWithCurrentTemp = getVotesWithCurrentTemp(votes);
  const correct = votesWithCurrentTemp.filter(
    (v) => Math.abs(v.current_temp - currentTemp) <= 0.5,
  );
  return formatPercent((correct.length * 100) / votesWithCurrentTemp.length);
}

export function calculateUnderestimated(
  votes: Vote[],
  currentTemp: number,
): string {
  const votesWithCurrentTemp = getVotesWithCurrentTemp(votes);
  const under = votesWithCurrentTemp.filter(
    (v) => v.current_temp < currentTemp - 0.5,
  );
  return formatPercent((under.length * 100) / votesWithCurrentTemp.length);
}

export function calculateOverestimated(
  votes: Vote[],
  currentTemp: number,
): string {
  const votesWithCurrentTemp = getVotesWithCurrentTemp(votes);
  const over = votesWithCurrentTemp.filter(
    (v) => v.current_temp > currentTemp + 0.5,
  );
  return formatPercent((over.length * 100) / votesWithCurrentTemp.length);
}

export function getDiscomfortScoreChartData(votes: Vote[], unit: Unit) {
  const discomfortScoreMap = getDiscomfortScoreMap(votes, unit);

  const ranges = votes.map((v) => v.comfort_range);
  const min = getMin(unit);
  const max = getMax(unit);

  const data = [];

  for (let i = min; i <= max; i += 0.5) {
    data.push({
      temperature: i,
      discomfortScore: discomfortScoreMap.get(i) || 0,
      comfortableCount: ranges.filter((r) => isInRange(i, r)).length,
    });
  }

  return data;
}

export function getIdealTempChartData(votes: Vote[], unit: Unit) {
  const min = getMin(unit);
  const max = getMax(unit);

  const data = [];

  for (let i = min; i <= max; i += 0.5) {
    data.push({
      temperature: i,
      idealCount: votes.filter((v) => v.ideal_temp === i).length,
    });
  }

  return data;
}

export function getComfortRangeChartData(votes: Vote[]) {
  const data = votes
    .sort((a, b) => a.ideal_temp - b.ideal_temp)
    .map((v) => ({
      min: v.comfort_range[0],
      ideal: v.ideal_temp,
      max: v.comfort_range[1],
    }));

  return data;
}

export function getCalibrationChartData(votes: Vote[], unit: Unit) {
  const min = getMin(unit);
  const max = getMax(unit);

  const data = [];

  for (let i = min; i <= max; i += 0.5) {
    data.push({
      temperature: i,
      estimatedCount: votes.filter((v) => v.current_temp === i).length,
    });
  }

  return data;
}

export function getMin(unit: Unit) {
  return unit === "C" ? 15 : 60;
}

export function getMax(unit: Unit) {
  return unit === "C" ? 28 : 85;
}

export function getThermostatLabels(unit: Unit): number[] {
  const labels = [];
  const min = getMin(unit);
  const max = getMax(unit);

  for (let i = 0; i < NUMBER_OF_LABELS; i++) {
    labels.push(Math.round(min + ((max - min) / (NUMBER_OF_LABELS - 1)) * i));
  }

  return labels;
}

export function getThermostatRangePosition(value: number, unit: Unit): number {
  const min = getMin(unit);
  const max = getMax(unit);

  return ((value - min) / (max - min)) * 100;
}

export const monthNameMap: Record<number, string> = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};
