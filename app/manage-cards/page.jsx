'use client';

import { useState, useEffect } from 'react'

const ManageCards = () => {

  const [activeTab, setActiveTab] = useState('allCards');
  const [cards, setCards] = useState([]);

  useEffect(()=>{
    const fetchCards = async () =>{
      const response = await fetch('/api/cards');
      const data = await response.json();
      setCards(data);
    }
    fetchCards();
  },[]);

  function sanitizeCsv(csvString) {
    return csvString.split('\n')
        .map(line => 
            line.split(',').map(value => 
                `"${value.trim().replace(/"/g, '""')}"`
            ).join(',')
        ).join('\n');
  }


  const insertNewCards = async () => {
    try {
      const csv = document.getElementById('csvTextArea').value;
      const sanitizedCsv = sanitizeCsv(csv);

      const response = await fetch("/api/cards/batchinsert", {
        method: "POST",
        headers: {
          'Content-Type': 'text/csv'
        },
        body: sanitizedCsv
      });

      if (response.ok) {
        document.getElementById('csvTextArea').value = '';
      }
      else{
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } 
  };

  const deleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all cards?")) {
      const response = await fetch('/api/cards/delete', {
        method: 'DELETE',
      });
    }
  }

  return (
      <div className='text-white w-full h-full'>
          <div className="flex border-b">
              <button
                  className={`p-2 ${activeTab === 'allCards' ? 'border-b-2 border-blue-500' : ''}`}
                  onClick={() => setActiveTab('allCards')}
              >
                  All Cards
              </button>
              <button
                  className={`p-2 ${activeTab === 'insert' ? 'border-b-2 border-blue-500' : ''}`}
                  onClick={() => setActiveTab('insert')}
              >
                  Insert
              </button>
          </div>

          <div className="p-4">
              {activeTab === 'allCards' && 
              <div>
                <table className="h-500 overflow-y-scroll mb-4">
                    <thead>
                        <tr>
                        <th className="w-[200px] px-4 py-2">Front</th>
                        <th className="w-[200px] px-4 py-2">Back</th>
                        <th className="w-[80px] px-4 py-2">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map((card, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{card.front}</td>
                                <td className="border px-4 py-2 text-gray-600">{card.back}</td>
                                <td className="border px-4 py-2">{card.score}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={deleteAll}>
                  Delete All
                </button>
              </div>}
              {activeTab === 'insert' && 
              <div className="flex flex-col items-center">
                <textarea className="w-full p-2 mb-4 border border-gray-300 rounded resize-y text-black" id="csvTextArea" rows="20"></textarea>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={insertNewCards}>
                  Insert
                </button>
              </div>}
          </div>
      </div>
  );
};

export default ManageCards