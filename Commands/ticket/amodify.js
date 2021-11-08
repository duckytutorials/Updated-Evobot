module.exports = [{
    name:"amodify",
    type:"awaitedCommand",
    code:`$if[$roleexists[$findrole[$message]]==true]
    $modifychannelperms[$channelid;+sendmessages;$findrole[$message]]
    $modifychannelperms[$channelid;+readmessages;$findrole[$message]]
    Gave access to the role!
    $elseif[$memberexists[$findmember[$message]]==true]
    $modifychannelperms[$channelid;+sendmessages;$findmember[$message]]
    $modifychannelperms[$channelid;+readmessages;$findmember[$message]]
    Gave access to the user!
    $endelseif
    $else
    Could not find the role/user!
    $endif`}]
     