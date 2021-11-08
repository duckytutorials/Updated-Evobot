module.exports = [{
    name:"rmodify",
    type:"awaitedCommand",
    code:`$if[$roleexists[$findrole[$message]]==true]
    $modifychannelperms[$channelid;-sendmessages;$findrole[$message]]
    $modifychannelperms[$channelid;-readmessages;$findrole[$message]]
    Removed access for the role!
    $elseif[$memberexists[$findmember[$message]]==true]
    $modifychannelperms[$channelid;-sendmessages;$findmember[$message]]
    $modifychannelperms[$channelid;-readmessages;$findmember[$message]]
    Removed access for the user!
    $endelseif
    $else
    Could not find the role/user!
    $endif`}]