module.exports = [{
    name:"unsolve",
    type:"awaitedCommand",
    code:`$editchannel[$channelid;$default;ticket-$username[$getchannelvar[to]]-$discriminator[$getchannelvar[to]];$default;$default;$default;$default;yes]
    I succuessfuly marked this ticket as solved!
    $onlyif[$checkcontains[$channelname;solved]==true;Ticket already unsolved!]`}]