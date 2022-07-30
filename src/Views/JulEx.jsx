import React, { useState } from "react";
import Papa from "papaparse";

export const JulEx = () => {
  const [file, setFile] = useState([])

  function handleCSV(e) {
    const file = e.target.files[0] 
    // console.log(file)
    Papa.parse(file,{
      complete: (results) => {
        setFile(results.data)
        console.log(results)
      }
    })
  }

  return(
    <>
      <p>Hello World</p>
      <input
        name="arquivo"
        type="file"
        accept=".csv"
        onChange={e => handleCSV(e)}
      />

      {file.map((e,i) => {
        return (
          <p key={i}>{e.join(' ')}</p>
          )
      })}
    </>
  )

}