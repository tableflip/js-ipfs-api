'use strict'

const bs58 = require('bs58')
const Int64 = require('node-int64')

module.exports = {
  deserialize (data, enc) {
    enc = enc ? enc.toLowerCase() : 'json'

    if (enc === 'json') {
      return deserializeFromJson(data)
    } else if (enc === 'base64') {
      return deserializeFromBase64(data)
    }

    throw new Error(`Unsupported encoding: '${enc}'`)
  }
}

function deserializeFromJson (data) {
  const json = JSON.parse(data)
  return deserializeFromBase64(json)
}

function deserializeFromBase64 (obj) {
  if (!isPubsubMessage(obj)) {
    throw new Error(`Not a pubsub message`)
  }

  // console.log(obj)
  const n = new Int64(new Buffer(obj.seqno, 'base64'))
  // console.log(obj.seqno, n, n.toString(), n.toOctetString(), n.toNumber(true))

  return {
    from: bs58.encode(new Buffer(obj.from, 'base64')).toString(),
    seqno: n.toNumber(true),//new Buffer(obj.seqno, 'base64'),
    data: new Buffer(obj.data, 'base64'),
    topicCIDs: obj.topicIDs || obj.topicCIDs
  }
}

function isPubsubMessage (obj) {
  return obj && obj.from && obj.seqno && obj.data && (obj.topicIDs || obj.topicCIDs)
}
