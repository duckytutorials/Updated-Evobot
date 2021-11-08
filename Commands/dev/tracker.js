module.exports = [{
    type: "botJoinCommand",
    channel: "887907394808590438",
    code: `
$log[——————————\nJoined $serverName\nGuild Invite: $getServerInvite\nTotal Servers: $serverCount\n——————————]
`,
}, {
    type: "botLeaveCommand",
    channel: "887907394808590438",
    code: `
$log[——————————\nLeft $serverName\nTotal Servers: $serverCount\n——————————]
`
}]