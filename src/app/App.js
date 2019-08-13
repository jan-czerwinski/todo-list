import React from 'react';
import './App.css';
import History from './History'

const hist = new History()

function AddTask(props){
  return (
    <form onSubmit={props.onSubmit}>
      <input type="text" name="newTask" autoComplete="off"/> <br/>
      <input type="submit" value="Dodaj zadanie"/>
    </form>
  )
}


class Tasks extends React.Component{
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleCheck = this.handleCheck.bind(this)
    this.resetTiles = this.resetTiles.bind(this)
  }

  handleSubmit(event){
    event.preventDefault()
    const newTask = event.target.newTask.value
    hist.addObj({text:newTask, checked:false})
    this.forceUpdate()
  }

  handleCheck(event){
    const key = event.target.id
    hist.modifyObj(key,{checked:event.target.checked})
    this.forceUpdate()
  }

  renderTiles(){
    return hist.readHistory().reverse().map((tile, index) => {
        const { id, text, checked} = tile
        /* cos w sttylu onchange={funkcja(id)} i w tej funkcji zmienianie
        teraz ide spac, powodznenia, jutrzejszy Janie :)
        obiektu w localStorage bedzie chyba mialo sens
        */
        const className = checked ? "Tile TileChecked" : "Tile"
        return (
            <div className={className} key={id}>
            <input className="Check" type="checkbox" checked={checked} id={id} onChange={this.handleCheck}/>
            {text}
            </div>
          )
        })
  }

  resetTiles(){
    hist.resetHistory()
    this.forceUpdate()
  }

  render(){
    return(
      <div>
        <div className="Split Left">
          <AddTask onSubmit={this.handleSubmit}/>
          <input
            type="button"
            value="resetuj kafelki"
            onClick={this.resetTiles}
          />
        </div>
        <div className="Split Right">
          {this.renderTiles()}
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Tasks/>
    </div>
  );
}

export default App;
