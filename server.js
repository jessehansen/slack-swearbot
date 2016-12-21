'use strict'

const express = require('express')
const Slapp = require('slapp')
const ConvoStore = require('slapp-convo-beepboop')
const Context = require('slapp-context-beepboop')
const words = require('profane-words');

// use `PORT` env var on Beep Boop - default to 3000 locally
var port = process.env.PORT || 3000

const random = (min,max) => Math.floor(Math.random()*(max-min+1)+min);

var slapp = Slapp({
  // Beep Boop sets the SLACK_VERIFY_TOKEN env var
  verify_token: process.env.SLACK_VERIFY_TOKEN,
  convo_store: ConvoStore(),
  context: Context()
})

slapp.command('/swear', msg => {
  let index = random(0, words.length-1);
  let swear = words[index];
  swear.replace(/\*/g, '');
  msg.respond(swear);
});

// attach Slapp to express server
var server = slapp.attachToExpress(express())

// start http server
server.listen(port, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Listening on port ${port}`)
})
