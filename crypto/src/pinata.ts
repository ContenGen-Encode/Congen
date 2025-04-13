const PINATA_JWT = "eyJ...";

export async function pinFileWithPinata(file: File) {
  const data = new FormData()
  data.append("file", file)
  data.append("pinataOptions", '{"cidVersion":1}')

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: data,
  });

  const result = (await res.json());

  return `ipfs://${result.IpfsHash}`;
}

export async function pinJsonWithPinata(json: object) {
  const data = JSON.stringify({
    pinataOptions: { cidVersion: 1 },
    pinataContent: json,
    pinataMetadata: {
      name: "metadata.json",
    },
  });

  const res = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PINATA_JWT}`,
    },
    body: data,
  });

  const result = (await res.json());

  return `ipfs://${result.IpfsHash}`;
}

// let c = "Hello world"
// let blob = new Blob([c], { type: 'text/plain' })
// let f: File = new File([blob], "foo.txt", {type: "text/plain"})
// pinFileWithPinata(f).then(console.log).catch(_=>console.log("error"))
