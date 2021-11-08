module.exports = ({
    name:"ticket-settings",
    category:"Tickets",
    description:"Show the ticket settings.",
    usage:"ticket-settings",
    aliases:['settings'],
    code:`$reactioncollector[$splittext[1];$authorid;2m;🔒,♻️,✔️,❌,➕,📓;lock,rename,solve,unsolve,modify,transcript;yes]
    $textsplit[$sendmessage[{title:Ticket Settings}{description:React with 🔒 to close the ticket\nReact with ♻️ to rename the ticket\nReact with ✔️ to solve the ticket\nReact with ❌ to unsolve the ticket\nReact with ➕ to add/remove someone from the ticket\nReact with 📓 to get this ticket's transript in DMs}{color:YELLOW}{footer:Infinix tickets | Created with ❤️:$useravatar[$clientid]}{thumbnail:https://media3.giphy.com/media/XE1dxQ9eoIcamQc6NI/giphy.gif?cid=6c09b952jtpie2iwfw15ga2rvnwk18n6z6648oasooanewwk&rid=giphy.gif&ct=s};yes]; ]
    $onlyif[$isticket==true;Not a ticket!]
    $onlyperms[managechannels;You need the manage messages permissions to execute this!]`})