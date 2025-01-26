import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, message, Table } from "antd";
import PageTitle from "../../components/PageTitle";
import NewRequestModel from "./NewRequestModel";
import { GetAllRequestsByUser, AcceptRequest, DeclineRequest } from "../../apicalls/requests";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";
import moment from "moment";

const { TabPane } = Tabs;
function Requests() {
  const [data, setData] = React.useState({});
  const [showNewRequestModel, setShowNewRequestModel] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  const columns = [
    {
      title: "Request ID",
      dataIndex: "_id",
    },
    {
      title: "Sender",
      dataIndex: "sender",
      render(sender) {
        return sender.firstName + " " + sender.lastName;
      },
    },
    {
      title: "Receiver",
      dataIndex: "receiver",
      render(receiver) {
        return receiver.firstName + " " + receiver.lastName;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss A"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        if (record.status === "pending" && record.receiver._id === user._id) {
          return (
            <div className="flex gap-1">
              <button
                className="text-sm underline text-red-600"
                onClick={() => handleDecline(record._id)}
              >
                Decline
              </button>
              <button
                className="text-sm underline text-green-600"
                onClick={() => handleAccept(record._id)}
              >
                Accept
              </button>
            </div>
          );
        }
      },
    },
  ];

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllRequestsByUser();
      console.log("API Response:", response);
      if (response.success) {
        const sentData = response.data.filter(
          (item) => item.sender._id === user._id
        );
        const receivedData = response.data.filter(
          (item) => item.receiver._id === user._id
        );
        setData({
          sent: sentData,
          received: receivedData,
        });
        console.log("Requests:", response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      dispatch(ShowLoading());
      const response = await AcceptRequest({ requestId });
      dispatch(HideLoading());
      if (response.success) {
        message.success("Request accepted successfully!");
        getData(); // Refresh data after accepting
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      dispatch(ShowLoading());
      const response = await DeclineRequest({ requestId });
      dispatch(HideLoading());
      if (response.success) {
        message.success("Request declined successfully!");
        getData(); // Refresh data after declining
      } else {
        message.error(response.message);
      }
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
        <button
          className="primary-outlined-btn"
          onClick={() => setShowNewRequestModel(true)}
        >
          Request Funds
        </button>
      </div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Sent" key="1">
          <Table columns={columns} dataSource={data.sent || []} />
        </TabPane>
        <TabPane tab="Received" key="2">
          <Table columns={columns} dataSource={data.received || []} />
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
