// import React ,{ useState , useEffect }from 'react'
// import PageTitle from '../../components/PageTitle'
// import {Table , message} from 'antd';
// import TransferFundModel from './TransferFundModel'
// import {useDispatch} from "react-redux";
// import {ShowLoading , HideLoading} from "../../redux/loaderSlice"
// import { GetTransactionsofUser } from '../../apicalls/transactions';

// function Transactions() {
//   // State
//   const [showTransferFundsModel, setShowTransferFundsModel] = useState(false);
//    const [data = [], setData]=React.useState([]);
//    const dispatch = useDispatch ();
//   // Columns for the Ant Design table
//   const columns = [
//     {
//       title: 'Date',
//       dataIndex: 'date',
//     },
//     {
//       title: 'Transaction ID',
//       dataIndex: '_id',
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//     },
//     {
//       title: 'Reference',
//       dataIndex: 'reference',
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//     },
//   ];
//   const getData = async () =>{
// try{
//   dispatch(ShowLoading());
//   const response = await GetTransactionsofUser();
//   console.log("API Response:", response);
//   if (response.success){
//     setData(response.data);
//     console.log("Transactions:", response.data);
//   }else{
//     message.error(response.message);
//   }
//   dispatch(HideLoading());
// }catch(error){
//   dispatch(HideLoading());
//   message.error=(error.message);
// }
//   }
//   useEffect(()=>{
//     getData();
//   },[])
//   return (
//     <div>
//       <div className="flex justify-between items-center">
//         <PageTitle title="Transactions" />
//         <div className="flex gap-2">
//           <button className="primary-outlined-btn">DEPOSIT</button>
//           <button
//             className="primary-contained-btn"
//             onClick={() => setShowTransferFundsModel(true)}
//           >
//             TRANSFER
//           </button>
//         </div>
//       </div>

//       <Table columns={columns} dataSource={data} className="mt-2" />

//       {showTransferFundsModel && (
//         <TransferFundModel
//           showTransferFundsModel={showTransferFundsModel}
//           setShowTransferFundsModel={setShowTransferFundsModel}
//           reloadData={() => console.log('Reload data')} // Replace with actual function
//         />
//       )}
//     </div>
//   );
// }

// export default Transactions;
import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import { Table, message } from 'antd';
import TransferFundModel from './TransferFundModel';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { GetTransactionsofUser } from '../../apicalls/transactions';

function Transactions() {
  const [showTransferFundsModel, setShowTransferFundsModel] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text) => new Date(text).toLocaleDateString(), // Format date if needed
    },
    {
      title: 'Transaction ID',
      dataIndex: '_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetTransactionsofUser();
      console.log('API Response:', response);
      if (response.success) {
        setData(response.data);
        console.log('Transactions:', response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Transactions" />
        <div className="flex gap-2">
          <button className="primary-outlined-btn">DEPOSIT</button>
          <button
            className="primary-contained-btn"
            onClick={() => setShowTransferFundsModel(true)}
          >
            TRANSFER
          </button>
        </div>
      </div>

      <Table columns={columns} dataSource={data} className="mt-2" />

      {showTransferFundsModel && (
        <TransferFundModel
          showTransferFundsModel={showTransferFundsModel}
          setShowTransferFundsModel={setShowTransferFundsModel}
          reloadData={() => getData()} // Reload transaction data after transfer
        />
      )}
    </div>
  );
}

export default Transactions;
