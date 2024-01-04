import { useState } from "react";
import "./App.css";
const initialItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];

function App() {
  const [leftList, setLeftList] = useState(initialItems);
  const [rightList, setRightList] = useState<string[]>([]);
  const [draggedItem, setDraggedItem] = useState("");

  function handleDragStartLeft(event: React.DragEvent, index: number) {
    setDraggedItem(leftList[index]);
    console.log("index: " + index);
    console.log("event: ", event);
    console.log(leftList[index]);
  }

  function handleDragStartRight(event: React.DragEvent, index: number) {
    setDraggedItem(rightList[index]);
    console.log("index: " + index);
    console.log("event: ", event);
    console.log(rightList[index]);
  }

  function handleDragOver(event: React.DragEvent) {
    event.preventDefault();
  }

  function handleDragDropLeft(event: React.DragEvent) {
    console.log(event);
    setRightList(
      rightList.filter((item) => {
        return draggedItem !== item;
      })
    );
    setLeftList([...leftList, draggedItem]);
    setDraggedItem("");
  }

  function handleDragDropRight(event: React.DragEvent) {
    console.log(event);
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
        <div
          className="card"
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDragDropLeft(event)}
        >
          {leftList.map((item, index) => (
            <li
              key={index}
              draggable
              onDragStart={(event) => handleDragStartLeft(event, index)}
            >
              {item}
            </li>
          ))}
        </div>
        <br />
        <div
          className="card"
          onDragOver={(event) => handleDragOver(event)}
          onDrop={(event) => handleDragDropRight(event)}
        >
          {rightList.map((item, index) => (
            <li
              key={index}
              draggable
              onDragStart={(event) => handleDragStartRight(event, index)}
            >
              {item}
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
