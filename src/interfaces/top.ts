interface ScoreState {
  place: number,
  score: number,
}

export interface TopState {
  beginner: ScoreState,
  normal: ScoreState,
  pro: ScoreState,
  god: ScoreState,
}
