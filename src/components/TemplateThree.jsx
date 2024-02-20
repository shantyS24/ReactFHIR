import React, { useRef, useState, useEffect } from "react";
import Toast from './Toast'
import InstanceBtn from "./InstanceBtn";
import "amazon-connect-streams";

function initCCP() {
  const connectUrl = "https://ctgconnect.my.connect.aws/connect";
  connect.agentApp.initApp("ccp", "ccp-container", connectUrl + "/ccp-v2/", {
    loginPopup: false,
    loginOptions: {
      // optional, if provided opens login in new window
      autoClose: true, // optional, defaults to `false`
    },
  });
  
};
// Init the Notification
const showNotification = (queue) => {
  const notification = new Notification("Incoming Call Customer Waiting!", {
    body: "Customer is calling make sure to answer. From queue " + queue,
    icon: "favicon.png",
    image: "assets/media/notification.jpg",
  });
  notification.onclick = (e) => {
    window.focus();
  };
};

function TemplateThree() {
	const [isConnected, setIsConnected] = useState(false);
  const isFirstConnect = useRef(true);

	        // Component's props definition
					const [toastOptions, setToastOptions] = useState({
						name: "",
						visibility: "hide",
					});
					const [btnOptions, setBtnOptions] = useState({
						buttonColor: "invisible",
						buttonLabel: "",
						buttonUrl: "",
					});

  console.log("SoftPhone");
  useEffect(() => {
    console.log(isFirstConnect.current);
    if (isFirstConnect.current) {
      
      
        initCCP();
        connect.contact((contact) => {
          const contactAttributes = contact.getAttributes();
          // Function while call is being connected
          contact.onConnecting(function (contact) {
            console.log(`onConnecting(${contact.getContactId()})`);
            // Toast props definition
            const queue = contact.getQueue().name;
            setToastOptions({
              ...toastOptions,
              name: queue,
              visibility: "show",
            });
            // InstanceBtn props definition
            setBtnOptions({
              ...btnOptions,
              buttonColor: contactAttributes.buttonColor.value,
              buttonLabel: contactAttributes.buttonLabel.value,
              buttonUrl: contactAttributes.buttonUrl.value,
            });
            // Notification
            // Check if on device the notification permission is already granted
            if (Notification.permission === "granted") {
              showNotification(queue);
            } else if (Notification.permission !== "denied") {
              Notification.requestPermission().then((permission) => {
                showNotification(queue);
              });
            }
          });
          /*Function while call is connected with agent*/
          contact.onConnected(function () {
            // Toast props
            setToastOptions({
              ...toastOptions,
              name: "",
              visibility: "hide",
            });
          });
          /*Function for when call  data is destroyed*/
          contact.onDestroy(function () {
            // InstanceBtn props
            setBtnOptions({
              ...btnOptions,
              buttonColor: "invisible",
              buttonLabel: "",
              buttonUrl: "",
            });
          });
        });




      isFirstConnect.current = false;
    } else {
      setIsConnected(true);
    }
  }, []);
	return (
    <React.Fragment>
      <div className='container-fluid'>
        <div id='tools' className="offset-1">
          <div
            id='ccp-container'
            className='col-3 col-md-3 p-0'
            style={{ height: "60vh" }}></div>
          <div
            id='tools-container'
            className='col-3 col-md-3 p-0'
            style={{ height: "30vh", backgroundColor: "lightgray" }}>
            <h4 className='text-center p-2'>Tools</h4>
            <div id='toast-agent'><Toast toast={toastOptions} /></div>
            <div id='instance-btn' className='text-center'><InstanceBtn queue={btnOptions} /></div>
          </div>
        </div>
      </div>
    </React.Fragment>
	);
}

export default TemplateThree;
