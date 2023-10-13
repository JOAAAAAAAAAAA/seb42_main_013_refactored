import "react-dom";

declare module "react-dom" {
  function experimental_useFormState<State>(
    action: (state: State) => Promise<State>,
    initialState: State,
    permalink?: string
  ): [state: State, dispatch: () => void];
//   function experimental_useFormState<State, Payload>(
//     action: (state: State, payload: Payload) => Promise<State>,
//     initialState: State,
//     permalink?: string
//   ): [state: State, dispatch: (payload: Payload) => void];
function experimental_useFormState<State, Payload>(
  action: (state: State, payload: Payload) => Promise<State>,
  initialState: State,
  permalink?: string
): [state: State, dispatch: (payload: Payload) => Promise<void>];
}



// https://github.com/vercel/next.js/issues/55919#issuecomment-1733807304
