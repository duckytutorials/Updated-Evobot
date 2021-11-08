module.exports = {
name: "banalt",
aliases: ['balt' , 'bana'],
code:`
$if[$creationdate[$mentioned[1];time]>30]
$ban[$mentioned[1]]
$username[$mentioned[1]]#$discriminator[$mentioned[1]] has been banned from $servername because there account was younger than 30d
$deletecommand
their account is $creationdate[$mentioned[1];time] old
$else
sorry $username that user is older than 30d old
$deletecommand
$endif`
}
