module.exports = {
  name: "afk",
  code: `
    $title[Set your status to afk!]
    $description[Reason: $noMentionMessage]
    $color[#206694]
    $setUserVar[afk;AFK;$authorID]
    $setUserVar[reason;$noMentionMessage]
  `
}