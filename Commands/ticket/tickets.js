module.exports = ({
    name:"tickets",
    category:"Tickets",
    description:"Start a ticketing system setup!",
    usage:"tickets <channel for the ticket> <ticket topic>",
    aliases:['set-tickets'],
    code:`$awaitmessages[$authorid;10m;everything;msg;Time out!]
    Please enter the message you want!
    $setservervar[tm;$messageslice[1]]
    $setservervar[tc;$findchannel[$message[1]]]
    $argscheck[>2;Try using \`$getservervar[prefix]tickets <channel where the ticket goes> <ticket topic>\`]
    $onlyif[$channelexists[$findchannel[$message[1]]]==true;Try using \`$getservervar[prefix]tickets <channel where the ticket goes> <ticket topic>\`]
    $onlyperms[manageserver;Not enough perms! You need manage server to execute this!]`})