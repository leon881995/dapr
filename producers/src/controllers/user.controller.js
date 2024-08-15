const { DaprClient } = require('@dapr/dapr');

const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user.service');

const daprHost = process.env.DAPR_HOST || "http://localhost";
const daprPort = process.env.DAPR_HTTP_PORT || "3500";
const pubSubName = "userpubsub";
const pubSubTopic = "createUser";

const publish = catchAsync(async (req, res) => {

  console.log("Publishing data to Dapr PubSub");
  const client = new DaprClient({ daprHost, daprPort });

  await client.pubsub.publish(pubSubName, pubSubTopic, {
    userId: 1
  });
  console.log("Published data: " + JSON.stringify({ userId: 1}));
});

const saveStore = catchAsync(async (req, res) => {
  console.log("Saving data to Dapr State Store");
  const client = new DaprClient({ daprHost, daprPort });

  await client.state.save("statestore", [
    {
      key: "1",
      value: "makini"
    },
    {
      key: "2",
      value: "makini link"
    }
  ]);
  console.log("Saved data: " + JSON.stringify([
    {
      key: "1",
      value: "makini"
    },
    {
      key: "2",
      value: "makini link"
    }
  ]));

  const result = await client.state.get('statestore', "1");
  console.log("Result after get: " + result);
});

const getUsers =  catchAsync(async (req, res) => {
  return res.status(200).json({
    status: 'success',
    data: {
      message: 'Hello from user service'
    }})
})


module.exports = {
  publish,
  saveStore,
  getUsers
};
