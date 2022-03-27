import React from 'react';

import '../css/App.css';
import PageTabs from './PageTabs';
import GridView from './GridView';
import ListView from './ListView';
import TaskView from './TaskView';

const LARGE_DESKTOP_BREAKPOINT = 1366;
const SMALL_DESKTOP_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 768;

class App extends React.Component {
  state = {
    browserWidth: 0,
    breakpoint: 'large-desktop',
    view: 'GridView'
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  handleResize = () => {
    const browserWidth = window.innerWidth;
    let breakpoint = 'large-desktop';

    if (browserWidth < LARGE_DESKTOP_BREAKPOINT && browserWidth >= SMALL_DESKTOP_BREAKPOINT) {
      breakpoint = 'small-desktop';
    } else if (browserWidth < SMALL_DESKTOP_BREAKPOINT && browserWidth >= TABLET_BREAKPOINT) {
      breakpoint = 'tablet';
    } else if (browserWidth < TABLET_BREAKPOINT) {
      breakpoint = 'mobile';
    }

    this.setState({ breakpoint, browserWidth });
  }

  onViewChange(view){
      this.setState({view});
  }

  wrapPage(jsx){
      const {view} = this.state;
      return (
          <div className={`container ${this.state.breakpoint}`}>
            <PageTabs currentView={ view }
                    onViewChange={ this.onViewChange.bind(this)} />
            {jsx}
          </div>
      );
  }
  render() {
    const {view} = this.state
    switch(view){
        case 'GridView':
            return(this.wrapPage(<GridView />));
        case 'ListView':
            return (this.wrapPage(<ListView />));
        case 'TaskView':
            return (this.wrapPage(<TaskView />));
        default:
            return (this.wrapPage(<h2>Invalid Tab, choose another</h2>));   
    }
    
  }
}

export default App;