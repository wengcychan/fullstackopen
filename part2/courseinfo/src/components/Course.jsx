const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => 
	<p>
		<b>
			total of {parts.reduce((total, part) => total + part.exercises, 0)} exercises
		</b>
	</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
	<>
		{parts.map((part) => 
			<Part key={part.id} part={part} />
		)}    
	</>

const CourseInfo = ({ course }) => 
	<>
		<Header course={course.name} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</>

const Course = ({ courses }) => 
	<>
		<h1>Web development curriculum</h1>
		{courses.map((course) => 
			<CourseInfo key={course.id} course={course} />
		)}
	</>

export default Course