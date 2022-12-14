import React, {  useState } from "react";
import * as XLSX from 'xlsx/xlsx.mjs';
import { Container, InputContainer, Table } from "../Styles/JulEx";

export const JulEx = () => {
  const [file, setFile] = useState([])

  function capitalizeFirstLetter(string) {
    string = string.toLowerCase()
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
  }

  function handleCSV(e) {
    const file = e.target.files[0] 
    file.arrayBuffer().then((res) => {
      let data = new Uint8Array(res)
      let workBook = XLSX.read(data, {type: 'array'})
      let sheetName = workBook.SheetNames[0]
      let workSheet = workBook.Sheets[sheetName]
      let json = XLSX.utils.sheet_to_json(workSheet)
      setFile(json)
    })
  }

  return(
    <Container>
      <InputContainer>
        <label htmlFor='uploader'>Suba um arquivo no formato .xlsx</label>
        <input
          id="uploader"
          name="arquivo"
          type="file"
          accept=".xlsx"
          onChange={e => handleCSV(e)}
        />
      </InputContainer>

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>ta valendo?</th>
            <th>Nome completo</th>
          </tr>
        </thead>
        <tbody>
          {file.map((e,i) => (
            <tr key={i}>
              <th>{e['Razão Social'].split(' ')[0] === '' ? capitalizeFirstLetter(e['Razão Social'].split(' ')[1]) : capitalizeFirstLetter(e['Razão Social'].split(' ')[0])}</th>
              <th>{e['Telefones']?.replaceAll('(','')?.replaceAll(')','')?.replaceAll(' ','')?.replaceAll('-','')?.replace(/^55/,'')?.replace(/^0/,'')}</th>
              <th>{e['Telefones']?.replaceAll('(','')?.replaceAll(')','')?.replaceAll(' ','')?.replaceAll('-','')?.replace(/^55/,'')?.replace(/^0/,'').length === 11 ? 'sim' : 'não' }</th>
              <th>{e['Razão Social']}</th>
            </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  )
}