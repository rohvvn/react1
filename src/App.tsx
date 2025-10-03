import { useJsonQuery } from './utilities/fetch';
import Banner from "./components/Banner";
import CourseList from "./components/CourseList";
import { QuarterSelector, ClassList, quarters } from "./components/MenuSelector";
import { useState } from "react";

type Schedule = {
  title: string;
  courses: Record<string, Course>;
}

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

const App = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  const [quarterSelection, setQuarterSelection] = useState(() => Object.keys(quarters)[0]);
  
  if (error) return <h1>Error loading course data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading course data...</h1>;
  if (!json) return <h1>No course data found</h1>;
  
  
  const schedule = json as Schedule;
  
  return (
    <div>
      <Banner title={schedule.title} />
      <QuarterSelector selection={quarterSelection} setSelection={setQuarterSelection} />
      <ClassList selection={quarterSelection} />
      <CourseList courses={schedule.courses} quarterSelection={quarterSelection} />
    </div>
  );
};

export default App;