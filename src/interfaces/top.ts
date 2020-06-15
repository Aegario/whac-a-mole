export interface ScoreState {
  place: number,
  score: number,
}

export interface Member {
  name: string,
  score: number,
}

export interface TopDataState {
  [beginner: string]: Member[],
  normal: Member[],
  pro: Member[],
  god: Member[],
}

export interface UserStatsState {
  [beginner: string]: ScoreState,
  normal: ScoreState,
  pro: ScoreState,
  god: ScoreState,
}

export interface TopState {
  topData: TopDataState,
  userStats: UserStatsState
}
