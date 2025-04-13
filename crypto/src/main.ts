import { makeMediaTokenMetadata } from "@zoralabs/protocol-sdk"
import { pinFileWithPinata, pinJsonWithPinata } from "./pinata"
import * as fs from 'fs'

async function makeImageTokenMetadata({
  imageFile,
  thumbnailFile,
}: {
  imageFile: File;
  thumbnailFile: File;
}) {
  // upload image and thumbnail to Pinata
  const mediaFileIpfsUrl = await pinFileWithPinata(imageFile)
  const thumbnailFileIpfsUrl = await pinFileWithPinata(thumbnailFile)

	console.log(imageFile.name)
  // build token metadata json from the text and thumbnail file
  const metadataJson = await makeMediaTokenMetadata({
    mediaUrl: mediaFileIpfsUrl,
    thumbnailUrl: thumbnailFileIpfsUrl,
		description: "Lore ipsum",
    name: imageFile.name,
  });
	console.log(metadataJson)
  // upload token metadata json to Pinata and get ipfs uri
  const jsonMetadataUri = await pinJsonWithPinata(metadataJson);

  return jsonMetadataUri;
}

const satFileName = "satoshi.jpg"
const satRaw = fs.readFileSync("./" + satFileName);
const satFile = new File([satRaw], satFileName, { type: "image/jpeg" });

const satThumbFileName = "satoshi.jpg"
const satThumbRaw = fs.readFileSync("./" + satThumbFileName);
const satThumbFile = new File([satThumbRaw], satThumbFileName, { type: "image/jpeg" });

makeImageTokenMetadata({imageFile: satFile, thumbnailFile: satThumbFile}).then(console.log).catch(_=>console.log("Error"))
