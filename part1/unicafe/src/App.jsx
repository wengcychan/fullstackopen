import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{text === 'positive' ? `${value} %` : value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0)
    return <div>No feedback given</div>

  const all = good + neutral + bad
  const positive = good / all * 100
  const average = (good * 1 + bad * -1) / all

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={positive}/>
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
