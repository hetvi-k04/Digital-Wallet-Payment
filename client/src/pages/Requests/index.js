import React from 'react';
import {useEffect }from 'react';
import {useDispatch} from "react-redux";
import { Tabs , message } from 'antd';
import PageTitle from '../../components/PageTitle';
import NewRequestModel from "./NewRequestModel";
import { GetAllRequestsByUser } from '../../apicalls/requests';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';

const { TabPane } = Tabs;

function Requests() {
    const [data,setData]=React.useState({})
    const [showNewRequestModel , setShowNewRequestModel] = React.useState(false);
    const dispatch = useDispatch();
    const columns = [
        {
        title:"Request ID",
        dataIndex: "_id",
        },
        {
          title:"User",
          dataIndex:"user,"  
        },
        {
            title:"Date",
            dataIndex:"date",
        },
        {
            title:"Status",
            dataIndex:"status,"
        }
    ]
    const getData = async () => {
        try {
          dispatch(ShowLoading());
          const response = await GetAllRequestsByUser();
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
        <PageTitle title="Requests" />
        <button className="primary-outlined-btn"
        onClick={()=> setShowNewRequestModel(true)}>
          Request Funds
        </button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Sent" key="1">
          {/* Sent requests content here */}
          Sent
        </TabPane>
        <TabPane tab="Received" key="2">
          {/* Received requests content here */}
          Received
        </TabPane>
      </Tabs>

      {showNewRequestModel && (
        <NewRequestModel
        showNewRequestModel={showNewRequestModel}
          setShowNewRequestModel={setShowNewRequestModel}
          reloadData={() => getData()} // Reload transaction data after transfer
        />
      )}

    </div>
  );
}

export default Requests;
