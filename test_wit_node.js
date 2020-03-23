/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 */

'use strict';

// Messenger API integration example
// We assume you have:
// * a Wit.ai bot setup (https://wit.ai/docs/quickstart)
// * a Messenger Platform setup (https://developers.facebook.com/docs/messenger-platform/quickstart)
// You need to `npm install` the following dependencies: body-parser, express, node-fetch.
//
// 1. npm install body-parser express node-fetch
// 2. Download and install ngrok from https://ngrok.com/download
// 3. ./ngrok http 8445
// 4. WIT_TOKEN=your_access_token FB_APP_SECRET=your_app_secret FB_PAGE_TOKEN=your_page_token node examples/messenger.js
// 5. Subscribe your page to the Webhooks using verify_token and `https://<your_ngrok_io>/webhook` as callback URL.
// 6. Talk to your bot on Messenger!

const bodyParser = require('body-parser');
const crypto = require('crypto');
const express = require('express');
const fetch = require('node-fetch');

let Wit = null;
let log = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  log = require('../').log;
} catch (e) {
  Wit = require('node-wit').Wit;
  log = require('node-wit').log;
}








var FB_credentials = {
      "pageAccessToken": "EAACDQjiTnkwBAAiXOL1XZAiczz6uvRUZAZBswBt22VtC0wM1wA3ayQU8bT5KTiThWmVrIh6nkWrSWsbasY4oMBJdz9g0mG7PZApwtdrNX5X7Dn66SUfR1BRPsZA6RagBOmEDTxzdLIq8EhJ6GB2bVOVFZAv8QiZBZAgdcxddujDogJ6GT4pGe12M",
      "verifyToken": "dcc6de2cd9a37bc06f1f9bba908584fce25cd4f65d74761c709aa80e093d2ae1a44002f1d82a2420217f3cb225a5a540e355ca95a75a4b4b26aa05083bb04fee",
      "appSecret": "552c233110836eac8a88d5a887cb84db"
    }
  




// Webserver parameter
const PORT = process.env.PORT || 3000;

// Wit.ai parameters
const WIT_TOKEN = process.env.WIT_TOKEN || "PFPRQVN6M45U74UNKU63YSZLJHE7UGAI";

// Messenger API parameters
const FB_PAGE_TOKEN = process.env.FB_PAGE_TOKEN || "EAACDQjiTnkwBAAiXOL1XZAiczz6uvRUZAZBswBt22VtC0wM1wA3ayQU8bT5KTiThWmVrIh6nkWrSWsbasY4oMBJdz9g0mG7PZApwtdrNX5X7Dn66SUfR1BRPsZA6RagBOmEDTxzdLIq8EhJ6GB2bVOVFZAv8QiZBZAgdcxddujDogJ6GT4pGe12M";
if (!FB_PAGE_TOKEN) { throw new Error('missing FB_PAGE_TOKEN') }
const FB_APP_SECRET = process.env.FB_APP_SECRET || "552c233110836eac8a88d5a887cb84db";
if (!FB_APP_SECRET) { throw new Error('missing FB_APP_SECRET') }

let FB_VERIFY_TOKEN = "dcc6de2cd9a37bc06f1f9bba908584fce25cd4f65d74761c709aa80e093d2ae1a44002f1d82a2420217f3cb225a5a540e355ca95a75a4b4b26aa05083bb04fee";


