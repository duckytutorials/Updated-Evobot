module.exports = ({
    name:"delete-ticket",
    category:"Tickets",
    description:"Delete a ticket system to an already existing message!",
    usage:"delete-ticket <message id>",
    code:`$setservervar[tmid;$replacetext[$getservervar[tmid];$message[1]/;;1]]
    $setservervar[tmm;$replacetext[$getservervar[tmm];$advancedtextsplit[$getservervar[tmm];/;$findtextsplitindex[$message[1]]]/;;1]]
    $setservervar[tmc;$replacetext[$getservervar[tmc];$advancedtextsplit[$getservervar[tmc];/;$findtextsplitindex[$message[1]]]/;;1]]
    I successfully deleted the ticket with the message ID \`$message[1]\`!
    $deletecommand
    $deletein[10s]
    $deletemessage[$message[1]]
    $onlyif[$findtextsplitindex[$message[1]]!=0;Could not find that message ID in the reaction roles!]
    $textsplit[$getservervar[tmid];/]
    $onlyif[$messageexists[$channelid;$message[1]]==true;Could not find the message with the id \`$message[1]\` in this channel!]
    $onlyif[$message[1]!=;Invalid args. Try using \`$getservervar[prefix]delete-ticket <message id>\`]
    $onlyperms[manageserver;Not required permissions! You need \`manage server\` permissions!]`})