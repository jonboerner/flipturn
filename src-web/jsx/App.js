import React, {Component} from 'react';
import { connect } from 'react-redux';

class App extends Component {
   render() {
      const { dispatch, todos } = this.props;
      return (
         <div>
            <h1>Hello, world.</h1>
            <button onClick={() => dispatch({type:'add_todo'})}>Add todo</button>
            {todos.map((t, i) => <div key={i}>{t}</div>)}
         </div>
      );
   }
}

export default connect((s) => s)(App);
