'use client'
import styles from './page.module.css'
import { useState } from 'react'

export default function Home() {
  const [cut,setCut]=useState<number>(1)
  const [prime,setPrime]=useState<number>(2)
  const isCoPrime = (num:number,lastPrime:number) => {
    for(let i = 2;  i <= lastPrime; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
}
  const primorial=(prime: number)=>{
    const primeList=[2,3,5,7,11,13,17,19]
    let nth=primeList.indexOf(prime)
    let product=1
    for(let i=0;i<nth+1;i++){
      product*=primeList[i]
    }
    return {list:primeList.slice(0,nth+1), product}
  }
  const generateTable=(primeCut:number,prime:number)=>{
    const {list:primeList,product:primeProduct}=primorial(prime)
    let table:Array<Array<number>>=[]
    let row:Array<number>=[]
    let rowIndex=1
    //rules in constructing number line
    for(let i=0;i<=primeProduct;i++){
      if(i==(primeProduct/(primeCut))){
        rowIndex++
      }
      if(rowIndex==1&& i<(primeProduct/(primeCut))){
        row.push(i)
      }
      else if(i>=primeProduct-(primeProduct/(2*primeCut))){
        row.push(i)
      }
      else if(i>=(primeProduct/(primeCut))){
        if(i<(primeProduct/(2*primeCut))*(rowIndex)){
          row.push(i)
        }
        else{
          row.push(i)
          rowIndex++
          table.push(row)
          row=[]
          row.push(i)
        }
      }
      
    }
    table.push(row)

    //html for table
    for(let i=1; i<table.length;i+=2){
      table[i].reverse()
    }
    let htmlRows=[]
    for(let Row of table){
      let htmlRow=[]
      let count=0
      for(let val of Row){
        if(isCoPrime(val,prime)){
          count++
          htmlRow.push(<td style={{backgroundColor:"red"}}>{val}</td>)
        }
        else{
          htmlRow.push(<td>{val}</td>)
        }
      }
      htmlRows.push(<tr>Co_Prime_Count_{count}:  {htmlRow}</tr>)
    }
    let htmlTable=
    <div style={{width:"100%",overflow:'auto'}}>
      <table>
        <tbody>{htmlRows}</tbody>
      </table>
    </div>
    return htmlTable
  }
  return (
    <main className={styles.main}>
      <h2>
        <u><a  href="https://github.com/derekdip/NumberLine">Github</a></u>
      </h2>
      <div>
        <label htmlFor="primes">Choose prime to produce number line up to its primorial '2*3*5...p':</label>
        <select name="primes" id="prime" onChange={(e)=>{setPrime(parseInt(e.target.value))}}>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="11">11</option>
          <option value="13">13</option>
          <option value="17">17</option>
          <option value="19">19</option>
        </select>
        </div>
        <div>
        <label htmlFor="cut">Choose Prime Cut "must be less than or equal to prime chosen":</label>
        <select name="cut" id="cut" onChange={(e)=>{setCut(parseInt(e.target.value))}}>
          <option value={1}>1</option> 
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={11}>11</option>
          <option value={13}>13</option>
          <option value={17}>17</option>
          <option value={19}>19</option>
        </select>
      </div>
        {generateTable(cut,prime)}
    </main>
  )
}
