/**
 * Winner Engine Logic
 * 
 * Step 1: Find all exact score matches.
 * Step 2: If exact matches > winner count, randomly select winners.
 * Step 3: If exact matches = 0, calculate closest predictions based on:
 *         1. Correct winner
 *         2. Goal difference
 *         3. Total score accuracy
 */

export type Prediction = {
  id: string;
  predictedScore1: number;
  predictedScore2: number;
  submittedAt: Date;
};

export type WinnerResult = {
  predictionId: string;
  selectionMethod: 'exact' | 'closest';
  randomDraw: boolean;
};

export function calculateWinners(
  predictions: Prediction[], 
  finalScore1: number, 
  finalScore2: number, 
  winnerCount: number
): WinnerResult[] {
  // Step 1: Find exact matches
  const exactMatches = predictions.filter(
    p => p.predictedScore1 === finalScore1 && p.predictedScore2 === finalScore2
  );

  let winners: WinnerResult[] = [];

  // Step 2: Handle exact matches
  if (exactMatches.length > 0) {
    if (exactMatches.length <= winnerCount) {
      // All exact matches win
      winners = exactMatches.map(p => ({
        predictionId: p.id,
        selectionMethod: 'exact',
        randomDraw: false
      }));
    } else {
      // Randomly select `winnerCount` from exact matches
      const shuffled = [...exactMatches].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, winnerCount);
      winners = selected.map(p => ({
        predictionId: p.id,
        selectionMethod: 'exact',
        randomDraw: true
      }));
    }
    return winners;
  }

  // Step 3: No exact matches -> Find closest
  // Calculate score difference
  const scoredPredictions = predictions.map(p => {
    // 1. Correct winner (3 points for correct winner/draw)
    const actualWinner = finalScore1 > finalScore2 ? 1 : finalScore1 < finalScore2 ? 2 : 0;
    const predictedWinner = p.predictedScore1 > p.predictedScore2 ? 1 : p.predictedScore1 < p.predictedScore2 ? 2 : 0;
    const correctWinnerScore = actualWinner === predictedWinner ? 3 : 0;

    // 2. Goal difference (less diff = better)
    const actualDiff = finalScore1 - finalScore2;
    const predictedDiff = p.predictedScore1 - p.predictedScore2;
    const diffAccuracy = Math.abs(actualDiff - predictedDiff);

    // 3. Total goals accuracy
    const actualTotal = finalScore1 + finalScore2;
    const predictedTotal = p.predictedScore1 + p.predictedScore2;
    const totalAccuracy = Math.abs(actualTotal - predictedTotal);

    // Final score calculation (lower is better, except for correctWinnerScore which is positive, so we invert)
    // We want the minimum penalty score.
    // Penalty = (correctWinnerScore === 3 ? 0 : 5) + diffAccuracy * 2 + totalAccuracy
    const penalty = (correctWinnerScore === 3 ? 0 : 10) + (diffAccuracy * 2) + totalAccuracy;

    return { prediction: p, penalty };
  });

  // Sort by lowest penalty, then earliest submission time
  scoredPredictions.sort((a, b) => {
    if (a.penalty !== b.penalty) return a.penalty - b.penalty;
    return a.prediction.submittedAt.getTime() - b.prediction.submittedAt.getTime();
  });

  const closestMatches = scoredPredictions.slice(0, winnerCount);
  
  return closestMatches.map(p => ({
    predictionId: p.prediction.id,
    selectionMethod: 'closest',
    randomDraw: false
  }));
}
