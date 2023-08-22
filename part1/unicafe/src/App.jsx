import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Statistics = ({text, value}) => <div>{text} {value}</div>

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
      <Statistics text="good" value={good} />
      <Statistics text="neutral" value={neutral} />
      <Statistics text="bad" value={bad} />
    </div>
  )
}

export default App
