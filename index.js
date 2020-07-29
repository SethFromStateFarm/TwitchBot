const tmi = require('tmi.js');
const Eris = require('eris');
const bot = new Eris('', {restMode: true})
const discord = ""; 

const actions = [ // Meant for point redeeming
    {
      id: 1,
      action: "Stretch!",
      cost: "100"
    },
    {
      id: 2,
      action: "Hydrate!",
      cost: "125"
    },
    {
      id: 3,
      action: "Vibe Check!",
      cost: "200"
    },
]

// Twitch Config //
const opts = {
  connection: {
    reconnect: true,
      secure: true
  },
  identity: {
    username: "username",
      password: "token"
  },
  channel: [
    "your_channel"    
  ]
};

const client = new tmi.client(opts);

// Connection / Code //

client.on('connected', () => {
    console.log("Connected to Twitch!")
});

client.connect();

bot.on('ready', () => { 
  if(discord > 0) {
   bot.getRESTChannel(discord).then(a => {
     if(!a) {
      console.log("Disconnected from Discord. (Invalid log channel.)")
     }
   })
  } else {
    console.log("Connected to Discord!");   
  }
})

const MongoClient = require('mongodb').MongoClient;
  const uri = "<connection_link>";
    const dat = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true});

dat.connect(function(err, db) {
    const dbo = db.db("<collection_name>");
    if(err) throw err
    console.log("Connected to Database");
    check = check + 1;
    
    const collection = "<database_name>";

// Functions //

function com(channel, seconds) {
    if(seconds !== 30 || 60 || 90 || 120 || 150 || 180) return client.say(channel, "Available times: 30, 60, 120, 150, & 180.");
    try {
      client.commercial(channel, seconds);   
      client.say(channel, "Running commercial!");
        if(discord > 0) {
          bot.createMessage(discord, "**Commercial Running** - " + seconds + " second duration.")
        } else {
          return;  
        } 
    }
    catch(error) {
      console.log(`ERR:\n${error}`);
    }
}

// Events //

client.on('cheer', (channel, userstate, message) => {
     if(message == 0) {
       client.say(channel, `${userstate.display-name} has cheered ${userstate.bits} bits!!`)
     } else {
       client.say(channel, `${userstate.display-name} has cheered ${userstate.bits} bits!!\n"${message}"`)   
     }
        bot.createMessage(discord, {
            embed: {
                title: "User Cheered!",
                fields: [
                    {
                      name: "User",
                      value: `${userstate.display-name}`,
                    },
                    {
                      name: "Bits",
                      value: `${userstate.bits}`,
                    },
                    {
                      name: "Message?",
                      value: `${message || "No message."}`,
                    },
                ],
                footer: {
                    text: "ID: " + userstate.user-id
                }
            }
        });
})

client.on('clearchat', () => {
    bot.createMessage(discord, {
            embed: {
                title: "Chat Cleared",
                timestamp: new Date();
                fields: [
                ],
                footer: {
                }
            }
        });
})

client.on('emoteonly', (channel, enabled) => {
    if(enabled == false) {
      client.say(channel, "Chat is no longer in Emote Only mode!");  
        bot.createMessage(discord, {
            embed: {
                title: "Emote Only Mode: Disabled",
                timestamp: new Date();
                fields: [
                ],
                footer: {
                }
            }
        });
    } else {
      client.say(channel, "Chat is now in Emote Only mode!");  
        bot.createMessage(discord, {
            embed: {
                title: "Emote Only Mode: Enabled",
                timestamp: new Date();
                fields: [
                ],
                footer: {
                }
            }
        });
    }
})

client.on('followersonly', (channel, enabled) => {
    if(enabled == false) {
      client.say(channel, "Chat is no longer in Follower Only mode!");
      bot.createMessage(discord, {
            embed: {
                title: "Follower Only Mode: Disabled",
                timestamp: new Date();
                fields: [
                ],
                footer: {
                }
            }
        });   
    } else {
      client.say(channel, "Chat is now in Follower Only mode!");
      bot.createMessage(discord, {
            embed: {
                title: "Follower Only Mode: Enabled",
                timestamp: new Date();
                fields: [
                ],
                footer: {
                }
            }
        });
    }
})

client.on('giftpaidupgrade', (channel, username, sender, userstate) => {
     client.say(channel, `${username} has upgraded their gifted sub from ${sender} to a regular sub!`)
     bot.createMessage(discord, {
            embed: {
                title: "Gifted Sub Upgrade",
                timestamp: new Date();
                fields: [
                    {
                        name: "User:",
                        value: username
                    },
                    {
                        name: "Gifted Sub From:",
                        value: sender
                    }
                ],
                footer: {
                }
            }
        });
})



// Commands //

client.on('message', (channel, user, msg, self) {
      if(msg === "!hello") {
        if(me) return;
      client.say(channel, "Hello!");
   }
})

client.on('message', (channel, user, msg, self) => {
    let args = msg.split(" ");
    let cmd = args.shift(" ")
     if(cmd === "!com") {
      if(user.mod) {
        if(args[0] == 0) return;
         com(channel, args[0])
      }
   }
})

// Point System //

const max = 75 // Maximum points

const min = 10 // Minimum points

client.on('join', (channel, username, self) => {
  if(user.badges === "subscriber") {
   setInterval((gainPoints) => {
       let pts = Math.random() * (max - min) - min * 2
         dbo.collection(collection).findOne({viewer: username}).then(b => {
           if(!a) {
             dbo.collection(collection).insertOne({viewer: username, points: pts})
           } else {
             dbo.collection(collection).findOneAndUpdate({viewer: username}, {$inc: {points: pts}});   
           }
         }).catch(error => {
            console.log(`ERR:\n${error}`);  
         })
   }, 420000)
  } else {
  setInterval((gainPoints) => {
    let pts = Math.random() * (max - min) - min
     dbo.collection(collection).findOne({viewer: username}).then(a => {
       if(!a) {
          dbo.collection(collection).insertOne({viewer: username, points: pts})
       } else {
          dbo.collection(collection).findOneAndUpdate({viewer: username}, {$inc: {"points": pts}})   
       }
     }).catch(error => {
        console.log("ERR: Unable to access point database\n" + error);  
     })
  }, 600000)
    client.on('part', (c, u, s) => {
      if(u === username) {
        clearInterval(gainPoints);   
      } else {
        return;   
      }
    })
  }
})

client.on('message', (channel, user, msg, self) => {
   let args = msg.split(" ");
   let cmd = args.shift(" ");
    if(cmd === "!bal") {
      let msg = args.join(" ");
        if(msg == 0) {
            dbo.collection(collection).findOne({viewer: user.username}).then(res => {
                client.say(channel, `Your balance is: ${res[0].points || 0} points!`);
            }).catch(error => {
              client.say(channel, "There was an error accessing the database.")
                console.log(`ERR:\n${error}`);
            })
        } else {
            dbo.collection(collection).findOne({viewer: args[0]}).then(res => {
               if(!res[0]) return client.say(channel, "Doesn't look like this \"user\" has a database entry.")  
                client.say(channel, `${args[0]}'s balance is: ${res[0].points} points!`);
            }).catch(error => {
              console.log(error);  
            })
        }
    }
})

client.on('message', (channel, user, msg, self) => {
   let args = msg.split(" ");
   let cmd = args.shift(" ");
    if(cmd === "!redeem") {
      let full = args.join(" ");
       if(full == 0) return client.say(channel, user.username + ", you're gonna want to provide a valid action!")
      let actionType = args[0]
       if(isNaN(actionType)) return client.say(channel, user.username + ", the action you're wanting to redeem needs to be the ID of the action!")
        actions.filter(actionType).then(res => {
           if(!res[0]) {
             client.say(channel, "The action ID you've provided doesn't seem to be listed!")   
           } else {
             dbo.collection(collection).findOne({viewer: user.username}).then(result => {
                if(!result[0]) {
                  client.say("Oops... It seems you don't have any points to spend! (or you just haven't gotten a database entry yet)");   
                } else {
                  if(result[0].points >= res[0].cost) {
                    let pts = result[0].points - res[0].cost
                     dbo.collection(collection).findOneAndUpdate({viewer: user}, { $set: {points: pts} })
                      client.say(channel, `${user.username} has used ${res[0].cost} points for the action: ${res[0].action}!`)
                  } else {
                      client.say(channel, `${user.username}, you don't have enough points to redeem this action!`)
                  }
                }
             }).catch(error => {
               client.say(channel, "Error accessing database...")
                 console.log(`ERR:\n${error}`)
             })
           }
        })
    }
})
        
})
bot.connect();
