import React, { useState } from 'react';

const TarefaContext = React.createContext([{}, () => {}]);

const TarefaProvider = (props) => {
  const [state, setState] = useState({});
  return (
    <TarefaContext.Provider value={[state, setState]}>
      {props.children}
    </TarefaContext.Provider>
  );
}

export { TarefaContext, TarefaProvider };