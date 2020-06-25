import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Button from './components/Button'
import Display from './components/Display'

import Padrao from './style/Padrao'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
}

export default class App extends Component{
  state = {... initialState}

  addDigit = n => {
    
    //clearDisply verificar se é para limpar o dislplay, 
    //caso o valor do display seja zero, então, apaga-se o zero e inserimos o novo valor
    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

    //se inseri um ponto e já existe um ponto, então ele é ignorado. E se não for limpar a tela
    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')){
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue

    const displayValue = currentValue + n

    this.setState({displayValue, clearDisplay: false})

    if (n !== '.' ){
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({values})
    }
  }

  clearMemory = () => {
    this.setState({...initialState})
  }

  setOperation = operation => {
      console.debug(typeof this.state.displayValue)
      if (this.state.current === 0){
        this.setState({operation, current: 1, clearDisplay: true})
      } else {
        const equals = operation === '='
        const values = [...this.state.values]
        try{
          //eval faz a operação dos dois valores do vetor
          values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]} `)
        } catch(e){
          values[0] = this.state.values[0]
        }

        values[1] = 0
        this.setState({
          displayValue: `${values[0]}`,
          operation: equals ? null: operation,
          current: equals ? 0 : 1,
          clearDisplay: !equals,
          values, //atribuição a ele mesmo

        })

      }
  }

  render(){
    return(
      <View style = {Padrao.container}>
        <Display value = {this.state.displayValue}/>
        <View style = {Padrao.buttons}>
          <Button label = 'AC' triple onClick = {this.clearMemory}/>
          <Button label = '/' operation onClick = {() => this.setOperation('/')} />
          <Button label = '7' onClick = {() => this.addDigit(7)}/>
          <Button label = '8' onClick = {() => this.addDigit(8)}/>
          <Button label = '9' onClick = {() => this.addDigit(9)}/>
          <Button label = '*' operation onClick = {() => this.setOperation('*')} />
          <Button label = '4' onClick = {() => this.addDigit(4)}/>
          <Button label = '5' onClick = {() => this.addDigit(5)}/>
          <Button label = '6' onClick = {() => this.addDigit(6)}/>
          <Button label = '-' operation onClick = {() => this.setOperation('-')} />
          <Button label = '1' onClick = {() => this.addDigit(1)}/>
          <Button label = '2' onClick = {() => this.addDigit(2)}/>
          <Button label = '3' onClick = {() => this.addDigit(3)}/>
          <Button label = '+' operation onClick = {() => this.setOperation('+')} />
          <Button label = '0' double onClick = {() => this.addDigit(0)} />
          <Button label = '.' onClick = {() => this.addDigit('.')}/>
          <Button label = '=' operation onClick = {() => this.setOperation('=')} /> 
        </View>

      </View>
    )
  }
}

