'use client';

import { useState, useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa';

const Card = ({ card }) => {
  
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);

  useEffect(()=>{
    setFront(card.front);
    setBack(card.back);
  },[]);

  const handleChangeFront = (e) => {
    setFront(e.target.value);
    setShowSaveButton(true);
  };

  const handleChangeBack = (e) => {
    setBack(e.target.value);
    setShowSaveButton(true);
  };

  const save = async () => {
    try {
      const response = await fetch(`/api/cards/${card._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          front: front,
          back: back,
        }),
      });

      if (response.ok) {
        console.log("saved!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setShowSaveButton(false);
    }
  };

  return (
    <label>
      <input
          value={front}
          onChange={handleChangeFront}
          className="my-0.5 mx-1"
        />
      <input
          value={back}
          onChange={handleChangeBack}
          className="my-0.5 mx-1"
        />
        <button 
          className={showSaveButton ? "" : "hidden"}
          onClick={save}
        >
            <FaCheckCircle/>
        </button>
    </label>
  )
}

export default Card