import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const TableContent = ({text, value}) => {
    if (text === "positive")
      return <tr><td>{text} {value} %</td></tr>
    else
      return <tr><td>{text} {value}</td></tr>
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  let positive = good / all * 100
  let average = (good * 1 + bad * -1) / all

  if (all === 0) {
    average = 0
    positive = 0
  }

  return (
    <div>
      <table>
        <tbody>
          <TableContent text="good" value={good}/>
          <TableContent text="neutral" value={neutral}/>
          <TableContent text="bad" value={bad}/>
          <TableContent text="all" value={all}/>
          <TableContent text="average" value={average}/>
          <TableContent text="positive" value={positive}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addFeedback = (state_var, setter_func) => setter_func(state_var + 1)

  return (
    <div>
      <Header text="give feedback" />
      <Button text="good" handleClick={() => addFeedback(good, setGood)} />
      <Button text="neutral" handleClick={() => addFeedback(neutral, setNeutral)} />
      <Button text="bad" handleClick={() => addFeedback(bad, setBad)} />
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
