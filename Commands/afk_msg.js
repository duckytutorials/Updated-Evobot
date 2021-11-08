module.exports = {
    name: "$alwaysExecute",
    code: `
      $username[$authorID], $username[$mentioned[1]] is Afk.- $getUserVar[reason;$mentioned[1]]
      $deleteIn[10s]
      $onlyIf[$getUserVar[afk;$mentioned[1]]==AFK;]
      $onlyif[$mentioned[1;no]!=;]
    `
  }