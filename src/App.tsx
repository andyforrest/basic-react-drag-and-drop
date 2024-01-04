import { useState } from "react";
import "./App.css";
const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

function App() {
  const [leftList, setLeftList] = useState(initialItems);
  const [rightList, setRightList] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState("");

  function handleDragStart(e: React.DragEvent, index: number) {
    setDraggedItem(leftList[index]);
    console.log("index: " + index);
    console.log("event: ", e);
    console.log(leftList[index]);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDragDrop(event: React.DragEvent) {
    console.log(event)
    setLeftList(
      leftList.filter((item) => {
        return draggedItem !== item;
      })
    );
    setRightList([...rightList, draggedItem]);
    setDraggedItem("");
  }
  return (
    <>
      <div className="cards-container">
        <div className="card">
          {leftList.map((item, index) => (
            <li
              key={index}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
            >
              {item}
            </li>
          ))}
        </div>
        <br />
        <div
          className="card"
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDragDrop(event)}
        >
          {rightList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

