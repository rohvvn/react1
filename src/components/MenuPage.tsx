import { useState } from "react";
import { QuarterSelector, ClassList, quarters } from "./MenuSelector";

const MenuPage = () => {
  const [selection, setSelection] = useState(() => Object.keys(quarters)[0]);
  return (
    <div>
      <QuarterSelector selection={selection} setSelection={setSelection} />
      <ClassList selection={selection} />
    </div>
  );
}

export default MenuPage;