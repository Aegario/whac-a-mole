import { AuthState } from 'interfaces/auth'
import { LoadingState } from 'interfaces/loading'
import { GameState } from 'interfaces/game'
import { TopState } from 'interfaces/top'

export interface User {
  _id: string,
  name: string,
}

export interface State {
  auth: AuthState,
  loading: LoadingState,
  game: GameState,
  top: TopState,
}

export interface TimerInterface {
  timeLeft: number,
  timeUp: boolean,
  start: () => void,
  reset: () => void,
}
