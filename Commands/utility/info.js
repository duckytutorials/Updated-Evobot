module.exports = [{
    name: "info",
    aliases: ['i', 'whois', 'userinfo', 'useri', 'ui'],
    code: `
$if[$findMembers[$message;10;{position}]!=1]
$author[$userTag[$authorID];$authorAvatar]
$description[Please choose the following...
$findMembers[$message;10;**{position}.)** [{tag}](https://discord.gg/vDt8yhyWe6)]]
$color[BLUE]
$awaitMessages[$authorID;1m;everything;userinfo;$getVar[no] Cancelled]
$setUserVar[userinf;$findMembers[$message;10;{id}]]
$elseIf[$findMembers[$message;10;{position}]==1]
$author[$userTag[$get[id]];$userAvatar[$get[id]]]
$thumbnail[$userAvatar[$get[id]]]
$description[
$addField[Roles[$userRoleCount[$get[id]]];$replaceText[$replaceText[$checkCondition[$userRoleCount[$get[id]]==0];true;Undefined];false;$userRoles[$get[id];mentions;, ]];yes]
$addField[Creation Date:;$creationDate[$get[id]]
\`$creationDate[$get[id];time]\`;yes]
$addField[Join Date:;$memberJoinedDate[$get[id]]
\`$memberJoinedDate[$get[id];time]\`;yes]
$addField[Nickname:;$replaceText[$replaceText[$checkCondition[$djsEval[guild.members.fetch("$get[id]").then(d=>d.nickname);yes]==null];true;Undefined];false;$djsEval[guild.members.fetch("$get[id]").then(d=>d.nickname);yes]];yes]
$addField[Tag:;$discriminator[$get[id]];yes]
$addField[Username:;$username[$get[id]];yes]
$addField[ID:;\`$get[id]\`;yes]
]
$color[BLUE]
$let[id;$findMembers[$message;10;{id}]]
$endElseIf
$endIf
$onlyIf[$message!=;$get[err]]
$onlyIf[$findMembers[$message;10;{id}]!=;$get[err]]
$let[err;{author:$userTag[$get[idb]]:$userAvatar[$get[idb]]}{thumbnail:$userAvatar[$get[idb]]}
{field:ID#COLON#:\`$get[idb]\`:yes}
{field:Username#COLON#:$username[$get[idb]]:yes}
{field:Tag#COLON#:$discriminator[$get[idb]]:yes}
{field:Nickname#COLON#:$replaceText[$replaceText[$checkCondition[$djsEval[guild.members.fetch("$get[idb]").then(d=>d.nickname);yes]==null];true;Undefined];false;$djsEval[guild.members.fetch("$get[idb]").then(d=>d.nickname);yes]]:yes}
{field:Join Date#COLON#:$memberJoinedDate[$get[idb]]
\`$memberJoinedDate[$get[idb];time]\`:yes}
{field:Creation Date#COLON#:$creationDate[$get[idb]]
\`$creationDate[$get[idb];time]\`:yes}
{field:Roles[$userRoleCount[$get[idb]]]:$replaceText[$replaceText[$checkCondition[$userRoleCount[$get[idb]]==0];true;Undefined];false;$userRoles[$get[idb];mentions;, ]]:yes}
{color:BLUE}]
$let[idb;$findUser[$message]]
$suppressErrors[{author:$userTag[$authorID]:$authorAvatar}{description:$getVar[no] An error occurred, please try again}{color:RED}]
`,
}, {
    type: "awaitedCommand",
    name: "userinfo",
    code: `
$if[$isNumber[$message[1]]==true]
$author[$userTag[$get[st]];$userAvatar[$get[st]]]
$thumbnail[$userAvatar[$get[st]]]
$description[
$addField[Roles[$userRoleCount[$get[st]]];$replaceText[$replaceText[$checkCondition[$userRoleCount[$get[st]]==0];true;Undefined];false;$userRoles[$get[st];mentions;, ]];yes]
$addField[Creation Date:;$creationDate[$get[st]]
\`$creationDate[$get[st];time]\`;yes]
$addField[Joined Date:;$memberJoinedDate[$get[st]]
\`$memberJoinedDate[$get[st];time]\`;yes]
$addField[Nickname:;$replaceText[$replaceText[$checkCondition[$djsEval[guild.members.fetch("$get[st]").then(d=>d.nickname);yes]==null];true;Undefined];false;$djsEval[guild.members.fetch("$get[st]").then(d=>d.nickname);yes]];yes]
$addField[Tag:;$discriminator[$get[st]];yes]
$addField[Username:;$username[$get[st]];yes]
$addField[ID;\`$get[st]\`;yes]
]
$color[BLUE]
$let[st;$splitText[$message[1]]]
$textSplit[$getUserVar[userinf];\n]
$elseIf[$toLowercase[$message[1]]==cancel]
$getVar[no] Cancelled
$endElseIf
$else
$getVar[no] Cancelled
$endIf
$suppressErrors[$getVar[no] Cancelled]
`
}]
