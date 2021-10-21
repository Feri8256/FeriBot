const weather = require('weather-js');

module.exports = {
    name:'weather',
    aliases: ['w'],
    cooldown:true,
    categories: ['info'],
    description: ['Alap időjárási információk a megadott településen.', 'Basic weather information of a settlement.'],
    usage: ['<település neve>', '<settlement name>'],
    execute(Discord, client, message, args, L, DataMgr, ErrMessages) {
        if (args[1]) {
            
                weather.find({ search: args[1].toString(), degreeType: 'C' }, function (err, result) {
                    if (err) console.log(err);
    
                    if (result !== [] && result.length) {
                        var WeatherInfo = result;
                        var CityLocation = WeatherInfo[0].location.name;
                        var CityTemp = WeatherInfo[0].current.temperature + ' °C';
                        var CityWind = WeatherInfo[0].current.windspeed;
                        var WeatherIconUrl = WeatherInfo[0].current.imageUrl;
                        var CityHumidity = WeatherInfo[0].current.humidity + ' mg/m^3'; //Nem vagyok biztos a mértékegységben.
                        var CurrentDate = WeatherInfo[0].current.date;
                        var TempFeelslike = WeatherInfo[0].current.feelslike + ' °C';
    
                        let WeatherEmbed = new Discord.MessageEmbed()
                        WeatherEmbed.setColor('#dddddd')
                        WeatherEmbed.setThumbnail(WeatherIconUrl)
                        WeatherEmbed.setTitle(`${L.WeatherCurrentHere}: ${CityLocation}`)
                        WeatherEmbed.setDescription(CurrentDate)
                        WeatherEmbed.addFields(
                            { name: L.WeatherTemp, value: CityTemp, inline: true },
                            { name: L.WeatherWind, value: CityWind, inline: true },
                            { name: L.WeatherHumidity, value: CityHumidity, inline: true },
                            { name: L.WeatherTempFeels, value: TempFeelslike, inline: true }
                        )
                        WeatherEmbed.setTimestamp();
                        WeatherEmbed.setFooter('weather-js')
    
                        message.channel.send(WeatherEmbed);
                    }
                    else {
                        message.channel.send(ErrMessages.E_InvalidAPIRes(L));
                    }
                })
                
        }
        else {
            message.channel.send(L.WeatherPlsLocation);
        }
    }
}