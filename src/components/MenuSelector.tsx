const quarters = {
  Fall: 'Fall quarter classes...',
  Winter: 'Winter quarter classes...',
  Spring: 'Spring quarter classes...'
};

const QuarterButton = ({quarter, selection, setSelection}: {quarter: string, selection: string, setSelection: (quarter: string) => void}) => (
  <div>
    <input type="radio" id={quarter} className="btn-check" checked={quarter === selection} autoComplete="off"
      onChange={() => setSelection(quarter)} />
    <label className="btn btn-success mb-1 p-2" htmlFor={quarter}>
    { quarter }
    </label>
  </div>
);

const QuarterSelector = ({selection, setSelection}: {selection: string, setSelection: (quarter: string) => void}) => (
  <div className="btn-group">
    { 
      Object.keys(quarters).map(quarter => <QuarterButton key={quarter} quarter={quarter} selection={selection} setSelection={setSelection} />)
    }
  </div>
);

const ClassList = ({selection}: {selection: string}) => (
  <div className="card" >
  { quarters[selection as keyof typeof quarters] }
  </div>
);

export { QuarterSelector, ClassList, quarters };
