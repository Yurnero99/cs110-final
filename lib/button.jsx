'use strict'

import React from 'react';
import wordList from './words.json';
export default
class Button extends React.Component{
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.chooseWords = this.chooseWords.bind(this);
    this.select = this.select.bind(this);
    this.selectWords = this.selectWords.bind(this);
    this.state = {counter:0, active:[false,false,false,false,false], words:[], selected:false, theme: 0};
  }

  chooseWords(list){
    let newList=[];
    while(newList.length < 5){
      let currentIndex = Math.floor(Math.random()*list.length);
        newList.push(list[currentIndex]);
         list.splice(currentIndex, 1);
    }
    return newList;
  }

  handleClick(e){
    if(this.state.active[e.target.id]===false){
      let newState = this.state.active;
      newState[e.target.id] = true;
      this.setState({counter:this.state.counter+1,active:newState});
    }
    let currentState = JSON.stringify(this.state.active);
    let trigger = JSON.stringify([true,true,true,true,true]);
    if(currentState===trigger) {
      console.log('Triggered');
      this.setState({words: this.selectWords(this.state.theme), active: [false,false,false,false,false]})
    }

  }

  selectWords(themeID) {
    switch (themeID) {
      case '1':
        return this.chooseWords(wordList.HarryPotter);
        break;
      case '2':
        return this.chooseWords(wordList.famousPeople);
        break;
      case '3':
        return this.chooseWords(wordList.animals);
        break;
      case '4':
        return this.chooseWords(wordList.music);
        break;
      default:
    }
  }

  select(e){
    this.setState({words: this.selectWords(e.target.id), selected : !this.state.selected, theme: e.target.id});
  }

  render(){
    let mainStyle = {
      fontSize: '15px',
      backgroundColor: '#037ABD',
      color: '#ffffff',
      border:'4px solid black',
      width:'500px',
      height:'680px',
      textAlign:'center',
      margin:'0px auto',
      display:'flex',
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    }

    let nodes = [];
    for(let i=0;i < this.state.words.length;i++){
      nodes.push(<button key={i} className={this.state.active[i]?'button active':'button'} id={i} onClick={this.handleClick}>{this.state.words[i]}</button>)
    }

    return(
    <div style = {mainStyle} >
      <div>
        <h1>Guess the word</h1>
        <button id = {'1'} onClick = {this.select} className={this.state.selected ? 'hidden' : 'button1'} ><i className={'material-icon'}>flash_on</i><p>Harry Potter</p></button>
        <button id = {'2'} onClick = {this.select} className={this.state.selected ? 'hidden' : 'button2'}><i className={'material-icon'}>people</i><p>Famous People</p></button>
        <button id = {'3'} onClick = {this.select} className={this.state.selected ? 'hidden' : 'button3'}><i className={'material-icon'}>pets</i><p>Animals</p></button>
        <button id = {'4'} onClick = {this.select} className={this.state.selected ? 'hidden' : 'button4'}><i className={'material-icon'}>music_note</i><p>Music</p></button>
      </div>
      <div className={this.state.selected ? 'mainStyle' : 'hidden'}>
        <h1>Counting Words : {this.state.counter}</h1>
        {nodes}
      </div>
    </div>
  );
};

};
