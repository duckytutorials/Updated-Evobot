module.exports = [{
    name:"msg",
    type:"awaitedCommand",
    code:`$if[$getservervar[tmid]==a]
    $setservervar[tmid;$splittext[1]/]
    $else
    $setservervar[tmid;$getservervar[tmid]$splittext[1]/]
    $endif
    $setservervar[tmm;$getservervar[tmm]$message/]
    Please put a category ID where the ticket should be opened!
    $awaitmessages[$authorid;1m;everything;category;Time out!]
    $setservervar[tm;]
    $setservervar[tc;]
    $textsplit[$channelsendmessage[$getservervar[tc];{title:Tickets}{description:$getservervar[tm]}{footer:React with 🎫 to create a ticket!}{color:YELLOW}{reactions:🎫};yes]; ]
    $onlyif[$channelexists[$findchannel[$message[1]]]==true;Could not find the channel!]`}]
    