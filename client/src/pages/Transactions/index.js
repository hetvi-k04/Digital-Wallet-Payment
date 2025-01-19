import React, { useState, useEffect } from 'react';
import PageTitle from '../../components/PageTitle';
import { Table, message } from 'antd';
import TransferFundModel from './TransferFundModel';
import { useDispatch , useSelector} from 'react-redux';
import { ShowLoading, HideLoading } from '../../redux/loaderSlice';
import { GetTransactionsofUser } from '../../apicalls/transactions';
import moment from "moment";
function Transactions() {
  const [showTransferFundsModel, setShowTransferFundsModel] = useState(false);
  const [showDepositModel,setShowDepositModel] = useState(false);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: 'Transaction ID',
      dataIndex: '_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (text, record) => {
        const isDebit = record.sender === user._id;
        return `${isDebit ? '-' : '+'} ₹${record.amount}`;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text, record) => (record.sender === user._id ? 'Debit' : 'Credit'),
    },
    {
      title: 'Reference Account',
      dataIndex: 'referenceAccount',
      render: (text, record) => {
        return record.sender === user._id
          ? `To: ${record.receiver}`
          : `From: ${record.sender}`;
      },
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
