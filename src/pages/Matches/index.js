import React, { useState } from 'react';
import Header from '../../components/Header';
import { AiFillHeart } from 'react-icons/ai';
import './index.css';

const Matches = () => {
  const [state, setstate] = useState([
    { matche1: 'Luisferdk', matche2: 'Sidney', match: false },
    { matche1: 'Luisferdk', matche2: 'Sidney', match: false },
    { matche1: 'Luisferdk', matche2: 'Sidney', match: false },
    { matche1: 'Luisferdk', matche2: 'Sidney', match: false },
    { matche1: 'Luisferdk', matche2: 'Sidney', match: false },
    { matche1: 'Luisferdk', matche2: 'Sidney', match: false }
  ]);

  const changeMatch = (id) => {
    setstate([
      ...state.map((item, key) => {
        console.log(item);
        if (key === id) {
          return {
            ...item,
            match: !item.match
          };
        }
        return item;
      })
    ]);
  };
  return (
    <div>
      <Header />
      <div className="container matches">
        <header>
          <h1 className="title">Matches</h1>
          <input placeholder="Search" />
        </header>
        <div className="matches-cards">
          {state.map((item, key) => (
            <div key={key} className="matches-card">
              <h2>Match</h2>
              <div className="parents">
                <div className="parent">
                  <div className="parent-img">
                    <img src="/images/profile.png" alt="" />
                  </div>
                  <h3>{item.matche1}</h3>
                </div>
                <div className="parent">
                  <div className="parent-img">
                    <img src="/images/profile.png" alt="" />
                  </div>
                  <h3>{item.matche2}</h3>
                </div>
              </div>
              <button
                className={`button-confirm ${item.match ? 'active' : ''}`}
                type="button"
                onClick={() => changeMatch(key)}
              >
                <div className="icon">
                  <AiFillHeart />
                </div>
                Confirm Match
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matches;
