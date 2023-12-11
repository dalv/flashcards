'use client';

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Card from "@components/Card";
import { FaPlusCircle } from 'react-icons/fa';

const CardList = ({ data }) => {

  const [cardData, setCardData] = useState(data);
  const [submitting, setSubmitting] = useState(false);

  useEffect(()=>{
    setCardData(data);
  },[data]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitting(true);

      setSubmitting(false);
  }

  const createNewCard = async () => {
    try {
      const response = await fetch("/api/cards/new", {
        method: "POST",
        body: JSON.stringify({
          front: '',
          back: '',
        }),
      });

      if (response.ok) {
        const newCard = await response.json();
        setCardData(prevData => [...prevData, newCard]);
      }
      else{
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } 
  };

    return (
      <div className="flex flex-row">
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-2xl flex flex-col"
        >
          {cardData.map((card)=>(
            <Card key={card._id} card={card} />
          ))} 


          <div className="flex flex-column gap-4 my-2">
            <button onClick={createNewCard}>
               <FaPlusCircle/>
            </button>

          </div>        
        </form>
      </div>
    )  
  }
  
  export default CardList