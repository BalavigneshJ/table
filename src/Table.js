import React, { useState, useEffect } from 'react';
import './table.css';
export default function Table(props) {
  const [column, setColumn] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [row, setRow] = useState([]);
  const [page, setPage] = useState(10);
  const [start, setStart] = useState(1);
  
  const btnInitialState = {
    isStartDisabled: true,
    isPrevDisabled: true,
    isNextDisabled: false,
    isEndDisabled: false,
  }
  const [disableBtn, setDisableBtn] = useState(btnInitialState);

  const fitRow = (data) => {
    setRowData([...data]);
    setRow(data.slice(0, page));
  };

  const handleClick = (key) => {
    if (key === 'start') {
      setStart(1);
      setDisableBtn(btnInitialState);
      return;
    } else if (key === 'end') {
        let newStart = rowData.length % page ? (rowData.length - (rowData.length % page) + 1) : (rowData.length - page + 1) ;
        setStart(newStart);
        setDisableBtn({
            isStartDisabled: false,
            isNextDisabled: true,
            isEndDisabled: true,
            isPrevDisabled: false,
          });
      
    } else if (key === 'prev') {
        let newStart = start - page ;
        setStart(newStart)
        if(newStart - page < 1){
            setDisableBtn(btnInitialState);
        }
        return;

    } else if (key === 'next') {
        let newStart = start + page ;
        setStart(newStart)
        if((parseInt(newStart) + parseInt(page)) > rowData.length){
            setDisableBtn({
                isStartDisabled: false,
                isNextDisabled: true,
                isEndDisabled: true,
                isPrevDisabled: false,
            });
        } else {
            setDisableBtn({
                isStartDisabled: false,
                isNextDisabled: false,
                isEndDisabled: false,
                isPrevDisabled: false,
            });
        }
        return;
    }
  };

  useEffect(() => {
    setRow(rowData.slice( parseInt(start) - 1 , parseInt(start)+parseInt(page)-1));
  },[start])

  useEffect(() => {
    let newStart = 1 ;
    setStart(newStart);
    if(start === newStart){
        setRow(rowData.slice( parseInt(start) - 1 , parseInt(start)+parseInt(page)-1));
    }
  },[page])

  useEffect(() => {
    if (props.data.status) {
      setColumn([
        'Product Id',
        'Product Name',
        'Original Price',
        'Sale Price',
        'Product Type',
        'Description',
      ]);
      fitRow(props.data.message);
    }
  }, [props.data]);

  const handleSearch = (ev) => {
    let key = ev.target.value;
    if (key.length) {
      const result = rowData.filter((r) => {
        return r.product_name.toLowerCase().includes(key.toLowerCase());
      });
      setRow(result);
    } else {
      fitRow(props.data.message);
    }
  };

  const TableColumn = (props) => {
    let colData = [
      props.rowData._id,
      props.rowData.product_name,
      props.rowData.original_price,
      props.rowData.sale_price,
      props.rowData.product_type,
      props.rowData.description,
    ];
    return (
      <>
        {colData.map((c) => {
          return <td>{c}</td>;
        })}
      </>
    );
  };

  const TableRow = () => {
    return (
      <>
        {row.map((r) => {
          return (
            <tr key={r._id}>
              <TableColumn rowData={r} />
            </tr>
          );
        })}
      </>
    );
  };

  return (
    <div
      style={{
        width: '90%',
        margin: 'auto',
        marginTop: '30px',
        border: '1px solid',
        padding: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px',
        }}
      >
        <span style={{ fontSize: '20px', fontWeight: '600' }}>
          Product List
        </span>
        <input
          style={{ width: '300px' }}
          onChange={handleSearch}
          placeholder="search by name"
        ></input>
      </div>
      <table>
        <thead>
          <tr>
            {column.map((c) => {
              return <th>{c}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <TableRow />
        </tbody>
      </table>
      <div
        style={{
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <p>Rows per page</p>
          <select
            onChange={(ev) => {
              setPage(ev.target.value);
            }}
            style={{ height: '25px', width: '45px' }}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
            <option value="30">30</option>
          </select>
        </div>
        <div>
          {`${start}-${ ((start + page - 1) > rowData.length) ? rowData.length : (start + page - 1)}`} of {rowData.length}
        </div>
        <div className="pagination_btn_wrap">
          <button
            disabled={disableBtn.isStartDisabled}
            onClick={() => handleClick('start')}
          >
            {'<<'}
          </button>
          <button
            disabled={disableBtn.isPrevDisabled}
            onClick={() => handleClick('prev')}
          >
            {'<'}
          </button>
          <button
            disabled={disableBtn.isNextDisabled}
            onClick={() => handleClick('next')}
          >
            {'>'}
          </button>
          <button
            disabled={disableBtn.isEndDisabled}
            onClick={() => handleClick('end')}
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
}
