module.exports = {
    name: "$alwaysExecute",
    code: `
      <@$authorID>, Welcome back! I removed your afk status for you.
      $setUserVar[afk;;$authorID]
      $onlyIf[$getUserVar[afk]!=;]
      $onlyIf[$checkContains[$message;afk]==false;]
    `
  }