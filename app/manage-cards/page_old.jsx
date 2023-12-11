'use client';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

import CardList from "@components/CardList";

const ManageCards = () => {
  const [cards, setCards] = useState([]);

  useEffect(()=>{
    const fetchCards = async () =>{
      const response = await fetch('/api/cards');
      const data = await response.json();
      setCards(data);
    }
    fetchCards();
  },[]);

  return (
    <div className="flex h-full w-full py-10 px-4">
        <CardList data={cards} />
    </div>
  )
}

export default ManageCards