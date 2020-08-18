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
      bot.disconnect();
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
    
    const collection = "<database_name>";

// Functions //

function com(channel, seconds) {
    if(seconds !== 30 || 60 || 90 || 120 || 150 || 180) return client.action(channel, "Available times: 30, 60, 120, 150, & 180.");
    try {
      client.commercial(channel, seconds);   
      client.action(channel, "Running commercial!");
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

client.on('timeout', (channel, username, reason, duration, userstate) => {
   client.(channel, `${username} has been timed out. (${duration} seconds)`);  
    bot.createMessage(discord, {
        embed: {
                title: "User Timeout",
                fields: [
                    {
                      name: "User",
                      value: `${username}`,
                    },
                    {
                      name: "Reason",
                      value: `${reason || "No reason."}`,
                    },
                    {
                      name: "Duration",
                      value: `${duration}`,
                    },
                ],
                footer: {
                    text: "ID: " + userstate.user-id
                }
            }
    })
})
    
client.on('clearchat', (channel) => {
  setTimeout(() => {
    return;
  }, 1000)
  client.action(channel, "Chat has been cleared!");
    bot.createMessage(discord, {
       embed: {
         title: "Chat has been cleared.",
         timestamp: new Date();
       }
    })
})
    


client.on('cheer', (channel, userstate, message) => {
     if(message == 0) {
       client.action(channel, `${userstate.display-name} has cheered ${userstate.bits} bits!!`)
     } else {
       client.action(channel, `${userstate.display-name} has cheered ${userstate.bits} bits!!\n"${message}"`)   
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
    
client.on('slow', (channel, enabled, length) => {
   if(enabled == true) {
     client.action(channel, "Chat is now in slow mode!")
     bot.createMessage(discord => {
       embed: {
          title: "Slowmode Enabled",
          timestamp: new Date(),
          fields: [
          ],
          footer: {
              text: "Length: " + (length || "N/A")
          }
       }
    })   
   } else {
     client.action(channel, "Chat is no longer in slow mode!")
     bot.createMessage(discord => {
       embed: {
          title: "Slowmode Disabled",
          timestamp: new Date(),
          fields: [
          ],
          footer: {   
          }
       }
    })
   }
})
    
client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
     bot.createMessage(discord => {
       embed: {
          title: "Gifted Sub Notification!",
          timestamp: new Date(),
          fields: [
              {
                  name: "User:",
                  value: `${username}`
              },
              {
                  name: "Streak",
                  value: streakMonths + " months"
              },
              {
                  name: "Recipient",
                  value: recipient
              },
              {
                  name: "Method",
                  value: methods
              }
          ],
          footer: {   
          }
       }
    })
})

client.on('emoteonly', (channel, enabled) => {
    if(enabled == false) {
      client.action(channel, "Chat is no longer in Emote Only mode!");  
        bot.createMessage(discord, {
            embed: {
                title: "Emote Only Mode: Disabled",
                timestamp: new Date(),
                fields: [
                ],
                footer: {
                }
            }
        });
    } else {
      client.action(channel, "Chat is now in Emote Only mode!");  
        bot.createMessage(discord, {
            embed: {
                title: "Emote Only Mode: Enabled",
                timestamp: new Date(),
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
      client.action(channel, "Chat is no longer in Follower Only mode!");
      bot.createMessage(discord, {
            embed: {
                title: "Follower Only Mode: Disabled",
                timestamp: new Date(),
                fields: [
                ],
                footer: {
                }
            }
        });   
    } else {
      client.action(channel, "Chat is now in Follower Only mode!");
      bot.createMessage(discord, {
            embed: {
                title: "Follower Only Mode: Enabled",
                timestamp: new Date(),
                fields: [
                ],
                footer: {
                }
            }
        });
    }
})
    
client.on('subscribers', (channel, enabled) => {
    if(enabled == true) {
        client.action(channel, "Chat is now in Subscriber Only mode!")
     bot.createMessage(discord => {
       embed: {
          title: "Sub Only Mode: Enabled",
          timestamp: new Date(),
          fields: [
          ],
          footer: {   
          }
       }
    })
    } else {
        client.action(channel, "Chat is no longer in Subscriber Only mode!")
     bot.createMessage(discord => {
       embed: {
          title: "Sub Only Mode: Disabled",
          timestamp: new Date(),
          fields: [
          ],
          footer: {   
          }
       }
    })
    }
})
    
client.on('raided', (channel, username, viewers) => {
  client.action(channel, `${username} has raided with ${viewers} viewers!`)  
    bot.createMessage(discord => {
       embed: {
          title: "Raid Notification",
          timestamp: new Date(),
          fields: [
              {
                  name: "Leader",
                  value: username
              },
              {
                  name: "Viewers",
                  value: viewers
              }
          ],
          footer: {   
          }
       }
    })
})
    
client.on('resub', (channel, username, months, message, userstate, method) => {
    client.action(channel, `${username} has resubbed for ${months} month(s)!`)
    bot.createMessage(discord => {
       embed: {
          title: "Resub Notification",
          timestamp: new Date(),
          fields: [
              {
                  name: "User",
                  value: username
              },
              {
                  name: "Months",
                  value: months
              },
              {
                  name: "Cumulative Months",
                  value: ~~userstate["msg-param-cumulative-months"]
              },
              {
                  name: "Method",
                  value: method
              },
              {
                  name: "Message",
                  value: message
              }
          ],
          footer: {   
          }
       }
    })
})
    
client.on('subscription', (channel, username, method, message, userstate) => {
    client.action(channel, `${username} has just subscribed!`)
    bot.createMessage(discord => {
       embed: {
          title: "Subscription Notification",
          timestamp: new Date(),
          fields: [
              {
                  name: "User",
                  value: username
              },
              {
                  name: "Message",
                  value: message
              },
              {
                  name: "Method",
                  value: method
              },
          ],
          footer: {   
          }
       }
    })
})

client.on('giftpaidupgrade', (channel, username, sender, userstate) => {
     client.action(channel, `${username} has upgraded their gifted sub from ${sender} to a regular sub!`)
     bot.createMessage(discord, {
            embed: {
                title: "Gifted Sub Upgrade",
                timestamp: new Date(),
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

client.on('messagedeleted', (channel, username, deletedMessage, userstate) => {
    bot.createMessage(discord => {
       embed: {
          title: "Message Deleted",
          timestamp: new Date(),
          fields: [
              {
                  name: "User",
                  value: `${username}`
              },
              {
                  name: "Message",
                  value: deletedMessage
              },
          ],
          footer: {
            text: `ID: ${userstate.user-id}`   
          }
       }
    })
})

client.on('mod', (channel, username) => {
   bot.createMessage(discord => {
       embed: {
          title: "User Modded",
          timestamp: new Date(),
          fields: [
              {
                  name: "User",
                  value: `${username}`
              },
          ],
          footer: {
          }
       }
    })
})
    
client.on('unmod', (channel, username) => {
  bot.createMessage(discord => {
       embed: {
          title: "User Unmodded",
          timestamp: new Date(),
          fields: [
              {
                  name: "User",
                  value: `${username}`
              },
          ],
          footer: {
          }
       }
    })  
})
// Commands //
    


client.on('message', (channel, user, msg, self) => {
   if(msg === "!mods") {
     client.on("mods", (channel, mods) => {
      const moderators = mods.join("\n") // "mods" returns an array of moderators. hopefully this will create a legitimate "list" of moderators.
       client.action(channel, `Current mods of ${channel}'s stream:\n${moderators}`);
     })
   }
})
    
client.on('message', (channel, user, msg, self) {
      if(msg === "!hello") {
        if(me) return;
      client.action(channel, "Hello!");
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

client.on('message', (channel, user, msg, self) => {
    let args = msg.split(" ");
    let cmd = args.shift(" ")
     if(cmd === "?ban") {
      if(user.mod) {
       let full = args.join(" ");
        if(full == 0) return;
         full = full.slice(args[0].length + 3, full.length) // Adjust "+ 3" to however many unwanted characters are left over due to typical NodeJS stuff
         client.ban(channel, args[0], (full || "No reason.")).catch(error => {
           console.log(error);  
         })// Leaving the reason or "full" empty will just enter the reason as "No reason."
      }
   }
})

client.on('message', (channel, user, msg, self) => {
    let args = msg.split(" ");
    let cmd = args.shift(" ")
     if(cmd === "?timeout") {
      if(user.mod) {
       let full = args.join(" ");
        if(full == 0) return;
          // again, args[0] is meant to be a username. Will not function if it is not a USERNAME.
         let time = parseInt(args[1]) // Timeout uses seconds as it's duration length. Default is 1 hour in this case.
         full = full.slice(args[0].length + args[1].length + 3, full.length) // Adjust "+ 3" to however many unwanted characters are left over due to typical NodeJS stuff
          client.timeout(channel, args[0], (time || 3600), (full || "No reason.")).catch(error => {
           console.log(error);  
         })// Leaving the reason empty will just enter the reason as "No reason."
      }
   }
})

// Point System //

const max = 75 // Maximum points

const min = 10 // Minimum points

const lister = new Set();

client.on('join', (channel, user, self) => {
  if(self) return;
    console.log(user + "joined.");
    lister.add(user)
     let inter = setInterval(() => {
         if(lister.has(user)) {
           let pts = Math.random() * (max - min) - min
            dbo.collection(collection).findOne({viewer: user}).then(a => {
              if(!a) {
                dbo.collection(collection).insertOne({viewer: user, points: pts});   
              } else {
               dbo.collection(collection).findOneAndUpdate({viewer: user}, {$inc: {"points": pts}});   
              }
            })
         } else {
           console.log(user + " not found in lister.")
           clearInterval(inter)
           return;
         }
     }, 600000)
})

client.on('part', (channel, user, self) => {
  console.log(u + " left.")
    if(self) return;
    if(lister.has(u)) {
      lister.delete(u)
    } else {
    return;   
  }
})


client.on('message', (channel, user, msg, self) => {
   let args = msg.split(" ");
   let cmd = args.shift(" ");
    if(cmd === "!bal") {
      let msg = args.join(" ");
        if(msg == 0) {
            dbo.collection(collection).findOne({viewer: user.username}).then(res => {
                client.action(channel, `Your balance is: ${res[0].points || 0} points!`);
            }).catch(error => {
              client.action(channel, "There was an error accessing the database.")
                console.log(`ERR:\n${error}`);
            })
        } else {
            dbo.collection(collection).findOne({viewer: args[0]}).then(res => {
               if(!res[0]) return client.action(channel, "Doesn't look like this \"user\" has a database entry.")  
                client.action(channel, `${args[0]}'s balance is: ${res[0].points} points!`);
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
       if(full == 0) return client.action(channel, user.username + ", you're gonna want to provide a valid action!")
      let actionType = args[0]
       if(isNaN(actionType)) return client.action(channel, user.username + ", the action you're wanting to redeem needs to be the ID of the action!")
        actions.filter(actionType).then(res => {
           if(!res[0]) {
             client.action(channel, "The action ID you've provided doesn't seem to be listed!")   
           } else {
             dbo.collection(collection).findOne({viewer: user.username}).then(result => {
                if(!result[0]) {
                  client.action("Oops... It seems you don't have any points to spend! (or you just haven't gotten a database entry yet)");   
                } else {
                  if(result[0].points >= res[0].cost) {
                    let pts = result[0].points - res[0].cost
                     dbo.collection(collection).findOneAndUpdate({viewer: user}, { $set: {points: pts} })
                      client.action(channel, `${user.username} has used ${res[0].cost} points for the action: ${res[0].action}!`)
                  } else {
                      client.action(channel, `${user.username}, you don't have enough points to redeem this action!`)
                  }
                }
             }).catch(error => {
               client.action(channel, "Error accessing database...")
                 console.log(`ERR:\n${error}`)
             })
           }
        })
    }
})
        
})
bot.connect();
