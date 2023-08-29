{/* archivo de Search. js dentro de carpeta Search dentro de carpeta components */}
import React from 'react'
import { useState } from 'react';

export default function Search( { onCityChange } ) {
    const [city, setCity] = useState("");

    const handleSearch = () => {
        onCityChange(city);
      };
    
  return (
    <div className='d-flex w-100 justify-content-between p-4'>
          <button
          className="btn btn-secondary d-flex flex-start"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
          >
         Search for places
          </button>

          <button className='btn btn-secondary'>Hello</button>

          <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          tabindex="-1"
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
          >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
              Backdrop with scrolling
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
          <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

          </div>
        </div>
        </div>
  )
}
