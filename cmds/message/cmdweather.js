const weather = require('weather-js');

module.exports = {
    name: 'weather',
    aliases: ['w'],
    cooldown: true,
    categories: ['info'],
    description: ['Alap időjárási információk a megadott településen.', 'Basic weather information of a settlement.'],
    usage: ['<település neve>', '<settlement name>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (args[1]) {

            weather.find({ search: args[1].toString(), degreeType: 'C' }, function (err, result) {
                if (err) console.log(err);

                if (result.length > 0) {
                    var cityLoc = result[0].location.name;
                    var cityTemp = result[0].current.temperature + ' °C';
                    var cityWind = result[0].current.windspeed;
                    var iconUrl = result[0].current.imageUrl;
                    var cityHumidity = result[0].current.humidity + ' mg/m^3'; //Nem vagyok biztos a mértékegységben.
                    var currentDate = result[0].current.date;
                    var tempFeelslike = result[0].current.feelslike + ' °C';

                    let weatherEmbed = new Discord.MessageEmbed()
                    weatherEmbed.setColor('#dddddd')
                    weatherEmbed.setThumbnail(iconUrl)
                    weatherEmbed.setTitle(`${L.WeatherCurrentHere}: ${cityLoc}`)
                    weatherEmbed.setDescription(currentDate)
                    weatherEmbed.addFields(
                        { name: L.WeatherTemp, value: cityTemp, inline: true },
                        { name: L.WeatherWind, value: cityWind, inline: true },
                        { name: L.WeatherHumidity, value: cityHumidity, inline: true },
                        { name: L.WeatherTempFeels, value: tempFeelslike, inline: true }
                    )
                    weatherEmbed.setTimestamp();
                    weatherEmbed.setFooter('weather-js')

                    message.channel.send({ embeds: [weatherEmbed] });
                }
                else {
                    message.channel.send({ embeds: [ErrMessages.E_InvalidAPIRes(L)] });
                }
            })
        }
        else {
            message.channel.send(L.WeatherPlsLocation);
        }
    }
}