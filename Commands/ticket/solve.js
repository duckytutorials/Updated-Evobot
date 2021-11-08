module.exports = [{
    name:"transcript",
    type:"awaitedCommand",
    code:`$dm[$authorid]
    Transcript for the ticket \`$channelname\`, opened by $usertag[$getchannelvar[to]]
    $createfile[$getchannelvar[t];Transcript of $channelname.txt]`}]