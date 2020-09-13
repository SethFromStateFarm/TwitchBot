const tmi = require('tmi.js');
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
    }
    catch(error) {
      console.log(`ERR:\n${error}`);
    }
}

// Events //

client.on('timeout', (channel, username, reason, duration, userstate) => {
   client.(channel, `${username} has been timed out. (${duration} seconds)`);  
})
    
client.on('clearchat', (channel) => {
  setTimeout(() => {
    return;
  }, 1000)
  client.action(channel, "Chat has been cleared!");
})
    


client.on('cheer', (channel, userstate, message) => {
     if(message == 0) {
       client.action(channel, `${userstate.display-name} has cheered ${userstate.bits} bits!!`)
     } else {
       client.action(channel, `${userstate.display-name} has cheered ${userstate.bits} bits!!\n"${message}"`)   
     }
})
    
client.on('slow', (channel, enabled, length) => {
   if(enabled == true) {
     client.action(channel, "Chat is now in slow mode!") 
   } else {
     client.action(channel, "Chat is no longer in slow mode!")
   }
})

client.on('emoteonly', (channel, enabled) => {
    if(enabled == false) {
      client.action(channel, "Chat is no longer in Emote Only mode!");  
    } else {
      client.action(channel, "Chat is now in Emote Only mode!");  
    }
})

client.on('followersonly', (channel, enabled) => {
    if(enabled == false) {
      client.action(channel, "Chat is no longer in Follower Only mode!"); 
    } else {
      client.action(channel, "Chat is now in Follower Only mode!");
    }
})
    
client.on('subscribers', (channel, enabled) => {
    if(enabled == true) {
        client.action(channel, "Chat is now in Subscriber Only mode!")
    } else {
        client.action(channel, "Chat is no longer in Subscriber Only mode!")
    }
})
    
client.on('raided', (channel, username, viewers) => {
  client.action(channel, `${username} has raided with ${viewers} viewers!`)  
})
    
client.on('resub', (channel, username, months, message, userstate, method) => {
    client.action(channel, `${username} has resubbed for ${months} month(s)!`)
})
    
client.on('subscription', (channel, username, method, message, userstate) => {
    client.action(channel, `${username} has just subscribed!`)
})

client.on('giftpaidupgrade', (channel, username, sender, userstate) => {
     client.action(channel, `${username} has upgraded their gifted sub from ${sender} to a regular sub!`)
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
    let cmd = args.shift()
     if(cmd === "!com") {
      if(user.mod) {
        if(args[0] == 0) return;
         com(channel, args[0])
      }
   }
})

client.on('message', (channel, user, msg, self) => {
    let args = msg.split(" ");
    let cmd = args.shift()
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
    let cmd = args.shift()
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

const colors = {
  "Blue",
  "BlueViolet",
  "CadetBlue",
  "Chocolate",
  "Coral",
  "DodgerBlue",
  "Firebrick",
  "GoldenRod",
  "Green",
  "HotPink",
  "OrangeRed",
  "Red",
  "SeaGreen",
  "SpringGreen",
  "YellowGreen",
}

client.on('message', (channel, user, msg, self) => {
    let args = msg.split(" ");
    let cmd = args.shift();
      if(msg === "?color") {
        if(user.mod) {
         if(args[0].charAt(1) === "#") { // If you want to set a custom color for the client. (Will need to begin with # of course)
          client.color(args[0]);   
         } else {
          switch(args[0].toLowerCase()) {
           case("list"):
            client.action(channel, `List of colors: ${colors.join(", ")}`);
           break;
           case("blue"):
            client.color('Blue');
              client.action(channel, "Color set to Blue");
           break;
           case("blueviolet"):
            client.color('BlueViolet');
              client.action(channel, "Color set to BlueViolet");
           break;
           case("cadetblue"):
            client.color('CadetBlue');
              client.action(channel, "Color set to CadetBlue");
           break;
           case("chocolate"):
            client.color("Chocolate");
              client.action(channel, "Color set to Chocolate");
           break;
           case("coral"):
            client.color("Coral");
              client.action(channel, "Color set to Coral");
           break;
           case("dodgerblue"):
            client.color("DodgerBlue");
               client.action(channel, "Color set to DodgerBlue");
           break;
           case("firebrick"):
            client.color("Firebrick");
               client.action(channel, "Color set to Firebrick");
           break;
           case("goldenrod"):
            client.color("GoldenRod");
               client.action(channel, "Color set to GoldenRod");
           break;
           case("green"):
            client.color("Green");
               client.action(channel, "Color set to Green");
           break;
           case("hotpink"):
            client.color("HotPink");
               client.action(channel, "Color set to HotPink");
           break;
           case("pink"):
            client.color("HotPink");
               client.action(channel, "Color set to Pink");
           break;
           case("orangered"):
            client.color("OrangeRed");
               client.action(channel, "Color set to OrangeRed");
           break;
           case("redorange"):
            client.color("OrangeRed");
               client.action(channel, "Color set to RedOrange");
           break;
           case("red"):
            client.color("Red");
                  client.action(channel, "Color set to Red");
           break;
           case("seagreen"):
            client.color("SeaGreen");
               client.action(channel, "Color set to SeaGreen");
           break;
           case("springgreen"):
            client.color("SpringGreen");
               client.action(channel, "Color set to SpringGreen");
           break;
           case("yellowgreen"):
            client.color("YellowGreen");
             client.action(channel, "Color set to YellowGreen");
           break;
              default:
                  let color = colors.shuffle().random();
                  client.color(color);
                  client.action(channel, `Color set to ${color}`);
          }
        }
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
   let cmd = args.shift();
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
   let cmd = args.shift();
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
