type Reducer<S = unknown, A extends string = string> = (
  state: S,
  action: SimpleAction<A>
) => S;
type SimpleAction<A extends string = string> = {
  type: A;
  payload: any;
};
export type FnAction<S, A extends string = string> = (
  dispatch: Store<S, A>["dispatch"],
  getState: Store<S, A>["getState"]
) => void;

type Action<S = unknown, A extends string = string> =
  | SimpleAction<A>
  | FnAction<S, A>;

type SubscriberFn<S> = (getState: () => S) => void;

type Store<S = unknown, A extends string = string> = {
  dispatch: (action: Action<S, A>) => void;
  getState: () => S;
  subscribe: (fn: SubscriberFn<S>) => () => void;
};

export function createStore<S, A extends string = string>(
  reducer: Reducer<S, A>,
  initialState: S
) {
  let state = initialState;
  let subs: SubscriberFn<S>[] = [];
  const store: Store<S, A> = {
    dispatch: (action: Action<S, A>) => {
      if (typeof action === "function") {
        (action as FnAction<S, A>)(store.dispatch, store.getState);
      } else {
        state = reducer(state, action);
        subs.forEach((fn) => fn(store.getState));
      }
    },
    getState: () => ({ ...state }),
    subscribe: (fn) => {
      subs.push(fn);
      return () => {
        subs = subs.filter((sub) => sub !== fn);
      };
    },
  };
  return store;
}

type ReducersMap = {
  [key: string]: Reducer<any, any>;
};

type UnknownObject = {
  [key: string]: unknown;
};

export function combineReducers<S extends UnknownObject, A extends string>(
  reducersMap: ReducersMap,
  initialState?: S
) {
  return {
    initialState: initialState || getDefaultState<S, A>(reducersMap),
    reducer: function combinationReducer(state: S, action: SimpleAction<A>) {
      const nextState = {} as S;
      Object.entries(reducersMap).forEach(([key, reducer]) => {
        (nextState[key] as unknown) = reducer(state[key], action);
      });
      return nextState;
    },
  };
}

function getDefaultState<S extends UnknownObject, A extends string = string>(
  reducersMap: ReducersMap
) {
  const result = {} as S;
  Object.entries(reducersMap).forEach(([key, value]) => {
    (result[key] as unknown) = value(undefined, {
      type: "@@NOOP" as A,
      payload: null,
    });
  });
  return result;
}

type ActionCreator<T extends string = string, P = any> = ((payload: P) => {
  type: T;
  payload: P;
}) & { type: T };

export function createAction<T extends string, P = any>(
  type: T,
  creator: (payload: P) => P
): ActionCreator<T, P> {
  const temp = (payload: P) => ({ type, payload: creator(payload) });
  return Object.assign(temp, { type });
}
