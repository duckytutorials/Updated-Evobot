module.exports = ({
    name: "reboot",
    code: `
$reboot[server.js]
$wait[5]
$reply[$messageID;Rebooting in 5 seconds, see ya' next time;no]
$onlyForIDs[$botOwnerID;870441674525012018;]
`
})