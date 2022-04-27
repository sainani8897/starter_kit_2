const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(
  "dd7fee87275b3683271d",
  "623f7a4a65bbde2a7ac58672dec38ab876de706751670756f5fa12a2233bb2bb"
);

var http = require("http");
http
  .createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello World!");
    res.end();
  })
  .listen(8080);

pinata
  .testAuthentication()
  .then((result) => {
    //handle successful authentication here
    console.log(result);
  })
  .catch((err) => {
    //handle error here
    console.log(err);
  });

const fs = require("fs");
const readableStreamForFile = fs.createReadStream("./i_opp_caa_nrc.png");
const options = {
  pinataMetadata: {
    name: "WEEE",
    keyvalues: {
      customKey: "customValue",
      customKey2: "customValue2",
    },
  },
  pinataOptions: {
    cidVersion: 0,
  },
};
pinata
  .pinFileToIPFS(readableStreamForFile, options)
  .then((result) => {
    //handle results here
    console.log(result);
    const toJson = {
      description: "WEE",
      image: "https://gateway.pinata.cloud/ipfs/" + result.IpfsHash,
      name: "WEE",
    };
    const res =  fs.writeFileSync(
      "./jsonfiles/WEE.json",
      JSON.stringify(toJson)
    );
     pinataToJson("./jsonfiles/WEE.json");
  })
  .catch((err) => {
    //handle error here
    console.log(err);
  });

async function pinataToJson(url) {
  const readableStreamForFile = fs.createReadStream(url);
  const options = {
    pinataMetadata: {
      name: "WEEE",
      keyvalues: {
        customKey: "customValue",
        customKey2: "customValue2",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  const jsonObj = await pinata.pinFileToIPFS(readableStreamForFile, options);
  console.log(jsonObj);
}
